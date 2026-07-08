/* DIESEL CLOUD SYNC
   Wires the local save (localStorage, via DieselState) to Firebase:
   - Firestore  → cross-device state + lets the Cloudflare Worker run the World Tick while you're gone
   - Cloud Messaging → real push notifications for CRITICAL alerts, even with the app fully closed

   Safe by design: if Firebase isn't configured yet, or the network/Firestore rules reject a call,
   everything silently falls back to local-only mode — exactly the behavior before this file existed.
   Nothing here ever blocks the UI or throws into the page.
*/
(function () {
  const CONFIGURED =
    typeof DIESEL_FIREBASE_CONFIG !== 'undefined' &&
    DIESEL_FIREBASE_CONFIG.apiKey &&
    !DIESEL_FIREBASE_CONFIG.apiKey.startsWith('PASTE_');

  const DieselCloud = {
    ready: null,
    uid: null,
    online: false,
    db: null,
    auth: null,
    _pushTimer: null,

    init() {
      if (this.ready) return this.ready;
      this.ready = new Promise((resolve) => {
        if (!CONFIGURED || typeof firebase === 'undefined') { resolve(false); return; }
        try {
          if (!firebase.apps.length) firebase.initializeApp(DIESEL_FIREBASE_CONFIG);
          this.auth = firebase.auth();
          this.db = firebase.firestore();
          this.auth.onAuthStateChanged((user) => {
            if (user) {
              this.uid = user.uid;
              this.online = true;
              try { localStorage.setItem('diesel_uid', user.uid); } catch (e) {}
              this._pullAndMerge();
              resolve(true);
            }
          });
          this.auth.signInAnonymously().catch(() => resolve(false));
        } catch (e) { resolve(false); }
      });
      return this.ready;
    },

    _docRef() {
      if (!this.db || !this.uid) return null;
      return this.db.collection(DIESEL_CLOUD.STATES_COLLECTION).doc(this.uid);
    },

    // Pulled once per page load. If the cloud copy is newer (e.g. the Cloudflare Worker ran a
    // World Tick while you were away, or you last played on another device), merge it into
    // localStorage so this device picks it up.
    async _pullAndMerge() {
      const ref = this._docRef();
      if (!ref) return;
      try {
        const snap = await ref.get();
        if (!snap.exists) return;
        const remote = snap.data();
        const local = DieselState.load();
        const remoteTs = remote.updatedAt || 0;
        const localTs = local.updatedAt || 0;
        if (remoteTs > localTs) {
          const merged = Object.assign(DieselState.defaults(), remote);
          DieselState.save.__cloudSkip = true; // don't immediately re-push what we just pulled
          DieselState.save(merged);
          DieselState.save.__cloudSkip = false;
          document.dispatchEvent(new CustomEvent('diesel-cloud-sync', { detail: merged }));
        }
      } catch (e) { /* offline or rules rejected it — local state keeps working regardless */ }
    },

    // Debounced push, called from the patched DieselState.save() below on every local write.
    push(state) {
      if (!CONFIGURED) return;
      clearTimeout(this._pushTimer);
      this._pushTimer = setTimeout(async () => {
        await this.init();
        const ref = this._docRef();
        if (!ref) return;
        try { await ref.set(state); } catch (e) { /* stays local-only until this recovers */ }
      }, 1500);
    },

    // Call from a user gesture (a button tap) — browsers require that for notification permission.
    async registerPush() {
      if (!CONFIGURED) return { ok: false, reason: 'not-configured' };
      await this.init();
      if (!this.uid) return { ok: false, reason: 'no-auth' };
      if (!('Notification' in window) || !('serviceWorker' in navigator)) return { ok: false, reason: 'unsupported' };
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return { ok: false, reason: 'denied' };
        const reg = await navigator.serviceWorker.ready;
        const messaging = firebase.messaging();
        const token = await messaging.getToken({ vapidKey: DIESEL_VAPID_KEY, serviceWorkerRegistration: reg });
        if (!token) return { ok: false, reason: 'no-token' };
        await this.db.collection(DIESEL_CLOUD.TOKENS_COLLECTION).doc(this.uid).set({
          token, updatedAt: Date.now(), ua: navigator.userAgent.slice(0, 120)
        });
        return { ok: true, token };
      } catch (e) { return { ok: false, reason: 'error', error: String(e) }; }
    },

    async pushStatus() {
      if (!('Notification' in window)) return 'unsupported';
      return Notification.permission; // 'granted' | 'denied' | 'default'
    },

    isConfigured() { return CONFIGURED; }
  };

  window.DieselCloud = DieselCloud;

  // Patch DieselState.save so every local write also (debounced) syncs to the cloud.
  // Also stamps `updatedAt` so the pull-merge and the Cloudflare Worker can tell which copy is newest.
  if (typeof DieselState !== 'undefined' && !DieselState.save.__cloudPatched) {
    const originalSave = DieselState.save.bind(DieselState);
    const patched = function (state) {
      state.updatedAt = Date.now();
      originalSave(state);
      if (!patched.__cloudSkip) DieselCloud.push(state);
    };
    patched.__cloudPatched = true;
    patched.__cloudSkip = false;
    DieselState.save = patched;
  }

  if (CONFIGURED) DieselCloud.init();
})();

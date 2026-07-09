/* DIESEL NOTIFICATION BELL
   Injects a real bell icon + unread badge into the top navbar on every page.
   Count comes straight from DieselState (real, dynamically generated alerts —
   world tick events, dispatch results, threat warnings — not the static demo feed).
   Refreshes on an interval and whenever a cloud sync pulls in new state from the
   Cloudflare Worker, so it stays accurate even after alerts land while you were away.
*/
(function () {
  function inject() {
    const nav = document.querySelector('.navbar');
    if (!nav || document.getElementById('notifBell')) return;

    const bell = document.createElement('a');
    bell.id = 'notifBell';
    bell.href = 'alerts.html';
    bell.className = 'notif-bell';
    bell.setAttribute('aria-label', 'View alerts');
    bell.innerHTML = `<span class="notif-bell-ic">&#128276;</span><span class="notif-bell-badge" id="notifBellBadge" hidden>0</span>`;
    nav.appendChild(bell);
  }

  function refresh() {
    const badge = document.getElementById('notifBellBadge');
    if (!badge || typeof DieselState === 'undefined') return;
    const n = DieselState.getUnreadAlertCount();
    if (n > 0) {
      badge.hidden = false;
      badge.textContent = n > 99 ? '99+' : String(n);
    } else {
      badge.hidden = true;
    }
  }

  function boot() {
    inject();
    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  setInterval(refresh, 15000);
  document.addEventListener('diesel-cloud-sync', refresh);
  window.addEventListener('storage', (e) => { if (e.key === (window.DieselState && DieselState.KEY)) refresh(); });
})();

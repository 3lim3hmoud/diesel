// ====== DIESEL CLOUD CONFIG ======
// Fill these in from your Firebase project (Console → Project settings → General →
// "Your apps" → Web app → SDK setup and configuration). See SETUP-CLOUD.md for the full walkthrough.
const DIESEL_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDmYt9TvbCpD7Zcd1fOaB0PwbnLCEjTIJI",
  authDomain: "diesel-command.firebaseapp.com",
  projectId: "diesel-command",
  storageBucket: "diesel-command.firebasestorage.app",
  messagingSenderId: "541258991528",
  appId: "1:541258991528:web:045bc297693904609aff9d"
};

// Cloud Messaging → Web configuration → "Web Push certificates" → generate a key pair
const DIESEL_VAPID_KEY = "BJMoIUONUv9hl9LWiJwZplAPpNvV1f3vzuRMEdtBEsK8u768HK1wj48IGKOpF1AL6h2iCHhTWRQD8GI-EopsPrg";

// keeps the browser, service-worker and Cloudflare Worker pointed at the same Firestore collections
const DIESEL_CLOUD = {
  STATES_COLLECTION: 'diesel_states',
  TOKENS_COLLECTION: 'fcmTokens'
};

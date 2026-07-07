/* Fake-but-persistent session telemetry — purely cosmetic. Reinforces the
   feel of a live, monitored system (session id, node ip, last login, uptime,
   jittering latency) without touching any real mission/wallet logic. */
const DieselSession = {
  KEY: 'diesel_session_meta_v1',

  hash(str){
    let h = 0;
    for(let i = 0; i < str.length; i++){ h = (h * 31 + str.charCodeAt(i)) >>> 0; }
    return h;
  },

  init(){
    let m;
    try{ m = JSON.parse(localStorage.getItem(this.KEY)); }catch(e){ m = null; }
    if(!m || !m.sessionId){
      const h = this.hash(Date.now() + '_' + Math.random());
      m = {
        sessionId: 'SES-' + (h % 9000 + 1000) + '-' + ((h >>> 4) % 90 + 10),
        ip: '10.' + (h % 200 + 10) + '.' + ((h >>> 3) % 255) + '.' + ((h >>> 7) % 255),
        firstSeen: Date.now(),
        lastLogin: Date.now() - (1000 * 60 * (30 + Math.floor(Math.random() * 300)))
      };
      try{ localStorage.setItem(this.KEY, JSON.stringify(m)); }catch(e){}
    }
    return m;
  },

  relTime(ts){
    const mins = Math.floor((Date.now() - ts) / 60000);
    if(mins < 1) return 'just now';
    if(mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if(hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
  },

  uptimeStr(m){
    const diff = Date.now() - m.firstSeen;
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    return days + 'd ' + String(hrs).padStart(2, '0') + 'h';
  },

  mount(elId){
    const el = document.getElementById(elId);
    if(!el) return;
    const m = this.init();
    const render = () => {
      const latency = 16 + Math.floor(Math.random() * 16);
      el.innerHTML =
        '<span class="s-item"><span class="s-dot"></span>ENCRYPTED &middot; AES-256/TLS1.3</span>' +
        '<span class="s-item">SESSION <b>' + m.sessionId + '</b></span>' +
        '<span class="s-item">NODE IP <b>' + m.ip + '</b></span>' +
        '<span class="s-item">LAST LOGIN <b>' + this.relTime(m.lastLogin) + '</b></span>' +
        '<span class="s-item">UPTIME <b>' + this.uptimeStr(m) + '</b></span>' +
        '<span class="s-item">LATENCY <b>' + latency + 'ms</b></span>';
    };
    render();
    setInterval(render, 4000);
  }
};

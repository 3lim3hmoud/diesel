/* Applies the saved accent theme immediately on every page load,
   before first paint, to avoid a flash of the default green theme. */
const DieselTheme = {
  KEY: 'diesel_system_state_v1',
  ACCENTS: {
    green:   { c: '#39ff6a', dim: '#0f4d24', glow: 'rgba(57,255,106,' },
    cyan:    { c: '#39d6ff', dim: '#0f3d4d', glow: 'rgba(57,214,255,' },
    crimson: { c: '#ff3b57', dim: '#4d0f18', glow: 'rgba(255,59,87,' }
  },

  current(){
    try{
      const raw = localStorage.getItem(this.KEY);
      const s = raw ? JSON.parse(raw) : {};
      return this.ACCENTS[s.accent] ? s.accent : 'green';
    }catch(e){ return 'green'; }
  },

  apply(accent){
    const a = this.ACCENTS[accent] || this.ACCENTS.green;
    const root = document.documentElement.style;
    root.setProperty('--green', a.c);
    root.setProperty('--green-dim', a.dim);
  }
};

DieselTheme.apply(DieselTheme.current());

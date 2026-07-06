/* Tiny synthesized SFX using Web Audio API — no external audio files needed. */
const DieselSound = {
  ctx: null,

  ensure(){
    if(!this.ctx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if(AC) this.ctx = new AC();
    }
    return this.ctx;
  },

  enabled(){
    try{ return DieselState.get().soundOn; }catch(e){ return true; }
  },

  tone(freq, duration, type, gainVal){
    if(!this.enabled()) return;
    const ctx = this.ensure();
    if(!ctx) return;
    if(ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'square';
    osc.frequency.value = freq;
    gain.gain.value = gainVal || 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.start(now);
    osc.stop(now + duration);
  },

  type(){ this.tone(1800, 0.02, 'square', 0.02); },
  toggle(){ this.tone(500, 0.08, 'sine', 0.05); },
  send(){ this.tone(900, 0.09, 'triangle', 0.05); },
  receive(){ this.tone(650, 0.12, 'sine', 0.045); },
  success(){ this.tone(660, 0.09, 'triangle', 0.05); setTimeout(() => this.tone(990, 0.12, 'triangle', 0.05), 90); },
  alert(){ this.tone(1200, 0.06, 'square', 0.04); },
  levelUp(){ this.tone(523,0.1,'triangle',0.05); setTimeout(()=>this.tone(659,0.1,'triangle',0.05),100); setTimeout(()=>this.tone(784,0.16,'triangle',0.05),200); }
};

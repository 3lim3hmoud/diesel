(function(){
  const canvas = document.getElementById('matrixRain');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const glyphs = "01アイウエオカキクケコサシスセソABCDEFGHJKMNPQRSTXYZ#$%&*+-/=<>ﾊﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ";
  let cols, drops, fontSize = 15;

  function hexToRgba(hex, alpha){
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
    if(!m) return `rgba(57,255,106,${alpha})`; // fallback: default green
    const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // Reads the live --green CSS variable each frame so the rain re-colors
  // instantly if the accent theme changes (cyan/crimson/green) with no reload.
  function currentAccent(){
    return getComputedStyle(document.documentElement).getPropertyValue('--green').trim();
  }

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.random() * -100);
  }
  window.addEventListener('resize', resize);
  resize();

  function draw(){
    ctx.fillStyle = 'rgba(2,4,3,0.13)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px "Share Tech Mono", monospace';
    const accentGlyph = hexToRgba(currentAccent(), 0.75);

    for(let i = 0; i < cols; i++){
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = Math.random() > 0.985 ? '#d4ff3d' : accentGlyph;
      ctx.fillText(char, x, y);

      if(y > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 45);
})();

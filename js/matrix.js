(function(){
  const canvas = document.getElementById('matrixRain');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const glyphs = "01アイウエオカキクケコサシスセソABCDEFGHJKMNPQRSTXYZ#$%&*+-/=<>ﾊﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ";
  let cols, drops, fontSize = 15;

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

    for(let i = 0; i < cols; i++){
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = Math.random() > 0.985 ? '#d4ff3d' : 'rgba(57,255,106,0.75)';
      ctx.fillText(char, x, y);

      if(y > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 45);
})();

/* DIESEL // live terminal console — a real command bar you can type into.
   Self-contained: injects its own DOM + wiring. Drop <script src="js/console.js">
   on any page (after state.js/ui.js if present) and it just works.
   Also fires DieselState.runWorldTick() once per load, so the "world"
   keeps moving (heat decay, rival incursions, dispatch resolution) even
   on pages that never called it explicitly. */
(function(){

  function crewSummary(){
    if(typeof CREW === 'undefined') return 'crew roster not loaded on this page — open CREW.';
    const busy = (window.DieselState && typeof busyCrewIds === 'function') ? busyCrewIds() : new Set();
    return CREW.map(c => {
      const onOp = busy.has ? busy.has(c.id) : false;
      const st = onOp ? 'ON ASSIGNMENT' : (c.status === 'on' ? 'STANDBY' : c.status === 'mission' ? 'DEPLOYED' : 'DARK');
      return `  ${c.nm.padEnd(9)} ${c.rl.padEnd(16)} ${st}`;
    }).join('\n');
  }

  function statusBlock(){
    if(!window.DieselState) return 'core state module unavailable on this page.';
    const s = DieselState.load();
    const rank = DieselState.rankFor(s.xp);
    const heat = DieselState.heatTier(Math.round(s.heat));
    return [
      `OPERATOR ....... AL-MORADI_EL-DIESEL`,
      `RANK ........... ${rank.label} (TIER ${rank.tier})`,
      `XP ............. ${s.xp}`,
      `LOCKDOWN ....... ${s.lockdown ? 'ENGAGED' : 'OFF'}`,
      `HEAT ........... ${Math.round(s.heat)}/100 — ${heat.label}`,
      `BROADCASTS ..... ${s.broadcastCount}`,
      `MISSIONS DONE .. ${s.completedMissions.length}`,
      `FIREWALL BLOCKS  ${s.firewallBlocks}`
    ].join('\n');
  }

  function heatBlock(){
    if(!window.DieselState) return 'core state module unavailable on this page.';
    const s = DieselState.load();
    const t = DieselState.heatTier(Math.round(s.heat));
    const bar = 20, filled = Math.round((s.heat/100)*bar);
    const gauge = '['+ '#'.repeat(filled) + '-'.repeat(bar-filled) +']';
    let advice = 'Nominal. Operations carry no unusual risk.';
    if(t.cls === 'elev') advice = 'Some chatter about your activity. Nothing critical yet.';
    if(t.cls === 'hot')  advice = 'Rivals actively tracing recent operations. Consider LOCKDOWN.';
    if(t.cls === 'crit') advice = 'Exposure critical. Engage LOCKDOWN from COMMAND immediately.';
    return `EXPOSURE ${gauge} ${Math.round(s.heat)}% — ${t.label}\n${advice}`;
  }

  const COMMANDS = {
    help(){
      return [
        'AVAILABLE COMMANDS:',
        '  help                 show this list',
        '  status               operator + system summary',
        '  heat                 current exposure gauge',
        '  crew                 roster + assignment state',
        '  whoami               identity check',
        '  clear                clear this console',
        '  date                 local system time',
        '  exit                 close console'
      ].join('\n');
    },
    status(){ return statusBlock(); },
    heat(){ return heatBlock(); },
    crew(){ return 'CREW ROSTER:\n' + crewSummary(); },
    whoami(){ return 'AL-MORADI_EL-DIESEL — clearance: COMMANDER — session: authenticated'; },
    date(){ return new Date().toString(); },
    clear(){ return '__CLEAR__'; },
    exit(){ return '__EXIT__'; },
    sudo(arg){ return arg ? `permission denied: ${arg} requires physical access to command node` : 'usage: sudo <command>'; },
    ls(){ return 'command.html  crew.html  missions.html  map.html  archive.html  wallet.html'; }
  };

  function run(raw){
    const trimmed = raw.trim();
    if(!trimmed) return '';
    const [cmd, ...rest] = trimmed.split(/\s+/);
    const key = cmd.toLowerCase();
    if(COMMANDS[key]) return COMMANDS[key](rest.join(' '));
    return `command not recognized: "${cmd}" — type "help" for available commands`;
  }

  function inject(){
    if(document.getElementById('dcToggle')) return; // already injected

    const style = document.createElement('style');
    style.textContent = `
      #dcToggle{
        position:fixed; right:18px; bottom:18px; z-index:300;
        font-family:'Share Tech Mono', monospace; font-size:11px; letter-spacing:1.5px;
        color:var(--green); background:rgba(6,10,7,0.92); border:1px solid var(--green-dim);
        padding:10px 14px; border-radius:8px; cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,0.5);
        transition:transform .12s ease, background .12s ease;
      }
      #dcToggle:hover{ background:rgba(57,255,106,0.1); transform:translateY(-1px); }
      #dcPanel{
        position:fixed; right:18px; bottom:64px; z-index:300; width:min(92vw, 420px);
        background:rgba(4,7,5,0.97); border:1px solid var(--green-dim); border-radius:10px;
        box-shadow:0 20px 60px rgba(0,0,0,0.6); overflow:hidden;
        opacity:0; transform:translateY(10px) scale(0.98); pointer-events:none;
        transition:opacity .16s ease, transform .16s ease;
      }
      #dcPanel.open{ opacity:1; transform:translateY(0) scale(1); pointer-events:auto; }
      #dcHead{
        display:flex; align-items:center; gap:8px; padding:8px 12px;
        background:#0a0b0d; border-bottom:1px solid var(--line);
        font-family:'Share Tech Mono', monospace; font-size:10.5px; color:var(--muted);
      }
      #dcOut{
        height:220px; overflow-y:auto; padding:12px; font-family:'Share Tech Mono', monospace;
        font-size:11.5px; line-height:1.6; color:#c3c9c3; white-space:pre-wrap;
      }
      #dcOut .cmdline{ color:var(--green); }
      #dcOut .sys{ color:var(--muted); }
      #dcInputRow{ display:flex; align-items:center; gap:6px; border-top:1px solid var(--line); padding:8px 12px; }
      #dcInputRow .prompt{ font-family:'Share Tech Mono', monospace; font-size:11.5px; color:var(--green); }
      #dcInput{
        flex:1; background:transparent; border:none; outline:none; color:var(--text);
        font-family:'Share Tech Mono', monospace; font-size:11.5px; letter-spacing:0.3px;
      }
      @media (max-width:480px){ #dcPanel{ right:10px; left:10px; width:auto; } #dcToggle{ right:10px; } }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement('div');
    toggle.id = 'dcToggle';
    toggle.textContent = '⌘ CONSOLE';
    document.body.appendChild(toggle);

    const panel = document.createElement('div');
    panel.id = 'dcPanel';
    panel.innerHTML = `
      <div id="dcHead">
        <span class="dot" style="width:8px;height:8px;border-radius:50%;background:#ff5f57;"></span>
        <span class="dot" style="width:8px;height:8px;border-radius:50%;background:#febc2e;"></span>
        <span class="dot" style="width:8px;height:8px;border-radius:50%;background:#28c840;"></span>
        <span style="margin-left:6px;">diesel@command-node:~</span>
      </div>
      <div id="dcOut"></div>
      <div id="dcInputRow">
        <span class="prompt">$</span>
        <input id="dcInput" type="text" autocomplete="off" spellcheck="false" placeholder="type 'help'" />
      </div>
    `;
    document.body.appendChild(panel);

    const out = panel.querySelector('#dcOut');
    const input = panel.querySelector('#dcInput');
    const history = [];
    let hIdx = -1;

    function print(text, cls){
      const line = document.createElement('div');
      if(cls) line.className = cls;
      line.textContent = text;
      out.appendChild(line);
      out.scrollTop = out.scrollHeight;
    }

    print('DIESEL command console — type "help" to begin.', 'sys');

    function openPanel(){
      panel.classList.add('open');
      setTimeout(() => input.focus(), 80);
    }
    function closePanel(){ panel.classList.remove('open'); }

    toggle.addEventListener('click', () => {
      panel.classList.contains('open') ? closePanel() : openPanel();
    });

    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        const val = input.value;
        if(val.trim()){ history.push(val); hIdx = history.length; }
        print('$ ' + val, 'cmdline');
        if(window.DieselSound && DieselSound.type) DieselSound.type();
        const result = run(val);
        input.value = '';
        if(result === '__CLEAR__'){ out.innerHTML = ''; return; }
        if(result === '__EXIT__'){ closePanel(); return; }
        if(result) print(result);
      } else if(e.key === 'ArrowUp'){
        if(hIdx > 0){ hIdx--; input.value = history[hIdx]; }
        e.preventDefault();
      } else if(e.key === 'ArrowDown'){
        if(hIdx < history.length - 1){ hIdx++; input.value = history[hIdx]; }
        else { hIdx = history.length; input.value = ''; }
        e.preventDefault();
      } else if(e.key === 'Escape'){
        closePanel();
      }
    });
  }

  function init(){
    inject();
    // keep the world moving even on pages that never call runWorldTick() themselves
    if(window.DieselState && typeof DieselState.runWorldTick === 'function'){
      const bank = (typeof REPLY_BANK !== 'undefined') ? REPLY_BANK : null;
      const tick = DieselState.runWorldTick(bank);
      // pages that already rendered stats before this tick ran need a repaint
      if(tick && tick.awayMinutes > 0){
        if(typeof window.refreshUI === 'function') window.refreshUI();
        if(typeof window.renderTerritories === 'function') window.renderTerritories();
        if(typeof window.renderDispatchLog === 'function') window.renderDispatchLog();
      }
      if(tick && tick.incursion && window.DieselUI){
        DieselUI.toast(`While you were away: rival push into ${tick.incursion.name}`, { kind:'warn' });
      }
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

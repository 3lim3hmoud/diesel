/* Shared crew roster data — used by crew.html (roster + profiles) and map.html
   (garrison assignments + operative-led ground/global operations). Keeping this
   in one file means both pages always agree on who's who. */

const AVATAR_COLORS = ['#39ff6a','#d4ff3d','#3dd4ff','#ff8f3d','#b03dff','#ff5c8a'];

function avatarColor(id){
  let h = 0;
  for(let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initialsOf(name){
  return name.slice(0, 2).toUpperCase();
}

function avatarSVG(c){
  const color = avatarColor(c.id);
  const gid = 'g-' + c.id;
  return `
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="${c.nm} avatar">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${color}" stop-opacity="0.4"/>
          <stop offset="1" stop-color="${color}" stop-opacity="0.06"/>
        </linearGradient>
      </defs>
      <polygon points="50,4 92,26 92,74 50,96 8,74 8,26" fill="url(#${gid})" stroke="${color}" stroke-width="3"/>
      <text x="50" y="60" text-anchor="middle" font-family="'Rajdhani', sans-serif" font-weight="800" font-size="32" fill="${color}">${initialsOf(c.nm)}</text>
    </svg>
  `;
}

const CREW = [
  { id:"ghost", icon:"&#128123;", nm:"GHOST", rl:"INFILTRATION", lvl:9, status:"on",
    desc:"Gets into rooms nobody remembers opening a door for. Never speaks on comms, only in logs.",
    successRate:96, log:[{t:"VAULT RUN",r:"SUCCESS"},{t:"QUIET EXIT",r:"SUCCESS"},{t:"SAFE HOUSE",r:"SUCCESS"},{t:"DEAD DROP",r:"FAILED"}],
    relationship:"Been with DIESEL since before the crew had a name. Doesn't trust easily — trusts DIESEL completely." },
  { id:"viper", icon:"&#128010;", nm:"VIPER", rl:"NETWORK BREACH", lvl:8, status:"on",
    desc:"Finds the one open door in a hundred locked ones. Cold, exact, never rushes a job.",
    successRate:91, log:[{t:"SIGNAL BREAK",r:"SUCCESS"},{t:"DOUBLE AGENT",r:"SUCCESS"},{t:"REVERSE TRACE",r:"SUCCESS"}],
    relationship:"Recruited personally by DIESEL after a breach nobody else could pull off." },
  { id:"echo", icon:"&#128225;", nm:"ECHO", rl:"SIGNALS", lvl:7, status:"mission",
    desc:"Hears every frequency before it's sent. Runs the crew's early-warning line.",
    successRate:88, log:[{t:"PHANTOM RELAY",r:"SUCCESS"},{t:"STATIC LINE",r:"SUCCESS"},{t:"BLACKOUT",r:"FAILED"}],
    relationship:"Reports straight to DIESEL, no middle layer. The one line that never gets cut." },
  { id:"cipher", icon:"&#128373;", nm:"CIPHER", rl:"CRYPTOGRAPHY", lvl:9, status:"on",
    desc:"Speaks in codes even the crew needs a minute to read. Guards the vault keys.",
    successRate:99, log:[{t:"IRON VAULT",r:"SUCCESS"},{t:"VAULT RUN",r:"SUCCESS"},{t:"DARK HARVEST",r:"SUCCESS"}],
    relationship:"The only one who has DIESEL's full trust with the crew's financials." },
  { id:"wraith", icon:"&#129497;", nm:"WRAITH", rl:"COUNTER-TRACE", lvl:6, status:"off",
    desc:"Job is simple: make sure nobody ever finds the way back to command.",
    successRate:83, log:[{t:"REVERSE TRACE",r:"SUCCESS"},{t:"GHOST WRITER",r:"SUCCESS"},{t:"OPEN DOOR",r:"FAILED"}],
    relationship:"Keeps distance from everyone, DIESEL included. Effective precisely because of it." },
  { id:"relay", icon:"&#129418;", nm:"RELAY", rl:"LOGISTICS", lvl:6, status:"on",
    desc:"Moves files, drops, and people between safehouses without a single delay.",
    successRate:94, log:[{t:"DEAD DROP",r:"SUCCESS"},{t:"SAFE HOUSE",r:"SUCCESS"},{t:"NIGHT MARKET",r:"SUCCESS"}],
    relationship:"Been on every extraction DIESEL has ever called. Never missed a pickup window." },
  { id:"nova", icon:"&#128171;", nm:"NOVA", rl:"RECRUITMENT", lvl:5, status:"mission",
    desc:"Finds the next name worth trusting before anyone else even notices them.",
    successRate:79, log:[{t:"RECRUIT",r:"SUCCESS"},{t:"RECRUIT",r:"SUCCESS"},{t:"RECRUIT",r:"FAILED"}],
    relationship:"Brought in three of the twelve units currently on the roster, all still active." },
  { id:"talon", icon:"&#128273;", nm:"TALON", rl:"ENFORCEMENT", lvl:8, status:"on",
    desc:"Handles the conversations nobody else on the crew wants to have.",
    successRate:97, log:[{t:"FALSE FLAG",r:"SUCCESS"},{t:"CLEAN SWEEP",r:"SUCCESS"},{t:"BLACKOUT",r:"SUCCESS"}],
    relationship:"DIESEL's answer whenever a problem needs to be closed quietly and permanently." },
  { id:"mirage", icon:"&#127752;", nm:"MIRAGE", rl:"DECEPTION OPS", lvl:7, status:"mission",
    desc:"Builds a story so convincing even the crew forgets it isn't true.",
    successRate:90, log:[{t:"FALSE FLAG",r:"SUCCESS"},{t:"LONG CON",r:"SUCCESS"},{t:"SILENT AUCTION",r:"SUCCESS"}],
    relationship:"Runs every long con DIESEL greenlights personally — nothing goes out without sign-off." },
  { id:"frost", icon:"&#10052;&#65039;", nm:"FROST", rl:"SURVEILLANCE", lvl:6, status:"on",
    desc:"Watches longer and says less than anyone else on the roster.",
    successRate:92, log:[{t:"REVERSE TRACE",r:"SUCCESS"},{t:"NIGHT MARKET",r:"SUCCESS"},{t:"STATIC LINE",r:"SUCCESS"}],
    relationship:"Flags anything unusual straight to DIESEL before it reaches the rest of the board." },
  { id:"blaze", icon:"&#128293;", nm:"BLAZE", rl:"EXTRACTION", lvl:7, status:"off",
    desc:"Gets people and files out of tight spots before the window shuts.",
    successRate:85, log:[{t:"QUIET EXIT",r:"SUCCESS"},{t:"DEAD DROP",r:"SUCCESS"},{t:"PHANTOM RELAY",r:"FAILED"}],
    relationship:"Pulled DIESEL out of a burned block personally, once. Neither of them talks about it." },
  { id:"pulse", icon:"&#9889;", nm:"PULSE", rl:"RAPID RESPONSE", lvl:6, status:"on",
    desc:"First one on comms the second something on the board goes wrong.",
    successRate:89, log:[{t:"SIGNAL BREAK",r:"SUCCESS"},{t:"BLACKOUT",r:"SUCCESS"},{t:"GHOST WRITER",r:"SUCCESS"}],
    relationship:"DIESEL's first call in any emergency. Never once been unreachable." },
  { id:"vortex", icon:"&#127786;&#65039;", nm:"VORTEX", rl:"MARKET STRATEGY", lvl:8, status:"on",
    desc:"Reads the market three moves ahead of everyone else on the board.",
    successRate:93, log:[{t:"SILENT AUCTION",r:"SUCCESS"},{t:"DARK HARVEST",r:"SUCCESS"},{t:"LONG CON",r:"SUCCESS"},{t:"HOSTILE BUYOUT",r:"SUCCESS"},{t:"NIGHT MARKET",r:"SUCCESS"}],
    relationship:"Built the deal that doubled the crew's holdings — DIESEL still calls it the turning point. Reports market moves straight to command before the numbers ever hit a public feed." },
  { id:"sable", icon:"&#128007;", nm:"SABLE", rl:"EXPANSION OPS", lvl:7, status:"mission",
    desc:"Scouts new territory before the crew ever sets foot in it.",
    successRate:87, log:[{t:"NIGHT MARKET",r:"SUCCESS"},{t:"RECRUIT",r:"SUCCESS"},{t:"OPEN DOOR",r:"SUCCESS"},{t:"NEW TERRITORY",r:"SUCCESS"}],
    relationship:"Opened three new command nodes this year alone, all still standing. Never moves the crew onto ground SABLE hasn't cleared personally first." },
  { id:"anchor", icon:"&#9875;&#65039;", nm:"ANCHOR", rl:"OPERATIONS", lvl:8, status:"on",
    desc:"Keeps every moving piece on schedule so nothing slips through the cracks.",
    successRate:95, log:[{t:"IRON VAULT",r:"SUCCESS"},{t:"SAFE HOUSE",r:"SUCCESS"},{t:"DEAD DROP",r:"SUCCESS"},{t:"EMPIRE AUDIT",r:"SUCCESS"}],
    relationship:"Runs the day-to-day so DIESEL only has to sign off on the big calls. Every one of the fifteen units checks in through ANCHOR before it ever reaches command." }
];

const STATUS_LABEL = { on:"online", mission:"on mission", off:"offline" };

/* which node on the operations map each operative is garrisoned at — the ones
   left out (viper, echo, nova, talon, mirage, pulse) are mobile / unassigned,
   free to lead any ground operation or global-operation phase from the map. */
const NODE_GARRISON = {
  "COMMAND-01": "anchor",
  "GRID-77": "ghost",
  "RELAY-9": "relay",
  "SAFEHOUSE-4": "blaze",
  "BLACKVAULT-13": "frost",
  "VAULT-13": "cipher",
  "CAIRO-OUTPOST": "sable",
  "SYDNEY-WATCH": "vortex",
  "LAGOS-LINE": "wraith"
};

function crewById(id){ return CREW.find(c => c.id === id) || null; }

function garrisonFor(nodeId){ return crewById(NODE_GARRISON[nodeId]); }

function stationOf(crewId){
  const entry = Object.entries(NODE_GARRISON).find(([, cid]) => cid === crewId);
  return entry ? entry[0] : null;
}

/* Shared mission data + status logic — single source of truth for both
   missions.html and command.html, so counts never drift out of sync. */
const MISSIONS = [
  { id:"ghost_protocol", title:"GHOST PROTOCOL", brief:"Vanish without a trace across three relay nodes before the window closes.", reward:"$1,200", diff:"HIGH", base:"active" },
  { id:"signal_break", title:"SIGNAL BREAK", brief:"Intercept a rival broadcast and swap it for our own before anyone notices.", reward:"$850", diff:"MED", base:"active" },
  { id:"vault_run", title:"VAULT RUN", brief:"Recover an encrypted drive from a burned safehouse. Commander clearance only.", reward:"$3,000", diff:"EXTREME", base:"locked" },
  { id:"clean_sweep", title:"CLEAN SWEEP", brief:"Wipe the logs of node GRID-77 before sunrise.", reward:"$600", diff:"MED", base:"completed" },
  { id:"dead_drop", title:"DEAD DROP", brief:"Move a package through three anonymous hands without a single hand knowing the rest.", reward:"$400", diff:"LOW", base:"active" },
  { id:"reverse_trace", title:"REVERSE TRACE", brief:"Find out who's been trying to trace command — and how close they got.", reward:"$950", diff:"HIGH", base:"active" },
  { id:"silent_auction", title:"SILENT AUCTION", brief:"Win a bid on the black market without revealing who's bidding.", reward:"$1,100", diff:"HIGH", base:"active" },
  { id:"blackout", title:"BLACKOUT", brief:"Take a rival's forum offline for six hours, clean and quiet.", reward:"$750", diff:"MED", base:"completed" },
  { id:"ghost_writer", title:"GHOST WRITER", brief:"Plant a false trail three layers deep for anyone chasing this node.", reward:"$500", diff:"MED", base:"active" },
  { id:"recruit", title:"RECRUIT", brief:"Bring a new operative into the crew. Vetted, quiet, loyal.", reward:"$300", diff:"LOW", base:"active" },
  { id:"double_agent", title:"DOUBLE AGENT", brief:"Confirm a leak inside a rival crew. Commander clearance only.", reward:"$2,500", diff:"EXTREME", base:"locked" },
  { id:"long_con", title:"LONG CON", brief:"Hold a false identity for thirty days straight without a single slip.", reward:"$1,000", diff:"HIGH", base:"active" },
  { id:"safe_house", title:"SAFE HOUSE", brief:"Secure a new base before the old one is found.", reward:"$450", diff:"MED", base:"completed" },
  { id:"final_signal", title:"FINAL SIGNAL", brief:"The mission nobody talks about until it's already done.", reward:"???", diff:"???", base:"locked" },
  { id:"phantom_relay", title:"PHANTOM RELAY", brief:"Route a signal through five dead nodes without a single drop.", reward:"$700", diff:"MED", base:"active" },
  { id:"iron_vault", title:"IRON VAULT", brief:"Crack a rumor loose from a vault nobody's opened in years.", reward:"$1,800", diff:"HIGH", base:"active" },
  { id:"quiet_exit", title:"QUIET EXIT", brief:"Get a crew member out of a burned city block clean.", reward:"$550", diff:"MED", base:"active" },
  { id:"false_flag", title:"FALSE FLAG", brief:"Make a rival crew take the blame for something they didn't do.", reward:"$900", diff:"HIGH", base:"active" },
  { id:"night_market", title:"NIGHT MARKET", brief:"Move product through the night market without a name attached.", reward:"$1,300", diff:"HIGH", base:"active" },
  { id:"static_line", title:"STATIC LINE", brief:"Keep a dead line looking alive for one more week.", reward:"$350", diff:"LOW", base:"active" },
  { id:"second_skin", title:"SECOND SKIN", brief:"Hold a borrowed identity through a full audit without a crack showing.", reward:"$1,600", diff:"HIGH", base:"active" },
  { id:"dark_harvest", title:"DARK HARVEST", brief:"A long-run operation years in the making. Commander clearance only.", reward:"$2,000", diff:"EXTREME", base:"locked" },
  { id:"open_door", title:"OPEN DOOR", brief:"Leave one door unlocked for a friend, lock everything else behind it.", reward:"$250", diff:"LOW", base:"completed" },
  { id:"last_word", title:"LAST WORD", brief:"The mission that ends every other mission on this board.", reward:"???", diff:"???", base:"locked" },
];

function missionStatusOf(m){
  if(DieselState.isCompleted(m.id)) return 'completed';
  if(m.base === 'completed') return 'completed';
  if(m.base === 'locked') return 'locked';
  if(DieselState.isClaimed(m.id)) return 'claimed';
  return 'active';
}

function missionCounts(){
  const counts = { active:0, claimed:0, completed:0, locked:0 };
  MISSIONS.forEach(m => { counts[missionStatusOf(m)]++; });
  return counts;
}

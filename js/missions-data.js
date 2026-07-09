/* Shared mission data + status logic — single source of truth for both
   missions.html and command.html, so counts never drift out of sync. */
const MISSIONS = [
  { id:"ghost_protocol", title:"GHOST PROTOCOL", brief:"Vanish without a trace across three relay nodes before the window closes.", reward:"$1,200", diff:"HIGH", base:"active", country:"Germany", rep:6 },
  { id:"signal_break", title:"SIGNAL BREAK", brief:"Intercept a rival broadcast and swap it for our own before anyone notices.", reward:"$850", diff:"MED", base:"active", country:"Japan", rep:4 },
  { id:"vault_run", title:"VAULT RUN", brief:"Recover an encrypted drive from a burned safehouse. Commander clearance only.", reward:"$3,000", diff:"EXTREME", base:"locked", country:"Switzerland", rep:12 },
  { id:"clean_sweep", title:"CLEAN SWEEP", brief:"Wipe the logs of node GRID-77 before sunrise.", reward:"$600", diff:"MED", base:"completed", country:"Poland", rep:3 },
  { id:"dead_drop", title:"DEAD DROP", brief:"Move a package through three anonymous hands without a single hand knowing the rest.", reward:"$400", diff:"LOW", base:"active", country:"Portugal", rep:2 },
  { id:"reverse_trace", title:"REVERSE TRACE", brief:"Find out who's been trying to trace command — and how close they got.", reward:"$950", diff:"HIGH", base:"active", country:"South Korea", rep:5 },
  { id:"silent_auction", title:"SILENT AUCTION", brief:"Win a bid on the black market without revealing who's bidding.", reward:"$1,100", diff:"HIGH", base:"active", country:"United Arab Emirates", rep:5 },
  { id:"blackout", title:"BLACKOUT", brief:"Take a rival's forum offline for six hours, clean and quiet.", reward:"$750", diff:"MED", base:"completed", country:"Netherlands", rep:4 },
  { id:"ghost_writer", title:"GHOST WRITER", brief:"Plant a false trail three layers deep for anyone chasing this node.", reward:"$500", diff:"MED", base:"active", country:"Turkey", rep:3 },
  { id:"recruit", title:"RECRUIT", brief:"Bring a new operative into the crew. Vetted, quiet, loyal.", reward:"$300", diff:"LOW", base:"active", country:"Ghana", rep:2 },
  { id:"double_agent", title:"DOUBLE AGENT", brief:"Confirm a leak inside a rival crew. Commander clearance only.", reward:"$2,500", diff:"EXTREME", base:"locked", country:"Iran", rep:10 },
  { id:"long_con", title:"LONG CON", brief:"Hold a false identity for thirty days straight without a single slip.", reward:"$1,000", diff:"HIGH", base:"active", country:"Argentina", rep:5 },
  { id:"safe_house", title:"SAFE HOUSE", brief:"Secure a new base before the old one is found.", reward:"$450", diff:"MED", base:"completed", country:"Norway", rep:3 },
  { id:"final_signal", title:"FINAL SIGNAL", brief:"The mission nobody talks about until it's already done.", reward:"???", diff:"???", base:"locked", country:null, rep:20 },
  { id:"phantom_relay", title:"PHANTOM RELAY", brief:"Route a signal through five dead nodes without a single drop.", reward:"$700", diff:"MED", base:"active", country:"Vietnam", rep:4 },
  { id:"iron_vault", title:"IRON VAULT", brief:"Crack a rumor loose from a vault nobody's opened in years.", reward:"$1,800", diff:"HIGH", base:"active", country:"Algeria", rep:7 },
  { id:"quiet_exit", title:"QUIET EXIT", brief:"Get a crew member out of a burned city block clean.", reward:"$550", diff:"MED", base:"active", country:"Philippines", rep:3 },
  { id:"false_flag", title:"FALSE FLAG", brief:"Make a rival crew take the blame for something they didn't do.", reward:"$900", diff:"HIGH", base:"active", country:"Colombia", rep:5 },
  { id:"night_market", title:"NIGHT MARKET", brief:"Move product through the night market without a name attached.", reward:"$1,300", diff:"HIGH", base:"active", country:"Thailand", rep:6 },
  { id:"static_line", title:"STATIC LINE", brief:"Keep a dead line looking alive for one more week.", reward:"$350", diff:"LOW", base:"active", country:"Ireland", rep:2 },
  { id:"second_skin", title:"SECOND SKIN", brief:"Hold a borrowed identity through a full audit without a crack showing.", reward:"$1,600", diff:"HIGH", base:"active", country:"Austria", rep:7 },
  { id:"dark_harvest", title:"DARK HARVEST", brief:"A long-run operation years in the making. Commander clearance only.", reward:"$2,000", diff:"EXTREME", base:"locked", country:"Sudan", rep:11 },
  { id:"open_door", title:"OPEN DOOR", brief:"Leave one door unlocked for a friend, lock everything else behind it.", reward:"$250", diff:"LOW", base:"completed", country:"Denmark", rep:2 },
  { id:"last_word", title:"LAST WORD", brief:"The mission that ends every other mission on this board.", reward:"???", diff:"???", base:"locked", country:null, rep:25 },
  { id:"hostile_buyout", title:"HOSTILE BUYOUT", brief:"Take over a rival network's entire operation in a single weekend.", reward:"$4,200", diff:"EXTREME", base:"active", country:"United States", rep:15 },
  { id:"satellite_reach", title:"SATELLITE REACH", brief:"Extend command's signal to three new continents without a single outage.", reward:"$2,700", diff:"HIGH", base:"active", country:"Kazakhstan", rep:9 },
  { id:"empire_audit", title:"EMPIRE AUDIT", brief:"Run a full audit across all fifteen units with zero discrepancies.", reward:"$1,900", diff:"HIGH", base:"active", country:"Belgium", rep:7 },
  { id:"new_territory", title:"NEW TERRITORY", brief:"Establish a fourth command node in unclaimed ground before a rival crew does.", reward:"$3,500", diff:"EXTREME", base:"locked", country:"Ecuador", rep:12 },
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

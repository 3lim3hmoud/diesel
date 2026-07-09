/* DIESEL FACTION DOSSIERS
   Extends the threat/region/status facts already tracked in map.html (FACTIONS, NODE_DATA)
   with the deeper profile content used on faction.html: history, past operations, weaknesses.

   KEEP IN SYNC: id, region and threat here mirror the FACTIONS object in map.html.
   If you rebalance a faction's threat score there, update it here too.
*/
const FACTIONS_DATA = [
  {
    id: 'THE-SYNDICATE', name: 'THE SYNDICATE', region: 'AS', threat: 74, status: 'UNCONFIRMED',
    tagline: 'Deep Hong Kong footprint, disciplined and patient — the biggest known threat to COMMAND-01.',
    history: 'The oldest confirmed rival network on the board. Analysts believe THE SYNDICATE has been operating out of Hong Kong for well over a decade, long before DIESEL existed — which explains the discipline. They never move fast, and they rarely make the same mistake twice.',
    relations: [
      { id: 'GHOST-MARKET', type: 'CLIENT', note: 'Buys resold access through GHOST MARKET rather than dealing directly.' },
      { id: 'NULL-COLLECTIVE', type: 'RIVAL', note: 'Territorial friction reported near two shared corridor nodes.' }
    ],
    pastOps: [
      { t: 'Quiet buyout of a GRID-77 supplier', r: 'SUCCESS' },
      { t: 'Attempted infiltration of RELAY-9 comms', r: 'FAILED' },
      { t: 'Long-term surveillance of COMMAND-01 leadership', r: 'ONGOING' }
    ],
    weaknesses: [
      'Slow to react — plans are rigid once set in motion',
      'Leadership is centralized; disrupting the Hong Kong node hurts the whole network',
      'Reluctant to engage anyone they haven\'t profiled first'
    ]
  },
  {
    id: 'NULL-COLLECTIVE', name: 'NULL COLLECTIVE', region: 'NA', threat: 88, status: 'HOSTILE',
    tagline: 'Zero confirmed history or leadership. The less we know, the higher this sits.',
    history: 'No name, no manifesto, no known founder — NULL COLLECTIVE surfaced without warning and immediately posted the highest threat score on the board. Every lead traced back to a dead end three encrypted hops deep. TALON\'s working theory is that "NULL COLLECTIVE" isn\'t one organization at all, but several cells sharing a signature.',
    relations: [
      { id: 'THE-SYNDICATE', type: 'RIVAL', note: 'Territorial friction reported near two shared corridor nodes.' },
      { id: 'VOID-BROKER', type: 'UNCONFIRMED', note: 'Fragmented chatter suggests occasional contact, never verified.' }
    ],
    pastOps: [
      { t: 'Signal intrusion on a DIESEL relay', r: 'SUCCESS' },
      { t: 'Attempted contact with THE SYNDICATE', r: 'UNCONFIRMED' },
      { t: 'Rapid territorial push in North America', r: 'ONGOING' }
    ],
    weaknesses: [
      'No confirmed command structure to target — but also no confirmed loyalty between cells',
      'Aggressive expansion is stretching resources thin, according to chatter',
      'Their anonymity cuts both ways: no track record means no way to predict them, but also no allies to fall back on'
    ]
  },
  {
    id: 'OBSIDIAN-CIRCLE', name: 'OBSIDIAN CIRCLE', region: 'AF', threat: 61, status: 'WATCHING',
    tagline: 'Has had eyes on COMMAND-01 for weeks. Cross-reference with BLACKVAULT-13.',
    relations: [
      { id: 'IRON-CHOIR', type: 'ALLY', note: 'Loose intel-sharing arrangement across African corridor nodes.' }
    ],
    history: 'OBSIDIAN CIRCLE doesn\'t strike — it studies. FROST first flagged their surveillance pattern near BLACKVAULT-13 three weeks ago, and the watching hasn\'t stopped since. Whatever they\'re planning, they\'re building a complete picture of DIESEL\'s operational tempo before they move.',
    pastOps: [
      { t: 'Extended surveillance of BLACKVAULT-13', r: 'ONGOING' },
      { t: 'Recruitment sweep through Southern Africa', r: 'SUCCESS' },
      { t: 'Failed approach on a DIESEL contact', r: 'FAILED' }
    ],
    weaknesses: [
      'Patience means they\'re rarely in a position to react fast to a sudden move',
      'Heavy reliance on one surveillance post — cutting it blinds them locally',
      'Recruits fast but vets slowly, leaving an opening for infiltration'
    ]
  },
  {
    id: 'CRIMSON-LEDGER', name: 'CRIMSON LEDGER', region: 'SA', threat: 57, status: 'HOSTILE',
    tagline: 'Runs shell finance for three cells through the SAFEHOUSE-4 corridor.',
    relations: [
      { id: 'GHOST-MARKET', type: 'CLIENT', note: 'Launders proceeds from GHOST MARKET resale deals.' },
      { id: 'RED-LANTERN', type: 'ALLY', note: 'Financial backer for at least one Southeast Asia expansion push.' }
    ],
    history: 'Not a combat organization — a financial one. CRIMSON LEDGER launders funds for at least three other rival cells through shell accounts routed near the SAFEHOUSE-4 corridor. TALON has flagged the pattern but hasn\'t found the source account yet.',
    pastOps: [
      { t: 'Shell account audit evasion', r: 'SUCCESS' },
      { t: 'Attempted laundering through SAFEHOUSE-4 corridor', r: 'ONGOING' },
      { t: 'Cross-cell fund transfer, three hops', r: 'SUCCESS' }
    ],
    weaknesses: [
      'Their entire value is the money trail — trace it and every client cell is exposed',
      'No combat capacity of their own; they need protection from stronger allies',
      'A single frozen shell account can cascade through the whole laundering chain'
    ]
  },
  {
    id: 'GHOST-MARKET', name: 'GHOST MARKET', region: 'AS', threat: 45, status: 'UNCONFIRMED',
    tagline: 'Brokers access to seized nodes on the open market. Opportunistic, not organized.',
    relations: [
      { id: 'THE-SYNDICATE', type: 'SUPPLIER', note: 'Occasionally resells access THE SYNDICATE has already burned.' },
      { id: 'CRIMSON-LEDGER', type: 'CLIENT', note: 'Routes proceeds through CRIMSON LEDGER for laundering.' }
    ],
    history: 'Less a faction than a marketplace. GHOST MARKET resells access to nodes other organizations have already burned — including, at one point, a listing for GRID-77 access that DIESEL had already cleaned. Opportunistic, disorganized, and mostly harmless on its own.',
    pastOps: [
      { t: 'Listed (fraudulent) GRID-77 access for sale', r: 'FAILED' },
      { t: 'Sold compromised credentials to a third party', r: 'SUCCESS' },
      { t: 'Attempted resale of a rival cell\'s intel', r: 'UNCONFIRMED' }
    ],
    weaknesses: [
      'No loyalty or ideology — they\'ll sell information on anyone, including their own buyers',
      'Reputation is everything to a marketplace; a public sting could collapse it overnight',
      'Low organizational threat on its own — the danger is entirely in who\'s buying'
    ]
  },
  {
    id: 'IRON-CHOIR', name: 'IRON CHOIR', region: 'AF', threat: 52, status: 'WATCHING',
    tagline: 'Recruiting aggressively out of LAGOS LINE\'s backyard.',
    relations: [
      { id: 'OBSIDIAN-CIRCLE', type: 'ALLY', note: 'Loose intel-sharing arrangement across African corridor nodes.' }
    ],
    history: 'IRON CHOIR has been running a recruitment drive two blocks from LAGOS LINE, which ANCHOR flagged the moment the pattern became obvious. The concern isn\'t their current numbers — it\'s the trajectory. A dormant relay only stays dormant if nobody\'s watching it.',
    pastOps: [
      { t: 'Recruitment drive near LAGOS LINE', r: 'ONGOING' },
      { t: 'Small-scale territorial probe, West Africa', r: 'SUCCESS' },
      { t: 'Attempted contact with a DIESEL operative', r: 'FAILED' }
    ],
    weaknesses: [
      'Rapid recruitment means inconsistent vetting — an easy infiltration target',
      'Concentrated in one region; a coordinated push could isolate them fast',
      'Numbers are growing but experience isn\'t — mostly untested recruits'
    ]
  },
  {
    id: 'VOID-BROKER', name: 'VOID BROKER', region: 'AS', threat: 80, status: 'UNCONFIRMED',
    tagline: 'No fixed base, relocates constantly. Treat every contact as a trap.',
    relations: [
      { id: 'NULL-COLLECTIVE', type: 'UNCONFIRMED', note: 'Fragmented chatter suggests occasional contact, never verified.' }
    ],
    history: 'No known headquarters — VOID BROKER has relocated its entire operation across the Central Asian steppe corridor every few weeks for as long as anyone\'s been tracking them. WRAITH\'s standing order is to treat any contact from this faction as a trap until proven otherwise.',
    pastOps: [
      { t: 'Relocated operation base, third time this quarter', r: 'SUCCESS' },
      { t: 'Set up a contact trap for a rival operative', r: 'SUCCESS' },
      { t: 'Steppe corridor route exposed briefly', r: 'FAILED' }
    ],
    weaknesses: [
      'Constant relocation means their local footprint is always shallow',
      'Trust nobody — including each other, based on intercepted fragments',
      'The corridor they depend on has limited alternate routes if it\'s ever cut off'
    ]
  },
  {
    id: 'RED-LANTERN', name: 'RED LANTERN', region: 'AS', threat: 69, status: 'HOSTILE',
    tagline: 'Fast, aggressive expansion — already probing MUMBAI STATION.',
    relations: [
      { id: 'CRIMSON-LEDGER', type: 'ALLY', note: 'Financial backer for at least one Southeast Asia expansion push.' }
    ],
    history: 'RED LANTERN expanded out of the Southeast Asia corridor faster than any rival on record, and they\'re not slowing down. MUMBAI STATION has already logged probing activity on its perimeter. VORTEX has recommended reinforcing SYDNEY WATCH\'s southern approach as a precaution.',
    pastOps: [
      { t: 'Rapid territorial expansion, Southeast Asia', r: 'SUCCESS' },
      { t: 'Perimeter probe on MUMBAI STATION', r: 'ONGOING' },
      { t: 'Overextended supply line, forced retreat', r: 'FAILED' }
    ],
    weaknesses: [
      'Growth this fast usually outpaces logistics — a supply line disruption would hurt badly',
      'Aggressive posture makes their next move predictable',
      'Spread thin across a wide front, with no single node fully hardened yet'
    ]
  },
  {
    id: 'GLASS-CURTAIN', name: 'GLASS CURTAIN', region: 'EU', threat: 38, status: 'UNCONFIRMED',
    tagline: 'Quiet Balkans operation, no confirmed leadership yet — low but rising.',
    history: 'The quietest name on the board, and possibly the newest. GLASS CURTAIN operates out of the Balkans with no confirmed leadership structure identified yet. The threat score is low, but WRAITH flagged the trend line as rising steadily, which is why it stays on the daily watch list.',
    pastOps: [
      { t: 'Quiet reconnaissance sweep, Balkans corridor', r: 'SUCCESS' },
      { t: 'Attempted message intercept on COMMAND-01', r: 'FAILED' },
      { t: 'Unidentified activity spike, still under review', r: 'UNCONFIRMED' }
    ],
    weaknesses: [
      'No confirmed leadership means no confirmed strategy — they may not have consolidated yet',
      'Low current threat means an early, decisive move could stop this one before it grows',
      'Operating quietly usually means operating small — limited resources so far'
    ]
  },
  {
    id: 'PALE-ARCHIVE', name: 'PALE ARCHIVE', region: 'OC', threat: 41, status: 'WATCHING',
    tagline: 'Pacific chatter climbing for two weeks. Watching, not yet engaged.',
    history: 'PALE ARCHIVE claims to keep records that "don\'t forget" — a line lifted directly from an intercepted fragment. Pacific chatter tied to this name has been climbing steadily for two weeks. VORTEX recommends cross-referencing with SYDNEY WATCH before it escalates any further.',
    pastOps: [
      { t: 'Chatter escalation, Pacific corridor', r: 'ONGOING' },
      { t: 'Attempted archive breach on a rival cell', r: 'SUCCESS' },
      { t: 'Contact with SYDNEY WATCH perimeter', r: 'UNCONFIRMED' }
    ],
    weaknesses: [
      'Chatter volume without confirmed engagement suggests they\'re still building capacity',
      'Their "archive" model depends on data staying secret — a leak would be existential',
      'Not yet directly engaged with DIESEL, which leaves room to get ahead of them'
    ]
  }
];

const FACTION_REGION_LABELS = { NA: 'North America', SA: 'South America', EU: 'Europe', AF: 'Africa', AS: 'Asia', OC: 'Oceania' };

function factionThreatTier(v) {
  if (v >= 75) return 'CRITICAL';
  if (v >= 55) return 'HIGH';
  if (v >= 35) return 'ELEVATED';
  return 'LOW';
}

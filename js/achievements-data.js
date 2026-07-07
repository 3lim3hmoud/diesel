/* Achievement definitions. Each `test` receives the raw DieselState save object
   and returns true once the condition is met. Checked after every state-changing
   action via DieselState.checkAchievements(). */
const ACHIEVEMENTS = [
  {
    id: 'first_blood',
    name: 'FIRST BLOOD',
    icon: '&#128298;',
    desc: 'Complete your first mission.',
    test: s => s.completedMissions.length >= 1
  },
  {
    id: 'five_closed',
    name: 'FIVE CLOSED',
    icon: '&#127942;',
    desc: 'Complete 5 missions.',
    test: s => s.completedMissions.length >= 5
  },
  {
    id: 'undefeated',
    name: 'UNDEFEATED',
    icon: '&#129352;',
    desc: 'Complete 10 missions.',
    test: s => s.completedMissions.length >= 10
  },
  {
    id: 'commander_rise',
    name: 'RISING COMMANDER',
    icon: '&#11088;',
    desc: 'Reach COMMANDER rank.',
    test: s => s.xp >= 150
  },
  {
    id: 'elite_status',
    name: 'ELITE STATUS',
    icon: '&#128081;',
    desc: 'Reach ELITE COMMANDER rank.',
    test: s => s.xp >= 1100
  },
  {
    id: 'first_broadcast',
    name: 'ON AIR',
    icon: '&#128225;',
    desc: 'Send your first broadcast.',
    test: s => s.broadcastCount >= 1
  },
  {
    id: 'big_earner',
    name: 'BIG EARNER',
    icon: '&#128176;',
    desc: 'Earn $2,000+ from a single contract payout.',
    test: s => s.transactions.some(t => t.dir === 'in' && t.amount >= 2000)
  },
  {
    id: 'lockdown_first',
    name: 'SEALED NODE',
    icon: '&#128274;',
    desc: 'Engage system lockdown for the first time.',
    test: s => s.lockdown === true
  },
  {
    id: 'twenty_closed',
    name: 'EMPIRE BUILDER',
    icon: '&#127970;',
    desc: 'Complete 20 missions.',
    test: s => s.completedMissions.length >= 20
  },
  {
    id: 'prime_status',
    name: 'PRIME STANDING',
    icon: '&#128081;',
    desc: 'Reach COMMANDER PRIME rank.',
    test: s => s.xp >= 2000
  },
  {
    id: 'network_grown',
    name: 'GLOBAL NETWORK',
    icon: '&#127760;',
    desc: 'Send 10+ broadcasts to the full network.',
    test: s => s.broadcastCount >= 10
  },
  {
    id: 'seven_figures',
    name: 'SEVEN FIGURES',
    icon: '&#128176;',
    desc: 'Earn $10,000+ from a single contract payout.',
    test: s => s.transactions.some(t => t.dir === 'in' && t.amount >= 10000)
  },
  {
    id: 'apex_status',
    name: 'APEX STANDING',
    icon: '&#128142;',
    desc: 'Reach COMMANDER APEX rank — the top of the board.',
    test: s => s.xp >= 3500
  },
  {
    id: 'full_roster',
    name: 'FULL ROSTER',
    icon: '&#129309;',
    desc: 'Recruit every unit onto active duty.',
    test: s => s.recruited.length >= 15
  }
];

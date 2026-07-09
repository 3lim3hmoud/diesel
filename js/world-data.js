/* DIESEL WORLD INTEL DATABASE
   Real-world reference data — not fictional lore, unlike map.html/factions-data.js.
   Population and area are rounded, general-reference figures (not live/real-time).
*/
const WORLD_DATA = [
  { name:'Egypt', flag:'🇪🇬', capital:'Cairo', continent:'Africa', population:'~112 million', area:'~1,010,000 km²', fact:'Home to the only surviving Ancient Wonder of the World — the Great Pyramid of Giza.' },
  { name:'Nigeria', flag:'🇳🇬', capital:'Abuja', continent:'Africa', population:'~230 million', area:'~924,000 km²', fact:'Africa\'s most populous country and its largest economy.' },
  { name:'South Africa', flag:'🇿🇦', capital:'Pretoria (administrative)', continent:'Africa', population:'~60 million', area:'~1,221,000 km²', fact:'Has three capital cities — Pretoria, Cape Town, and Bloemfontein.' },
  { name:'Kenya', flag:'🇰🇪', capital:'Nairobi', continent:'Africa', population:'~55 million', area:'~580,000 km²', fact:'The Great Rift Valley runs through the country, shaping its famous savannahs.' },
  { name:'Morocco', flag:'🇲🇦', capital:'Rabat', continent:'Africa', population:'~38 million', area:'~447,000 km²', fact:'Only about 13 km of the Strait of Gibraltar separate it from Europe.' },
  { name:'Ethiopia', flag:'🇪🇹', capital:'Addis Ababa', continent:'Africa', population:'~127 million', area:'~1,104,000 km²', fact:'One of the few African nations never colonized, and uses its own calendar.' },
  { name:'Ghana', flag:'🇬🇭', capital:'Accra', continent:'Africa', population:'~34 million', area:'~239,000 km²', fact:'The first sub-Saharan African country to gain independence from colonial rule, in 1957.' },
  { name:'Algeria', flag:'🇩🇿', capital:'Algiers', continent:'Africa', population:'~46 million', area:'~2,382,000 km²', fact:'The largest country in Africa by land area.' },

  { name:'China', flag:'🇨🇳', capital:'Beijing', continent:'Asia', population:'~1.41 billion', area:'~9,597,000 km²', fact:'The Great Wall stretches over 21,000 km when every branch is counted.' },
  { name:'India', flag:'🇮🇳', capital:'New Delhi', continent:'Asia', population:'~1.44 billion', area:'~3,287,000 km²', fact:'The world\'s most populous country and largest democracy.' },
  { name:'Japan', flag:'🇯🇵', capital:'Tokyo', continent:'Asia', population:'~123 million', area:'~378,000 km²', fact:'Made up of over 14,000 islands, though most people live on just four.' },
  { name:'South Korea', flag:'🇰🇷', capital:'Seoul', continent:'Asia', population:'~52 million', area:'~100,000 km²', fact:'One of the most densely populated countries, with over half its people around Seoul.' },
  { name:'Indonesia', flag:'🇮🇩', capital:'Jakarta', continent:'Asia', population:'~280 million', area:'~1,905,000 km²', fact:'The world\'s largest archipelago, spanning over 17,000 islands.' },
  { name:'Saudi Arabia', flag:'🇸🇦', capital:'Riyadh', continent:'Asia', population:'~36 million', area:'~2,150,000 km²', fact:'Home to Mecca and Medina, Islam\'s two holiest cities.' },
  { name:'United Arab Emirates', flag:'🇦🇪', capital:'Abu Dhabi', continent:'Asia', population:'~10 million', area:'~83,600 km²', fact:'A federation of seven emirates, formed in 1971.' },
  { name:'Pakistan', flag:'🇵🇰', capital:'Islamabad', continent:'Asia', population:'~247 million', area:'~881,000 km²', fact:'Home to K2, the world\'s second-highest mountain.' },
  { name:'Turkey', flag:'🇹🇷', capital:'Ankara', continent:'Asia', population:'~86 million', area:'~784,000 km²', fact:'Istanbul is the only major city in the world spanning two continents.' },
  { name:'Iran', flag:'🇮🇷', capital:'Tehran', continent:'Asia', population:'~90 million', area:'~1,648,000 km²', fact:'One of the oldest continuous civilizations, with a history spanning millennia.' },
  { name:'Thailand', flag:'🇹🇭', capital:'Bangkok', continent:'Asia', population:'~72 million', area:'~513,000 km²', fact:'The only Southeast Asian country never colonized by a European power.' },
  { name:'Vietnam', flag:'🇻🇳', capital:'Hanoi', continent:'Asia', population:'~99 million', area:'~331,000 km²', fact:'The world\'s second-largest coffee exporter.' },
  { name:'Philippines', flag:'🇵🇭', capital:'Manila', continent:'Asia', population:'~117 million', area:'~300,000 km²', fact:'An archipelago of over 7,600 islands.' },
  { name:'Jordan', flag:'🇯🇴', capital:'Amman', continent:'Asia', population:'~11 million', area:'~89,300 km²', fact:'Home to Petra, the ancient rock-carved city and UNESCO World Heritage Site.' },
  { name:'Iraq', flag:'🇮🇶', capital:'Baghdad', continent:'Asia', population:'~45 million', area:'~438,000 km²', fact:'Sits within Mesopotamia, the "cradle of civilization" between the Tigris and Euphrates.' },
  { name:'Qatar', flag:'🇶🇦', capital:'Doha', continent:'Asia', population:'~3 million', area:'~11,600 km²', fact:'One of the highest GDP-per-capita countries in the world, driven by natural gas.' },

  { name:'United Kingdom', flag:'🇬🇧', capital:'London', continent:'Europe', population:'~68 million', area:'~243,600 km²', fact:'Made up of four nations: England, Scotland, Wales, and Northern Ireland.' },
  { name:'France', flag:'🇫🇷', capital:'Paris', continent:'Europe', population:'~66 million', area:'~551,700 km²', fact:'The most visited country in the world by international tourists.' },
  { name:'Germany', flag:'🇩🇪', capital:'Berlin', continent:'Europe', population:'~84 million', area:'~357,600 km²', fact:'Europe\'s largest economy and most populous EU member state.' },
  { name:'Italy', flag:'🇮🇹', capital:'Rome', continent:'Europe', population:'~59 million', area:'~301,300 km²', fact:'Has more UNESCO World Heritage Sites than any other country.' },
  { name:'Spain', flag:'🇪🇸', capital:'Madrid', continent:'Europe', population:'~48 million', area:'~505,900 km²', fact:'Second only to France in international tourist arrivals most years.' },
  { name:'Russia', flag:'🇷🇺', capital:'Moscow', continent:'Europe', population:'~144 million', area:'~17,098,000 km²', fact:'The largest country in the world by land area, spanning 11 time zones.' },
  { name:'Netherlands', flag:'🇳🇱', capital:'Amsterdam', continent:'Europe', population:'~18 million', area:'~41,850 km²', fact:'About a third of the country sits below sea level, protected by dikes.' },
  { name:'Sweden', flag:'🇸🇪', capital:'Stockholm', continent:'Europe', population:'~10.5 million', area:'~450,300 km²', fact:'Home to the "right to roam" — anyone may walk, cycle, or camp on most land.' },
  { name:'Switzerland', flag:'🇨🇭', capital:'Bern', continent:'Europe', population:'~8.8 million', area:'~41,300 km²', fact:'Has four official languages: German, French, Italian, and Romansh.' },
  { name:'Poland', flag:'🇵🇱', capital:'Warsaw', continent:'Europe', population:'~37 million', area:'~312,700 km²', fact:'Rebuilt almost entirely after WWII — Warsaw\'s Old Town is a careful reconstruction.' },
  { name:'Greece', flag:'🇬🇷', capital:'Athens', continent:'Europe', population:'~10.4 million', area:'~131,900 km²', fact:'Considered the birthplace of democracy, philosophy, and the Olympic Games.' },
  { name:'Portugal', flag:'🇵🇹', capital:'Lisbon', continent:'Europe', population:'~10.3 million', area:'~92,200 km²', fact:'One of the oldest nation-states in Europe, with borders unchanged since 1139.' },
  { name:'Norway', flag:'🇳🇴', capital:'Oslo', continent:'Europe', population:'~5.5 million', area:'~385,200 km²', fact:'Famous for its fjords — deep valleys carved by glaciers, now filled with sea.' },
  { name:'Ukraine', flag:'🇺🇦', capital:'Kyiv', continent:'Europe', population:'~36 million', area:'~603,500 km²', fact:'The largest country entirely within Europe by land area.' },

  { name:'United States', flag:'🇺🇸', capital:'Washington, D.C.', continent:'North America', population:'~340 million', area:'~9,834,000 km²', fact:'The third-largest country in the world by both area and population.' },
  { name:'Canada', flag:'🇨🇦', capital:'Ottawa', continent:'North America', population:'~40 million', area:'~9,985,000 km²', fact:'Home to more lakes than the rest of the world combined.' },
  { name:'Mexico', flag:'🇲🇽', capital:'Mexico City', continent:'North America', population:'~130 million', area:'~1,964,000 km²', fact:'Introduced chocolate, corn, and chili peppers to the rest of the world.' },

  { name:'Brazil', flag:'🇧🇷', capital:'Brasília', continent:'South America', population:'~216 million', area:'~8,516,000 km²', fact:'Contains roughly 60% of the Amazon rainforest.' },
  { name:'Argentina', flag:'🇦🇷', capital:'Buenos Aires', continent:'South America', population:'~46 million', area:'~2,780,000 km²', fact:'Home to Aconcagua, the tallest peak outside Asia.' },
  { name:'Chile', flag:'🇨🇱', capital:'Santiago', continent:'South America', population:'~19.6 million', area:'~756,000 km²', fact:'Stretches over 4,300 km north to south — one of the longest countries on Earth.' },
  { name:'Colombia', flag:'🇨🇴', capital:'Bogotá', continent:'South America', population:'~52 million', area:'~1,142,000 km²', fact:'The world\'s second most biodiverse country, after Brazil.' },
  { name:'Peru', flag:'🇵🇪', capital:'Lima', continent:'South America', population:'~34 million', area:'~1,285,000 km²', fact:'Home to Machu Picchu, the iconic Inca citadel high in the Andes.' },

  { name:'Australia', flag:'🇦🇺', capital:'Canberra', continent:'Oceania', population:'~27 million', area:'~7,692,000 km²', fact:'The only country that is also an entire continent.' },
  { name:'New Zealand', flag:'🇳🇿', capital:'Wellington', continent:'Oceania', population:'~5.3 million', area:'~268,000 km²', fact:'One of the last major landmasses settled by humans, around 800 years ago.' }
];

const WORLD_CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

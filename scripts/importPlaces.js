require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const db      = require('../database/db');
const slugify = require('slugify');

const PLACES = [
  // ─── WATERFALLS ──────────────────────────────────────────────────────────────
  {
    name: 'Haifoss',
    latitude: 64.0775, longitude: -19.5772,
    region: 'South Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~2 hours',
    parking_info: 'Gravel car park at the canyon rim. F-roads may require 4WD in poor conditions. Free.',
    description_en: 'Haifoss is one of Iceland\'s tallest waterfalls at 122 metres, plunging into the Fossá river canyon. Despite its breathtaking scale it receives only a fraction of the visitors that nearby Gullfoss attracts. From the canyon rim the view opens onto raw volcanic grandeur two great waterfalls, Haifoss and its neighbour Granni, pouring side by side into the gorge below.',
  },
  {
    name: 'Glymur',
    latitude: 64.3942, longitude: -21.3275,
    region: 'West Iceland', category: 'waterfall', difficulty: 'medium',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~1 hour',
    parking_info: 'Small car park at the Botnsá trailhead near Hvalfjörður. Free.',
    description_en: 'Glymur was Iceland\'s tallest waterfall at 198 metres until 2011. Hidden at the end of a narrow fjord, reaching it requires crossing a river on a log bridge, scrambling through a cave, and hiking along exposed cliff ledges. The reward is a spectacular view into a deep gorge where the falls thunder below. One of Iceland\'s most rewarding hidden hikes.',
  },
  {
    name: 'Dynjandi',
    latitude: 65.7356, longitude: -23.1897,
    region: 'Westfjords', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (June–August)',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Car park at the base of the falls. Short walk to viewing area. Free.',
    description_en: 'Dynjandi "Thunderous" is the crown jewel of the Westfjords, a majestic fan-shaped waterfall 100 metres wide at the top narrowing to a single thread as it plunges into the valley. A series of smaller falls line the path to its base. Because the Westfjords are remote and rarely visited, this spectacular site is often completely deserted.',
  },
  {
    name: 'Svartifoss',
    latitude: 64.0267, longitude: -16.9753,
    region: 'South Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~3.5 hours',
    parking_info: 'Paid car park at the Skaftafell visitor centre (700 ISK/day).',
    description_en: 'Svartifoss the "Black Falls" drops 20 metres into a pool surrounded by a perfect horseshoe of dark basalt columns, the geological inspiration for Hallgrímskirkja church in Reykjavik. A 1.5 km hike from the visitor centre through birch woodland leads to it. The contrast between the white waterfall and the dark hexagonal columns is one of Iceland\'s most iconic natural compositions.',
  },
  {
    name: 'Gljúfrabúi',
    latitude: 63.6194, longitude: -19.9861,
    region: 'South Iceland', category: 'waterfall', difficulty: 'medium',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~2 hours',
    parking_info: 'Shared paid car park with Seljalandsfoss (700 ISK). Walk 5 min north along the cliff base.',
    description_en: 'Gljúfrabúi the "Gorge Dweller" is a spectacular waterfall hidden inside a slot canyon barely wide enough to squeeze through. Just five minutes from Seljalandsfoss, almost no visitors investigate the gap in the cliff face. Inside, the falls drop 40 metres into a circular chamber of mossy walls. You must wade a shallow stream to enter bring waterproof shoes.',
  },
  {
    name: 'Hraunfossar',
    latitude: 64.7100, longitude: -21.1200,
    region: 'West Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2 hours',
    parking_info: 'Free car park directly at the site off Route 518 near Reykholt.',
    description_en: 'Hraunfossar is unlike any other waterfall in Iceland hundreds of crystal-clear springs emerge from beneath a 900-year-old lava field for almost a kilometre along the riverbank. The water has filtered through porous lava since the Hallmundarhraun eruption and surfaces in a long curtain of blue-green ribbons flowing into the glacial Hvítá river. Accessible year-round, this geological curiosity is one of Iceland\'s most unexpected natural wonders.',
  },
  {
    name: 'Barnafoss',
    latitude: 64.7067, longitude: -21.0953,
    region: 'West Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2 hours',
    parking_info: 'Same free car park as Hraunfossar. 5-minute walk.',
    description_en: 'Barnafoss "Children\'s Falls" is a violent churning waterfall where the Hvítá river squeezes through a narrow red-tinted lava gorge, just minutes from Hraunfossar. Legend says two children fell from a natural stone arch that once spanned the gorge; their grieving mother had the arch destroyed. The raw power here, set against the serene springs of nearby Hraunfossar, makes visiting both irresistible.',
  },
  {
    name: 'Hengifoss',
    latitude: 65.0950, longitude: -14.8600,
    region: 'East Iceland', category: 'waterfall', difficulty: 'medium',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~6 hours',
    parking_info: 'Free car park at the Hengifoss trailhead near Fellabær.',
    description_en: 'Hengifoss is Iceland\'s third-tallest waterfall at 128 metres, set inside a canyon with striking red clay and black basalt stripes ancient lakebed sediment laid down millions of years ago. The 2.5 km hike passes the stunning Litlanesfoss on the way. Despite its impressive height and vivid geology, Hengifoss is one of Iceland\'s most overlooked major waterfalls, largely because it sits far from the tourist trail in the east.',
  },
  {
    name: 'Litlanesfoss',
    latitude: 65.0883, longitude: -14.8714,
    region: 'East Iceland', category: 'waterfall', difficulty: 'medium',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~6 hours',
    parking_info: 'Shared trailhead parking with Hengifoss near Fellabær. Free.',
    description_en: 'Litlanesfoss is a stunning 30-metre waterfall framed by a perfect colonnade of tall basalt columns on both sides, creating a natural cathedral of hexagonal rock. It stands along the path to Hengifoss and is so beautiful that many hikers consider it the highlight of the trail. The geometric perfection of the surrounding columns is extraordinary they stand upright and symmetrical, best photographed in golden evening light.',
  },
  {
    name: 'Brúarfoss',
    latitude: 64.2200, longitude: -20.5300,
    region: 'South Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~1.5 hours',
    parking_info: 'Small gravel pull-off on Route 35 near Borgarfjörður. Space for ~5 cars. Free.',
    description_en: 'Brúarfoss is known as Iceland\'s most intensely blue waterfall a vivid turquoise cascade fed by clean glacial meltwater filtered through geothermal springs. Its brilliant colour comes from silica-rich geology. Rediscovered by a travel blogger only a decade ago after years of obscurity, it still receives remarkably few visitors. The 3 km round-trip walk along the Brúará river passes through peaceful birch moorland.',
  },
  {
    name: 'Dettifoss',
    latitude: 65.8142, longitude: -16.3847,
    region: 'North Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Free car park on Route 862 (west, paved) or Route 864 (east, gravel). West side gives closer access.',
    description_en: 'Dettifoss is the most powerful waterfall in Europe 100 metres wide, 44 metres tall, discharging 193 cubic metres per second from the Vatnajökull glacier. The spray cloud is visible for kilometres. Standing at the rim as the ground vibrates underfoot is an unforgettable encounter with raw geological power. Despite its fame, the remote location means the approach is often quiet.',
  },
  {
    name: 'Selfoss Waterfall',
    latitude: 65.8089, longitude: -16.3975,
    region: 'North Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Use the Dettifoss car park (free) on Route 862. Selfoss is a 1.5 km walk upstream.',
    description_en: 'Selfoss Waterfall sits just 1.5 km upstream from the famous Dettifoss, yet receives only a fraction of its visitors. Where Dettifoss is overpowering and grey, Selfoss is wide and graceful spreading across 100 metres of basalt shelves in layered cascades. Most visitors who reach Dettifoss walk straight past the Selfoss viewpoint without stopping.',
  },
  {
    name: 'Hafragilsfoss',
    latitude: 65.7994, longitude: -16.3981,
    region: 'North Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Small car park off Route 862. Short walk to the viewpoint. Free.',
    description_en: 'Hafragilsfoss drops 27 metres into the Jökulsárgjúfur canyon just downstream from Dettifoss. While Dettifoss gets all the attention, Hafragilsfoss is broader and lower, spreading across the full canyon width in a curtain of glacial water. The canyon walls here are among the most dramatic in the Jökulsá á Fjöllum system, with sheer basalt faces rising hundreds of metres on both sides.',
  },
  {
    name: 'Rjúkandi Waterfall',
    latitude: 65.1028, longitude: -15.1317,
    region: 'East Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Small gravel pull-off directly on Route 1, marked by a brown sign. Free.',
    description_en: 'Rjúkandi "Steaming" is a tall slender waterfall plunging from a high plateau into a hidden valley near the East Iceland coast. The falls spray so fiercely that mist constantly rises from the pool. Right beside the Ring Road yet virtually unknown to passing tourists, it sits in a lush gorge framed by birch trees and ferns. A short trail leads to the base.',
  },
  {
    name: 'Kirkjufellsfoss',
    latitude: 64.9400, longitude: -23.3058,
    region: 'West Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2.5 hours',
    parking_info: 'Free car park directly beside the falls near Grundarfjörður, Snæfellsnes Peninsula.',
    description_en: 'Kirkjufellsfoss is a photogenic double waterfall flowing over gentle lava shelves with the iconic arrowhead peak of Kirkjufell mountain perfectly framed behind it one of Iceland\'s most photographed compositions. In winter the northern lights are frequently visible directly above the mountain and falls, creating a night-sky scene that draws photographers from around the world.',
  },
  {
    name: 'Bjarnafoss',
    latitude: 64.8817, longitude: -23.8933,
    region: 'West Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~2.5 hours',
    parking_info: 'Roadside parking on Route 54 near Búðardalur. Free.',
    description_en: 'Bjarnafoss cascades down a steep green mountainside directly above the coast on the Snæfellsnes peninsula. The falls are visible from the road and from the sea, where they served as a navigational landmark for sailors for centuries. Few tourists venture this far along the south coast of Snæfellsnes, making this a genuinely tranquil stop.',
  },
  {
    name: 'Systrafoss',
    latitude: 63.5089, longitude: -18.2478,
    region: 'South Iceland', category: 'waterfall', difficulty: 'easy',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~3 hours',
    parking_info: 'Park in Kirkjubæjarklaustur village and walk 15 minutes to the falls. Free.',
    description_en: 'Systrafoss is a graceful waterfall dropping from a high plateau into the lake Systravatn above the village of Kirkjubæjarklaustur. Named after the nuns of a medieval convent that stood here, the falls have a quiet, almost reverent quality. The short walk up to Systravatn leads through an extraordinary landscape of lava formations and natural rock gardens.',
  },

  // ─── CANYONS ─────────────────────────────────────────────────────────────────
  {
    name: 'Stuðlagil Canyon',
    latitude: 65.0786, longitude: -15.4536,
    region: 'East Iceland', category: 'canyon', difficulty: 'medium',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Car park at Klaustursel farm on the east bank. 4WD recommended for the west bank river crossing. Free.',
    description_en: 'Stuðlagil is Iceland\'s most spectacular basalt column canyon, only revealed to the world in 2016 when a dam upstream lowered the river enough to expose the extraordinary rock formations beneath. The canyon walls are packed with perfectly vertical hexagonal columns rising 30 metres from a vivid turquoise glacial river. Now considered one of Iceland\'s finest natural gems, it still sees only a fraction of the visitors that better-known sites attract.',
  },
  {
    name: 'Fjaðrárgljúfur Canyon',
    latitude: 63.7603, longitude: -18.1669,
    region: 'South Iceland', category: 'canyon', difficulty: 'easy',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~3 hours',
    parking_info: 'Free car park at the canyon entrance near Kirkjubæjarklaustur, just off Route 206.',
    description_en: 'Fjaðrárgljúfur is a winding canyon 2 km long and 100 metres deep, carved by the Fjaðrá river into soft palagonite rock. A narrow turquoise river threads between sheer walls covered in vivid green moss. A rim trail offers constantly changing views into the gorge. Though briefly famous after appearing in a music video, it has returned to relative quiet.',
  },
  {
    name: 'Eldgjá Canyon',
    latitude: 63.9689, longitude: -18.6036,
    region: 'South Iceland', category: 'canyon', difficulty: 'hard',
    best_season: 'Summer (June–August)',
    drive_time_from_reykjavik: '~4.5 hours (4WD required via F208)',
    parking_info: 'Gravel car park at the Eldgjá trailhead, accessed via the F208 highland route. Free.',
    description_en: 'Eldgjá "Fire Canyon" is the largest volcanic canyon in the world at 270 km long, formed by a catastrophic 939 AD eruption that was the largest lava eruption in recorded human history. A dramatic cascade, Ófærufoss, plunges into the canyon floor. The F-road approach is long and requires 4WD, but the sheer scale rewards those who make the effort.',
  },
  {
    name: 'Ásbyrgi Canyon',
    latitude: 66.0214, longitude: -16.5061,
    region: 'North Iceland', category: 'canyon', difficulty: 'easy',
    best_season: 'Summer (June–August)',
    drive_time_from_reykjavik: '~6 hours',
    parking_info: 'Free car park inside the canyon entrance, accessible year-round. Camping available in summer.',
    description_en: 'Ásbyrgi is a horseshoe-shaped canyon 3.5 km long, enclosed on three sides by sheer 100-metre basalt walls. Norse mythology holds that it was formed by the hoof of Odin\'s eight-legged horse Sleipnir. Geologists believe a catastrophic glacial flood carved it. The canyon floor is filled with birch woodland and a small lake a sheltered oasis of green in the stark highland landscape.',
  },
  {
    name: 'Kolugljúfur Canyon',
    latitude: 65.3678, longitude: -20.5244,
    region: 'North Iceland', category: 'canyon', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~3 hours',
    parking_info: 'Roadside pull-off directly at the canyon on Route 1 near Víðidalur. Free.',
    description_en: 'Kolugljúfur is a spectacular red-walled canyon carved by the Víðidalsá river, accessible right off the Ring Road and almost completely unknown to tourists. The gorge walls are stained deep ochre and crimson by iron-rich volcanic rock, and a multi-tiered waterfall thunders at its base. A simple fenced viewpoint hangs directly over the canyon edge a vertiginous drop straight into the rushing water below.',
  },

  // ─── HOT SPRINGS ─────────────────────────────────────────────────────────────
  {
    name: 'Landmannalaugar',
    latitude: 63.9939, longitude: -19.0697,
    region: 'Highlands', category: 'hot_spring', difficulty: 'medium',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~3.5 hours (4WD required)',
    parking_info: 'Large gravel car park at the hut complex. F-road river crossings required. Small fee for facilities.',
    description_en: 'Landmannalaugar is an extraordinary highland landscape of obsidian lava fields, multi-coloured rhyolite mountains in shades of pink, green and purple, and natural hot springs where hikers soak after the Laugavegur trail. The natural hot river emerging from beneath the lava is warm enough to bathe in year-round. Access requires a 4WD through river crossings on the F208 it is worth every kilometre.',
  },
  {
    name: 'Seljavallalaug',
    latitude: 63.5333, longitude: -19.5556,
    region: 'South Iceland', category: 'hot_spring', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2 hours',
    parking_info: 'Small gravel car park at the end of a minor road off Route 242. Free. 15-minute walk to pool.',
    description_en: 'Seljavallalaug is Iceland\'s oldest swimming pool, built in 1923 and fed by natural geothermal water. Set in a narrow gorge between steep grassy mountain walls, it feels completely removed from the modern world. The pool is free, unheated except by the spring, and largely undiscovered despite being only 2 km off the Ring Road. The 15-minute walk through the gorge, with waterfalls on the cliff walls, is reason enough to visit.',
  },
  {
    name: 'Kerlingarfjöll',
    latitude: 64.6339, longitude: -19.2417,
    region: 'Highlands', category: 'hot_spring', difficulty: 'medium',
    best_season: 'Summer (June–August)',
    drive_time_from_reykjavik: '~3 hours (4WD required via F35)',
    parking_info: 'Car park at the Kerlingarfjöll mountain resort. Day visitor fee required. 4WD for F35 access.',
    description_en: 'Kerlingarfjöll is a spectacular highland geothermal area of steaming fumaroles, vivid orange and yellow sulphur deposits, and hot springs set against snow-capped rhyolite peaks. Multiple hiking trails criss-cross the area. The natural hot pots and steam vents create a surreal, almost Martian environment. The camp site here is one of the most dramatically located in Iceland, with mountain views in every direction.',
  },
  {
    name: 'Krauma',
    latitude: 64.7133, longitude: -21.0950,
    region: 'West Iceland', category: 'hot_spring', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2 hours',
    parking_info: 'Free car park at Krauma facility near Reykholt. Entry fee required (~3,500 ISK).',
    description_en: 'Krauma is a beautifully designed geothermal bathing facility fed by Deildartunguhver Europe\'s most powerful hot spring just metres away. The boiling spring water is mixed with glacier water to create outdoor pools at perfect bathing temperatures. Unlike the crowded Blue Lagoon, Krauma feels intimate and unhurried, set in peaceful natural surroundings near Reykholt.',
  },
  {
    name: 'Grjótagjá Cave',
    latitude: 65.6231, longitude: -16.8800,
    region: 'North Iceland', category: 'hot_spring', difficulty: 'easy',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~5 hours',
    parking_info: 'Small gravel pull-off on Route 860 near Lake Mývatn. Short walk to the cave entrance. Free.',
    description_en: 'Grjótagjá is a small lava cave containing a brilliantly blue geothermal pool, accessible through a narrow crack in the earth. It gained worldwide recognition as a filming location in Game of Thrones. Locals once swam here until a 1970s eruption raised the temperature too high. The cave interior glows an ethereal blue from sunlight penetrating through cracks in the lava ceiling.',
  },
  {
    name: 'Deildartunguhver',
    latitude: 64.7033, longitude: -21.4183,
    region: 'West Iceland', category: 'hot_spring', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~1.5 hours',
    parking_info: 'Free car park directly at the spring off Route 50 near Reykholt.',
    description_en: 'Deildartunguhver is the highest-flow hot spring in Europe, discharging 180 litres of 100°C water per second in a constant roaring torrent of boiling water and steam. So powerful it has piped hot water to towns 75 km away since 1978. You can stand on a safe path immediately beside the boiling flow the heat and noise are overwhelming.',
  },
  {
    name: 'Lýsuhóll Hot Spring',
    latitude: 64.8281, longitude: -23.4731,
    region: 'West Iceland', category: 'hot_spring', difficulty: 'easy',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~2 hours',
    parking_info: 'Park at the Lýsuhóll farm. Small admission fee (~1,000 ISK). Cash or card accepted.',
    description_en: 'Lýsuhóll is a small geothermal pool on a working horse farm on the Snæfellsnes peninsula, fed by a mineral-rich spring and surrounded by open farmland with views of the Snæfellsjökull glacier. The pool has an unusual deep orange tint from its high mineral content. Completely off the tourist trail most days you may have it entirely to yourself.',
  },

  // ─── HIKES ────────────────────────────────────────────────────────────────────
  {
    name: 'Þórsmörk Valley',
    latitude: 63.6769, longitude: -19.5006,
    region: 'South Iceland', category: 'hike', difficulty: 'medium',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~3 hours (4WD required for river crossings)',
    parking_info: 'Car park at Langidalur hut. Deep river crossings require 4WD the Reykjavik Excursions bus is an alternative.',
    description_en: 'Þórsmörk "Forest of Thor" is a spectacular highland valley nestled between three glaciers: Eyjafjallajökull, Mýrdalsjökull and Tindfjallajökull. The valley is covered in silver birch woodland, criss-crossed by glacial rivers, and ringed by dramatic peaks. It is the terminus of the Laugavegur trail yet remains uncrowded and largely undiscovered by casual tourists.',
  },
  {
    name: 'Hverfjall',
    latitude: 65.6022, longitude: -16.8775,
    region: 'North Iceland', category: 'hike', difficulty: 'easy',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~5 hours',
    parking_info: 'Free car park at the base of the mountain near Lake Mývatn, off Route 848.',
    description_en: 'Hverfjall is a perfectly symmetrical tephra ring volcano rising 160 metres above the Lake Mývatn basin, formed around 2,500 years ago. The crater is 1 km across and the rim walk takes about an hour, offering panoramic views over the entire Mývatn region its lava formations, lakes, geothermal areas and distant volcanoes. Strikingly visible from the road, yet most visitors drive past without stopping to climb it.',
  },
  {
    name: 'Víti Crater',
    latitude: 65.0483, longitude: -16.7483,
    region: 'Highlands', category: 'hike', difficulty: 'hard',
    best_season: 'Summer (July–August)',
    drive_time_from_reykjavik: '~6.5 hours (4WD required via F88)',
    parking_info: 'Car park at the Askja caldera trailhead. 4WD essential the F88 crosses multiple glacial rivers. Free.',
    description_en: 'Víti "Hell" is an explosion crater lake near Askja, filled with opaque milky-blue geothermal water at around 25°C warm enough to swim in. The 4WD journey through the Ódáðahraun lava desert takes hours, passing through one of the most desolate landscapes on Earth. Bathing in the crater while surrounded by black volcanic mountains is one of Iceland\'s most surreal experiences.',
  },
  {
    name: 'Saxhóll Crater',
    latitude: 64.9194, longitude: -23.7428,
    region: 'West Iceland', category: 'hike', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2.5 hours',
    parking_info: 'Small free car park at the crater base on Route 574 within Snæfellsjökull National Park.',
    description_en: 'Saxhóll is a perfectly formed volcanic crater on the Snæfellsnes peninsula with a staircase of wooden steps to the rim. The 15-minute climb passes through reddish scoria, and the summit gives a 360° view over Snæfellsjökull lava fields and the glacier itself. Snæfellsjökull National Park surrounds it, yet Saxhóll rarely has more than a handful of visitors at any time.',
  },
  {
    name: 'Grábrókargigar Craters',
    latitude: 64.4044, longitude: -21.8289,
    region: 'West Iceland', category: 'hike', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~1.5 hours',
    parking_info: 'Free car park at the crater base off Route 1 near Bifröst.',
    description_en: 'Grábrókargigar is a cluster of red and orange volcanic craters formed about 3,400 years ago, rising from a vast lava field. A circular boardwalk trail climbs to the main crater rim, with views over the surrounding lava and distant mountains. The vivid red, orange and purple volcanic rock colours are extraordinary. Just off the main road between Reykjavik and Snæfellsnes, yet inexplicably overlooked by most passing tourists.',
  },
  {
    name: 'Snæfellsjökull Glacier',
    latitude: 64.8094, longitude: -23.7744,
    region: 'West Iceland', category: 'hike', difficulty: 'hard',
    best_season: 'Summer (June–August)',
    drive_time_from_reykjavik: '~3 hours',
    parking_info: 'Car park at the end of Route 570 below the snowline. Guided tours depart from here. Free parking.',
    description_en: 'Snæfellsjökull is the glacier capping the 1,446-metre volcano at the tip of the Snæfellsnes peninsula Jules Verne\'s "Journey to the Centre of the Earth" volcano. Guided glacier hikes cross the icecap with crampons and ice axes. On clear days the summit offers views across the sea to the Westfjords. The glacier is retreating rapidly and may disappear within decades.',
  },
  {
    name: 'Skaftafell',
    latitude: 63.9825, longitude: -16.9758,
    region: 'South Iceland', category: 'hike', difficulty: 'medium',
    best_season: 'Summer (May–September)',
    drive_time_from_reykjavik: '~3.5 hours',
    parking_info: 'Paid car park at Skaftafell visitor centre (700 ISK/day). Within Vatnajökull National Park.',
    description_en: 'Skaftafell is a sheltered oasis of birch woodland and flowering meadows tucked beneath the Vatnajökull ice cap. Multiple trails fan out from the visitor centre, passing waterfalls, glacier tongues and panoramic ridge viewpoints. The iconic Svartifoss waterfall is 1.5 km away, and the Skaftafellsjökull glacier tongue is accessible via short guided ice walks. The microclimate here is the warmest and sunniest in Iceland.',
  },
  {
    name: 'Laugavegur Trail',
    latitude: 63.9939, longitude: -19.0550,
    region: 'Highlands', category: 'hike', difficulty: 'hard',
    best_season: 'Summer (July–August)',
    drive_time_from_reykjavik: '~3.5 hours to trailhead (4WD required)',
    parking_info: 'Car park at the Landmannalaugar hut complex. Book mountain huts months in advance for July–August.',
    description_en: 'The Laugavegur Trail is one of the world\'s great hiking routes a 55 km multi-day journey from the geothermal highlands of Landmannalaugar through volcanic deserts, glacial valleys, lava fields and green gorges to the birch forests of Þórsmörk. It passes obsidian flows, rhyolite mountains in neon colours, active hot springs, and pristine wilderness that no road reaches.',
  },

  // ─── VIEWPOINTS ───────────────────────────────────────────────────────────────
  {
    name: 'Vestrahorn',
    latitude: 64.3872, longitude: -14.9936,
    region: 'East Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Gravel car park at the Stokksnes café. Small access fee (~1,000 ISK) paid at the café or honesty box.',
    description_en: 'Vestrahorn is a dramatic triangular mountain rising almost vertically from the black sand beach at Stokksnes, near Höfn. The jagged peaks reflected in the tidal lagoon against black sand dunes create one of Iceland\'s most photographed compositions. A Viking Village film set adds a cinematic element. The site charges a modest access fee, keeping crowds manageable.',
  },
  {
    name: 'Kerið Crater',
    latitude: 64.0414, longitude: -20.8853,
    region: 'South Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~1 hour',
    parking_info: 'Car park directly at the site off Route 35. Small entry fee (~700 ISK).',
    description_en: 'Kerið is a 3,000-year-old volcanic explosion crater with strikingly red and ochre walls dropping 55 metres to a vivid aquamarine lake. The colour contrast blood-red volcanic soil against intense blue-green water makes it one of Iceland\'s most visually striking natural features. A path circles the entire rim in under 15 minutes and a steep path leads to the lake.',
  },
  {
    name: 'Arnarstapi',
    latitude: 64.7686, longitude: -23.6247,
    region: 'West Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2.5 hours',
    parking_info: 'Free car park in Arnarstapi village. Coastal trail to Hellnar is free and well-marked.',
    description_en: 'Arnarstapi is a small fishing village on the Snæfellsnes peninsula surrounded by extraordinary coastal lava formations arches, sea stacks, blowholes and natural sculptures carved by the North Atlantic over millennia. A 2.5 km coastal trail connects it to the village of Hellnar through dramatic geology, with puffins nesting in the cliff faces in summer.',
  },
  {
    name: 'Lóndrangar',
    latitude: 64.7328, longitude: -23.7750,
    region: 'West Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~3 hours',
    parking_info: 'Small free car park off Route 574 near Malarrif lighthouse in Snæfellsjökull National Park.',
    description_en: 'Lóndrangar are two volcanic plugs rising 75 and 61 metres from the coastal lava shelf remnants of an ancient crater whose flanks were eroded by the sea. The taller is called the "Christian Pillar", the shorter the "Heathen Pillar". Thousands of seabirds nest here in summer, and the surrounding basalt lava shelf creates an extraordinary natural platform reaching to the ocean edge.',
  },
  {
    name: 'Borgarvirki',
    latitude: 65.3667, longitude: -20.8417,
    region: 'North Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2.5 hours',
    parking_info: 'Small free car park at the base off Route 716 near Víðidalur.',
    description_en: 'Borgarvirki is a natural basalt fortress a dramatic circular plateau of columnar lava rising from flat farmland, used as a fortification in the Saga Age. A short climb leads to the summit, where defenders once rolled boulders down the vertical rock walls. The sweeping view across Víðidalur valley, river and distant mountains is magnificent, and the site is almost always deserted.',
  },
  {
    name: 'Kleifarvatn',
    latitude: 63.9436, longitude: -22.0914,
    region: 'Reykjanes Peninsula', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~30 minutes',
    parking_info: 'Free roadside car park on Route 42 on the lake\'s east shore.',
    description_en: 'Kleifarvatn is Iceland\'s largest lake on the Reykjanes peninsula a mysterious deep lake with no visible rivers flowing in or out. The water filters through a geothermal vent system in the lake bed, and the level fell by two metres after a 2000 earthquake. The black lava landscape, sulphurous shoreline vents, and dark brooding colour create an atmosphere unlike anywhere else in Iceland just 30 km from Reykjavik.',
  },
  {
    name: 'Þingvellir',
    latitude: 64.2556, longitude: -21.1306,
    region: 'South Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~45 minutes',
    parking_info: 'Multiple car parks throughout the national park. Day fee of 750 ISK per vehicle.',
    description_en: 'Þingvellir National Park is where the North American and Eurasian tectonic plates are visibly pulling apart at 2 cm per year, creating a landscape of dramatic rift valleys and volcanic fissures. It is also where the world\'s oldest parliament met from 930 AD. Beyond the famous viewpoint, dozens of trails explore the rifts in near-complete solitude. Snorkelling in the glacially clear Silfra fissure is world-class.',
  },
  {
    name: 'Skútustaðagígar',
    latitude: 65.5547, longitude: -17.0258,
    region: 'North Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~5 hours',
    parking_info: 'Free car park at the pseudo-crater viewpoint on the south shore of Lake Mývatn.',
    description_en: 'Skútustaðagígar are pseudo-craters formed when flowing lava met the shallow water of Lake Mývatn and steam explosions punched circular holes through the lava crust. The craters range from a few metres to 50 metres across, creating a moonscape of concentric rings. The circular boardwalk trail passes over and around these extraordinary formations above the mirror-flat lake.',
  },
  {
    name: 'Seyðisfjörður',
    latitude: 65.2594, longitude: -13.9944,
    region: 'East Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Summer (June–September)',
    drive_time_from_reykjavik: '~6.5 hours',
    parking_info: 'Free parking throughout the village. The mountain access road (Route 93) closes in heavy snow.',
    description_en: 'Seyðisfjörður is a perfectly preserved 19th-century fjord town surrounded by steep mountains and cascading waterfalls Iceland\'s most scenic village by many accounts. Colourful wooden houses cluster around the fjord head, linked to the Ring Road by a mountain road with dramatic hairpin bends. The town has become an artists\' colony with galleries, music festivals, and a creative atmosphere unlike anywhere else in rural Iceland.',
  },
  {
    name: 'Goðaborg',
    latitude: 64.9833, longitude: -23.6167,
    region: 'West Iceland', category: 'viewpoint', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~2.5 hours',
    parking_info: 'Park in Arnarstapi village and walk 500 metres west along the coastal path. Free.',
    description_en: 'Goðaborg "God\'s Castle" is a small but commanding lava bastion rising from the Snæfellsnes coastline near Arnarstapi, offering sweeping coastal views of the black lava sea platforms, the Snæfellsjökull glacier and the open Atlantic. The short scramble to the top is easy, and the views are magnificent in all directions. Local legend holds it as a place of particular natural power.',
  },

  // ─── BEACHES ──────────────────────────────────────────────────────────────────
  {
    name: 'Valahnúkamöl',
    latitude: 63.8319, longitude: -22.7358,
    region: 'Reykjanes Peninsula', category: 'beach', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~45 minutes',
    parking_info: 'Free car park at Valahnúkur near the old lighthouse, off Route 425 on the Reykjanes peninsula.',
    description_en: 'Valahnúkamöl is a wild coastal headland on the Reykjanes peninsula where the North Atlantic crashes against ancient basalt cliffs, sea stacks and rocky beaches strewn with vivid red and green volcanic pebbles. Just minutes from the international airport, this extraordinary wild coastline is completely unvisited by nearly all arriving and departing tourists who never leave the airport road.',
  },
  {
    name: 'Stokksnes Black Beach',
    latitude: 64.2503, longitude: -15.0017,
    region: 'East Iceland', category: 'beach', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~5.5 hours',
    parking_info: 'Car park at the Stokksnes café. Small access fee (~1,000 ISK). Opens in the morning, closes at dusk.',
    description_en: 'Stokksnes beach is a long arc of jet-black volcanic sand backed by grass-covered dunes and anchored by the dramatic triangular peak of Vestrahorn mountain. At low tide the wet black sand perfectly mirrors the mountain and sky. The beach stretches for kilometres in near-complete solitude. A Viking-era film set stands among the dunes, adding a cinematic dimension to an already otherworldly landscape.',
  },
  {
    name: 'Djúpalón Beach',
    latitude: 64.7539, longitude: -23.9044,
    region: 'West Iceland', category: 'beach', difficulty: 'easy',
    best_season: 'Year-round',
    drive_time_from_reykjavik: '~3 hours',
    parking_info: 'Free car park at the beach trailhead off Route 574 within Snæfellsjökull National Park.',
    description_en: 'Djúpalón is a haunting black pebble beach in Snæfellsjökull National Park, littered with the rusted iron remains of a British trawler wrecked in 1948. Four ancient lifting stones of different weights "Full Strength", "Half Strength", "Weakling" and "Useless" tested prospective fishermen for crew strength. The surrounding lava formations, sea stacks and Snæfellsjökull backdrop make this one of Iceland\'s most atmospheric beaches.',
  },
];

async function main() {
  await db.init();

  const existing = new Set(
    db.all('SELECT name FROM places').map(p => p.name.toLowerCase())
  );

  let added   = 0;
  let skipped = 0;

  for (const place of PLACES) {
    if (existing.has(place.name.toLowerCase())) {
      console.log(`  SKIP   ${place.name}`);
      skipped++;
      continue;
    }

    const slug = slugify(place.name, { lower: true, strict: true });

    db.run(
      `INSERT INTO places
         (name, slug, description_en,
          latitude, longitude, category, difficulty, best_season,
          region, parking_info, drive_time_from_reykjavik)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        place.name, slug, place.description_en,
        place.latitude, place.longitude,
        place.category, place.difficulty, place.best_season,
        place.region, place.parking_info, place.drive_time_from_reykjavik,
      ]
    );

    console.log(`  ADD    ${place.name}  [${place.category}, ${place.region}]`);
    added++;
  }

  console.log(`\nDone. Added: ${added}  Skipped (already exist): ${skipped}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

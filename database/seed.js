const db      = require('./db');
const slugify = require('slugify');

const places = [
  {
    name: 'Gjáin',
    description_en: 'Gjáin is a hidden paradise valley in Þjórsárdalur, where dozens of small waterfalls and crystal-clear streams weave through a lush, moss-carpeted landscape. Carved by volcanic activity, this intimate valley feels like a secret garden lost in time. Almost no tourists ever find it despite being only two hours from Reykjavik.',
    description_es: 'Gjáin es un escondido valle paradisíaco en Þjórsárdalur, donde docenas de pequeñas cascadas y arroyos cristalinos serpentean a través de un exuberante paisaje alfombrado de musgo. Esculpido por la actividad volcánica, este íntimo valle parece un jardín secreto perdido en el tiempo.',
    description_de: 'Gjáin ist ein verborgenes Paradiestal in Þjórsárdalur, wo Dutzende kleiner Wasserfälle und kristallklare Bäche durch eine üppige, moosbedeckte Landschaft weben. Durch vulkanische Aktivität geformt, fühlt sich dieses intime Tal wie ein geheimer Garten an, der in der Zeit verloren gegangen ist.',
    description_zh: 'Gjáin是Þjórsárdalur中一处隐秘的天堂山谷，数十条小瀑布和清澈溪流穿越郁郁葱葱、苔藓铺地的景观。这个由火山活动塑造的亲密山谷宛如一座遗失在时间里的秘密花园，尽管距雷克雅未克仅两小时车程，却几乎无游客发现。',
    latitude: 64.1578,
    longitude: -19.6358,
    category: 'waterfall',
    difficulty: 'easy',
    best_season: 'Summer (June–August)',
    photo_url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80',
    ]),
    google_maps_url: 'https://maps.google.com/?q=64.1578,-19.6358',
    region: 'South Iceland',
    parking_info: 'Small gravel car park near the Þjórsárdalur road. Space for ~10 cars. Free.',
    drive_time_from_reykjavik: '~2 hours'
  },
  {
    name: 'Aldeyjarfoss',
    description_en: 'Aldeyjarfoss is a dramatic 20-metre waterfall in the Skjálfandafljót river, framed by a perfect crown of symmetrical basalt columns. Unlike its famous neighbour Goðafoss, this waterfall sees almost no visitors despite being arguably more beautiful. The contrast between the dark hexagonal columns and the white foaming water is unforgettable.',
    description_es: 'Aldeyjarfoss es una dramática cascada de 20 metros en el río Skjálfandafljót, enmarcada por una perfecta corona de simétricas columnas de basalto. A diferencia de su famoso vecino Goðafoss, esta cascada apenas recibe visitantes a pesar de ser posiblemente más hermosa.',
    description_de: 'Aldeyjarfoss ist ein dramatischer 20-Meter-Wasserfall im Fluss Skjálfandafljót, gerahmt von einer perfekten Krone symmetrischer Basaltsäulen. Anders als sein berühmter Nachbar Goðafoss empfängt dieser Wasserfall kaum Besucher, obwohl er wohl noch schöner ist.',
    description_zh: 'Aldeyjarfoss是Skjálfandafljót河上一道壮观的20米瀑布，被对称玄武岩柱组成的完美冠冕环绕。与著名的邻居Goðafoss不同，尽管可以说更为美丽，这道瀑布几乎不见游客。深色六边形岩柱与白色泡沫水流的对比令人难忘。',
    latitude: 65.5658,
    longitude: -17.3347,
    category: 'waterfall',
    difficulty: 'easy',
    best_season: 'Year-round',
    photo_url: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1543965860-2843d3cf9e36?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ]),
    google_maps_url: 'https://maps.google.com/?q=65.5658,-17.3347',
    region: 'North Iceland',
    parking_info: 'Gravel pull-off on Route F26. 4WD vehicle recommended on the F-road approach. Free.',
    drive_time_from_reykjavik: '~5 hours'
  },
  {
    name: 'Rauðfeldsgjá',
    description_en: 'Rauðfeldsgjá is a dramatic narrow gorge slicing into the basalt cliffs of the Snæfellsnes peninsula. Inside, a rope and chain assist the climb upward as a cold stream rushes past your feet. When sunlight reaches the red and amber rock walls deep inside, it creates a breathtaking glow that no photo can fully capture.',
    description_es: 'Rauðfeldsgjá es una dramática y estrecha garganta que se abre paso en los acantilados de basalto de la península de Snæfellsnes. En su interior, una cuerda y una cadena ayudan a escalar hacia arriba mientras un arroyo frío corre junto a tus pies. Cuando la luz solar llega a las paredes rocosas rojizas y ámbar en el interior, crea un brillo impresionante.',
    description_de: 'Rauðfeldsgjá ist eine dramatische, schmale Schlucht, die in die Basaltfelsen der Halbinsel Snæfellsnes schneidet. Im Inneren helfen Seil und Kette beim Aufstieg, während ein kalter Bach an Ihren Füßen vorbeifließt. Wenn Sonnenlicht die roten und bernsteinfarbenen Felswände tief im Inneren erreicht, entsteht ein atemberaubendes Leuchten.',
    description_zh: 'Rauðfeldsgjá是一道切入Snæfellsnes半岛玄武岩悬崖的壮观狭窄峡谷。内部，绳索和铁链辅助向上攀爬，冰冷的溪流从脚边奔涌而过。当阳光照射到深处的红色和琥珀色岩壁时，会产生任何照片都难以完全捕捉的令人叹为观止的光芒。',
    latitude: 64.7733,
    longitude: -23.7658,
    category: 'hike',
    difficulty: 'medium',
    best_season: 'Spring and summer (May–August)',
    photo_url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    google_maps_url: 'https://maps.google.com/?q=64.7733,-23.7658',
    region: 'West Iceland',
    parking_info: 'Small roadside pull-off at the gorge entrance. Space for 4–5 cars. Free.',
    drive_time_from_reykjavik: '~2.5 hours'
  },
  {
    name: 'Nauthúsagil',
    description_en: 'Nauthúsagil is a lush moss-covered slot canyon hidden near Hvolsvöllur in South Iceland. A hanging chain guides you through the narrow canyon walls to a delicate waterfall at the far end. The vivid green moss coating every surface makes this place feel truly magical one of Iceland\'s most photogenic hidden gems.',
    description_es: 'Nauthúsagil es un frondoso cañón ranura cubierto de musgo oculto cerca de Hvolsvöllur en el sur de Islandia. Una cadena colgante te guía a través de las estrechas paredes del cañón hasta una delicada cascada al fondo. El musgo verde vivo que cubre cada superficie hace que este lugar se sienta verdaderamente mágico.',
    description_de: 'Nauthúsagil ist ein üppiger, mit Moos bedeckter Slot-Canyon, der in der Nähe von Hvolsvöllur in Südisland versteckt ist. Eine Hängekette führt Sie durch die engen Schlucht­wände zu einem zarten Wasserfall am Ende. Das leuchtend grüne Moos, das jede Oberfläche bedeckt, lässt diesen Ort wirklich magisch wirken.',
    description_zh: 'Nauthúsagil是隐藏在冰岛南部Hvolsvöllur附近的郁郁葱葱、苔藓覆盖的缝隙峡谷。一条悬挂的铁链引导游客穿越狭窄的峡谷岩壁，到达尽头一道精致的瀑布。覆盖每一处表面的鲜绿苔藓让这个地方显得真正神奇，是冰岛最上镜的隐秘宝藏之一。',
    latitude: 63.8167,
    longitude: -20.0333,
    category: 'hike',
    difficulty: 'medium',
    best_season: 'Summer (May–September)',
    photo_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    ]),
    google_maps_url: 'https://maps.google.com/?q=63.8167,-20.0333',
    region: 'South Iceland',
    parking_info: 'Small gravel car park at the trailhead off Route 261. Free.',
    drive_time_from_reykjavik: '~1.5 hours'
  },
  {
    name: 'Hrunalaug Hot Spring',
    description_en: 'Hrunalaug is a small, serene geothermal pool tucked into a hillside near Flúðir, known only to locals for generations. The natural pool holds perfectly warm water year-round, framed by a rustic wooden changing hut. Unlike Iceland\'s crowded tourist pools, this hidden gem offers a genuinely peaceful soak in complete solitude.',
    description_es: 'Hrunalaug es una pequeña y serena piscina geotérmica escondida en una ladera cerca de Flúðir, conocida solo por los lugareños durante generaciones. La piscina natural mantiene agua perfectamente templada durante todo el año, enmarcada por una rústica cabaña de madera para cambiarse. A diferencia de las concurridas piscinas turísticas de Islandia, esta joya ofrece un baño genuinamente tranquilo.',
    description_de: 'Hrunalaug ist ein kleiner, ruhiger Geothermie-Pool, der sich in einen Hang nahe Flúðir schmiegt und Generationen lang nur Einheimischen bekannt war. Der natürliche Pool hält das ganze Jahr über perfekt warmes Wasser, gerahmt von einer rustikalen Holzumkleidekabine. Im Gegensatz zu Islands überfüllten Touristenpools bietet dieses versteckte Juwel ein wirklich ruhiges Baden in völliger Einsamkeit.',
    description_zh: 'Hrunalaug是隐藏在Flúðir附近山坡上的一处小型宁静地热温泉池，几代人来只为当地人所知。这处天然温泉池全年保持完美温热的水温，周围环绕着质朴的木制更衣小屋。与冰岛拥挤的旅游温泉池不同，这处隐秘宝藏提供了真正宁静的独处泡浴体验。',
    latitude: 64.1267,
    longitude: -20.3494,
    category: 'hot_spring',
    difficulty: 'easy',
    best_season: 'Year-round',
    photo_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    google_maps_url: 'https://maps.google.com/?q=64.1267,-20.3494',
    region: 'South Iceland',
    parking_info: 'Roadside parking for ~5 cars near the Hrunamannavegur road. Free.',
    drive_time_from_reykjavik: '~1.5 hours'
  },
  {
    name: 'Kvernufoss',
    description_en: 'Kvernufoss is one of Iceland\'s best-kept secrets: a beautiful waterfall hidden just minutes away from the tourist crowds at Skógafoss, yet discovered by fewer than 1% of visitors. A short walk through a lush gorge leads you behind the waterfall itself, where you can stand inside the curtain of falling water for a completely unique experience.',
    description_es: 'Kvernufoss es uno de los secretos mejor guardados de Islandia: una hermosa cascada oculta a pocos minutos de las multitudes turísticas en Skógafoss, pero descubierta por menos del 1% de los visitantes. Un corto paseo por una frondosa garganta te lleva detrás de la propia cascada, donde puedes pararte dentro de la cortina de agua.',
    description_de: 'Kvernufoss ist eines der bestgehüteten Geheimnisse Islands: ein wunderschöner Wasserfall, der nur wenige Minuten von den Touristenmassen am Skógafoss entfernt versteckt ist, aber von weniger als 1% der Besucher entdeckt wird. Ein kurzer Spaziergang durch eine üppige Schlucht führt Sie hinter den Wasserfall selbst, wo Sie im Wasservorhang stehen können.',
    description_zh: 'Kvernufoss是冰岛保守得最好的秘密之一：一道美丽的瀑布就隐藏在Skógafoss游客人群几分钟路程之外，却不到1%的游客能发现它。穿过郁郁葱葱的峡谷，一段短暂步行将带你走到瀑布后方，你可以站在倾泻的水帘之内，体验完全独特的感受。',
    latitude: 63.5356,
    longitude: -19.5189,
    category: 'waterfall',
    difficulty: 'easy',
    best_season: 'Summer (May–October)',
    photo_url: 'https://images.unsplash.com/photo-1543965860-2843d3cf9e36?w=800&q=80',
    google_maps_url: 'https://maps.google.com/?q=63.5356,-19.5189',
    region: 'South Iceland',
    parking_info: 'Use the main Skógafoss / Skógar car park nearby. Free.',
    drive_time_from_reykjavik: '~2.5 hours'
  },
  {
    name: 'Stakkholtsgjá',
    description_en: 'Stakkholtsgjá is a spectacular hidden slot canyon inside the Þórsmörk nature reserve, carved by glacial meltwater into towering moss-draped basalt walls. A narrow path winds through the canyon to a tall, thin waterfall at its heart. The route involves boulder-hopping and wading a shallow stream, rewarding adventurous hikers with one of Iceland\'s most dramatic landscapes.',
    description_es: 'Stakkholtsgjá es un espectacular cañón ranura oculto dentro de la reserva natural de Þórsmörk, tallado por el deshielo glacial en imponentes paredes de basalto cubiertas de musgo. Un camino estrecho serpentea por el cañón hasta una alta y delgada cascada en su corazón. La ruta implica saltar rocas y vadear un arroyo poco profundo.',
    description_de: 'Stakkholtsgjá ist ein spektakulärer versteckter Slot-Canyon im Naturschutzgebiet Þórsmörk, der durch Gletscherschmelzwasser in aufragende, moosbedeckte Basaltwände gehauen wurde. Ein schmaler Pfad schlängelt sich durch den Canyon zu einem hohen, schmalen Wasserfall in seinem Herzen. Die Route erfordert das Klettern über Felsblöcke und Waten durch einen seichten Bach.',
    description_zh: 'Stakkholtsgjá是Þórsmörk自然保护区内一处壮观的隐秘缝隙峡谷，由冰川融水雕刻在高耸的苔藓覆盖玄武岩壁中。一条狭窄的小径蜿蜒穿越峡谷，通向其核心处一道细高的瀑布。路途需要跨越岩石和涉过浅溪，冒险的徒步者将获得冰岛最壮观的景观回报。',
    latitude: 63.6886,
    longitude: -19.4764,
    category: 'canyon',
    difficulty: 'medium',
    best_season: 'Summer (June–September)',
    photo_url: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80',
    google_maps_url: 'https://maps.google.com/?q=63.6886,-19.4764',
    region: 'South Iceland',
    parking_info: 'Þórsmörk parking areas inside the nature reserve. 4WD required. Reserve entry fee applies.',
    drive_time_from_reykjavik: '~3 hours (4WD required)'
  },
  {
    name: 'Hljóðaklettar',
    description_en: 'Hljóðaklettar, meaning "Echo Rocks", is a surreal landscape of cave-honeeycombed lava formations and twisted basalt columns along the Jökulsá á Fjöllum river. The rock formations create remarkable acoustic echoes that gave the area its name. This geological wonderland sits within Vatnajökull National Park and is one of the most otherworldly landscapes in all of Iceland.',
    description_es: 'Hljóðaklettar, que significa "Rocas del Eco", es un paisaje surrealista de formaciones de lava llenas de cuevas y retorcidas columnas de basalto a lo largo del río Jökulsá á Fjöllum. Las formaciones rocosas crean notables ecos acústicos que dieron nombre a la zona. Esta maravilla geológica se encuentra dentro del Parque Nacional Vatnajökull.',
    description_de: 'Hljóðaklettar, was "Echofelsen" bedeutet, ist eine surreale Landschaft aus höhlenreichen Lavaformationen und verdrehten Basaltsäulen entlang des Flusses Jökulsá á Fjöllum. Die Felsformationen erzeugen bemerkenswerte akustische Echos, die dem Gebiet seinen Namen gaben. Dieses geologische Wunderland liegt im Vatnajökull-Nationalpark.',
    description_zh: 'Hljóðaklettar意为"回声岩"，是沿Jökulsá á Fjöllum河分布的充满洞穴的熔岩地貌和扭曲玄武岩柱组成的超现实景观。这些岩石地貌产生了显著的声学回声，使该地区因此得名。这处地质奇境位于瓦特纳冰川国家公园内，是冰岛最有异世界感的景观之一。',
    latitude: 65.8944,
    longitude: -16.3897,
    category: 'viewpoint',
    difficulty: 'easy',
    best_season: 'Summer (June–August)',
    photo_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    google_maps_url: 'https://maps.google.com/?q=65.8944,-16.3897',
    region: 'Northeast Iceland',
    parking_info: 'Hljóðaklettar car park near Ásbyrgi canyon. Free.',
    drive_time_from_reykjavik: '~6 hours'
  },
  {
    name: 'Búðir Black Church',
    description_en: 'The Búðir Black Church is a striking 19th-century wooden church painted entirely in black, standing in solitude on the wild Snæfellsnes peninsula with the Snæfellsjökull glacier as its dramatic backdrop. Surrounded by ancient lava fields and with the North Atlantic close by, this hauntingly atmospheric spot makes for one of Iceland\'s most memorable photographs.',
    description_es: 'La Iglesia Negra de Búðir es una llamativa iglesia de madera del siglo XIX completamente pintada de negro, que se alza en soledad en la salvaje península de Snæfellsnes con el glaciar Snæfellsjökull como dramático telón de fondo. Rodeado de antiguos campos de lava y con el Atlántico Norte cercano, este lugar de atmósfera inquietante produce una de las fotografías más memorables de Islandia.',
    description_de: 'Die Schwarze Kirche von Búðir ist eine markante Holzkirche aus dem 19. Jahrhundert, die vollständig schwarz bemalt ist und einsam auf der wilden Snæfellsnes-Halbinsel steht, mit dem Snæfellsjökull-Gletscher als dramatischem Hintergrund. Umgeben von alten Lavafeldern und in der Nähe des Nordatlantiks ist dieser gespenstisch atmosphärische Ort eine der unvergesslichsten Fotografien Islands.',
    description_zh: 'Búðir黑色教堂是一座引人注目的19世纪木制教堂，通体漆黑，孤独矗立在狂野的Snæfellsnes半岛上，以Snæfellsjökull冰川为壮观背景。周围环绕古老熔岩田，北大西洋近在咫尺，这处令人难忘的神秘氛围地点是冰岛最经典的摄影取景地之一。',
    latitude: 64.8133,
    longitude: -23.3831,
    category: 'viewpoint',
    difficulty: 'easy',
    best_season: 'Year-round',
    photo_url: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=800&q=80',
    google_maps_url: 'https://maps.google.com/?q=64.8133,-23.3831',
    region: 'West Iceland',
    parking_info: 'Small gravel car park directly beside the church. Free.',
    drive_time_from_reykjavik: '~2 hours'
  },
  {
    name: 'Reykjadalur Hot River',
    description_en: 'Reykjadalur, "Steam Valley", is a geothermal valley where a natural hot river flows freely through a landscape of steaming vents, vibrant mineral colours, and wild Iceland scenery. A scenic 3 km hike up the valley brings you to where you can change into a swimsuit and bathe in the warm flowing river. One of Iceland\'s most accessible and unforgettable hidden experiences, just 45 minutes from the capital.',
    description_es: 'Reykjadalur, "Valle de Vapor", es un valle geotérmico donde un río caliente natural fluye libremente a través de un paisaje de respiraderos humeantes, colores minerales vibrantes y salvajes paisajes islandeses. Una pintoresca caminata de 3 km por el valle te lleva al lugar donde puedes ponerte el bañador y bañarte en el cálido río que fluye.',
    description_de: 'Reykjadalur, "Dampftal", ist ein geothermisches Tal, in dem ein natürlicher heißer Fluss frei durch eine Landschaft aus dampfenden Lüftungsschlitzen, lebhaften Mineralfarben und wilder isländischer Szenerie fließt. Eine malerische 3-km-Wanderung ins Tal bringt Sie dorthin, wo Sie in einen Badeanzug wechseln und im warmen fließenden Fluss baden können.',
    description_zh: 'Reykjadalur"蒸汽谷"是一处地热山谷，天然温泉河在蒸汽喷口、鲜艳矿物色彩和野性冰岛风光中自由流淌。沿山谷步行3公里的风景路线，便可到达换上泳衣在温暖流动的河水中沐浴的地方。距首都仅45分钟车程，是冰岛最易到达、最令人难忘的隐秘体验之一。',
    latitude: 64.0486,
    longitude: -21.1847,
    category: 'hot_spring',
    difficulty: 'medium',
    best_season: 'Year-round (especially magical in winter)',
    photo_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    google_maps_url: 'https://maps.google.com/?q=64.0486,-21.1847',
    region: 'South Iceland',
    parking_info: 'Paid car park at the Reykjadalur trailhead in Hveragerði (500 ISK/day).',
    drive_time_from_reykjavik: '~45 minutes'
  }
];

const existing = db.get('SELECT COUNT(*) as count FROM places');

if (!existing || existing.count === 0) {
  for (const p of places) {
    db.run(
      `INSERT INTO places
        (name, description_en, description_es, description_de, description_zh,
         latitude, longitude, category, difficulty, best_season,
         photo_url, google_maps_url, region, parking_info, drive_time_from_reykjavik, images, slug)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.name,
        p.description_en, p.description_es, p.description_de, p.description_zh,
        p.latitude, p.longitude,
        p.category, p.difficulty, p.best_season,
        p.photo_url, p.google_maps_url, p.region,
        p.parking_info, p.drive_time_from_reykjavik,
        p.images || null,
        slugify(p.name, { lower: true, strict: true })
      ]
    );
  }
  console.log(`🌱 Added ${places.length} places to the database.`);
} else {
  console.log(`📦 Database already contains ${existing.count} place(s).`);
}

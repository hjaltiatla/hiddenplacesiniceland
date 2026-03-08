/**
 * One-time script to add ES/DE/ZH translations for places 11–60.
 * Run with: node scripts/add-translations.js
 */

const db = require('../database/db');

const translations = [
  {
    id: 11,
    es: 'Haifoss es una de las cascadas más altas de Islandia con 122 metros, que se precipita en el cañón del río Fossá. A pesar de su impresionante escala, recibe solo una fracción de los visitantes que atrae el cercano Gullfoss. Desde el borde del cañón, la vista se abre hacia una grandiosidad volcánica primitiva: dos grandes cascadas, Haifoss y su vecina Granni, cayendo juntas al gorge.',
    de: 'Haifoss ist mit 122 Metern einer der höchsten Wasserfälle Islands und stürzt in den Fossá-Flusscañón. Trotz seiner atemberaubenden Größe empfängt er nur einen Bruchteil der Besucher, die das nahe gelegene Gullfoss anzieht. Vom Cañonrand öffnet sich der Blick auf rohe vulkanische Größe – zwei große Wasserfälle, Haifoss und sein Nachbar Granni, fallen Seite an Seite in die Schlucht.',
    zh: 'Haifoss是冰岛最高的瀑布之一，高达122米，飞泻入Fossá河峡谷。尽管规模令人叹为观止，其游客数量仅为附近Gullfoss的一小部分。从峡谷边缘望去，视野展开为原始火山壮景——Haifoss及其邻居Granni两条巨大瀑布并肩倾泻入下方峡谷。',
  },
  {
    id: 12,
    es: 'Glymur fue la cascada más alta de Islandia con 198 metros hasta 2011. Escondida al final de un estrecho fiordo, llegar a ella requiere cruzar un río sobre un puente de troncos, trepar por una cueva y caminar por cornisas expuestas en los acantilados. La recompensa es una vista espectacular hacia un profundo gorge donde la cascada truena abajo. Una de las caminatas ocultas más gratificantes de Islandia.',
    de: 'Glymur war bis 2011 mit 198 Metern der höchste Wasserfall Islands. Versteckt am Ende eines schmalen Fjords, erfordert das Erreichen das Überqueren eines Flusses auf einer Holzbrücke, das Klettern durch eine Höhle und das Wandern entlang exponierter Felssimse. Die Belohnung ist ein spektakulärer Blick in eine tiefe Schlucht, in der die Fälle donnern. Eine der lohnendsten versteckten Wanderungen Islands.',
    zh: 'Glymur直到2011年都是冰岛最高的瀑布，高198米。它隐藏在一条狭窄峡湾的尽头，前往此处需要在木桥上跨越河流、穿越山洞并沿着暴露的悬崖小道攀行。回报是一处深邃峡谷的壮观景色，瀑布在下方轰鸣作响。这是冰岛最值得体验的隐秘徒步路线之一。',
  },
  {
    id: 13,
    es: 'Dynjandi "Estrepitoso" es la joya de la corona de los Fiordos del Oeste, una majestuosa cascada en abanico de 100 metros de ancho en la cima que se estrecha hasta un solo hilo al precipitarse al valle. Una serie de cascadas más pequeñas jalonan el camino hasta su base. Como los Fiordos del Oeste son remotos y raramente visitados, este espectacular lugar a menudo está completamente desierto.',
    de: 'Dynjandi „Donnernd" ist das Kronjuwel der Westfjorde, ein majestätischer fächerförmiger Wasserfall, der oben 100 Meter breit ist und sich zu einem einzigen Faden verengt, wenn er ins Tal stürzt. Eine Reihe kleinerer Fälle säumt den Weg zu seiner Basis. Da die Westfjorde abgelegen und selten besucht werden, ist dieser spektakuläre Ort oft völlig verlassen.',
    zh: 'Dynjandi"轰鸣者"是西峡湾的明珠，是一道顶部宽达100米的雄伟扇形瀑布，向下倾泻至谷底时逐渐收窄为一条细线。通往瀑布底部的路上点缀着一系列小瀑布。由于西峡湾地处偏远，游客稀少，这处壮观的地点往往完全空无一人。',
  },
  {
    id: 14,
    es: 'Svartifoss, las "Cascadas Negras", cae 20 metros hasta una poza rodeada por una perfecta herradura de oscuras columnas de basalto, la inspiración geológica para la iglesia Hallgrímskirkja de Reikiavik. Una caminata de 1,5 km desde el centro de visitantes a través de un bosque de abedules lleva hasta ella. El contraste entre la cascada blanca y las oscuras columnas hexagonales es una de las composiciones naturales más icónicas de Islandia.',
    de: 'Svartifoss, die „Schwarzen Fälle", stürzt 20 Meter in ein Becken, umgeben von einem perfekten Hufeisen dunkler Basaltsäulen – die geologische Inspiration für die Hallgrímskirkja-Kirche in Reykjavik. Ein 1,5 km langer Wanderweg vom Besucherzentrum durch Birkenwald führt dorthin. Der Kontrast zwischen dem weißen Wasserfall und den dunklen sechseckigen Säulen ist eine der ikonischsten Naturkompositionen Islands.',
    zh: 'Svartifoss"黑色瀑布"从20米高处跌落至水潭，四周环绕着完美马蹄形的深色玄武岩柱，这是雷克雅未克Hallgrímskirkja教堂的地质灵感来源。从游客中心穿越桦树林步行1.5公里即可到达。白色瀑布与深色六边形岩柱之间的对比，是冰岛最具标志性的自然景观之一。',
  },
  {
    id: 15,
    es: 'Gljúfrabúi, el "Habitante del Gorge", es una espectacular cascada escondida dentro de un cañón ranura apenas lo suficientemente ancho para escurrirse. A solo cinco minutos de Seljalandsfoss, casi ningún visitante investiga la hendidura en el acantilado. En el interior, las cascadas caen 40 metros hasta una cámara circular de paredes musgosas. Debes vadear un arroyo poco profundo para entrar: lleva calzado impermeable.',
    de: 'Gljúfrabúi, der „Schluchtbewohner", ist ein spektakulärer Wasserfall, der in einem Slot-Canyon versteckt ist, der kaum breit genug zum Hindurchzwängen ist. Nur fünf Minuten von Seljalandsfoss entfernt, untersuchen fast keine Besucher den Spalt in der Felswand. Im Inneren fallen die Fälle 40 Meter in eine kreisförmige Kammer mit moosbedeckten Wänden. Sie müssen einen seichten Bach waten, um einzutreten – wasserdichte Schuhe mitbringen.',
    zh: 'Gljúfrabúi"峡谷居民"是一道壮观的瀑布，隐藏在一条勉强能侧身通过的缝隙峡谷内。距Seljalandsfoss仅五分钟路程，却几乎没有游客会去探究悬崖上的那道缝隙。里面，瀑布从40米高处跌入一个四壁覆满苔藓的圆形空间。进入时必须涉过一条浅溪——请穿防水鞋。',
  },
  {
    id: 16,
    es: 'Hraunfossar es a diferencia de cualquier otra cascada de Islandia: cientos de manantiales cristalinos emergen desde debajo de un campo de lava de 900 años durante casi un kilómetro a lo largo de la orilla del río. El agua ha filtrado a través de la lava porosa desde la erupción de Hallmundarhraun y aflora en una larga cortina de cintas azul-verdosas que fluyen hacia el glacial río Hvítá. Accesible durante todo el año, esta curiosidad geológica es una de las maravillas naturales más inesperadas de Islandia.',
    de: 'Hraunfossar ist anders als jeder andere Wasserfall in Island: Hunderte kristallklarer Quellen treten auf fast einem Kilometer entlang des Flussufers unter einem 900 Jahre alten Lavafeld hervor. Das Wasser hat seit dem Hallmundarhraun-Ausbruch durch poröse Lava gefiltert und taucht in einem langen Vorhang aus blaugrünen Bändern auf, die in den Gletscherfluss Hvítá fließen. Ganzjährig zugänglich, ist diese geologische Kuriosität eines der unerwartetsten Naturwunder Islands.',
    zh: 'Hraunfossar与冰岛其他任何瀑布都不同——数百处清澈泉眼从一片900年历史的熔岩地下沿河岸绵延近一公里涌出地面。这些水源自Hallmundarhraun火山喷发以来不断过滤熔岩岩孔，最终以一道绵延的蓝绿色水带呈现，流入冰川河Hvítá。全年可达，这一地质奇观是冰岛最出人意料的自然奇迹之一。',
  },
  {
    id: 17,
    es: 'Barnafoss, las "Cascadas de los Niños", es una violenta cascada donde el río Hvítá se aprieta a través de un estrecho gorge de lava de tono rojizo, a pocos minutos de Hraunfossar. La leyenda cuenta que dos niños cayeron de un arco natural de piedra que antes cruzaba el gorge; su madre afligida mandó destruir el arco. La fuerza bruta aquí, en contraste con los serenos manantiales de Hraunfossar, hace irresistible visitar ambos.',
    de: 'Barnafoss „Kinderfälle" ist ein gewaltsamer wirbelnder Wasserfall, wo der Fluss Hvítá sich durch eine enge rötlich gefärbte Lavaschlucht zwängt, nur wenige Minuten von Hraunfossar entfernt. Der Legende nach fielen zwei Kinder von einem natürlichen Steinbogen, der einst die Schlucht überspannte; ihre trauernde Mutter ließ den Bogen zerstören. Die rohe Kraft hier, im Kontrast zu den ruhigen Quellen von Hraunfossar, macht den Besuch beider unwiderstehlich.',
    zh: 'Barnafoss"儿童瀑布"是一道猛烈翻腾的瀑布，Hvítá河在此穿越一条狭窄的红色熔岩峡谷，距Hraunfossar仅几分钟路程。传说两个孩子从曾经横跨峡谷的天然石拱桥上坠落；悲痛的母亲下令将石拱摧毁。这里的原始力量与附近Hraunfossar宁静的泉水形成鲜明对比，令两处胜地都值得一游。',
  },
  {
    id: 18,
    es: 'Hengifoss es la tercera cascada más alta de Islandia con 128 metros, situada dentro de un cañón con llamativas franjas de arcilla roja y basalto negro: sedimentos de lecho lacustre depositados hace millones de años. La caminata de 2,5 km pasa por el impresionante Litlanesfoss de camino. A pesar de su impresionante altura y geología vívida, Hengifoss es una de las principales cascadas de Islandia más ignoradas, en gran parte porque se encuentra lejos de la ruta turística en el este.',
    de: 'Hengifoss ist mit 128 Metern der drittgrößte Wasserfall Islands, in einem Canyon mit auffälligen roten Ton- und schwarzen Basaltstreifen gelegen – uralte Seebettsedimente, die vor Millionen von Jahren abgelagert wurden. Die 2,5 km lange Wanderung passiert den atemberaubenden Litlanesfoss auf dem Weg. Trotz seiner beeindruckenden Höhe und lebhaften Geologie ist Hengifoss einer der am meisten übersehenen Hauptwasserfälle Islands, hauptsächlich weil er weit abseits der Touristenroute im Osten liegt.',
    zh: 'Hengifoss是冰岛第三高的瀑布，高达128米，位于一处拥有醒目红色黏土层与黑色玄武岩条纹的峡谷中——那是数百万年前沉积的古湖床沉积层。2.5公里的徒步路途会经过壮观的Litlanesfoss。尽管高度惊人、地质色彩鲜明，Hengifoss却是冰岛最被忽视的主要瀑布之一，主要原因是它位于偏远的东部，远离旅游路线。',
  },
  {
    id: 19,
    es: 'Litlanesfoss es una impresionante cascada de 30 metros enmarcada por una perfecta columnata de altas columnas de basalto en ambos lados, creando una catedral natural de roca hexagonal. Se encuentra en el camino hacia Hengifoss y es tan hermosa que muchos senderistas la consideran el punto culminante del sendero. La perfección geométrica de las columnas circundantes es extraordinaria: se alzan verticales y simétricas, mejor fotografiadas con la luz dorada de la tarde.',
    de: 'Litlanesfoss ist ein atemberaubender 30-Meter-Wasserfall, gerahmt von einer perfekten Kolonnade hoher Basaltsäulen auf beiden Seiten, die eine natürliche Kathedrale aus sechseckigem Gestein bilden. Er liegt auf dem Weg zu Hengifoss und ist so schön, dass viele Wanderer ihn als das Highlight des Weges betrachten. Die geometrische Perfektion der umgebenden Säulen ist außergewöhnlich – sie stehen aufrecht und symmetrisch und werden am besten im goldenen Abendlicht fotografiert.',
    zh: 'Litlanesfoss是一道令人叹为观止的30米瀑布，两侧被高大玄武岩柱组成的完美廊柱环绕，构成一座天然六边形岩石大教堂。它位于前往Hengifoss的路途中，美丽程度令许多徒步者认为它才是这段路线的真正亮点。四周岩柱的几何完美程度令人叹服——竖直而对称，在傍晚金色光线下拍摄效果最佳。',
  },
  {
    id: 20,
    es: 'Brúarfoss es conocida como la cascada más intensamente azul de Islandia: una vívida cascada turquesa alimentada por agua limpia de deshielo glacial filtrada a través de manantiales geotérmicos. Su brillante color proviene de una geología rica en sílice. Redescubierta por un blogger de viajes hace apenas una década tras años de oscuridad, sigue recibiendo muy pocos visitantes. La caminata de 3 km de ida y vuelta a lo largo del río Brúará transcurre por tranquilo páramo de abedules.',
    de: 'Brúarfoss gilt als Islands intensivster blauer Wasserfall – ein lebhafter türkisfarbener Wasserfall, gespeist von sauberem Gletscherschmelzwasser, das durch geothermische Quellen gefiltert wird. Seine brillante Farbe stammt aus siliciumreicher Geologie. Erst vor einem Jahrzehnt von einem Reiseblogger nach Jahren der Obscurität wiederentdeckt, empfängt er immer noch bemerkenswert wenige Besucher. Der 3 km lange Rundweg entlang des Brúará-Flusses führt durch ruhige Birkenmoore.',
    zh: 'Brúarfoss被誉为冰岛颜色最浓郁的蓝色瀑布——这是一道鲜明的绿松石色瀑布，由经地热泉过滤的纯净冰川融水补给。其艳丽的颜色源于富含硅的地质构造。仅十年前才被一位旅游博主重新发现，此前默默无闻多年，时至今日游客仍极为稀少。沿Brúará河3公里的往返步道穿越宁静的桦木荒原。',
  },
  {
    id: 21,
    es: 'Dettifoss es la cascada más poderosa de Europa: 100 metros de ancho, 44 metros de altura, descargando 193 metros cúbicos por segundo desde el glaciar Vatnajökull. La nube de spray es visible a kilómetros. Estar en el borde mientras el suelo vibra bajo los pies es un encuentro inolvidable con el poder geológico primitivo. A pesar de su fama, la ubicación remota significa que el acercamiento a menudo es tranquilo.',
    de: 'Dettifoss ist der stärkste Wasserfall Europas – 100 Meter breit, 44 Meter hoch, mit einem Durchfluss von 193 Kubikmetern pro Sekunde vom Vatnajökull-Gletscher. Die Sprühwolke ist kilometerweit sichtbar. Am Rand zu stehen, während der Boden unter den Füßen vibriert, ist eine unvergessliche Begegnung mit roher geologischer Kraft. Trotz seines Ruhms bedeutet die abgelegene Lage, dass der Anmarsch oft ruhig ist.',
    zh: 'Dettifoss是欧洲最强大的瀑布——宽100米、高44米，来自瓦特纳冰川的水流以每秒193立方米的速度倾泻而下。水雾云在数公里之外清晰可见。站在边缘，脚下地面震颤，是与原始地质力量的难忘邂逅。尽管声名远播，偏远的地理位置意味着前往的路途往往寂静无声。',
  },
  {
    id: 22,
    es: 'La Cascada Selfoss se encuentra a solo 1,5 km río arriba del famoso Dettifoss, pero recibe solo una fracción de sus visitantes. Donde Dettifoss es abrumador y gris, Selfoss es ancha y elegante: se extiende por 100 metros de plataformas de basalto en cascadas escalonadas. La mayoría de los visitantes que llegan a Dettifoss pasan directamente por el mirador de Selfoss sin detenerse.',
    de: 'Der Selfoss-Wasserfall liegt nur 1,5 km flussaufwärts vom berühmten Dettifoss, empfängt jedoch nur einen Bruchteil seiner Besucher. Wo Dettifoss überwältigend und grau ist, ist Selfoss breit und anmutig – er breitet sich über 100 Meter Basaltplatten in gestuften Kaskaden aus. Die meisten Besucher, die Dettifoss erreichen, gehen direkt am Selfoss-Aussichtspunkt vorbei, ohne anzuhalten.',
    zh: 'Selfoss瀑布位于著名的Dettifoss上游仅1.5公里处，却只吸引了后者极少数的游客。Dettifoss令人望而生畏、灰色磅礴，而Selfoss则宽广优美——以层叠的阶梯状瀑布横跨100米玄武岩台地。大多数抵达Dettifoss的游客径直路过Selfoss观景台而不停歇。',
  },
  {
    id: 23,
    es: 'Hafragilsfoss cae 27 metros dentro del cañón Jökulsárgjúfur justo aguas abajo de Dettifoss. Mientras Dettifoss acapara toda la atención, Hafragilsfoss es más ancho y bajo, extendiéndose por todo el ancho del cañón en una cortina de agua glacial. Las paredes del cañón aquí son de las más dramáticas del sistema Jökulsá á Fjöllum, con caras basálticas de cientos de metros en ambos lados.',
    de: 'Hafragilsfoss stürzt 27 Meter tief in den Jökulsárgjúfur-Canyon, direkt flussabwärts von Dettifoss. Während Dettifoss die ganze Aufmerksamkeit auf sich zieht, ist Hafragilsfoss breiter und flacher und erstreckt sich über die volle Canyonbreite in einem Vorhang aus Gletscherwasser. Die Canyonwände hier gehören zu den dramatischsten im Jökulsá á Fjöllum-System, mit senkrechten Basaltflächen, die auf beiden Seiten Hunderte von Metern aufragen.',
    zh: 'Hafragilsfoss在Dettifoss正下游的Jökulsárgjúfur峡谷内跌落27米。当Dettifoss独占所有目光时，Hafragilsfoss却更宽更平缓，以一道冰川水幕横跨峡谷全宽。这里的峡谷壁是Jökulsá á Fjöllum水系中最壮观的地段，两侧垂直玄武岩崖面高达数百米。',
  },
  {
    id: 24,
    es: 'Rjúkandi "Vaporoso" es una alta y esbelta cascada que se precipita desde una alta meseta hacia un valle escondido cerca de la costa del este de Islandia. Las caídas rocían con tanta fuerza que la niebla sube constantemente de la poza. Justo al lado de la Carretera de Circunvalación pero prácticamente desconocida para los turistas que pasan, se asienta en un frondoso gorge enmarcado por abedules y helechos. Un corto sendero lleva a la base.',
    de: 'Rjúkandi „Dampfend" ist ein hoher schlanker Wasserfall, der von einem hohen Plateau in ein verstecktes Tal nahe der Ostküste Islands stürzt. Die Fälle sprühen so heftig, dass Nebel ständig aus dem Becken aufsteigt. Direkt neben dem Ringweg, aber praktisch unbekannt bei vorbeifahrenden Touristen, liegt er in einer üppigen Schlucht, gerahmt von Birken und Farnen. Ein kurzer Weg führt zur Basis.',
    zh: 'Rjúkandi"蒸腾者"是一道高挑纤细的瀑布，从高原台地跌入冰岛东海岸附近的一处隐秘山谷。水流喷溅如此剧烈，薄雾不断从水潭中升腾而起。就在1号公路旁，却几乎不为过路游客所知，它坐落在一处由桦树和蕨类植物环抱的郁郁葱葱的峡谷中。一条短小径通往瀑布底部。',
  },
  {
    id: 25,
    es: 'Kirkjufellsfoss es una fotogénica doble cascada que fluye sobre suaves plataformas de lava con el icónico pico en forma de flecha de la montaña Kirkjufell perfectamente enmarcado detrás, una de las composiciones más fotografiadas de Islandia. En invierno las auroras boreales son frecuentemente visibles directamente sobre la montaña y las cascadas, creando una escena de cielo nocturno que atrae a fotógrafos de todo el mundo.',
    de: 'Kirkjufellsfoss ist ein fotogener Doppelwasserfall, der über sanfte Lavabänke fließt, mit dem ikonischen pfeilförmigen Gipfel des Berges Kirkjufell dahinter – eine der meistfotografierten Kompositionen Islands. Im Winter sind Nordlichter häufig direkt über dem Berg und den Fällen sichtbar und schaffen eine Nachthimmelszene, die Fotografen aus aller Welt anzieht.',
    zh: 'Kirkjufellsfoss是一道上镜的双瀑布，流过平缓的熔岩台地，标志性的箭头形山峰Kirkjufell完美地屹立在其后方——这是冰岛被拍摄最多的构图之一。冬季时，北极光常常直接出现在山峰和瀑布的正上方，营造出吸引全球摄影师慕名而来的夜空景观。',
  },
  {
    id: 26,
    es: 'Bjarnafoss cae en cascada por una empinada ladera verde directamente sobre la costa en la península de Snæfellsnes. Las caídas son visibles desde la carretera y desde el mar, donde sirvieron como hito de navegación para los marineros durante siglos. Pocos turistas se aventuran tan lejos a lo largo de la costa sur de Snæfellsnes, lo que hace de esta una parada genuinamente tranquila.',
    de: 'Bjarnafoss kaskadiert an einem steilen grünen Berghang direkt oberhalb der Küste der Snæfellsnes-Halbinsel herunter. Die Fälle sind von der Straße und vom Meer aus sichtbar, wo sie jahrhundertelang als Navigationsmerkmal für Seeleute dienten. Wenige Touristen wagen sich so weit an die Südküste von Snæfellsnes, was diesen Halt zu einem genuinen Ruhepunkt macht.',
    zh: 'Bjarnafoss从Snæfellsnes半岛海岸正上方的陡峭绿色山坡上倾泻而下。瀑布从公路和海面上清晰可见，几个世纪以来曾是水手的航海地标。很少有游客深入Snæfellsnes南海岸这么远，这使得这里成为一处真正宁静的停歇之所。',
  },
  {
    id: 27,
    es: 'Systrafoss es una grácil cascada que cae desde una alta meseta hasta el lago Systravatn sobre el pueblo de Kirkjubæjarklaustur. Nombrada en honor a las monjas de un convento medieval que existió aquí, las caídas tienen una calidad tranquila, casi reverente. El corto paseo hasta Systravatn conduce por un paisaje extraordinario de formaciones de lava y jardines de roca naturales.',
    de: 'Systrafoss ist ein anmutiger Wasserfall, der von einem hohen Plateau in den See Systravatn oberhalb des Dorfes Kirkjubæjarklaustur fällt. Benannt nach den Nonnen eines mittelalterlichen Klosters, das hier stand, haben die Fälle eine stille, fast ehrfürchtige Qualität. Der kurze Spaziergang zum Systravatn führt durch eine außergewöhnliche Landschaft aus Lavaformationen und natürlichen Felsgärten.',
    zh: 'Systrafoss是一道优雅的瀑布，从高原台地跌落至Kirkjubæjarklaustur村上方的Systravatn湖。以曾在此存在的中世纪修道院修女命名，这道瀑布带有一种宁静、近乎虔诚的气质。前往Systravatn的短途步行穿越一片由熔岩地貌和天然岩石花园构成的非凡景观。',
  },
  {
    id: 28,
    es: 'Stuðlagil es el cañón de columnas de basalto más espectacular de Islandia, solo revelado al mundo en 2016 cuando una presa río arriba bajó el río lo suficiente para exponer las extraordinarias formaciones rocosas debajo. Las paredes del cañón están llenas de columnas hexagonales perfectamente verticales que se alzan 30 metros desde un vívido río glacial turquesa. Ahora considerada una de las joyas naturales más finas de Islandia, sigue viendo solo una fracción de los visitantes que atraen los sitios más conocidos.',
    de: 'Stuðlagil ist Islands spektakulärster Basaltsäulencanyon, erst 2016 der Welt enthüllt, als ein Staudamm flussaufwärts den Fluss genug absenkte, um die außergewöhnlichen Felsformationen darunter freizulegen. Die Canyonwände sind mit perfekt vertikalen sechseckigen Säulen vollgepackt, die 30 Meter aus einem lebhaften türkisfarbenen Gletscherfluss aufragen. Heute als eines der schönsten Naturjuwelen Islands angesehen, empfängt er immer noch nur einen Bruchteil der Besucher bekannter Sehenswürdigkeiten.',
    zh: 'Stuðlagil是冰岛最壮观的玄武岩柱峡谷，直到2016年上游大坝降低水位、将下方非凡的岩石地貌暴露出来后，才为世人所知。峡谷壁密布完全垂直的六边形岩柱，从鲜艳的绿松石色冰川河中耸立30米。如今被视为冰岛最精美的自然宝石之一，但游客数量仍只是知名景点的一小部分。',
  },
  {
    id: 29,
    es: 'Fjaðrárgljúfur es un sinuoso cañón de 2 km de longitud y 100 metros de profundidad, tallado por el río Fjaðrá en roca palagonita blanda. Un estrecho río turquesa hilo entre paredes escarpadas cubiertas de musgo verde vivo. Un sendero en el borde ofrece vistas en constante cambio hacia el gorge. Aunque brevemente famoso tras aparecer en un videoclip musical, ha regresado a la relativa quietud.',
    de: 'Fjaðrárgljúfur ist ein gewundener Canyon, 2 km lang und 100 Meter tief, in weiches Palagonitgestein vom Fluss Fjaðrá gemeißelt. Ein schmaler türkisfarbener Fluss windet sich zwischen senkrechten Wänden, die mit leuchtendem grünem Moos bedeckt sind. Ein Randweg bietet sich ständig verändernde Aussichten in die Schlucht. Obwohl kurz berühmt nach dem Erscheinen in einem Musikvideo, ist er zur relativen Stille zurückgekehrt.',
    zh: 'Fjaðrárgljúfur是一条蜿蜒的峡谷，长2公里、深100米，由Fjaðrá河切入柔软的橙玄武岩中雕刻而成。一条狭窄的绿松石色河流蜿蜒穿行于覆满鲜绿苔藓的陡峭峡谷壁之间。沿峡谷边缘的小径可欣赏不断变换的峡谷景色。尽管曾因出现在一段音乐视频中而短暂走红，现已重归相对宁静。',
  },
  {
    id: 30,
    es: 'Eldgjá "Cañón de Fuego" es el cañón volcánico más grande del mundo con 270 km de longitud, formado por una catastrófica erupción del año 939 d.C. que fue la mayor erupción de lava en la historia humana registrada. Una dramática cascada, Ófærufoss, se precipita en el suelo del cañón. El acercamiento por la carretera F es largo y requiere un 4WD, pero la escala descomunal recompensa a quienes hacen el esfuerzo.',
    de: 'Eldgjá „Feuercanyon" ist der größte Vulkancanyon der Welt mit 270 km Länge, gebildet durch einen katastrophalen Ausbruch 939 n. Chr., der der größte Lavaausbruch in der aufgezeichneten Menschheitsgeschichte war. Ein dramatischer Wasserfall, Ófærufoss, stürzt in den Canyonboden. Die Zufahrt auf der F-Straße ist lang und erfordert ein 4WD-Fahrzeug, aber die Größenordnung belohnt jene, die die Mühe auf sich nehmen.',
    zh: 'Eldgjá"火焰峡谷"是世界上最大的火山峡谷，全长270公里，由公元939年一次灾难性喷发形成，是有记录以来人类历史上最大的熔岩喷发。一道壮观的瀑布Ófærufoss飞泻入峡谷底部。F级公路路途漫长，需要四驱车辆，但其宏大规模足以回报所有付出努力前来的人。',
  },
  {
    id: 31,
    es: 'Ásbyrgi es un cañón en forma de herradura de 3,5 km de longitud, cerrado en tres lados por paredes de basalto de 100 metros. La mitología nórdica sostiene que fue formado por el casco del caballo de ocho patas de Odín, Sleipnir. Los geólogos creen que fue tallado por una inundación glacial catastrófica. El suelo del cañón está lleno de bosque de abedules y un pequeño lago: un tranquilo oasis verde en el austero paisaje de las tierras altas.',
    de: 'Ásbyrgi ist ein hufeisenförmiger Canyon, 3,5 km lang, auf drei Seiten von senkrechten 100-Meter-Basaltwänden umschlossen. Die nordische Mythologie besagt, er wurde durch den Huf von Odins achtbeinigem Pferd Sleipnir geformt. Geologen glauben, er wurde durch eine katastrophale Gletscherflut geschaffen. Der Canyonboden ist mit Birkenwald und einem kleinen See gefüllt – eine geschützte grüne Oase in der kargen Hochlandlandschaft.',
    zh: 'Ásbyrgi是一处马蹄形峡谷，长3.5公里，三面被高达100米的垂直玄武岩壁环抱。北欧神话认为它是奥丁的八腿神马Sleipnir的蹄印所留。地质学家认为它是由一场灾难性冰川洪水冲刷而成。峡谷底部覆满桦树林和一处小湖——在荒凉的高地景观中是一片受庇护的绿色绿洲。',
  },
  {
    id: 32,
    es: 'Kolugljúfur es un espectacular cañón de paredes rojizas tallado por el río Víðidalsá, accesible directamente desde la Carretera de Circunvalación y prácticamente desconocido para los turistas. Las paredes del gorge están teñidas de ocre profundo y carmesí por la roca volcánica rica en hierro, y una cascada de múltiples niveles truena en su base. Un sencillo mirador vallado cuelga directamente sobre el borde del cañón, con una vertiginosa caída directa al agua que corre abajo.',
    de: 'Kolugljúfur ist ein spektakulärer rotgewandeter Canyon, in den Víðidalsá-Fluss gemeißelt, direkt vom Ringweg zugänglich und Touristen fast völlig unbekannt. Die Schluchtwände sind durch eisenreiches Vulkangestein in tiefes Ocker und Karmesin gefärbt, und ein mehrstufiger Wasserfall donnert an seiner Basis. Ein einfacher eingezäunter Aussichtspunkt hängt direkt über dem Canyonrand – ein schwindelerregender Abfall direkt in das darunter strömende Wasser.',
    zh: 'Kolugljúfur是一处壮观的红色峡谷，由Víðidalsá河雕刻而成，可从1号公路直接进入，却几乎不为游客所知。峡谷壁因富含铁质的火山岩而被染成深赭色和深红色，底部一道多级瀑布轰鸣作响。一处简单的围栏观景台直接悬悬于峡谷边缘——俯瞰下方激流的垂直落差令人目眩。',
  },
  {
    id: 33,
    es: 'Landmannalaugar es un extraordinario paisaje de tierras altas de campos de lava de obsidiana, montañas de riolita multicolor en tonos rosas, verdes y morados, y aguas termales naturales donde los senderistas se remajan después del sendero Laugavegur. El río caliente natural que emerge desde debajo de la lava es lo suficientemente cálido para bañarse durante todo el año. El acceso requiere un 4WD a través de cruces de ríos en la F208: vale cada kilómetro.',
    de: 'Landmannalaugar ist eine außergewöhnliche Hochlandlandschaft aus Obsidianlavafeldern, bunten Rhyolithbergen in Rosa-, Grün- und Lilatönen und natürlichen heißen Quellen, wo Wanderer nach dem Laugavegur-Trail entspannen. Der natürliche heiße Fluss, der unter der Lava hervorkommt, ist ganzjährig warm genug zum Baden. Der Zugang erfordert ein 4WD-Fahrzeug durch Flussüberquerungen auf der F208 – jeden Kilometer wert.',
    zh: 'Landmannalaugar是一片非凡的高地景观，由黑曜石熔岩田、粉色、绿色和紫色等多彩流纹岩山地以及天然温泉构成，徒步Laugavegur路线的登山者在此泡浴放松。从熔岩下涌出的天然温泉河全年温度适宜沐浴。前往需要驾驶四驱车穿越F208公路的多处河流——每一公里都物有所值。',
  },
  {
    id: 34,
    es: 'Seljavallalaug es la piscina de natación más antigua de Islandia, construida en 1923 y alimentada por agua geotérmica natural. Situada en un estrecho gorge entre empinadas paredes de montaña cubiertas de hierba, se siente completamente alejada del mundo moderno. La piscina es gratuita, sin calefacción excepto por el manantial, y en gran parte no descubierta a pesar de estar a solo 2 km de la Carretera de Circunvalación. La caminata de 15 minutos a través del gorge, con cascadas en las paredes del acantilado, es razón suficiente para visitar.',
    de: 'Seljavallalaug ist Islands ältestes Schwimmbad, gebaut 1923 und von natürlichem Geothermiewasser gespeist. In einer engen Schlucht zwischen steilen grasbedeckten Bergwänden gelegen, fühlt es sich vollständig von der modernen Welt abgeschieden an. Das Becken ist kostenlos, nur durch die Quelle beheizt und trotz des nur 2 km vom Ringweg entfernten Standorts weitgehend unentdeckt. Der 15-minütige Weg durch die Schlucht mit Wasserfällen an den Kliffwänden ist Grund genug für einen Besuch.',
    zh: 'Seljavallalaug是冰岛最古老的游泳池，建于1923年，由天然地热水补给。它坐落在一条狭窄峡谷中，两侧是陡峭的草覆山壁，令人感觉与现代世界完全隔绝。泳池免费开放，仅由天然泉水加热，尽管距1号公路只有2公里，却大多未被发现。穿越峡谷、沿途悬崖飞瀑的15分钟步行本身就已值得一来。',
  },
  {
    id: 35,
    es: 'Kerlingarfjöll es un espectacular área geotérmica de tierras altas con fumarolas humeantes, vívidos depósitos de azufre naranja y amarillo, y aguas termales situadas frente a picos de riolita nevados. Múltiples senderos de senderismo cruzan el área. Las fuentes naturales y las ventilas de vapor crean un ambiente surrealista, casi marciano. El campamento aquí es uno de los más dramáticamente situados de Islandia, con vistas a montañas en todas direcciones.',
    de: 'Kerlingarfjöll ist ein spektakuläres geothermisches Hochlandgebiet mit dampfenden Fumarolen, lebhaften orange-gelben Schwefelablagerungen und heißen Quellen vor schneebedeckten Rhyolithgipfeln. Mehrere Wanderwege durchqueren das Gebiet. Die natürlichen heißen Töpfe und Dampfventile schaffen eine surreale, fast marsähnliche Umgebung. Der Campingplatz hier ist einer der dramatischsten Islands, mit Bergblicken in jede Richtung.',
    zh: 'Kerlingarfjöll是一处壮观的高地地热区，冒着蒸汽的喷气孔、鲜艳的橙黄色硫磺沉积物和温泉分布在白雪覆盖的流纹岩山峰脚下。多条徒步路线在此交汇。天然热泉和蒸汽孔创造出一种超现实、近乎火星的环境。这里的营地是冰岛位置最为壮观的营地之一，四面八方皆有山景。',
  },
  {
    id: 36,
    es: 'Krauma es una instalación de baños geotérmicos bellamente diseñada alimentada por Deildartunguhver, el manantial de agua caliente más poderoso de Europa, a solo metros de distancia. El agua hirviente del manantial se mezcla con agua glacial para crear piscinas exteriores a temperaturas de baño perfectas. A diferencia de la masificada Laguna Azul, Krauma se siente íntima y sin prisa, situada en tranquilos entornos naturales cerca de Reykholt.',
    de: 'Krauma ist eine wunderschön gestaltete geothermische Badeanlage, gespeist von Deildartunguhver – Europas stärkstem heißem Quellwasser – nur wenige Meter entfernt. Das kochende Quellwasser wird mit Gletscherwasser gemischt, um Außenbecken bei perfekten Badetemperaturen zu schaffen. Im Gegensatz zur überfüllten Blauen Lagune fühlt sich Krauma intim und ruhig an, eingebettet in friedliche Naturumgebung nahe Reykholt.',
    zh: 'Krauma是一处设计精美的地热浴场，由仅数米之遥的欧洲流量最大的温泉Deildartunguhver提供水源。沸腾的泉水与冰川水混合，形成温度恰到好处的户外温泉池。与人满为患的蓝湖不同，Krauma感觉亲密而从容，坐落在Reykholt附近宁静的自然环境中。',
  },
  {
    id: 37,
    es: 'Grjótagjá es una pequeña cueva de lava que contiene un exquisitamente azul estanque geotérmico, accesible a través de una estrecha grieta en la tierra. Ganó reconocimiento mundial como lugar de rodaje en Juego de Tronos. Los lugareños nadaban aquí hasta que una erupción en la década de 1970 elevó la temperatura demasiado. El interior de la cueva brilla con un etéreo azul gracias a la luz solar que penetra a través de las grietas en el techo de lava.',
    de: 'Grjótagjá ist eine kleine Lavahöhle mit einem brillant blauen geothermischen Pool, zugänglich durch einen schmalen Riss in der Erde. Sie erlangte weltweite Anerkennung als Drehort in Game of Thrones. Einheimische schwammen hier, bis ein Ausbruch in den 1970er Jahren die Temperatur zu hoch ansteigen ließ. Der Höhleninnenraum leuchtet durch ätherisches Blau von Sonnenlicht, das durch Risse in der Lavadecke eindringt.',
    zh: 'Grjótagjá是一处小型熔岩洞穴，内有一潭湛蓝的地热水池，可通过地面的一道狭窄裂缝进入。它因作为《权力的游戏》拍摄地而获得全球声誉。当地人曾在此游泳，直到1970年代的一次喷发使水温过高。洞穴内部因阳光透过熔岩顶部裂缝渗入而呈现出空灵的蓝色光芒。',
  },
  {
    id: 38,
    es: 'Deildartunguhver es el manantial de agua caliente de mayor caudal de Europa, descargando 180 litros de agua a 100°C por segundo en un torrente constante de agua hirviente y vapor. Tan poderoso que ha abastecido de agua caliente a ciudades a 75 km de distancia desde 1978. Puedes estar en un camino seguro inmediatamente al lado del flujo hirviente: el calor y el ruido son abrumadores.',
    de: 'Deildartunguhver ist Europas heißeste Quelle mit dem höchsten Durchfluss und gibt 180 Liter 100°C heißes Wasser pro Sekunde in einem konstanten donnernden Strom aus kochendem Wasser und Dampf ab. So leistungsfähig, dass er seit 1978 Städte 75 km entfernt mit Warmwasser versorgt. Man kann auf einem sicheren Weg unmittelbar neben dem kochenden Strom stehen – die Hitze und der Lärm sind überwältigend.',
    zh: 'Deildartunguhver是欧洲流量最大的温泉，以每秒180升100°C沸水的速度源源不断地喷涌，形成一道沸水与蒸汽交织的轰鸣水流。其能量之强大，自1978年起就为75公里外的城镇供应热水。你可以站在紧邻沸腾水流的安全小径上——热浪和轰鸣令人不知所措。',
  },
  {
    id: 39,
    es: 'Lýsuhóll es una pequeña piscina geotérmica en una granja de caballos de trabajo en la península de Snæfellsnes, alimentada por un manantial rico en minerales y rodeada de tierra de cultivo abierta con vistas al glaciar Snæfellsjökull. La piscina tiene un inusual tinte naranja profundo de su alto contenido mineral. Completamente fuera de la ruta turística: la mayoría de los días es posible que la tengas completamente para ti solo.',
    de: 'Lýsuhóll ist ein kleiner Geothermiepool auf einem arbeitenden Pferdehof auf der Snæfellsnes-Halbinsel, gespeist von einer mineralreichen Quelle und umgeben von offenem Farmland mit Blick auf den Snæfellsjökull-Gletscher. Der Pool hat einen ungewöhnlichen tieforangenen Schimmer durch seinen hohen Mineralgehalt. Völlig abseits der Touristenroute – an den meisten Tagen kann man ihn ganz für sich allein haben.',
    zh: 'Lýsuhóll是Snæfellsnes半岛一处运作中的马场上的小型地热温泉池，由富含矿物质的泉水补给，四周是能俯瞰Snæfellsjökull冰川的开阔农田。温泉池因其高矿物质含量而呈现出特别的深橙色调。完全偏离旅游路线——大多数日子里，你可能独享这片天地。',
  },
  {
    id: 40,
    es: 'Þórsmörk "Bosque de Thor" es un espectacular valle de tierras altas enclavado entre tres glaciares: Eyjafjallajökull, Mýrdalsjökull y Tindfjallajökull. El valle está cubierto de bosque de abedules plateados, atravesado por ríos glaciales, y rodeado de picos dramáticos. Es el término del sendero Laugavegur, pero sigue siendo poco concurrido y en gran parte no descubierto por los turistas ocasionales.',
    de: 'Þórsmörk „Thors Wald" ist ein spektakuläres Hochlandtal, eingebettet zwischen drei Gletschern: Eyjafjallajökull, Mýrdalsjökull und Tindfjallajökull. Das Tal ist mit Silberbirkenwald bedeckt, von Gletscherflüssen durchzogen und von dramatischen Gipfeln umgeben. Es ist der Endpunkt des Laugavegur-Trails, bleibt aber wenig überfüllt und wird von Gelegenheitstouristen weitgehend unentdeckt.',
    zh: 'Þórsmörk"托尔之林"是一处壮观的高地山谷，嵌套在Eyjafjallajökull、Mýrdalsjökull和Tindfjallajökull三座冰川之间。山谷中覆满银桦树林，冰川河流纵横交错，四周群峰险峻。这里是Laugavegur路线的终点，却依然人少清静，大多数普通游客尚未发现它的魅力。',
  },
  {
    id: 41,
    es: 'Hverfjall es un volcán de anillo de tefra perfectamente simétrico que se eleva 160 metros sobre la cuenca del lago Mývatn, formado hace unos 2.500 años. El cráter tiene 1 km de ancho y el paseo por el borde lleva aproximadamente una hora, ofreciendo vistas panorámicas sobre toda la región de Mývatn: sus formaciones de lava, lagos, áreas geotérmicas y volcanes distantes. Llamativamente visible desde la carretera, la mayoría de los visitantes pasan en coche sin detenerse a subirlo.',
    de: 'Hverfjall ist ein perfekt symmetrischer Tephraringvulkan, der 160 Meter über das Mývatn-Seebecken aufragt und vor etwa 2.500 Jahren gebildet wurde. Der Krater ist 1 km breit, und der Rundweg dauert etwa eine Stunde und bietet Panoramablicke über die gesamte Mývatn-Region – ihre Lavaformationen, Seen, geothermischen Gebiete und fernen Vulkane. Auffällig von der Straße aus sichtbar, fahren die meisten Besucher vorbei, ohne anzuhalten.',
    zh: 'Hverfjall是一座完美对称的火山灰环形火山，在约2500年前形成，耸立于Mývatn湖盆地上方160米处。火山口直径1公里，沿口环行约需一小时，可俯瞰整个Mývatn地区的全景——包括熔岩地貌、湖泊、地热区和远处的火山群。从公路上清晰可见，但大多数游客驾车经过而不停下来攀登。',
  },
  {
    id: 42,
    es: 'Víti "Infierno" es un lago de cráter de explosión cerca de Askja, lleno de agua geotérmica azul opaca y lechosa a unos 25°C, lo suficientemente cálida para nadar. El viaje en 4WD a través del desierto de lava Ódáðahraun lleva horas, pasando por uno de los paisajes más desolados de la Tierra. Bañarse en el cráter rodeado de montañas volcánicas negras es una de las experiencias más surrealistas de Islandia.',
    de: 'Víti „Hölle" ist ein Explosionskrater-See nahe Askja, gefüllt mit undurchsichtig milchig-blauem Geothermiewasser bei etwa 25°C – warm genug zum Schwimmen. Die 4WD-Reise durch die Ódáðahraun-Lavawüste dauert Stunden und passiert eine der trostlosesten Landschaften der Erde. Im Krater zu baden, umgeben von schwarzen Vulkankegeln, ist eine der surrealsten Erfahrungen Islands.',
    zh: 'Víti"地狱"是Askja附近的一处爆炸坑湖，湖中充满约25°C的不透明乳蓝色地热水——足以游泳。驾驶四驱车穿越Ódáðahraun熔岩荒漠前往的路途需要数小时，途经地球上最荒凉的景观之一。在四周环绕黑色火山山地的火山口中沐浴，是冰岛最超现实的体验之一。',
  },
  {
    id: 43,
    es: 'Saxhóll es un cráter volcánico perfectamente formado en la península de Snæfellsnes con una escalera de peldaños de madera hasta el borde. El ascenso de 15 minutos pasa por escoria rojiza, y la cumbre ofrece una vista de 360° sobre los campos de lava de Snæfellsjökull y el propio glaciar. El Parque Nacional Snæfellsjökull lo rodea, pero Saxhóll raramente tiene más de un puñado de visitantes en cualquier momento.',
    de: 'Saxhóll ist ein perfekt geformter Vulkankrater auf der Snæfellsnes-Halbinsel mit einer Holztreppe zum Rand. Der 15-minütige Aufstieg führt durch rötliche Schlacke, und der Gipfel bietet einen 360°-Blick über Snæfellsjökull-Lavafelder und den Gletscher selbst. Snæfellsjökull-Nationalpark umgibt ihn, dennoch hat Saxhóll selten mehr als eine Handvoll Besucher zu einer Zeit.',
    zh: 'Saxhóll是Snæfellsnes半岛上一座形态完美的火山口，有一条木制阶梯通向火山口边缘。15分钟的攀登途经红色火山渣，山顶可俯瞰Snæfellsjökull熔岩田和冰川的360°全景。周围是Snæfellsjökull国家公园，但Saxhóll在任何时候都很少有超过几名游客。',
  },
  {
    id: 44,
    es: 'Grábrókargigar es un conjunto de cráteres volcánicos rojos y naranja formados hace unos 3.400 años, que se elevan desde un vasto campo de lava. Un sendero circular con pasarela sube hasta el borde del cráter principal, con vistas sobre la lava circundante y las montañas distantes. Los extraordinarios colores de roca volcánica roja, naranja y morada son sorprendentes. Justo al lado de la carretera principal entre Reikiavik y Snæfellsnes, sin embargo, inexplicablemente ignorado por la mayoría de los turistas que pasan.',
    de: 'Grábrókargigar ist eine Gruppe roter und oranger Vulkankrater, die vor etwa 3.400 Jahren gebildet wurden und aus einem riesigen Lavafeld aufragen. Ein kreisförmiger Bohlenweg führt zum Hauptkraterrand hinauf, mit Blicken über die umliegende Lava und ferne Berge. Die leuchtend roten, orangen und violetten Vulkangesteinsfarben sind außergewöhnlich. Direkt neben der Hauptstraße zwischen Reykjavik und Snæfellsnes, jedoch unerklärlich von den meisten vorbeifahrenden Touristen übersehen.',
    zh: 'Grábrókargigar是一组约3400年前形成的红色和橙色火山口，从广阔的熔岩田中耸起。一条环形木栈道通往主火山口边缘，可俯瞰四周熔岩田和远处山地。红色、橙色和紫色火山岩的鲜艳色彩令人叹为观止。就在雷克雅未克与Snæfellsnes之间的主干道旁，却莫名其妙地被大多数过路游客忽视。',
  },
  {
    id: 45,
    es: 'Snæfellsjökull es el glaciar que corona el volcán de 1.446 metros en la punta de la península de Snæfellsnes: el volcán del "Viaje al Centro de la Tierra" de Julio Verne. Las excursiones guiadas al glaciar cruzan el casquete de hielo con crampones y piolets. En días claros, la cumbre ofrece vistas al otro lado del mar hacia los Fiordos del Oeste. El glaciar se retira rápidamente y puede desaparecer en cuestión de décadas.',
    de: 'Snæfellsjökull ist der Gletscher, der den 1.446 Meter hohen Vulkan an der Spitze der Snæfellsnes-Halbinsel bedeckt – Jules Vernes „Reise zum Mittelpunkt der Erde"-Vulkan. Geführte Gletscherwanderungen überqueren die Eiskappe mit Steigeisen und Eispickeln. An klaren Tagen bietet der Gipfel Blicke über das Meer zu den Westfjorden. Der Gletscher zieht sich rasch zurück und könnte innerhalb von Jahrzehnten verschwinden.',
    zh: 'Snæfellsjökull是覆盖在Snæfellsnes半岛尖端1446米高火山上的冰川——儒勒·凡尔纳《地心游记》中的那座火山。有导游带领的冰川徒步之旅穿越冰盖，配备冰爪和冰镐。晴天时，山顶可眺望对面海湾的西峡湾。这座冰川正在迅速退缩，可能在数十年内消失。',
  },
  {
    id: 46,
    es: 'Skaftafell es un oasis protegido de bosque de abedules y praderas floridas bajo el casquete de hielo de Vatnajökull. Múltiples senderos parten del centro de visitantes, pasando cascadas, lenguas de glaciares y miradores panorámicos en las crestas. La icónica cascada Svartifoss está a 1,5 km de distancia, y la lengua glaciar Skaftafellsjökull es accesible mediante cortas caminatas guiadas sobre el hielo. El microclima aquí es el más cálido y soleado de Islandia.',
    de: 'Skaftafell ist eine geschützte Oase aus Birkenwald und blühenden Wiesen unter dem Vatnajökull-Eisdecke. Mehrere Wege führen vom Besucherzentrum aus, vorbei an Wasserfällen, Gletscherzungen und Panorama-Aussichtspunkten auf Bergrücken. Der ikonische Svartifoss-Wasserfall ist 1,5 km entfernt, und die Gletscherzunge Skaftafellsjökull ist über kurze geführte Eiswanderungen zugänglich. Das Mikroklima hier ist das wärmste und sonnigste Islands.',
    zh: 'Skaftafell是隐藏在瓦特纳冰川冰盖下方的一片受庇护的桦树林与繁花草地绿洲。多条步道从游客中心延伸而出，途经瀑布、冰川舌和山脊全景观景点。标志性的Svartifoss瀑布距此1.5公里，Skaftafellsjökull冰川舌可通过短途导游冰上徒步到达。这里的微气候是冰岛最温暖、最阳光充沛的地区。',
  },
  {
    id: 47,
    es: 'El Sendero Laugavegur es una de las grandes rutas de senderismo del mundo: un viaje de varios días de 55 km desde las tierras altas geotérmicas de Landmannalaugar a través de desiertos volcánicos, valles glaciales, campos de lava y gargantas verdes hasta los bosques de abedules de Þórsmörk. Pasa por flujos de obsidiana, montañas de riolita en colores neón, aguas termales activas y un desierto prístino que ninguna carretera alcanza.',
    de: 'Der Laugavegur-Trail ist eine der großen Wanderrouten der Welt – eine mehrtägige Reise von 55 km von den geothermischen Hochlagen von Landmannalaugar durch Vulkanwüsten, Gletschertäler, Lavafelder und grüne Schluchten zu den Birkenwäldern von Þórsmörk. Er passiert Obsidianströme, Rhyolithberge in Neonfarben, aktive heiße Quellen und unberührte Wildnis, die keine Straße erreicht.',
    zh: 'Laugavegur路线是世界上最伟大的徒步路线之一——一段55公里的多日旅程，从Landmannalaugar地热高地出发，穿越火山荒漠、冰川山谷、熔岩田和绿色峡谷，最终抵达Þórsmörk的桦木森林。途中经过黑曜石岩流、霓虹色彩的流纹岩山地、活跃温泉，以及任何公路都无法触达的原始荒野。',
  },
  {
    id: 48,
    es: 'Vestrahorn es una dramática montaña triangular que se eleva casi verticalmente desde la playa de arena negra en Stokksnes, cerca de Höfn. Los picos dentados reflejados en la laguna de marea sobre la arena negra crean una de las composiciones más fotografiadas de Islandia. Un decorado de una aldea vikinga añade un elemento cinematográfico. El sitio cobra una modesta tarifa de acceso, manteniendo las multitudes manejables.',
    de: 'Vestrahorn ist ein dramatischer dreieckiger Berg, der fast senkrecht aus dem schwarzen Sandstrand in Stokksnes nahe Höfn aufsteigt. Die gezackten Gipfel, gespiegelt in der Gezeiten-Lagune vor schwarzen Sanddünen, schaffen eine der meistfotografierten Kompositionen Islands. Ein Wikingerdorf-Filmset fügt ein filmisches Element hinzu. Die Stätte erhebt eine moderate Zutrittgebühr, die Menschenmengen in Grenzen hält.',
    zh: 'Vestrahorn是一座壮观的三角形山峰，从Höfn附近Stokksnes的黑色沙滩上几乎垂直耸起。参差的山峰倒映在黑色沙丘前方的潮汐泻湖中，构成冰岛被拍摄最多的构图之一。一处维京村落电影布景增添了电影般的元素。该地点收取适度的入场费，以保持游客数量可控。',
  },
  {
    id: 49,
    es: 'Kerið es un cráter volcánico de explosión de 3.000 años con llamativas paredes rojas y ocres que descienden 55 metros hasta un vívido lago aguamarina. El contraste de colores: suelo volcánico rojo sangre contra un intenso agua azul-verdosa, hace que sea uno de los elementos naturales más visualmente llamativos de Islandia. Un camino rodea todo el borde en menos de 15 minutos y un camino empinado lleva al lago.',
    de: 'Kerið ist ein 3.000 Jahre alter Explosionskrater mit auffällig roten und ockerfarbenen Wänden, die 55 Meter zu einem leuchtend aquamarinen See hinunterfallen. Der Farbkontrast – blutroter Vulkanboden gegen intensiv blaugrünes Wasser – macht es zu einem der visuell auffälligsten Naturmerkmale Islands. Ein Pfad umrundet den gesamten Rand in unter 15 Minuten, und ein steiler Pfad führt zum See.',
    zh: 'Kerið是一座3000年历史的火山爆炸坑，鲜艳的红色和赭色火山壁向下延伸55米，底部是一汪鲜艳的碧绿湖水。血红火山土与浓郁蓝绿湖水之间的色彩对比，使其成为冰岛视觉上最引人注目的自然地貌之一。一条小径不到15分钟便可绕火山口一圈，另有一条陡峭小径通往湖边。',
  },
  {
    id: 50,
    es: 'Arnarstapi es un pequeño pueblo pesquero en la península de Snæfellsnes rodeado de extraordinarias formaciones de lava costera: arcos, pilares marinos, respiraderos y esculturas naturales talladas por el Atlántico Norte durante milenios. Un sendero costero de 2,5 km lo conecta con el pueblo de Hellnar a través de una geología dramática, con frailecillos anidando en las caras de los acantilados en verano.',
    de: 'Arnarstapi ist ein kleines Fischerdorf auf der Snæfellsnes-Halbinsel, umgeben von außergewöhnlichen Küstenlavaformationen – Bögen, Meeressäulen, Blaslöchern und natürlichen Skulpturen, die der Nordatlantik über Jahrtausende gemeißelt hat. Ein 2,5 km langer Küstenweg verbindet es mit dem Dorf Hellnar durch dramatische Geologie, wobei im Sommer Papageientaucher in den Kliffseiten nisten.',
    zh: 'Arnarstapi是Snæfellsnes半岛上的一个小渔村，周围环绕着北大西洋历经数千年雕刻而成的非凡海岸熔岩地貌——拱门、海蚀柱、喷水孔和天然雕塑。一条2.5公里的海岸步道穿越壮观的地质地貌，将其与Hellnar村相连，夏季时北极海鹦在崖壁上筑巢。',
  },
  {
    id: 51,
    es: 'Lóndrangar son dos conos volcánicos de 75 y 61 metros que se elevan desde la plataforma de lava costera: remanentes de un cráter antiguo cuyos flancos fueron erosionados por el mar. El más alto se llama el "Pilar Cristiano", el más bajo el "Pilar Pagano". Miles de aves marinas anidan aquí en verano, y la plataforma de lava basáltica circundante crea una extraordinaria plataforma natural que llega hasta el borde del océano.',
    de: 'Lóndrangar sind zwei Vulkanstöpsel, 75 und 61 Meter, die aus dem Küstenlavabett herausragen – Überreste eines alten Kraters, dessen Flanken vom Meer erodiert wurden. Der höhere wird „Christlicher Pfeiler" genannt, der niedrigere „Heidnischer Pfeiler". Tausende von Seevögeln nisten hier im Sommer, und das umgebende Basaltlavabett schafft eine außergewöhnliche natürliche Plattform, die bis zum Meeresrand reicht.',
    zh: 'Lóndrangar是两根从海岸熔岩台地耸起的火山颈，高度分别为75米和61米——是一座古老火山口的残余，其侧翼已被大海侵蚀殆尽。较高的被称为"基督岩柱"，较矮的被称为"异教岩柱"。夏季数千只海鸟在此筑巢，四周的玄武岩熔岩台地构成一处延伸至海边的非凡天然平台。',
  },
  {
    id: 52,
    es: 'Borgarvirki es una fortaleza basáltica natural: un espectacular plateau circular de lava columnar que se eleva desde tierra de cultivo plana, utilizado como fortificación en la Era de las Sagas. Un corto ascenso lleva a la cumbre, desde donde los defensores antes rodaban piedras por las paredes rocosas verticales. La magnífica vista panorámica sobre el valle Víðidalur, el río y las montañas distantes es extraordinaria, y el lugar casi siempre está desierto.',
    de: 'Borgarvirki ist eine natürliche Basaltfestung – ein dramatisches kreisförmiges Plateau aus Säulenlava, das aus flachem Farmland aufragt und in der Sagazeit als Befestigung genutzt wurde. Ein kurzer Aufstieg führt zur Spitze, von der aus Verteidiger einst Felsbrocken die senkrechten Felswände hinunterrollen ließen. Der großartige Blick über das Víðidalur-Tal, den Fluss und ferne Berge ist herrlich, und der Ort ist fast immer verlassen.',
    zh: 'Borgarvirki是一处天然玄武岩要塞——一处壮观的圆形柱状熔岩高地从平坦农田中耸起，曾在萨迦时代作为防御工事使用。短途攀登至顶部，从前守卫者就是在此将巨石滚下垂直岩壁。俯瞰Víðidalur山谷、河流和远处群山的壮阔全景令人叹为观止，这里几乎总是空无一人。',
  },
  {
    id: 53,
    es: 'Kleifarvatn es el lago más grande de Islandia en la península de Reikjanes: un misterioso lago profundo sin ríos visibles que entran o salen. El agua filtra a través de un sistema de viento geotérmico en el lecho del lago, y el nivel cayó dos metros tras un terremoto del año 2000. El paisaje de lava negra, las ventilas de la orilla sulfurosa, y el oscuro color sombrío crean una atmósfera a diferencia de cualquier otro lugar en Islandia, a solo 30 km de Reikiavik.',
    de: 'Kleifarvatn ist Islands größter See auf der Reykjanes-Halbinsel – ein geheimnisvoller tiefer See ohne sichtbare Flüsse, die hinein- oder herausfließen. Das Wasser filtert durch ein geothermisches Lüftungssystem im Seebett, und der Pegel fiel nach einem Erdbeben im Jahr 2000 um zwei Meter. Die schwarze Lavalandschaft, schwefelhaltige Uferventile und die dunkle, düstere Farbe schaffen eine Atmosphäre, die nirgendwo sonst in Island zu finden ist – nur 30 km von Reykjavik entfernt.',
    zh: 'Kleifarvatn是冰岛雷克雅内斯半岛上最大的湖泊——一处神秘的深水湖，没有可见的河流流入或流出。湖水通过湖床中的地热通风系统过滤，2000年地震后水位下降了两米。黑色熔岩景观、硫磺味的湖岸喷气孔以及阴暗幽深的色调，营造出冰岛任何其他地方都无法比拟的独特氛围——距雷克雅未克仅30公里。',
  },
  {
    id: 54,
    es: 'El Parque Nacional Þingvellir es donde las placas tectónicas de América del Norte y Eurasia se están separando visiblemente a 2 cm por año, creando un paisaje de dramáticos valles de rift y fisuras volcánicas. También es donde se reunió el parlamento más antiguo del mundo desde el año 930 d.C. Más allá del famoso mirador, docenas de senderos exploran las grietas en casi completa soledad. El buceo en la cristalina fisura de Silfra es de clase mundial.',
    de: 'Der Þingvellir-Nationalpark ist, wo die nordamerikanische und eurasische tektonische Platte sichtbar auseinanderdriften – 2 cm pro Jahr – und eine Landschaft dramatischer Rifttäler und Vulkanspalten schaffen. Es ist auch, wo das älteste Parlament der Welt ab 930 n. Chr. tagte. Jenseits des berühmten Aussichtspunkts erkunden Dutzende von Wegen die Risse in nahezu völliger Einsamkeit. Das Schnorcheln in der glasklaren Silfra-Spalte ist weltklasse.',
    zh: 'Þingvellir国家公园是北美板块和欧亚板块以每年2厘米的速度可见地分离之处，形成了由壮观裂谷和火山裂缝构成的景观。这里也是世界上最古老的议会自公元930年起召开会议的地方。在著名观景台之外，数十条小径在几乎完全的宁静中探索这些裂缝。在冰晶般透明的Silfra裂隙中浮潜是世界级的体验。',
  },
  {
    id: 55,
    es: 'Skútustaðagígar son pseudocráteres formados cuando la lava en flujo se encontró con el agua poco profunda del lago Mývatn y las explosiones de vapor perforaron agujeros circulares en la corteza de lava. Los cráteres van desde unos pocos metros hasta 50 metros de ancho, creando un paisaje lunar de anillos concéntricos. El sendero circular de pasarela pasa por encima y alrededor de estas extraordinarias formaciones sobre el lago de superficie plana como un espejo.',
    de: 'Skútustaðagígar sind Pseudokrater, die entstanden, als fließende Lava auf das flache Wasser des Mývatn-Sees traf und Dampfexplosionen kreisförmige Löcher durch die Lavakruste schlugen. Die Krater reichen von einigen Metern bis 50 Meter Durchmesser und schaffen eine Mondlandschaft konzentrisch ringförmiger Formationen. Der kreisförmige Bohlenweg führt über und um diese außergewöhnlichen Formationen oberhalb des spiegelflachen Sees.',
    zh: 'Skútustaðagígar是一批伪火山口，由流动熔岩与Mývatn湖浅水相遇时蒸汽爆炸穿透熔岩壳形成。这些火山口直径从几米到50米不等，形成月球般的同心圆景观。环形木栈道蜿蜒穿越这些非凡地貌的上方和周围，俯瞰如镜般平坦的湖面。',
  },
  {
    id: 56,
    es: 'Seyðisfjörður es un pueblo de fiordo del siglo XIX perfectamente conservado rodeado de empinadas montañas y cascadas en cascada: el pueblo más pintoresco de Islandia según muchos. Casas de madera coloridas se agrupan alrededor de la cabecera del fiordo, unidas a la Carretera de Circunvalación por una carretera de montaña con dramáticas curvas en horquilla. El pueblo se ha convertido en una colonia de artistas con galerías, festivales de música y una atmósfera creativa a diferencia de cualquier otro lugar en la Islandia rural.',
    de: 'Seyðisfjörður ist ein perfekt erhaltenes Fjordstädtchen aus dem 19. Jahrhundert, umgeben von steilen Bergen und kaskadierenden Wasserfällen – Islands malerischstes Dorf nach vielen Meinungen. Bunte Holzhäuser gruppieren sich um den Fjordkopf und sind durch eine Bergstraße mit dramatischen Haarnadelkurven mit dem Ringweg verbunden. Die Stadt ist zu einer Künstlerkolonie mit Galerien, Musikfestivals und einer kreativen Atmosphäre geworden, die nirgendwo sonst im ländlichen Island zu finden ist.',
    zh: 'Seyðisfjörður是一座保存完好的19世纪峡湾小镇，四周被陡峭山地和飞瀑环绕——在许多人眼中是冰岛风景最美的村庄。色彩缤纷的木制房屋簇拥在峡湾头部，通过一条有着险峻发夹弯的山路与1号公路相连。这座小镇已发展为拥有画廊、音乐节和充满创意氛围的艺术家聚居地，这种气质在冰岛乡村是独一无二的。',
  },
  {
    id: 58,
    es: 'Valahnúkamöl es un salvaje promontorio costero en la península de Reikjanes donde el Atlántico Norte choca contra antiguos acantilados basálticos, pilares marinos y playas pedregosas cubiertas de vívidos guijarros volcánicos rojos y verdes. A solo minutos del aeropuerto internacional, esta extraordinaria costa salvaje está completamente sin visitar por casi todos los turistas que llegan y parten y que nunca se alejan de la carretera del aeropuerto.',
    de: 'Valahnúkamöl ist ein wilder Küstenvorsprung auf der Reykjanes-Halbinsel, wo der Nordatlantik gegen alte Basaltklippen, Meeressäulen und steinige Strände prallt, die mit lebhaften roten und grünen Vulkankieseln bedeckt sind. Nur Minuten vom internationalen Flughafen entfernt, ist diese außergewöhnliche Wildküste von fast allen an- und abreisenden Touristen völlig unbesucht, die nie die Flughafenstraße verlassen.',
    zh: 'Valahnúkamöl是雷克雅内斯半岛上一处狂野的海岸海角，北大西洋在此猛烈拍击古老的玄武岩悬崖、海蚀柱和遍布鲜艳红绿火山卵石的岩石海滩。距国际机场仅数分钟车程，这片非凡的野性海岸却完全未被几乎所有来往旅客涉足——他们从未离开机场公路。',
  },
  {
    id: 59,
    es: 'La playa de Stokksnes es un largo arco de arena volcánica negra enmarcado por dunas cubiertas de hierba y anclado por el dramático pico triangular de la montaña Vestrahorn. Durante la marea baja, la arena negra húmeda refleja perfectamente la montaña y el cielo. La playa se extiende durante kilómetros en casi completa soledad. Un decorado de película de la era vikinga se alza entre las dunas, añadiendo una dimensión cinematográfica a un paisaje ya de otro mundo.',
    de: 'Der Stokksnes-Strand ist ein langer Bogen aus pechschwarzem Vulkansand, der von grasbewachsenen Dünen gesäumt und vom dramatischen dreieckigen Gipfel des Vestrahorn-Berges verankert wird. Bei Ebbe spiegelt der nasse schwarze Sand Berg und Himmel perfekt wider. Der Strand erstreckt sich kilometerweit in nahezu völliger Einsamkeit. Ein Wikingerzeitfilm-Set steht zwischen den Dünen und verleiht einer ohnehin anderen Welt eine cineastische Dimension.',
    zh: 'Stokksnes海滩是一处漆黑火山沙组成的长弧形海岸，草覆沙丘衬托其后，Vestrahorn山的壮观三角形山峰矗立其间。退潮时，潮湿的黑色沙滩完美倒映山峰与天空。海滩在几乎完全的宁静中绵延数公里。沙丘间矗立着一处维京时代电影布景，为这片已然如同异世界的景观增添了电影感。',
  },
  {
    id: 60,
    es: 'Djúpalón es una inquietante playa de guijarros negros en el Parque Nacional Snæfellsjökull, cubierta con los restos oxidados de un arrastrero británico naufragado en 1948. Cuatro antiguas piedras de levantamiento de diferentes pesos: "Fuerza Total", "Media Fuerza", "Endeble" y "Inútil", ponían a prueba la fuerza de los posibles pescadores para la tripulación. Las formaciones de lava circundantes, los pilares marinos y el fondo de Snæfellsjökull hacen de esta una de las playas más evocadoras de Islandia.',
    de: 'Djúpalón ist ein unheimlicher schwarzer Kiesstrand im Snæfellsjökull-Nationalpark, übersät mit den verrosteten Eisenresten eines britischen Trawlers, der 1948 strandete. Vier alte Hebesteine verschiedener Gewichte – „Volle Kraft", „Halbe Kraft", „Schwächling" und „Nutzlos" – testeten potenzielle Fischer auf Besatzungsstärke. Die umgebenden Lavaformationen, Meeressäulen und der Snæfellsjökull-Hintergrund machen dies zu einem der stimmungsvollsten Strände Islands.',
    zh: 'Djúpalón是Snæfellsjökull国家公园内一处令人心生敬畏的黑色卵石海滩，散落着一艘1948年失事的英国拖网渔船的锈铁残骸。四块重量各异的古老举重石——"完全力量"、"半足力量"、"孱弱者"和"无用者"——曾用于测试渔船候补船员的体力。四周的熔岩地貌、海蚀柱以及Snæfellsjökull的壮阔背景，使这里成为冰岛氛围最浓郁的海滩之一。',
  },
];

async function run() {
  await db.init();

  let updated = 0;
  for (const t of translations) {
    db.run(
      'UPDATE places SET description_es = ?, description_de = ?, description_zh = ? WHERE id = ?',
      [t.es, t.de, t.zh, t.id]
    );
    updated++;
  }

  console.log(`✅ Updated ${updated} places with ES/DE/ZH translations.`);
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

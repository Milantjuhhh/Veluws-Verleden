type HotspotEntry = {
  title: string;
  emoji: string;
  fact: string;
  detail: string;
  videoUrl?: string;
  videoTitle?: string;
};

type PlateContent = {
  context: string;
  entries: HotspotEntry[];
};

const PLATE_CONTENT: Record<number, PlateContent> = {
  1: {
    context: "Mensen op de Veluwe gebruikten vooral materialen en voedsel uit hun directe omgeving. Hun dagritme volgde het licht, de seizoenen en het werk dat op dat moment nodig was.",
    entries: [
      { title: "Wonen met natuurlijke materialen", emoji: "🏡", fact: "Huizen werden gebouwd met hout, leem, riet en plaggen. Deze materialen waren dichtbij te vinden en hielden warmte binnen.", detail: "Let op de stevige houten balken en het dak: samen beschermden ze de bewoners tegen regen, wind en kou.", videoUrl: "https://www.youtube.com/watch?v=lcW8TXVswTg", videoTitle: "Studenten bouwen een mesohut" },
      { title: "Vuur als middelpunt", emoji: "🔥", fact: "Een vuur gaf warmte en licht en werd gebruikt om eten te koken. Het moest goed worden bewaakt, want een vonk kon snel brand veroorzaken.", detail: "Rond het vuur werd gewerkt, gegeten en verteld. Daardoor was het vaak het drukste punt van het huis." },
      { title: "Eten uit de omgeving", emoji: "🥣", fact: "Gezinnen aten graanpap, brood, groenten en wat de omgeving verder opleverde. Vlees stond lang niet iedere dag op tafel.", detail: "Voedsel werd gedroogd, gerookt of koel bewaard om ook in de winter genoeg te hebben." },
      { title: "Kleding van wol en linnen", emoji: "🧶", fact: "Veel kleding werd thuis gemaakt van wol of linnen. Spinnen, weven en herstellen kostten veel tijd.", detail: "Kleding was kostbaar en werd daarom gerepareerd, doorgegeven en gedragen tot de stof echt versleten was." },
      { title: "Handgereedschap", emoji: "🪓", fact: "Bijna al het werk gebeurde met eenvoudige handgereedschappen van hout en ijzer. Goed onderhoud maakte zo'n werktuig jarenlang bruikbaar.", detail: "Bekijk de vorm van het gereedschap: ieder voorwerp had een duidelijke taak, zoals hakken, snijden of graven." },
      { title: "Dieren bij het erf", emoji: "🐐", fact: "Dieren leverden melk, wol, mest, eieren en soms vlees. Ze waren belangrijk bezit voor een gezin.", detail: "De dieren bleven dicht bij het erf zodat bewoners ze konden voeren, melken en beschermen." },
      { title: "Water halen", emoji: "🪣", fact: "Zonder waterleiding moest water dagelijks uit een put, bron of beek worden gehaald. Dat was zwaar en terugkerend werk.", detail: "Water was nodig voor drinken en koken, maar ook voor wassen, dieren verzorgen en sommige ambachten." },
      { title: "Kleine akkers", emoji: "🌱", fact: "Op kleine akkers verbouwden mensen onder meer rogge, haver en groenten. De opbrengst hing sterk af van bodem en weer.", detail: "Mest van dieren hielp om arme grond vruchtbaarder te maken en de oogst te verbeteren." },
      { title: "Het bos gebruiken", emoji: "🌳", fact: "Het bos leverde brandhout, bouwmateriaal, bessen en voer voor dieren. Bewoners kenden de bruikbare plekken goed.", detail: "Het bos was geen lege wildernis: het hoorde bij het dagelijks werk en moest zorgvuldig worden gebruikt." },
      { title: "Samenwerken", emoji: "🤝", fact: "Zware klussen zoals bouwen en oogsten lukten beter wanneer families en buren samenwerkten. Hulp werd later vaak teruggegeven.", detail: "Samenwerking maakte een kleine gemeenschap sterker wanneer er ziekte, slecht weer of voedselschaarste was." },
    ],
  },
  2: {
    context: "Een middeleeuws dorp was klein, levendig en sterk afhankelijk van de omgeving. Wonen, werken, handel en geloof lagen dicht bij elkaar.",
    entries: [
      { title: "De dorpsput", emoji: "🪣", fact: "De put leverde water aan bewoners die thuis geen kraan hadden. Mensen ontmoetten elkaar er tijdens het halen van water.", detail: "Schoon water was onmisbaar, maar kon door vuil of afval ook gemakkelijk onveilig worden." },
      { title: "De smid", emoji: "🔨", fact: "De smid maakte en repareerde gereedschap, hoefijzers en beslag. Zijn hete vuur en aambeeld waren van ver te horen.", detail: "Zonder de smid konden boeren en ambachtslieden hun metalen gereedschap moeilijk blijven gebruiken." },
      { title: "Vakwerkhuizen", emoji: "🏠", fact: "Houten balken vormden het geraamte van veel huizen. De vakken ertussen werden gevuld met vlechtwerk en leem.", detail: "De materialen waren lokaal beschikbaar, maar vroegen regelmatig onderhoud tegen vocht en slijtage." },
      { title: "De dorpskerk", emoji: "⛪", fact: "De kerk was een plaats voor geloof, bijeenkomsten en belangrijke levensmomenten. De toren was vaak al van ver zichtbaar.", detail: "Klokken gaven niet alleen kerktijd aan, maar waarschuwden soms ook bij brand of gevaar." },
      { title: "De markt", emoji: "🧺", fact: "Op marktdagen werden voedsel, stoffen en gebruiksvoorwerpen verkocht of geruild. Nieuws reisde mee met bezoekers.", detail: "Een markt bracht boeren, handelaren en ambachtslieden samen en verbond het dorp met andere plaatsen." },
      { title: "Vee in het dorp", emoji: "🐄", fact: "Koeien, varkens, geiten en kippen liepen vaak dicht bij de huizen. Ze leverden voedsel, mest en trekkracht.", detail: "Dieren waren waardevol, maar maakten straten ook druk en modderig." },
      { title: "Modderige wegen", emoji: "🥾", fact: "Veel wegen waren onverhard. Regen maakte ze modderig en zwaar begaanbaar voor mensen, dieren en karren.", detail: "Reizen duurde daardoor lang en goederen konden onderweg beschadigen of vertraging oplopen." },
      { title: "Ambachtslieden", emoji: "🧵", fact: "Bakkers, leerbewerkers, timmerlieden en wevers maakten producten voor het dorp. Vakmanschap werd door oefenen geleerd.", detail: "Ieder ambacht gebruikte eigen gereedschap, grondstoffen en herkenbare werkplaatsen." },
      { title: "Voedsel bewaren", emoji: "🫙", fact: "Zonder koelkast werd voedsel gezouten, gedroogd, gerookt of ingelegd. Voorraad was belangrijk voor de winter.", detail: "Graan en gedroogde producten moesten ook tegen vocht, muizen en insecten worden beschermd." },
      { title: "De dorpsgemeenschap", emoji: "👨‍👩‍👧‍👦", fact: "Bewoners waren voor veel werk en veiligheid op elkaar aangewezen. Afspraken bepaalden wie grond, wegen en water mocht gebruiken.", detail: "Samen vieren en samen werken versterkten de banden, maar meningsverschillen kwamen natuurlijk ook voor." },
    ],
  },
  3: {
    context: "Op de Veluwe zijn sporen gevonden van tijdelijke Romeinse legerkampen. De schoolplaat laat zien hoe soldaten en lokale bewoners elkaar in dit landschap konden ontmoeten.",
    entries: [
      { title: "Romeinse legerkampen op de Veluwe", emoji: "🏕️", fact: "Romeinse soldaten bouwden tijdens veldtochten tijdelijke kampen om veilig te kunnen rusten en hun voorraden te beschermen.", detail: "Sporen in de bodem, zoals greppels en paalgaten, helpen archeologen om de ligging en grootte van zulke kampen te herkennen." },
      { title: "De verdediging van het legerkamp", emoji: "🛡️", fact: "Rond een legerkamp groeven soldaten een gracht. Met de uitgegraven aarde maakten zij een wal waarop een houten omheining kon staan.", detail: "Op de plaat zie je de gracht, de wal en de puntige palen die het voor indringers moeilijk maakten om het kamp binnen te komen." },
      { title: "De inrichting van het legerkamp", emoji: "🗺️", fact: "Een Romeins legerkamp werd volgens een vaste indeling opgebouwd, met doorgangen, plekken voor tenten en ruimte voor mensen, dieren en voorraden.", detail: "De overzichtelijke inrichting hielp soldaten om snel hun plek te vinden en als groep georganiseerd te blijven." },
      { title: "Kleding en uitrusting van de Romeinen", emoji: "🪖", fact: "Een soldaat droeg onder meer een tunica, stevige schoenen, een helm en beschermende uitrusting. Schild en speer hoorden bij zijn bewapening.", detail: "De precieze kleding en uitrusting verschilden per tijd, taak en legereenheid, maar moesten altijd bescherming en bewegingsvrijheid bieden." },
      { title: "De samenstelling van het Romeinse leger", emoji: "⚔️", fact: "Het Romeinse leger bestond uit legionairs en hulptroepen met verschillende taken en achtergronden.", detail: "Soldaten kwamen niet alleen uit Italië. Ook mannen uit andere delen van het Romeinse Rijk dienden in het leger en brachten hun eigen kennis mee." },
      { title: "De lokale bevolking: kleding en wonen", emoji: "🏡", fact: "De bewoners van de streek leefden in boerderijen van hout, vlechtwerk, leem en riet. Hun kleding werd vaak gemaakt van wol en linnen.", detail: "De Romeinse soldaten ontmoetten hier mensen met andere gewoonten, kleding en manieren van wonen." },
      { title: "De meloenkraal en andere vondsten", emoji: "📿", fact: "Een meloenkraal is een geribbelde kraal die door archeologen bij Romeinse vindplaatsen wordt gevonden. Zulke kleine voorwerpen konden onderdeel zijn van sieraden.", detail: "Ook munten, aardewerk, metalen voorwerpen en afvalresten geven informatie over wie er op een plek verbleef en wat mensen daar deden." },
      { title: "Contact tussen Romeinen en de lokale bevolking", emoji: "🤝", fact: "Romeinse soldaten en lokale bewoners kwamen met elkaar in contact door handel, werk, voedselvoorziening en persoonlijke ontmoetingen.", detail: "Door dit contact werden producten, technieken, woorden en gewoonten uitgewisseld, al verliep de verhouding niet altijd vreedzaam." },
      { title: "Het molenspel", emoji: "🎲", fact: "Het molenspel is een oud bordspel voor twee spelers. Iedere speler probeert drie speelstenen op één lijn te krijgen.", detail: "Een eenvoudig speelbord kon in hout, steen of de grond worden gekrast. Spellen boden ontspanning tijdens rustige momenten in het kamp." },
      { title: "Het landschap en de dieren", emoji: "🦅", fact: "Het Veluwse landschap bestond uit bossen, open zandige plekken, heide en water. Mensen en dieren gebruikten ieder hun eigen deel van dit gebied.", detail: "Het landschap leverde hout, voedsel en water, maar bepaalde ook waar een kamp bereikbaar en goed te verdedigen was." },
    ],
  },
  4: {
    context: "Markten en werkplaatsen verbonden dorpen en steden. Producten gingen van maker naar klant via ruil, verkoop en lange handelsroutes.",
    entries: [
      { title: "Marktstallen", emoji: "⛺", fact: "Kramen beschermden koopwaar tegen zon en regen en maakten producten goed zichtbaar. Handelaren riepen klanten naar hun plek.", detail: "De plaats van een kraam en een aantrekkelijke uitstalling konden bepalen hoeveel er werd verkocht." },
      { title: "Aardewerk", emoji: "🏺", fact: "Pottebakkers maakten kommen, kruiken en kookpotten uit klei. Na het vormen werden ze hard gebakken in een oven.", detail: "Vorm, kleur en versiering vertellen archeologen vaak waar en wanneer aardewerk is gemaakt." },
      { title: "Textielhandel", emoji: "🧵", fact: "Wol en linnen werden gesponnen, geverfd en geweven tot stof. Mooie kleuren en fijne stoffen waren meestal duurder.", detail: "Lappen stof, kleding en garen konden allemaal op dezelfde markt worden verhandeld." },
      { title: "De smidswerkplaats", emoji: "⚒️", fact: "De smid verhitte ijzer en vormde het met hamer en aambeeld. Hij maakte gereedschap, beslag en onderdelen.", detail: "Het werk vroeg ervaring: te koud ijzer was lastig te vormen en te heet ijzer kon beschadigen." },
      { title: "Handelsroutes", emoji: "🛣️", fact: "Kooplieden reisden over land en water tussen marktplaatsen. Bruggen, tollen en slechte wegen beïnvloedden hun route.", detail: "Goederen uit verre streken waren vaak kostbaar doordat vervoer tijd, mensen en risico kostte." },
      { title: "Wegen en meten", emoji: "⚖️", fact: "Gewichten en inhoudsmaten hielpen verkoper en koper om een hoeveelheid af te spreken. Niet iedere streek gebruikte precies dezelfde maat.", detail: "Controle op maten maakte handel eerlijker en verminderde ruzie over de geleverde hoeveelheid." },
      { title: "Munten en ruilen", emoji: "🪙", fact: "Er werd betaald met munten, maar ook geruild of op krediet gekocht. De vorm van betaling hing af van plaats en periode.", detail: "Een munt was handig, omdat waarde makkelijker kon worden vergeleken dan bij directe ruil." },
      { title: "Karren en vervoer", emoji: "🛒", fact: "Karren en lastdieren vervoerden zware of grote partijen. Op slechte wegen ging dat langzaam en konden wielen breken.", detail: "Waardevolle, lichte producten waren eenvoudiger over lange afstanden te verhandelen dan zware bulkgoederen." },
      { title: "Leren bij een meester", emoji: "🧑‍🏭", fact: "Een leerling leerde een ambacht door jaren mee te werken in een werkplaats. Daarna kon hij gezel of zelf meester worden.", detail: "Vakregels bewaakten kwaliteit, opleiding en soms ook wie een product in een stad mocht verkopen." },
      { title: "Kopen en onderhandelen", emoji: "🤝", fact: "Koper en verkoper spraken over prijs, kwaliteit en hoeveelheid. Vertrouwen en een goede naam waren belangrijk.", detail: "De markt was daardoor niet alleen een winkelplaats, maar ook een plek voor nieuws en nieuwe contacten." },
    ],
  },
  5: {
    context: "Een kasteel was tegelijk woning, werkplek, bestuurscentrum en verdedigingswerk. Veel mensen hielden het dagelijks draaiende.",
    entries: [
      { title: "Poort en ophaalbrug", emoji: "🌉", fact: "De toegang tot een kasteel werd extra bewaakt. Een brug en stevige poort konden bij gevaar worden gesloten.", detail: "Wie binnen wilde, moest langs een smalle, goed zichtbare plek die verdedigers gemakkelijk konden controleren." },
      { title: "Gracht en muren", emoji: "🏰", fact: "Een gracht en hoge muren maakten een snelle aanval moeilijker. Torens gaven verdedigers uitzicht over de omgeving.", detail: "Verdediging veranderde mee met nieuwe wapens; muren moesten voortdurend worden aangepast en hersteld." },
      { title: "Ridderuitrusting", emoji: "🛡️", fact: "Ridders gebruikten bescherming, wapens en getrainde paarden. Uitrusting was kostbaar en vroeg veel onderhoud.", detail: "Een ridder leerde niet alleen vechten, maar ook paardrijden, samenwerken en bevelen opvolgen." },
      { title: "De binnenplaats", emoji: "🐎", fact: "Op de binnenplaats kwamen mensen, dieren en voorraden samen. Er werd geladen, gerepareerd en geoefend.", detail: "De open ruimte verbond stallen, werkplaatsen, woonvertrekken en de toegangspoort." },
      { title: "De grote zaal", emoji: "🍽️", fact: "In de grote zaal werd gegeten, rechtgesproken en bezoek ontvangen. De inrichting liet de status van de heer zien.", detail: "Licht, warmte en privacy waren er beperkter dan in een modern huis, zelfs voor rijke bewoners." },
      { title: "Keuken en voorraad", emoji: "🥖", fact: "Koks bereidden maaltijden bij grote vuren. Graan, gedroogd voedsel en drank werden in voorraadruimten bewaard.", detail: "Bij een belegering bepaalde de aanwezige voorraad hoe lang bewoners het konden volhouden." },
      { title: "Paarden en stallen", emoji: "🐴", fact: "Paarden waren nodig voor reizen, vervoer en oorlog. Verzorging vroeg dagelijks voer, water, borstelen en schone stallen.", detail: "Een goed paard vertegenwoordigde veel waarde en werd daarom door ervaren mensen verzorgd." },
      { title: "Bewoners en bedienden", emoji: "👥", fact: "Naast adellijke bewoners werkten er wachters, koks, knechten en ambachtslieden. Ieder had eigen taken.", detail: "Het kasteel functioneerde door hun gezamenlijke werk, niet alleen door de ridders uit verhalen." },
      { title: "Bestuur en rechtspraak", emoji: "📜", fact: "Vanuit een kasteel kon een heer land beheren, belasting innen en geschillen behandelen. Schrijvers hielden afspraken bij.", detail: "Macht was daardoor zichtbaar in zowel de dikke muren als in regels, documenten en besluiten." },
      { title: "Bouwen en onderhouden", emoji: "🧱", fact: "Steenhouwers, timmerlieden en andere vakmensen bouwden jaren aan een kasteel. Daarna bleef herstel altijd nodig.", detail: "Vorst, regen en gebruik beschadigden daken, hout en metselwerk; onderhoud was een grote kostenpost." },
    ],
  },
  6: {
    context: "In de zestiende eeuw veranderden ideeën over geloof en kerk. Drukwerk en onderwijs hielpen die ideeën snel over Europa te verspreiden.",
    entries: [
      { title: "De drukpers", emoji: "🖨️", fact: "Met losse letters konden teksten sneller en in grotere aantallen worden gedrukt. Boeken werden zo voor meer mensen bereikbaar.", detail: "Dezelfde letters konden na het drukken opnieuw worden gezet voor een volgende bladzijde of tekst." },
      { title: "Pamfletten", emoji: "📄", fact: "Korte gedrukte teksten brachten meningen en nieuws snel onder de aandacht. Ze waren goedkoper dan een heel boek.", detail: "Tekst en afbeeldingen hielpen ook mensen met weinig leeservaring om een boodschap te begrijpen." },
      { title: "Kritiek op de kerk", emoji: "⛪", fact: "Hervormers vonden dat bepaalde gebruiken en machtsposities binnen de kerk moesten veranderen. Dat leidde tot felle discussies.", detail: "Geloof, bestuur en dagelijks leven waren nauw verbonden, waardoor het meningsverschil grote gevolgen kreeg." },
      { title: "Maarten Luther", emoji: "✒️", fact: "Luther schreef over geloof en kerkelijke hervorming. Zijn teksten werden gedrukt, besproken en bestreden.", detail: "Hij was niet de enige hervormer, maar werd een van de bekendste stemmen van de Reformatie." },
      { title: "De Bijbel in de volkstaal", emoji: "📖", fact: "Vertalingen maakten Bijbelteksten toegankelijk voor lezers die geen Latijn kenden. Voorlezen bleef belangrijk.", detail: "Vertalen betekende ook keuzes maken over woorden en uitleg, waarover nieuwe discussies ontstonden." },
      { title: "Nieuwe geloofsgroepen", emoji: "👥", fact: "Naast de katholieke kerk ontstonden verschillende protestantse stromingen. Zij verschilden ook onderling in leer en organisatie.", detail: "Welke kerk iemand bezocht, kon afhangen van eigen overtuiging én van het bestuur van de streek." },
      { title: "Een andere kerkdienst", emoji: "🎶", fact: "In protestantse diensten kregen preek, Bijbellezing en samenzang vaak een centrale plaats. De inrichting werd soms soberder.", detail: "Veranderingen waren zichtbaar en hoorbaar: in taal, muziek, beelden en de rol van de predikant." },
      { title: "Onrust in stad en dorp", emoji: "⚖️", fact: "Geloofsverschillen konden families en gemeenschappen verdelen. Bestuurders probeerden soms één geloof af te dwingen.", detail: "De gevolgen liepen uiteen van debat en nieuwe regels tot vervolging, opstand en vertrek." },
      { title: "Onderwijs en lezen", emoji: "🏫", fact: "Meer aandacht voor zelf lezen stimuleerde onderwijs. Toch bleef niet iedereen geletterd en waren boeken nog steeds waardevol.", detail: "Scholen en gezinnen leerden kinderen letters, geloofsteksten en soms ook schrijven en rekenen." },
      { title: "Een langdurige verandering", emoji: "🕊️", fact: "De Reformatie veranderde kerken, bestuur, kunst en gewoonten voor lange tijd. De uitkomst verschilde per gebied.", detail: "In Nederland zijn sporen daarvan nog te vinden in kerkgebouwen, feestdagen en plaatselijke geschiedenis." },
    ],
  },
  7: {
    context: "Rond 1800 draaide een boerenbedrijf op handwerk, dierenkracht en de inzet van het hele huishouden. De oogst bepaalde hoeveel voorraad er voor de winter was.",
    entries: [
      { title: "De graanoogst", emoji: "🌾", fact: "Rogge en andere granen werden met de hand gemaaid en in schoven gezet om te drogen. Daarna volgde het dorsen.", detail: "Oogsten moest op het juiste moment gebeuren; regen kon droog graan en een jaar werk beschadigen." },
      { title: "Werken met de zeis", emoji: "🧑‍🌾", fact: "Met een zeis kon een boer graan of gras maaien. Het lange blad moest scherp zijn en in een vloeiende beweging worden gebruikt.", detail: "Het was zwaar vakwerk waarbij houding, ritme en een veilige afstand tot anderen belangrijk waren." },
      { title: "Trekdieren", emoji: "🐴", fact: "Paarden en ossen trokken ploegen, wagens en andere werktuigen. Ze vervingen spierkracht die machines later zouden leveren.", detail: "Voer en verzorging van een trekdier kostten veel, maar het dier maakte grotere akkers mogelijk." },
      { title: "De boerderij", emoji: "🏚️", fact: "Wonen, opslag en dierenverblijf lagen vaak onder één groot dak of dicht bij elkaar. Dat maakte toezicht eenvoudiger.", detail: "Het rieten dak en houten delen boden beschutting, maar maakten voorzichtigheid met vuur noodzakelijk." },
      { title: "Vee verzorgen", emoji: "🐄", fact: "Koeien leverden melk, mest en soms trekkracht of vlees. Melken en voeren kwamen elke dag terug.", detail: "Mest was belangrijk om akkers vruchtbaarder te maken in een tijd zonder kunstmest." },
      { title: "Water op het erf", emoji: "🪣", fact: "Water werd uit een put of pomp gehaald en met emmers gedragen. Mensen en dieren hadden er dagelijks veel van nodig.", detail: "De plek van de waterbron bepaalde mede hoe het erf werd ingericht en hoeveel loopwerk nodig was." },
      { title: "Werk voor het hele gezin", emoji: "👨‍👩‍👧‍👦", fact: "Mannen, vrouwen en kinderen hadden verschillende, vaak overlappende taken. Tijdens drukke weken hielp iedereen mee.", detail: "Veel werk was onbetaald huishoudelijk werk, maar onmisbaar voor het boerenbedrijf." },
      { title: "Voorraad voor de winter", emoji: "🧺", fact: "Graan, hooi, knollen en andere producten werden opgeslagen voor koude maanden. Een droge opslag voorkwam bederf.", detail: "De voorraad moest voldoende zijn voor het gezin én voor dieren die niet buiten konden grazen." },
      { title: "Erfdieren", emoji: "🐓", fact: "Kippen, honden en andere kleine dieren hadden ieder een rol. Ze leverden voedsel, bewaakten het erf of hielpen bij het werk.", detail: "Op een druk erf bewogen mensen, vee en karren door elkaar; goede gewoonten voorkwamen ongelukken." },
      { title: "Afhankelijk van het weer", emoji: "⛅", fact: "Droogte, vorst of langdurige regen konden de opbrengst sterk verminderen. Boeren hadden weinig middelen om dat op te vangen.", detail: "Daarom waren kennis van seizoenen, zuinig omgaan met voorraad en hulp van buren zo belangrijk." },
    ],
  },
  8: {
    context: "Het Veluwse landschap ontstond door natuurkrachten én eeuwenlang menselijk gebruik. Bossen, heide, zand en water vormen samen een afwisselend gebied.",
    entries: [
      { title: "Uitgestrekte heide", emoji: "💜", fact: "Heide groeit goed op voedselarme grond. Eeuwenlang hield begrazing het landschap open en kregen bomen minder kans.", detail: "In de late zomer kleuren veel heidevelden paars, maar ook grassen en struiken horen bij dit leefgebied." },
      { title: "Veluwse bossen", emoji: "🌲", fact: "Op de Veluwe staan loof- en naaldbossen van verschillende leeftijden. Een deel is aangeplant, een deel ontwikkelt natuurlijker.", detail: "Dood hout biedt voedsel en schuilplaatsen aan insecten, schimmels, vogels en kleine zoogdieren." },
      { title: "Stuifzand", emoji: "🏜️", fact: "Waar begroeiing verdween, kon de wind droog zand verplaatsen. Zo ontstonden open stuifzandgebieden.", detail: "Stuifzand lijkt leeg, maar speciale planten en dieren zijn juist aangepast aan hitte, droogte en bewegend zand." },
      { title: "Schapen op de heide", emoji: "🐑", fact: "Schaapskuddes aten jonge boompjes en gras tussen de heide. Hun mest werd vroeger verzameld voor de akkers.", detail: "Begrazing wordt ook nu gebruikt om sommige heidevelden open en gevarieerd te houden." },
      { title: "Plaggen en arme grond", emoji: "🟫", fact: "Boeren staken vroeger dunne plaggen van heidegrond en mengden die met mest. Daardoor werden akkers geleidelijk opgehoogd.", detail: "Te intensief plaggen kon de bodem kaal maken en bijdragen aan het ontstaan van stuifzand." },
      { title: "Vennen en water", emoji: "💧", fact: "Vennen zijn ondiepe waterplassen die vaak door regenwater worden gevoed. Het water kan voedselarm en zuur zijn.", detail: "Amfibieën, libellen en bijzondere planten gebruiken de natte randen als leef- en voortplantingsplek." },
      { title: "Oude wegen en paden", emoji: "🥾", fact: "Karrensporen en zandpaden verbonden dorpen, akkers en markten. Sommige routes zijn nog in het landschap herkenbaar.", detail: "Wanneer een spoor te diep of modderig werd, reed men ernaast en ontstond een bundel van parallelle paden." },
      { title: "De invloed van mensen", emoji: "🧑‍🌾", fact: "Kappen, begrazen, jagen en landbouw veranderden het landschap. Ook natuurbeheer van nu maakt bewuste keuzes.", detail: "Wat natuurlijk lijkt, kan dus mede het resultaat zijn van eeuwen menselijk gebruik en onderhoud." },
      { title: "Dieren in het landschap", emoji: "🦌", fact: "Edelherten, wilde zwijnen, dassen en veel kleinere soorten vinden voedsel en dekking op de Veluwe. Elk gebruikt het gebied anders.", detail: "Sporen, uitwerpselen en vraat vertellen vaak meer over hun aanwezigheid dan een toevallige ontmoeting." },
      { title: "Natuur beheren", emoji: "🌱", fact: "Beheerders proberen leefgebieden te beschermen en met elkaar te verbinden. Daarbij wegen ze natuur, recreatie en veiligheid af.", detail: "Maaien, begrazen of bomen verwijderen kan nodig zijn om open heide en zeldzame soorten te behouden." },
    ],
  },
};

export type HotspotContent = {
  title: string;
  emoji: string;
  paragraphs: [string, string, string];
  videoUrl?: string;
  videoTitle?: string;
};

export function getHotspotContent(schoolPlateId: number, hotspot: number): HotspotContent {
  const plate = PLATE_CONTENT[schoolPlateId] ?? PLATE_CONTENT[1];
  const entry = plate.entries[hotspot - 1] ?? plate.entries[0];

  return {
    title: entry.title,
    emoji: entry.emoji,
    paragraphs: [entry.fact, plate.context, entry.detail],
    videoUrl: entry.videoUrl,
    videoTitle: entry.videoTitle,
  };
}

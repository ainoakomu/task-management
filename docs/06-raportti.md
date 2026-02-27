# Testiraportti

## 1. Testauksen periaatteet

### 1.1 Projektin ohjaavat periaatteet 

Valitsimme backend-painotteisen Task/Todo sovelluksen projektiin, sillä voisimme samalla harjoitella sekä testausta, että backendin rakennusta vielä hieman uudella kielellä. Tehtävässä on myös ensimäistä kertaa tekoäly avusteinen työtapa käytössä. Tekoäly valittiin käyttöön näkökulmana uuden kielen sisäistämiseen (JavaScript) sekä pohtimiseen miten generatiivista tekoälyä voidaan käyttää testauksessa ja ohjelmistotyössä. 

TDDn syklinen ohjaus ja inkrementaalinen kasvu vaikuttivat sopivalta projektin luonteeseen. Luennolta opeteltu Red-Green-Refactor vaikutti hyvältä punaiselta langalta, kun testaus käsitteenä ei ollut vielä tuttu. Yksi XPn ja TDDn johtavista hahmoista Kent Beck kirjoitti osuvasti kirjassaan Test-Driven Development: By Example: “TDD enables you to gain confidence in the code over time...” Tämä kokoajan opettava tapa vakuutti minut valitsemaan TDD:n ja opettelaan sen perusperiaatteet ja tavoitteet. Beck myös kertoi hyvin syklisestä työstä: “Take bigger steps … Unsure? Take smaller steps. TDD is a steering process; a little this way, a little that way.” 

E.M Maximilien ja L .Williams kirjoittivat paperissaan “Assessing test-driven development at IBM” (2003) kuinka he saivat laskettua vikaprosenttiaan melkein 50% kun ottivat TDD:n käyttöön. Nämä vakuuttavat luvut ja TDD:n maine saivat minut kiinnostumaan miten TDD voi yltää näin hyvään suosioon isojen ja pienten yritysten kesken ja miten yksilönä voisi saada näitä hyviä puolia näkyviin projektityössä. 

 

### 1.2 Vertailu standardeihin IEEE 29119 

Kysyimme Microsoft Copilotilta, miten projektimme näin jälkikäteen sopisi yhteen IEEE 29119-standardien kanssa. Projektimme testistrategia, testitapaukset, raportointi ja metriikat dokumentaatiossa olivat hyväksyttäviä, mutta projektiltamme puuttui erillinen Test Design Specification, Test Execution Reportin malli ja traceability matriisi. Huomataan, että tekoäly avusteisesti teimme paljon hyväksyttävästi, mutta meiltä jäi puuttumaan useita kohtia IEEE 29119:stä. Yksilötyöskentely tekoälyn kanssa vaatii tarkkaa silmää, ja huomaamme että täysin IEEE 29119 seuraaminen ei jälkikäteen tarkistaessa onnistunut.

## 2. Elinkaarimalli ja jatkuva testaus

Kuten jo käsitelimme, valitsimme TDD sen iteratiivisuuden ja tehokkuuden takia. Projektin välipalautukset sopivat jo valmiiksi sprintteihin ja ketterään työskentelyyn, joten oli helppoa yhdistää Scrum-tyylinen työtapa ja TDD. Meillä on myös empiiristä tutkimusta, että TDD edesauttaa kehittäjien produktiivisuutta ja parantaa ohjelmistojen laatua, myös akateemisessa ympäristössä. (C. Desai, D. Janzen, & K. Savage ) On siis sopivaa yhdistää TDD kokonaisvaltaisena työtapana projektityötä edistäessä. 

Kurssilla käsitelty CI eli jatkuva integraatio sopii agilen (ketterä menetelmä) jatkuviin sykleihin. Esimerkiksi Trinh ja Doan (2016) painottavat kuinka jatkuvan integraation automatisoitu testaus auttaa tiimejä löytämään virheitä aikaisemmin ja korjaamaan niitä nopeammin. 

### 2.1 Iteratiivinen TDD vs Vesiputousmalli 

Test-Driven Development perustuu iteratiiviseen kehityssykliin, jossa testit kirjoitetaan ennen varsinaista tuotantokoodia. Tämä johdosta projektin kriittisempiä komponentteja saadaan suojattua testeillä, kun projekti etenee. Testit mahdollistavat turvallisen refaktoroinnin, joka vähentää regressioriskiä.Kun uusia ominaisuuksia ja testejä lisätään, rakennetaan uutta jo testatun päälle. Esimerkiksi projektissa liiketoimintalogiikka on suojattu, kun se on testattu kattavasti ennen uuden asian rakentamista.  

Muuttuviin vaatimuksiin voidaan reagoida nopeammin ja varmemmin, kun palautetta testeistä ja projektin kulusta tulee nopeasti. Dybå & Dingsoyr (2008) painottivat, miten yleisesti ketterien menetelmien painopiste on jatkuva palaute ja muutoksiin reagointi. 

Vesiputousmallissa on perinteinen ja lineaarinen toimintamalli. Barry Boehm (1988) kuvasi, että vesiputousmallissa vaatimukset täytyy tarkasti määrittää projektin alussa ja oletus on, että vaatimukset pysyisivät samanlaisina projektin elinkaaren ajan. Boehm kiteytti kuinka interaktiiviset sovellukset, kuten meidän projektimme, on haastava rakentaa vesiputouksen avulla: “However, it does not work well for many classes of software, particularly interactive end-user applications.” Käyttäjävaatimukset ja UX- ratkaisut tarkentuvat projektin edetessä, jolloin valmiita vaatimuksia on haastava luoda projektin alkuvaiheessa.  

Vesiputousmallissa testaus tapahtuu vasta lopussa, jolloin muutoksien toteuttaminen tai virheiden korjaaminen nostaa kustannuksia nopeast (J.M Stecklein et al. 2004). Palautesykli on pitkä, joten ongelmia on voinut kumuloitua pidemmältä ajalta, kuin luultiin. Ongelmien ratkaisemiseksi voidaan joutua palaamaan aikaisempiin vaiheisiin, tehdä arkkitehtuurimuutoksia tai viivästyttää asiakastoimitusta, jolloin kustannuskäyrä nousee ja muita haittoja voi helpommin syntyä. 

Ottaen huomioon projektimme luonteen interaktiivisena UI-sovelluksena, huomataan että yksilöprojektina pienen skaalan sovelluksen työstämiseen vesiputousmalli ei olisi välttämättä ollut sopivin vaihtoehto. Ketteränä toteutettu TDD tarjosi joustavuutta, nopeaa palautetta ja jatkuvaa testausta, sekä kasvatti opiskelijan näkökulmasta luottamusta omiin kykyihin. Riskien tunnistaminen vesiputousmallissa ja päätös käyttää TDD oli toisin sanoen strateginen valinta, eikä vain mielipidekysymys. 

Jos olisimme käyttäneet vesiputousta, olisimme huomanneet export-mismatchit (ESM vs CommonJS), middleware- virheen ja PATCH-validoinnin vasta projektin lopussa, jolloin sen korjaus olisi tullut ajallisesti kalliiksi. 

 

 

## 3. Menetelmävertailu 

### 3.1 Yksikkötestaus 

Yksikkötestit rakentavat suurimman portaan testien pyramidista (Cohn 2009). Testit tehdään ennen mitään toteutusta ja ne keskittyvät kriittisimpiin osiin projektia. Todo-sovelluksessamme ydinosa on domain- ja service-taso, jotka luovat rungon tehtävien hallinnalle. Koska projektia rakennetaan pienissä paloissa, myös palojen testit ovat pieniä, mutta myös nopeita ja eristettyjä. Yksikkötestejä voi ajaa jokaisen muutoksen jälkeen ja saada nopeasti palautetta toiminnallisuudesta. 

Yksikkötestit löysivät virheitä tehtävien validoinnissa ja virheenkäsittelyssä. Esimerkiksi tehtävällä täytyy olla otsikko, eli title. Otsikko ei siis saa olla tyhjä. Validoinnissa ei kuitenkaan huomattu whitespacen mahdollisuutta, jolloin otsikko olisi tyhjä, mutta täytetty välilyönneillä. Nopeiden testien avulla saatiin refraktoroitua validointia tarkemmaksi vastaamaan muuttuneita tarpeita. 

Yksikkötestit ei kuitenkaan kata kaikkia testauksen tarpeita, jonka lisäksi tarvitsimme myös integraatiotestausta. Yksikkötesteillä emme voi testata rajapinnan ja eri kerrosten yhteistyötä ja siksi nousemme testipyramidissa askeleen ylöspäin. 

### 3.2 Integraatiotestaus 

Integraatiotestauksen avulla voimme varmistua, että yksittäiset komponentit toimivat yhdessä odotetulla tavalla. Integraatiotestauksessa testataan vuorovaikutusta, kutsuja ja datan kulkua eri osien välillä. On siis tärkeää, että järjestelmän osat toimivat yhdessä, mikä ei näkyisi yksikkötesteissä. 

Esimerkiksi API-endpointin virheellinen reitti tai väärä JSON-data ilmenee, kun testit ajetaan yhdessä palvelimen ja tietokantakerroksen kanssa. Projektimme harjoitti “Big Bang”- lähestymistapaa, jossa moduuli ovat melkein valmiita, ennen kuin niiden yhteistoimintaa testataan. Prosessi sopii pienempiin projekteihin, kun moduulien väliset riippuvuudet ei ole kovin monimutkaisia. Suuremmissa projekteissa virheiden seuraaminen oikeaan komponenttiin voi olla haastavaa. (D. Dhivya et al 2018) 

Sovelluksessamme havaittiin virheitä integraatiovaiheessa, kuten GET- endpointin reitti oli kirjoitettu koodiin väärin, eikä tiedon hakeminen onnistunut. Toki tämän kaltaisen virheen olisi pitänyt huomata koodikatselmoinnista, josta kuitenkin huomaamme miten tärkeää on olla erilaisia testimetodeja, jotka voivat paikata toinen toisiaan. Kohdassa 2.1 kerroin middleware-virheestä, joka olisi ollut katastrofinen vesiputousmallissa. Integraatiotestien avulla saimme kiinni virheestä, jossa express.json() järjestys ei ollut oikein projektin app.js sisällä. Yksikkötesti ei osaisi katsoa tai tarkistaa sitä. 

 

### 3.3 Hyväksyntä- ja mutaatiotestaus 

Hyväksyntä- ja E2E-testaus kuuluvat pyramidin huipulle ja niitä on yleensä vähiten verrattuna muihin testausmuotoihin. Teimme projektissa kaksi polkua smoke-testauksella. Ensimmäiseksi testattiin “happy path” eli vaihtoehto kun kaikki menee oikein. Toiseksi teimme tälle vastakohdan, joka oli täynnä virheellistä dataa API-endpointeille. Nämä testit luovat varmuutta projektin oikeellisuudesta ja toiminallisuudesta ja siitä että halutut toiminnot toimivat kuten on suunniteltu. Projektin alussa suunniteltiin, ettei aikarajoitteisista syistä sekä yksilötyön ja uuden kielen paineesta luoda kuin tarpeelliset hyväksyntätestaukset. Hyviä työkaluja kuten Cypress ja Playwright mietittiin, mutta koska projektiin sisällytettiin nopealla aikataululla mutaatiotestausta, jätimme tarkoituksella hyväksyntätestauksen työkaluja pois. 

Mutaatiotestausta toteutettiin Jest Runnerilla Stryker-työkalulla, kun se haluttiin lisätä nopealla aikataululla tarkistamaan projektin kunto. Sovelluksemme sain noin 80% tuloksen, joka on hyvä ottaen huomioon projektin lähtökohdat ja taitotason. Mutaatiotestaus oli hyvä lisä, sillä GET /health- endpointin testausta ei ollut tehty projektin laatujen mukaisesti ja se löytyi vasta mutaatiotestauksessa. Emme voi siis painottaa tarpeeksi, miten hyödyllistä on käyttää useita erilaisia työkaluja ja testitapoja. 

### 3.4 Peilaus tutkimukseen 

Mike Cohn (2009) esitti testauspyramidin, jossa testaus rakentuu kerroksittain: pohjalla on suuri määrä yksikkötestejä, niiden päällä pienempi määrä integraatiotestejä ja huipulla vain rajallinen määrä end-to-end -testejä. Pyramidin perusajatus on, että testauksen painopiste tulee olla nopeissa ja ylläpidettävissä yksikkötesteissä, kun taas kalliimpia ja hitaampia kokonaisjärjestelmätestejä tulisi olla suhteellisesti vähemmän. 

Projektimme testausstrategia noudatti Cohnin esittämää pyramidimallia. Keskityimme vahvaan yksikkötestaukseen domain- ja service-tasolla, täydensimme sitä rajapintatason integraatiotesteillä ja rajasimme end-to-end -testien määrän vain kriittisiin käyttötapauksiin. Tämä lähestymistapa tukee Agilen keskeisiä periaatteita, kuten nopeaa palautetta, jatkuvaa integraatiota ja testien ylläpidettävyyttä.

## 4. Soveltaminen käytännössä

Projektissa testaustrategiaa sovellettiin kerroksittain: domain, service, REST, UI. Jokainen kerros toteutettiin noin yhden sprintin aikana ja työskentely dokumentointiin sprinttilokiin. Myös työkalujen käyttöönotto tapahtui vaiheittain. 

Taulukko bugeistä löytyy dokumentaatiosta 02-mittarit-ja-data.md osiosta. Sprinttien 1-3 välillä yksikkötestaus löysi validoinnin puutteita ja status-säännön rikkeitä. Nämä liiketoimintalogiikan osat ovat projektin kriittisin komponentti ja siksi niihin myös kohdistuu paljon unit-testejä. Vasta kun virheet ja bugit korjattiin ja kerros todettu vakaaksi, siirryimme rakentamaan REST-rajapintaa. Tässä järjestelmällisessä etenemisessä on harjoiteltu Kent Beckin ohjetta pilkkoa haasteita pienempiin vaiheisiin ja iteroida ja parantaa koko ajan tulosta. 

Kuten jo kohdassa 3.2 mainittiin, integraatiotestauksella varmistettiin kerrosten yhteistoimintaa ja datan kulkua kerrosten välillä.  Esimerkiksi HTTP-statuskoodien epäjohdonmukaisuutta ei olisi nähty yksikkötasolla. 

Jatkuvan integraation työkaluna käytimme Github Actions:iä, joka yhdessä ESlintin kanssa paljasta virheitä export/import toiminnoissa, kertoi määrittelemättömistä parametreista ja muista laadullisista ongelmista. Actions myös tuki iteratiivista luonnetta ja nopean palautteen sykliä, sillä jokaisella pushilla saimme joko punaista tai vihreää valoa. 

| Menetelmä | Löysi |
|-----------|-------|
| Yksikkö | Loogiset domain-virheet |
| Integraatio | Kerrosrajapintavirheet |
| CI | Konfiguraatio- ja laatuvirheet |
| Katselmointi | Rakenteelliset ongelmat |
| Mutaatio | Testien riittämättömyys | 

Huomataan, että jokainen testausmenetelmä on ollut tärkeä projektin laadunvarmistukselle ja onnistumiselle. Projektin perusteella voidaan todeta, että backend-painotteisessa sovelluksessa yksikkötestaus tuottaa suurimman määrän löydöksiä pienimmällä kustannuksella, mutta integraatiotestaus ja CI ovat välttämättömiä arkkitehtuuristen ja konfiguraatiovirheiden havaitsemiseksi.

### 4.1 Tekoälyn käyttö projektissa

Olen ollut pitkään tekoälyskeptikko ja lähtökohtaisesti minua voisi kuvata katsovan tekoälyn käyttöä negatiivisesti. Opintojeni toisella vuodella olen kuitenkin lämmennyt käyttämään kielimalleja tuutorina. Kysyn kysymyksiä, kuten “selitä kuin olisin 5”, “tee esimerkki tästä kohta kohdalta” ja “auta minua ymmärtämään”.  Ajattelen siis olevani vastuullinen tekoälyn käyttäjä.  

Tämä oli ensimmäinen projekti, jonka toteutin alusta loppuun tekoälyavusteisesti. Ajatus siitä, että projekti muuttuisi “vibe coding” -tyyliseksi, herätti huolta. En halua luopua omasta ajattelustani tai siirtää vastuuta koneelle. Halusin kuitenkin opetella jotain uutta, käyttää uusia työkaluja ja nähdä, mihin kaikkeen kielimallit pystyvät. 

Projektin aikana kielimalli toimi kirjaimellisesti tuutorina. Suunnittelimme yhdessä sprinttirakenteen, testausstrategian rungon sekä hakemistorakenteen. Teknisen toteutuksen aikana kielimalli auttoi ymmärtämään esimerkiksi Expressin middleware-järjestystä, CommonJS-moduulijärjestelmää sekä validointilogiikan eroja create- ja patch-operaatioiden välillä. Kuitenkin middlewaren järjestysvirhe oli ihan itse aiheutettu, koska en tiennyt sen paikalla olevan väliä ja GET /tasks virhe oli oma kirjoitusvirhe koodissa. Tunsin painetta, etten olisi tarpeeksi taidokas JavaScriptissa arvioidakseni omaa, saati tekoälyn koodia. 

Christopher Bull ja Ahmed Kharrufa (2023) haastattelivat viittä ohjelmistokehittäjää, joilta kysyttiin heidän tekoälynsä käytöstä ja mielipiteistä yleisesti. Esiin nousi huoli siitä, ettei junior kehittäjä opi perusasioita, mutta myös paljon kiinnostavia pointteja senior kehittäjän käyttötilanteista. Eräs haastateltavista kommentoi, miten seniori kehittäjä voisi käyttää tekoälyä apuna, kun työskentelee uuden kielen kanssa. Melkein kaikkien mielestä oli tärkeää, että ihminen käy läpi tekoälyn luoman koodin. 

Jaksoin siis joka kohdan käydä läpi, katsoa virheilmoitukset ja mietin aina itse, mikä mättää. Actions kertoi hyvin, jos lintteri oli löytänyt jotain villiä, jota en ollut huomannut. Painopiste muuttuikin jatkuvaan arviointiin ja pohtimiseen, onko tämä koodi oikea, mistä tämä virhe tulee ja olisiko näin sopiva tehdä. En siis jäänyt miettimään syntaksia tai selaamaan JavaScriptin tutoriaaleja, vaan keskityin rakentamiseen TDD:n sykleillä. 

Olenko nyt parempi JavaScript kehittäjä? Todennäköisesti en.  Olenko kriittisempi arvioimaan generoitua koodia? Ainakin kehittynyt siinä ja hallusinaatioiden bongauksessa. Sauvola et al. (2024) kuvasivat artikkelissaan: “Generative AI is regarded as a major disruption to software development.” Tämä kuvastaa hyvin myös omia henkilökohtaisia tunteita, kun otin kielimallit käyttöön kokonaisvaltaisemmin ja näin itse mihin ne pystyvät. Sauvola et al. painottivat myös ihmisten kriittistä arviointia ja valtasuhdetta suhteessa tekoälyyn. Ei saisi passiivisesti vain hyväksyä tekoälyn tuotoksia, vaan pitää määräysvalta itsellään. Tämä kokoaa hyvin myös Bull ja Kharrufan haastattelijoiden mielipiteet sekä A. Meneelyn ja L. Williamsin (2009) katsaus Linuksen lakinakin tunnettuun ilmiöön eli ihmisten tekemä koodiarviointi. 

 

  

 

## 5. Etiikka ja talous 

### 5.1 Taloudellinen näkökulma 

Pieni virhe on helppo korjata projektin alussa. Jos se jää piiloon, se voi kasvaa loppuvaiheessa jopa projektin kaatajaksi. Projektimme titlen validointi ja siinä oleva virhe kesti korjata noin pari minuuttia. Kuitenkin jo sprintti kolmosen kohdalla olisi ollut vaikea paikantaa, mistä titlen virhe muodostuu. Alkukustannukset voivat vaikuttaa suurelta, kun harjoitetaan TDD:tä, mutta se tasaa debuggaus- ja korjauskustannuksia myöhemmin. Testikattavuus ei yksin riitä, sillä testien laadullinen arvo ja testit itsessään olisi hyvä testata.  

On useita yrityksiä, joiden virheestä on syntynyt haittaa asiakkaalle ja yritykselle.  CrowdStrike:n viallinen päivitys kesällä 2024 on arvioitu tulleen maksavan globaalisti noin 10 miljardia USD. Huomataan että J.M.Stecklein et al (2004) teoria cost-to-fix kustannusten nousemisesta tuontantovaiheessa sopivat yhteen myös CrowdStriken tapauksessa. On siis elintärkeää käyttää työkaluja ja testaustekniikoita, jotka kattavat projektin kriittisimmät osat. 

Sauvola et al. (2024) mukaan tekoäly voisi nostaa produktiivisuutta 20%-50% usein toistettavissa tehtävissä. Omassa projektissa tekoäly on nopeuttanut tekemistä ja uskoisin että täysin ilman tekoälyä näillä olosuhteilla projekti olisi ollut ajallisesti paljon pidempi. Yhdistettynä TDD:n “left-leaning” virheiden korjaamiseen, tekoäly on nostanut produktiivisuutta ja estänyt teknisen velan kasvamisen projektin loppua kohden. 

### 5.2 Eettinen näkökulma 

Vaikka projekti on pieni eikä siinä hyödynnetä tietokantaa, se simuloi todellista järjestelmää. Silloin virheellinen datan kulku, validointi ja datan eheys ovat kriittisiä toimintoja, joiden virheellinen käyttö voi johtaa tietoturvariskeihin. Ohjelmiston kehittäjällä on vastuu toimia luottamuksellisesti, sillä riippuen alasta he voivat olla yhteyksissä todella sensitiiviseen dataan. Täytyy myös ymmärtää, että teknologiaa on kertynyt niin usealle alalle, ettei ole mahdotonta, että ohjelmoijan tai testaajan projekti voisi pelastaa hengen tai viedä sen.  Toki, tällöin on kyseessä ihmisen oma valinta, mihin hän tietoteknisiä taitojaan hyödyntää. 

Kielimallien käyttö on myös eettisesti moninaista. Kielimalli ei keksi mitään uutta, vaan se on koulutettu muiden teoksilla. On siis pohdittava IP- ja tekijänoikeuksia myös koodin generoinnissa. Kielimallit voivat oppia tietyn vinouman, joka voi tietoteknisesti liittyä joko parhaiden tapojen leviämiseen tai päinvastoin. Jos tekoälyn generoima koodi on sisältänyt virheen, jota ei ole huomattu, kuka on vastuussa? 

Vaikka tekoäly tuottaa koodia, vastuu sen toiminnasta ei siirry mallille. Ohjelmistokehittäjä on juridisesti ja ammatillisesti vastuussa siitä, mitä tuotantoon päätyy. Tekoälyn käyttö ei vähennä tätä vastuuta, vaan lisää tarvetta kriittiseen arviointiin. Sauvola et al. (2024) korostavat, että ihmisen tulee säilyttää valta ja kriittinen rooli AI:n rinnalla. Tämä näkyi projektissa siinä, että yksikään generoitua koodia sisältävä muutos ei päätynyt lopulliseen versioon ilman testien ja CI:n läpäisyä. 

 

### 5.3 Ammatillinen standardi 

Lähtökohtaisesti uskon, että yksilön pitäisi pystyä olemaan ylpeä tai ainakin seisoa rakentamansa projektin takana. Ottaa vastuu projektin edistymisestä, sen virheistä ja mahdollisesta kritiikistä. Generatiivisen tekoälyn aikakaudella ammatillinen standardi ei enää tarkoita vain koodin kirjoittamista, vaan myös generoidun koodin kriittistä arviointia, hallusinaatioiden tunnistamista ja eettisten riskien tiedostamista. 

Työskentelyssä on pyritty noudattamaan TDD:n ja scrumin pääpiirteitä, ja hyödynnetty useita eri työkaluja tyydyttävän lopputuloksen saamiseksi. Ominaisuus ei ollut valmis ennen kuin yksikkötestit olivat vihreänä, integraatiotestit läpäisty ja CI hyväksyi muutoksen. Tämä lähestymistapa heijastaa alan käytäntöjä, joissa laatuportit ovat osa ammattimaista kehitystä. Ammatilliseen standardiin kuuluu myös teknisen velan hallinta. Refaktorointia tehtiin vain testien suojassa, mikä mahdollisti rakenteellisten parannusten tekemisen ilman regressioriskiä.

## Lähteet 

Beck, K. (2003). Test-driven development: By example. Addison-Wesley. (linkki) 

 

Boehm, B. W. (1988). A spiral model of software development and enhancement.  (linkki) 

Bull, C., & Kharrufa, A. (2023). Generative AI assistants in software development education: A vision for integrating generative AI into educational practice, not instinctively defending against it. (linkki) 

Cohn, M. (2009). Succeeding with Agile: Software development using Scrum. Addison-Wesley. (linkki) 

Desai, C., Janzen, D., & Savage, K. (2008). A survey of evidence for test-driven development in academia.  (linkki) 

Dhivya, D., et al. (2018). Study on integration testing and system testing. (linkki) 

Dybå, T., & Dingsøyr, T. (2008). Empirical studies of agile software development: A systematic review. Information and Software Technology, 50(9–10), 833–859. https://doi.org/10.1016/j.infsof.2008.01.006 

Elazhary, O. (2021). Investigation of the interplay between developers and automation. In Proceedings of the 43rd International Conference on Software Engineering: Companion Proceedings (pp. 153–155). IEEE. https://doi.org/10.1109/ICSE-Companion52605.2021.00042 

Maximilien, E. M., & Williams, L. (2003). Assessing test-driven development at IBM. 10.1109/ICSE.2003.1201238 

Meneely, A., & Williams, L. (2009). Secure open source collaboration: An empirical study of Linus’ law. https://doi.org/10.1145/1653662.1653717 

Sauvola, J., Tarkoma, S., Klemettinen, M., Riekki, J., & Doermann, D. (2024). Future of software development with generative AI. https://doi.org/10.1007/s10515-024-00426-z 

Stecklein, J. M., Dabney, J. B., & Dick, B. (2004). Error cost escalation through the project life cycle. (linkki) 

Trinh, H., & Doan, T. (2016). Implementation of continuous integration and continuous delivery in Scrum-based projects. Theseus. 

 

## Oppimistavoitematriisi

| # | Kurssin oppimistavoite | Viittaus työhön ja perustelu |
|---|---|---|
| 1 | Testauksen periaatteiden ymmärtäminen | TDD-prosessin eteneminen on kuvattu 03-sprinttilokissa, jossa dokumentoin Red–Green–Refactor -syklin käytännössä. Projektissa testit kirjoitettiin ennen tuotantokoodia erityisesti domain- ja service-tasolla. Esimerkiksi title-validoinnin whitespace-virhe havaittiin yksikkötestillä ennen REST-tason toteutusta. Varhainen testaus vähentää virheiden kumuloitumista. |
| 2 | Elinkaarimallien ja jatkuvien käytäntöjen rooli | Raportin kohdassa 2.1 vertaillaan TDD+Scrum -rakennetta vesiputousmalliin. Projektissa GitHub Actions toimi jatkuvan integraation laadunporttina: koodi ei ollut valmis ennen kuin testit ja lint läpäistiin. Middleware-järjestysvirhe havaittiin integraatiotestauksessa ennen tuotantovaihetta, mikä konkretisoi iteratiivisen mallin hyödyt verrattuna lineaariseen vesiputoukseen. |
| 3 | Testausmenetelmien vertailu | Raportin kohdassa 3 analysoidaan yksikkö-, integraatio- ja mutaatiotestauksen rooleja. Yksikkötestit löysivät loogiset domain-virheet, integraatiotestit paljastivat kerrosrajapintavirheitä (esim. GET-endpointin reittivirhe), ja mutaatiotestaus paljasti puutteita testikattavuudessa (/health-endpoint). Tämä osoittaa menetelmien täydentävän toisiaan testipyramidin mukaisesti. |
| 4 | Käytännön soveltaminen ja työkalut | Projektissa käytettiin Jest (unit), Supertest (integration), ESLint (staattinen analyysi), Stryker (mutation testing) ja GitHub Actions (CI). Työkalut eivät jääneet teoriaksi, vaan niitä sovellettiin systemaattisesti sprinttien aikana. CI-putki esti rikkinäisen koodin yhdistämisen ja tuki iteratiivista kehitystä. |
| 5 | Eettinen ja taloudellinen arviointi | Raportissa analysoidaan defektin korjauskustannusta projektin eri vaiheissa. Esimerkiksi title-validoinnin virhe oli helppo korjata sprintin alussa, mutta olisi myöhemmässä vaiheessa vaikuttanut useisiin kerroksiin. CI ja TDD pienensivät regressioriskiä ja tukivat vastuullista ohjelmistokehitystä. Lisäksi pohditaan tekoälyn käytön eettistä vastuuta ja kehittäjän roolia generoidun koodin arvioinnissa. | 


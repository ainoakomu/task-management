## Sprintti 1

Tämä sprintti oli ihan perus apua mistä lähdetään type beat.
Alustin projektin aiheen, mietin aikataulun ja työkalut ja palautin aihe- ja osaamistavoitteet Moodleen. Tein Node-projektin, alustin gitin ja loin repon GitHubiin. Käytin runkojen tekemiseen OpenAi:n ChatGPT:tä, sillä sen keskustelumainen tapa helpottaa sisäistämistä.

Ensimmäinen oikea tekninen askel oli title-validointi. Kirjoitin pari testiä, joissa tarkistetaan että title ei voi puuttua, olla tyhjä tai pelkkää whitespacea. Ajoin testit punaiseksi, loin ValidationError-luokan ja toteutin validateTask-funktion niin että testit menivät vihreäksi.

Tässä kohtaa Red–Green–Refactor oli vielä hyvin konkreettinen ja selkeä. Yhden funktion tasolla TDD tuntui loogiselta ja hallittavalta.

Expressin rooli oli vielä vähän hämärä. Siksi myös kommentoin koodia aika paljon. Se hidasti tekemistä, mutta samalla auttoi ymmärtämään mitä oikeasti teen. Kirjoitin myös ensimmäistä versiota testaustrategiasta ja yritin etsiä lähteitä Google Scholarista. Osa oli maksumuurin tai kirjautumisen takana, mikä vähän ärsytti.

TDD tuntui tässä vaiheessa aika hyvältä mutta olin kyllä aika hukassa ja jouduin kysymään "mitä tää tarkottaa" "selitä kuin olisin 5" ja "miksi tehdään näin" tekoälyltä aika useasti että olin kärryillä.

## Sprintti 2

Tässä sprintissä mentiin syvemmälle arkkitehtuuriin. Rakensin TaskRepon ja TaskServicen. Tää oli jo aika uutta ja jännittävää.

TaskRepo tehtiin vähän “epäpuhtaasti” TDD:n näkökulmasta. Ensin määriteltiin sopimus, sitten toteutus, ja vasta lopuksi testit. Tämä oli tavallaan scaffolding-tyyppinen ratkaisu. Tekoäly halu ensin tehdä rungon ja sitten vasta testit ja päädyin seuraamaan sitä ohjetta. Jälkiviisaana olisi ollut hyvä hieman etsiä aiheesta muita lähteitä, joten hyväksyn kaiken kritiikin.

Repo pidettiin tietoisesti yksinkertaisena. Se käsittelee vain dataa. Liiketoimintalogiikka ja virheenkäsittely siirrettiin TaskServiceen. Tää myös helpottaa projektin modulaarisuutta ja järjestelmällisyyttä.

TaskService taas tehtiin selkeämmin TDD:llä. Testit ensin, sitten toteutus. Tässä vaiheessa tuli vastaan myös testikirjaston kanssa pieniä kompastumisia. Esimerkiksi toHaveBeenCalled("1") vs. toHaveBeenCalledTimes(1). Testit näyttivät vihreää, mutta assert oli väärin. Se oli hyvä muistutus siitä, että testikoodikin voi olla rikki. (Huomaako että aloittelijan virheitä..)

Yksikkötestit löysivät loogisia virheitä, kuten virheenkäsittelyyn liittyviä puutteita. Koodikatselmointi taas paljasti rakenteellisia asioita, esimerkiksi vastuiden sekoittumista service- ja repo-kerrosten välillä.

Tässä kohtaa alkoi hahmottua, että eri laadunvarmistusmenetelmät löytävät eri asioita. Paljon unit-testejä ei tarkota hyvää projektia. Myös paljon mietintää tekoälystä ja sen hallusinoinneista. Tekoälyn käyttö silti hermostuttaa paikoin.

## Sprintti 3

Tämä oli selvästi isoin sprintti tähän mennessä. Tavoite oli REST-rajapinta ja integraatiotestit. Mutta työmäärä oli iso, ja tekeminen oli välillä hidasta.

Aloitin lisäämällä uuden domain-säännön status-kentälle TDD:n mukaisesti. Ensin epäonnistuva testi, sitten toteutus. Tämä sujui jo huomattavasti varmemmin kuin sprintti 1:ssä.

Sen jälkeen toteutin CRUD-operaatiot: POST, GET, PATCH ja DELETE. Rakensin error-middlewaret ja kirjoitin integraatiotestit Supertestillä.

Yksi merkittävä bugi oli middleware-järjestys. express.json() oli väärässä kohdassa, jolloin req.body oli tyhjä. Validilta näyttävä POST palautti 400. Huomaa, etten tiennyt niiden järjestyksellä olevan väliä, sillä en ole koskaan aiemmin miettinyt sellaista.

Toinen tärkeä havainto liittyi PATCH-operaatioon. Käytin aluksi samaa validointia kuin create-operaatiossa. Se vaati title-kentän, vaikka PATCH on osittainen päivitys. eli validi status-päivitys palautti 400. Ratkaisu oli tehdä erillinen validateTaskPatch, jossa kentät ovat optional. Tämä oli enemmän API-sopimuksen kuin domain-logiikan virhe.

CI ja ESLint löysivät käyttämättömiä parametreja, turhia importteja ja export/import mismatch -ongelman. Näitä ei olisi huomannut pelkillä testeillä.Varsinkin kun projektin tiedostot kasvaa ja niitä on useita, niin tuntuu että joskus jotain kirjoitusvirhettä täytyy ihan metsästää dokumenteista ja siinä staattinen analyssi on kyllä jees.

Red–Green onnistui pääosin, mutta Refactor-vaihe meinaa välillä unohtua. Tähän piti tietoisesti  koko ajan palata.

Tässä sprintissä alkoi näkyä selvästi, että virheet siirtyvät domain-tasolta rajapintoihin. Eli liikutaan kokoajan syvemmille vesille. Samalla on turvallinen(?) olo siitä, ettei voi rikkoa projektia kovinkaan pahasti.

## Sprintti 4

Tässä sprintissä tehtiin UI. Tämä ei mennyt TDD:llä, eikä ollut tarkoituskaan.

Backend on projektin varsinainen tutkimuskohde. UI toimii enemmän demokerroksena. TDD:tä käytettiin siellä missä se tuottaa eniten arvoa. Tässä projektissa suurin arvo oli domain-logiikassa, API-sopimuksessa ja virheenkäsittelyssä, ei käyttöliittymän napeissa. En myöskään ollut varma kuinka paljon uskallan antaa aikaa UI tekemiseen, sillä se voisi riistäytyä käsistä. (Innokas WOH1:n suorittaja täällä)

Rakensin yksinkertaisen full flown: listaus, luonti, päivitys ja poisto.

UI:n kanssa tuli enemmän konfiguraatio- ja ympäristövirheitä:

väärä base path (/api/tasks vs /tasks) (osaanko lukea omaa koodia kun tuollaiset unohtui)
async puuttui event handlerista
static serve väärässä paikassa, jolloin tuli “Cannot GET /”

Tosi innoissani että projekti lähestyy loppua, mutta jännittää olenko tehny riittävästi. Tuntuu että olen vain raapaissut pintaa testauksesta ja kaikesta siihen liittyvästä. Välillä myös mietin onko joku dysleksiä kun hirveistä typoista tulee path ongelmia.

## Sprintti 5

Viimeinen vaihe keskittyi mutaatiotestaukseen ja raportin viimeistelyyn.

Ajoin Strykerin ja mutation score oli noin 80 %. Copilot meinasi mennä solmuun kun pyysiin sitä miettimään mistä voisimme parantaa, mutta testien parannuksilla saatiin jo hyvä yli 90%. Kaikkia mutantteja ei saatu tapettua, mutta se on kuulemma (ehkä) ihan sallittua.

Mutaatiotestauksesta saatiin siis esille testien heikkouksia. Joissakin kohdissa assertit olivat liian yleisiä tai testit eivät tarkistaneet ehtoja riittävän tarkasti. Korkea coverage prosentti ei siis tarkota maailman parasta testausta.

Loppuvaiheessa tein raportin hienosäätöä, luin artikkeleita ja valmistauduin videoesittelyyn.
Videon palautteista tein muutoksia vielä ennen lopullista palautusta ja hienosäätöä projektin ulkonäköön ja dokumentointiin. Tekoälystä on kyllä jeesiä sellaisen ulkomuodon hiontaan ja runkojen tekemiseen, mutta sisältö on välillä sellasta AI-sloppia että vähän sattuu.
All in all projektista jäi hyvä fiilis ja tuntuu ehkä rohkeammalta lähteä WOH II-kurssille kun on vähän kosketuspintaa backendista ja testauksesta. Ja lehtori on ollut tosi kiva tällä kurssilla :3
 Mitä toteutettiin?

Mitä virheitä löytyi?

Mikä menetelmä löysi ne?

Oliko jotain poikkeamaa TDD:stä?
Sprintin reflektiomalli
1. Mitä opin teknisesti?

Uusi käsite / työkalu

Mikä oli vaikeaa?

Mikä selkeytyi?

2. Miten TDD toimi tässä sprintissä?

Oliko Red–Green–Refactor systemaattinen?

Löytyikö virheitä testien avulla?

Poikkesinko TDD:stä? Miksi?

3. Miten sprinttirakenne (Scrum-ajattelu) vaikutti?

Oliko tavoite selkeä?

Oliko työ rajattua?

Tuntuiko “valmis” selkeästi määritellyltä?

4. Miten laadunvarmistus (CI, lint, katselmointi) vaikutti?

Mitä paljastui?

Mitä opin työkalujen roolista?

5. Mitä tekisin toisin seuraavassa sprintissä?
 
 
  ##  Sprintti 1

Tein: Alustin projektin aiheen, aikataulun, mahdolliset työkalut sekä palautin aiheeni ja opintotavoitteiden kohdat Moodleen. Rakensin projektin, alustin gitin ja tein repon GitHubiin. Aloitin tehtävän titlen validoinnista. Testeihin tule pari kohtaa, jossa testataan onko title oikein. Sitten ajettiin se punaiseksi, luotiin oikea validationError ja sitten validateTask funktio, jotta testi meni vihreäksi. Tässä hyödynnettiin klassista Red-Green-Refactor. Jonkin verran on ongelmia ymmärtää Expressin roolia, joten siksi olen keskittynyt siihen että jokaisessa kohdassa olisi hyvä kommentti. Se helpottaa myös sinua, projektin lukijaa että myös minua oppijana. Kirjoitin myös jonkinverran jo testaustrategiaa ja aloin etsiä Google Scholarista tekstejä. Harmikseen osaan joutuisi kirjautua, tai ne ovat maksumuurin takana eikä UEFilla ole sinne pääsyä. 

Koodikatselmoinnissa havaittiin, että testien nimeäminen vaikutti merkittävästi luettavuuteen. Rakennetta selkeytettiin erottamalla validointi omaksi moduulikseen.


## Sprintti 2

Työ: TaskRepo toteutettiin osittain TDD:stä poiketen ns. scaffolding-tyylisesti. Ensin määriteltiin TaskRepon vastuut ja “sopimus”, jonka jälkeen toteutettiin in-memory-implementaatio ja lopuksi sitä vastaavat yksikkötestit. Tässä vaiheessa kehitystä ei siis edetty täysin testilähtöisesti, vaan testit kirjoitettiin toteutuksen jälkeen varmistamaan toiminnallisuus.

TaskRepo on kuitenkin pidetty tarkoituksellisesti yksinkertaisena ja se sisältää vain datan käsittelyyn liittyvän logiikan. Varsinainen liiketoimintalogiikka ja virheenkäsittely on eriytetty TaskService-kerrokseen.

TaskService toteutettiin TDD-prosessin mukaisesti: testit kirjoitettiin ensin ja toteutusta täydennettiin testien ohjaamana. Kehityksen aikana ilmeni virheitä myös “vihreissä” testiajoissa, jotka johtuivat puutteellisesta Jest-syntaksista (esim. toHaveBeenCalled("1") vs. toHaveBeenCalledTimes(1)). Nämä korjattiin testejä tarkentamalla, mikä vahvisti ymmärrystä testauskirjaston käytöstä.

Yksikkötestaus löysi loogisia virheitä, kun taas koodikatselmointi paljasti rakenteellisia ongelmia, kuten vastuiden sekoittumista service- ja repo-kerrosten välillä.


## Sprint 3
Sprint 3 aloitettiin lisäämällä uusi domain-sääntö tehtävän tilalle (status).
TDD-menetelmän mukaisesti kirjoitettiin ensin epäonnistuva yksikkötesti, joka määritteli vaaditun toiminnallisuuden ennen varsinaista toteutusta.
 

Menetelmä: Unit test (Jest)
Löydös: Cannot find module '../../src/errors'
Missä: tests/unit/taskStatus.test.js
Syy: Virheellinen import-polku / tiedostonimi
Korjaus: Polun yhtenäistäminen toimivien testien kanssa

Menetelmä: integraatiotesti (supertest)
Löydös: validi POST palautti 400
Juuri-syy: express.json() middleware oli reitin jälkeen → req.body tyhjä
Korjaus: middleware siirrettiin reittien yläpuolelle



Menetelmä: Staattinen analyysi (ESLint, GitHub Actions)
Löydös: 'next' is defined but never used (src/app.js, error-middleware)
Juuri-syy: Error-middleware määriteltiin Expressin vaatimalla neljän parametrin muodolla (err, req, res, next), mutta next-parametria ei käytetty, mikä aiheutti ESLint-varoituksen.
Korjaus: Parametri nimettiin muotoon _next, jolloin middleware säilyi Express-yhteensopivana ja lint-virhe poistui.

Havainto: Staattinen analyysi paljasti koodin laatuun liittyvän ongelman, jota yksikkö- tai integraatiotestit eivät olisi löytäneet.

Menetelmä: integraatiotesti (supertest)
Löydös: GET /tasks puuttui (404)
Korjaus: lisättiin GET-reitti, joka palauttaa listan

Menetelmä: integraatiotesti

Löydös: debug-logit jäivät vahingossa päälle

Korjaus: poistettiin console.log ennen mergeä (CI-hygienia)
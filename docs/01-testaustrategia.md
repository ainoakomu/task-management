Hienoa 👍
Alla on valmis, jäsennelty testausstrategia, joka sopii suoraan sinun projektiisi (Node + Express + TDD + CI + sprinttikehys).

Voit kopioida tämän docs/01-testistrategia.md -tiedostoon ja muokata tarvittaessa.

Testausstrategia
1. Projektin konteksti

Projektin tavoitteena on toteuttaa tehtävienhallintasovellus Node.js- ja Express-ympäristössä testilähtöisesti (TDD). Sovellus koostuu:

Domain-logiikasta (validointi ja virheluokat)

Repository-kerroksesta (in-memory data access)

Service-kerroksesta (liiketoimintalogiikka)

REST-rajapinnasta

CI-putkesta (GitHub Actions)

Staattisesta analyysistä (ESLint)

Testausstrategian tavoitteena on varmistaa sovelluksen:

Looginen oikeellisuus

Arkkitehtuurinen selkeys

Regressiosuoja

Jatkuva laatu sprinttien aikana

2. Testauksen kohteet

Testaus kohdistetaan kerroksittain.

2.1 Domain-taso

Testataan:

validateTask

pakolliset kentät (esim. title)

status-säännöt

ValidationError-luokka

Tavoite:
Varmistaa liiketoimintasääntöjen oikeellisuus ja rajatapaukset.

2.2 Repository-taso

Testataan:

CRUD-operaatioiden toiminta

sopimuksen (repository contract) noudattaminen

palautusarvot (null, boolean, Task-olio)

Tavoite:
Varmistaa datankerroksen ennustettavuus ja rajapinnan vakaus.

2.3 Service-taso

Testataan:

liiketoimintalogiikka

virhetilanteiden käsittely

yhteistyö Repositoryn kanssa

virheiden heittäminen oikeissa tilanteissa

Tavoite:
Varmistaa, että sovelluksen varsinainen käyttäytyminen toimii oikein.

2.4 REST-taso

Testataan:

HTTP-statuskoodit

JSON-vastaukset

virhevastaukset

Tavoite:
Varmistaa rajapinnan oikeellisuus ja standardien mukaisuus.

3. Testitasot ja menetelmät
3.1 Yksikkötestaus

Työkalu: Jest
Lähestymistapa: Test Driven Development (TDD)

Prosessi:

Kirjoitetaan epäonnistuva testi (Red)

Toteutetaan minimikoodi (Green)

Refaktoroidaan turvallisesti (Refactor)

Yksikkötestaus on ensisijainen laadunvarmistusmenetelmä domain- ja service-tasolla.

3.2 Integraatiotestaus

Integraatiotestit varmistavat REST-rajapinnan ja eri kerrosten yhteistoiminnan.

Painopiste:

Statuskoodien oikeellisuus

Virhetilanteiden palautukset

3.3 Staattinen analyysi

Työkalu: ESLint

Staattinen analyysi:

Tarkistaa syntaksin

Havaitsee mahdolliset virhetilanteet

Ylläpitää yhtenäistä koodityyliä

3.4 Jatkuva integraatio (CI)

Työkalu: GitHub Actions

CI-putki:

Ajaa lintin

Ajaa testit

Estää rikkinäisen koodin yhdistämisen

CI toimii laadun porttina sprinttien aikana.

3.5 Koodikatselmointi

Koodikatselmointi täydentää automatisoitua testausta.

Tarkastetaan:

Vastuurakenne (service vs repository)

Testien luettavuus

Modulaarisuus

Koodikatselmointi keskittyy erityisesti arkkitehtuuriseen laatuun.

4. TDD ja Scrum -kehittämisen yhdistäminen

Projektissa TDD toimii mikrotason kehityssyklinä, kun taas sprinttirakenne tarjoaa makrotason kehityskehyksen.

Jokainen backlog-item toteutetaan TDD-syklillä. Sprintin aikana valmistuva toiminnallisuus katsotaan valmiiksi, kun seuraavat ehdot täyttyvät:

Definition of Done:

Yksikkötestit vihreänä

Lint läpäisty

CI onnistuu

Koodi katselmoitu

TDD varmistaa toiminnallisuuden oikeellisuuden sprintin sisällä, ja Scrum-tyyppinen sprinttikehys varmistaa hallitun etenemisen ja priorisoinnin.

5. Mittarit ja seuranta

Projektissa kerätään tietoa testauksen toimivuudesta:

Löydettyjen virheiden tyyppi (looginen, arkkitehtuuri, konfiguraatio)

Missä vaiheessa virhe havaittiin (unit, katselmointi, CI)

TDD-poikkeamien määrä

CI-epäonnistumisten määrä

Kerättyä dataa hyödynnetään loppuraportin analyysiosiossa.

6. Strategian rajaukset

Projektissa ei toteuteta:

Suorituskykytestausta

Turvallisuustestausta

KuormitustestaustaTestausstrategia

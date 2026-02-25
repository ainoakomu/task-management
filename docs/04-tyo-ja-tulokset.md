# Työt ja tulokset

## 1. Toteutetut kokonaisuudet

Projektin aikana toteutettiin backend-painotteinen tehtävienhallintasovellus, jossa arkkitehtuuri ja testaus rakennettiin kerroksittain.

### Toteutetut komponentit

- Domain-tason validointi (title + status)
- ValidationError- ja NotFoundError-luokat
- TaskRepository (in-memory)
- TaskService (liiketoimintalogiikka)
- REST API (CRUD-operaatiot)
- Error-middleware (400 / 404 -mapitus)
- Yksikkötestit kaikille keskeisille komponenteille
- Integraatiotestit Supertestillä
- GitHub Actions -CI ja ESLint
- Mutaatiotestaus (Stryker)
- Kevyt UI backendin demonstrointiin

### Arkkitehtuuri

Arkkitehtuuri erottaa selkeästi:

- **Repository** → datan käsittely
- **Service** → liiketoimintalogiikka ja virheenkäsittely
- **Domain** → validointisäännöt
- **REST** → HTTP-rajapinta ja virheiden mapitus

Tämä kerrosrakenne ei ollut täysin selkeä projektin alussa, mutta sprinttien aikana se tarkentui testien ja katselmoinnin ohjaamana.

---

## 2. Testauksen tulokset menetelmittäin

### 2.1 Yksikkötestaus (TDD)

Yksikkötestaus oli projektin ensisijainen kehitysmenetelmä.

#### Sprintti 1

Title-validointi toteutettiin Red–Green–Refactor -syklillä. Testit paljastivat validointilogiikan puutteita, kuten sen, ettei tyhjä tai whitespace-title aiheuttanut virhettä. ValidationError-luokka tarkentui testien ohjaamana.

#### Sprintti 2

TaskService toteutettiin pääosin TDD:llä. Testit löysivät loogisia virheitä virheenkäsittelyssä (esimerkiksi NotFoundErrorin puuttuminen). Lisäksi ilmeni testikirjaston syntaksivirheitä, jotka paljastivat sen, että myös testikoodi voi antaa väärän turvallisuuden tunteen.

#### Sprintti 3

Status-sääntö toteutettiin testilähtöisesti. Yksikkötestit varmistivat, että vain sallitut arvot ("todo", "in_progress", "done") hyväksytään. Lisäksi update-logiikassa havaittiin virhe, jossa PATCH-operaatio käytti create-validointia, mikä johti virheelliseen 400-vastaukseen.

#### Löydökset

Yksikkötestaus löysi:

- Validointivirheitä
- Virheenkäsittelyn puutteita
- Vääränlaista logiikkaa update-operaatiossa

**Rajoitus:** Yksikkötestit eivät kuitenkaan löytäneet rajapintaan tai middlewareen liittyviä ongelmia.

### 2.2 Integraatiotestaus

Integraatiotestit kirjoitettiin Supertestillä ja kohdistuivat REST-rajapintaan.

#### Merkittävimmät löydökset

- `express.json()`-middleware oli väärässä kohdassa → `req.body` jäi tyhjäksi → validi POST palautti 400
- `GET /tasks` -reitti puuttui kokonaan
- `GET /tasks/:id` ei palauttanut 404:ää oikein
- PATCH käytti väärää validointia (create-sopimus vs partial update -sopimus)
- DELETE-reitti puuttui aluksi

#### Merkitys

Integraatiotestit paljastivat erityisesti kerrosten väliseen yhteistyöhön liittyviä virheitä. Ne toivat esiin API-sopimuksen ja domain-logiikan välisiä ristiriitoja.

Tässä vaiheessa konkretisoitui, että yksikkötestaus ei riitä järjestelmätasolla. Middleware-järjestysvirhe on hyvä esimerkki tilanteesta, jota yksikkötesti ei voi havaita.

### 2.3 Staattinen analyysi ja CI

GitHub Actions ja ESLint otettiin käyttöön laadunvarmistuksen tueksi.

#### Löydökset

CI paljasti:

- Export/import mismatch -ongelman (`createTaskRepo is not a function`)
- Tyhjän testitiedoston
- Käyttämättömiä muuttujia (`next`, `res`, importit)
- Debug-lokit, jotka jäivät vahingossa päälle

#### Merkitys

Staattinen analyysi ei löytänyt domain-bugeja, mutta se ylläpiti koodin siisteyttä ja rakennetta. Se pakotti korjaamaan asioita, jotka eivät riko toiminnallisuutta, mutta heikentävät laatua.

CI muutti käytännössä käsityksen valmiista työstä. Ominaisuus ei ollut valmis ennen kuin:

- Testit olivat vihreänä
- Lint meni läpi
- CI onnistui

### 2.4 Mutaatiotestaus

Projektin lopussa suoritettiin mutaatiotestaus Strykerilla.

#### Tulokset

- **Alkuperäinen mutation score:** noin 80%
- **Parannettu score:** noin 90%

#### Löydökset

Mutaatiot eivät paljastaneet uusia toiminnallisia virheitä, vaan testien heikkouksia:

- Alitestausta
- Liian yleisiä assert-lauseita
- Koodipolkuja, joita ei testattu riittävän tarkasti

#### Merkitys

Tämä osoitti, että korkea rivikattavuus ei automaattisesti tarkoita korkeaa testien laatua. Mutaatiotestaus toimi testipaketin laadun arviointina.

---

## 3. TDD-prosessin kehittyminen sprinttien välillä

### Sprintti 1
TDD oli opetteluvaiheessa. Se toimi yksittäisen funktion tasolla, mutta kokonaisuuden hallinta oli vielä epävarmaa.

### Sprintti 2
TDD vahvistui TaskService-kerroksessa. Repo toteutettiin osittain ilman TDD:tä, mikä tarjosi vertailukohdan. Testilähtöinen toteutus johti selkeämpään rakenteeseen kuin jälkikäteen testattu toteutus.

### Sprintti 3
Uudet säännöt ja REST-rajapinta rakennettiin systemaattisemmin testien kautta. Red–Green–Refactor toimi jo rutiininomaisemmin, vaikka Refactor-vaihe meinaa välillä jäädä vähälle.

### Sprintti 4–5
TDD:tä ei sovellettu käyttöliittymään, koska projektin painopiste oli backendissä. Sen sijaan TDD:n vaikutus näkyi vakaana domain- ja service-tason käyttäytymisenä, jota UI pystyi hyödyntämään ilman uusia domain-virheitä.

---

## 4. Löydösten luonne ja jakauma

### Jakauma menetelmittäin

- **Yksikkötestit** → loogiset validointi- ja virheenkäsittelyongelmat
- **Integraatiotestit** → rajapinta- ja middleware-ongelmat
- **CI ja ESLint** → konfiguraatio- ja laatuongelmat
- **Mutaatiotestaus** → testien riittämättömyys

### Virheiden kehitys

Virheiden luonne muuttui sprinttien aikana:

1. **Alussa** - virheet liittyivät yksittäisiin funktioihin ja validointiin
2. **Myöhemmin** - virheet liittyivät kerrosten välisiin sopimuksiin
3. **Lopussa** - tarkasteltiin testien laatua itsessään

Tämä kehityskaari kertoo, että projektin kypsyessä ongelmat siirtyvät alemmilta tasoilta arkkitehtuurin rajoille ja lopulta laadunvarmistuksen meta-tasolle.

---

## 5. Yhteenveto

Projektin keskeinen tulos ei ollut pelkästään toimiva REST-API, vaan ymmärrys siitä, miten eri testausmenetelmät täydentävät toisiaan.

### Roolit testausmenetelmissä

- **Yksikkötestaus** suojasi liiketoimintalogiikan
- **Integraatiotestaus** varmisti rajapinnan toiminnan
- **CI** ylläpiti kurinalaisuutta
- **Mutaatiotestaus** arvioi testien laatua

### Lopputulos

Yksittäinen menetelmä ei olisi riittänyt. Kokonaisuus toimi, koska menetelmät olivat kerroksittain rakennettuja.
# Code Review Checklist (Todo App / TDD-projekti)

## 1. Yleinen rakenne ja vastuunjako

- Projektin kansiorakenne on selkeä (src/, tests/, docs/, public/)
- Domain-logiikka (TaskService, validointi) on erotettu HTTP-kerroksesta
- Repository-kerros ei sisällä liiketoimintasääntöjä
- Frontend (UI) ei sisällä liiketoimintalogiikkaa, vain kutsuu API:a
- Tiedostojen ja funktioiden nimet kuvaavat selkeästi tarkoitusta

## 2. Domain & Service -koodi (TaskService, validateTask)

- Jokaisella julkisella service-metodilla on selkeä vastuu
- Validointi tapahtuu ennen datan tallennusta
- Virhetilanteet käsitellään eksplisiittisesti (ei hiljaisia epäonnistumisia)
- Domain-virheet (ValidationError, NotFoundError) ovat yhdenmukaisia
- Ei ylimääräisiä riippuvuuksia HTTP- tai UI-kerrokseen

## 3. Repository (TaskRepo / MemoryRepo)

- Repository toteuttaa sovitun rajapinnan (contract)
- CRUD-operaatiot toimivat odotetusti
- Repository ei tee validointia, joka kuuluu service-kerrokseen
- Palautetut objektit eivät aiheuta sivuvaikutuksia (immutability)
- Virhetilanteet ovat johdonmukaisia (esim. id ei löydy)

## 4. API / Express-kerros

- Jokaisella endpointilla on selkeä vastuu
- HTTP-metodit vastaavat tarkoitusta (GET, POST, PATCH, DELETE)
- Statuskoodit ovat oikein (200, 201, 204, 400, 404)
- Error middleware mapittaa domain-virheet oikein HTTP-virheiksi
- API ei sisällä liiketoimintasääntöjä (vain orkestroi)

## 5. Testit (Unit & Integration)

- Testit on nimetty kuvaavasti (mitä testataan ja miksi)
- Unit-testit kattavat:
  - onnistuneet tapaukset
  - virhepolut (invalid input, puuttuva id)
- Integraatiotestit testaavat API:a HTTP:n läpi
- Testit eivät ole riippuvaisia toisistaan
- Testit ovat toistettavia (sama tulos joka ajolla)

## 6. TDD ja testattavuus

- TaskService on toteutettu TDD-periaatteella tai sen hengessä
- Testit ohjaavat rakennetta (ei testejä vain "jälkikäteen")
- Poikkeamat puhtaasta TDD:stä on dokumentoitu ja perusteltu
- Koodi on helposti testattavaa (ei kovia riippuvuuksia)

## 7. Frontend (minimi-UI)

- UI käyttää backendin API:a oikein
- CRUD-toiminnot toimivat selaimessa
- UI reagoi virhetilanteisiin (esim. tyhjä title)
- UI ei oleta backendin "onnistuvan aina"
- UI-koodi on selkeää ja helposti luettavaa

## 8. Dokumentaatio

- README kuvaa projektin tarkoituksen ja käynnistysohjeet
- Testausstrategia kuvaa:
  - mitä testataan
  - millä tasolla
  - millä työkaluilla
- Poikkeamat ja opitut asiat on kirjattu reflektioon
- Sprinttisuunnitelma vastaa toteutunutta työtä

## 9. GitHub Issues & CI

- Testien löytämät bugit on kirjattu GitHub Issuesiin
- Issueissa mainitaan, millä testitasolla bugi löytyi
- GitHub Actions ajaa testit automaattisesti
- CI on vihreä ennen projektin palautusta

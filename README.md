# Tehtävien hallintapalvelu API

Test-Driven Development -menetelmällä kehitetty REST API -palvelu.

## Aloitus

```bash
# Palvelimen käynnistys
npm start

# API saatavilla osoitteessa http://localhost:3000
```

## Testit

```bash
npm test              # Kaikki testit
npm run test:watch   # Watch-moodissa
npm run test:unit    # Yksikkötestit
npm run test:integration  # Integraatiotestit
npm run lint         # Koodin tarkistus
npm run mutation     # Mutaatiotestaus
```

## Teknologiat

- **Node.js** 21+
- **Express.js** 5.2
- **Jest** - yksikkötestaus
- **Supertest** - integraatiotestaus
- **ESLint** - koodintarkistus
- **Stryker** - mutaatiotestaus

## Rakenne

| Taso | Sisältö |
|------|---------|
| REST API | HTTP-reitit ja vastaukset |
| Service | Liiketoimintalogiikka |
| Repository | Datan käsittely |
| Domain | Validoinnit ja säännöt |

## Ominaisuudet

-  Test-Driven Development (Red-Green-Refactor)
-  4-kerroksen arkkitehtuuri
-  Laaja testaus (yksikkö, integraatio, mutaatio)
-  Jatkuva integraatio (GitHub Actions)
-  Virheenhallinta ja validointi
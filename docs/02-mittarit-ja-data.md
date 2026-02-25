| Sprint | Menetelmä | Löydös | Sijainti | Vaikutus |
|--------|-----------|--------|----------|----------|
| 1 | Unit (TDD) | Title-validointi puuttui | `validateTask()` | Olisi sallinut tyhjät titlet |
| 1 | Katselmointi | Validointi + logiikka sekoittunut | Domain-rakenne | Paransi modulaarisuutta |
| 2 | Unit | ValidationError ei estänyt repo-kutsua | `createTask()` | Esti virheellisen datan |
| 2 | Unit | NotFoundError-viesti puuttui | `getTask()` | Paransi virheviestin selkeyttä |
| 2 | Unit | Jest-syntaksivirhe testissä | Testikoodi | Testit näyttivät vihreää väärin |
| 2 | Katselmointi | Service/Repo vastuut epäselvät | Arkkitehtuuri | Selkeytti kerrosrakennetta |
| 2 | CI | Export/import mismatch | `taskRepo.js` | Esti buildin |
| 3 | Unit | Status-validointi bugit | `validateTask()` | Esti virheellisen statuksen |
| 3 | Unit | PATCH käytti väärää validointia | `updateTask()` | 400 virhe OK-statuksille |
| 3 | Integraatio | Middleware-järjestysongelma | `app.js` | POST epäonnistui |
| 3 | Integraatio | PATCH vs CREATE -ristiriita | REST API | Paljasti API-virheen |
| 3 | Unit | Import-polkuvirhe | `taskStatus.test.js` | Testit kaatuivat |
| 3 | CI / ESLint | Käyttämättömät muuttujat | Middleware & testit | Esti mergeämisen |
| 4 | Integraatio | Väärä API-polku | UI ↔ API | UI ei saanut dataa |
| 4 | Integraatio | async/await-virhe | `ui.js` | UI ei päivittänyt |
| 4 | CI | Tyhjä testitiedosto | GitHub Actions | CI epäonnistui |
| 5 | Mutaatio (Stryker) | Puutteelliset unit-testit | `taskService` | Paljasti heikot testit |
| 5 | Mutaatio (Stryker) | Error-polkujen alitestaus | Domain-virheet | Testit jäivät väärille riveille |
| 5 | Katselmointi | Dokumentaation puutteet | docs/ | Selkeytti prosessia |
| 5 | CI / GitHub Actions | GitHub Actions pipeline vihreä | All tests | Automatisointi valmis |

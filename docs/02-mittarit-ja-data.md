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

## Testikattavuus ja Mutaatiotestaus

### Testikattavuus (Jest)

| Tiedosto | Rivit | Statements | Branches | Functions | Lines |
|----------|-------|-----------|----------|-----------|-------|
| `taskService.js` | 45 | 95% | 88% | 100% | 95% |
| `taskRepo.memory.js` | 38 | 92% | 85% | 100% | 92% |
| `errors.js` | 12 | 98% | 100% | 100% | 98% |
| **Yhteensä** | **95** | **94.5%** | **88%** | **100%** | **94.5%** |

**Johtopäätös:** Liiketoimintalogiikan testikattavuus on korkea. Puuttuvat rivit ovat pääasiassa poikkeustilanteita ja edge-caseita, jotka tulivat esiin mutaatiotestauksessa.

### Mutaatiotestaus (Stryker)

**Kokonais mutanttisurviavaali:** ~80%

| Komponentti | Mutantit | Tapettu | Eloonjääneet | Ratkaisu |
|--|--|--|--|--|
| `validateTask()` | 24 | 19 | 5 | Lisätään whitespace-testit |
| `createTask()` | 18 | 16 | 2 | Lisätään error-path-testit |
| `updateTask()` | 15 | 12 | 3 | PATCH-validointiin testejä |
| `getTask()` | 12 | 11 | 1 | Lisätään NotFound-testit |
| `deleteTask()` | 10 | 9 | 1 | Edge-case testit |
| `taskRepositoryMemory` | 28 | 23 | 5 | Lisätään fail-scenario testit |

**Eloonjääneet mutantit:**
- Condition mutations (epäkäytännölliset muutokset, esim. `>` → `>=`)
- Dead code (removed conditions jotka eivät vaikuta logiikkaan)
- Timeout operators (joissa testaus hyötymätöntä)

### Testityypien jakautuminen

| Testiluokka | Määrä | Rivikattavuus | Tarkoitus |
|-------------|-------|--------------|----------|
| Yksikkötestit | 4 tiedostoa | 94.5% | Domain- ja service-logiikan validointi |
| Integraatiotestit | 2 tiedostoa | 87% | REST API ja kerrosten yhteistoiminta |
| **Yhteensä** | **6 tiedostoa** | **~90%** | Kattava laadunvarmistus |


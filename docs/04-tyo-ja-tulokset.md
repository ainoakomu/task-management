
## 1. Toteutetut kokonaisuudet
Domain-tason validointi (title + status)
ValidationError-luokka
TaskRepository (in-memory)
TaskService (liiketoimintalogiikka)
Yksikkötestit kaikille keskeisille komponenteille
GitHub Actions -CI ja linting
Arkkitehtuuri erottaa selkeästi:
Repository → datan käsittely
Service → liiketoimintalogiikka ja virheenkäsittely
Domain → validointisäännöt


## 2. Testauksen tulokset menetelmittäin
## 2.1 Yksikkötestaus (TDD)

Yksikkötestaus oli ensisijainen kehitysmenetelmä.

Sprintti 1:
Title-validointi toteutettiin klassisella Red–Green–Refactor -syklillä.
Testit paljastivat puutteita validointilogiikassa.
Domain-virheluokka täsmennettiin testien ohjaamana.

Sprintti 2:
TaskService toteutettiin "scaffolding" ja TDD-prosessin yhteistyönä.
Testit löysivät loogisia virheitä virheenkäsittelyssä.
Lisäksi ilmeni testikirjaston (Jest) syntaksivirheitä, jotka havaittiin “vihreissä” ajoissa ja korjattiin tarkentamalla testejä.

Sprintti 3:
Uusi domain-sääntö (status) toteutettiin testilähtöisesti ilman merkittäviä syntaksiongelmia.
Sprintti 3:ssa yksikkötestaus varmisti status-validoinnin ja update-logiikan oikeellisuuden, mutta ei paljastanut middleware- tai HTTP-tason virheitä.

## Sprintti 4

Toteutettiin minimaalinen UI, joka mahdollistaa Create–List–Update–Delete -toiminnot selaimen kautta.

UI yhdistettiin backend-rajapintaan Fetch API:lla. Kehitysvaiheessa havaittiin useita integraatioon liittyviä virheitä, kuten väärä API-base-path (/api/tasks vs /tasks) sekä async/await-syntaksivirhe event handlerissa.
Testauksen painopiste siirtyi järjestelmätasolle (UI + API). Backendin yksikkö- ja integraatiotestit toimivat regressiosuojana.
Empiirinen havainto: suurin osa virheistä liittyi rajapintasopimukseen tai konfiguraatioon, ei domain-logiikkaan.

## 2.2 Koodikatselmointi

Koodikatselmoinnissa havaittiin erityisesti:
Testien nimeämisen vaikutus luettavuuteen
Vastuiden sekoittuminen service- ja repository-kerrosten välillä
Rakenteellisia selkeyttämistarpeita
Katselmointi ei niinkään löytänyt loogisia virheitä, vaan arkkitehtuuriin ja luettavuuteen liittyviä ongelmia.

## 2.3 CI ja lint

GitHub Actions -CI sekä ESLint:
Paljastivat konfiguraatio- ja export-virheitä
Estivät rikkinäisen koodin yhdistämisen
ESLint havaitsi käyttämättömän parametrin error-middlewareissa, mikä osoitti staattisen analyysin roolin laadun varmistajana myös silloin, kun testit ovat vihreänä.
## 2.4 Integraatiotestaus
Integraatiotestit paljastivat useita kerrosten yhteistoimintaan liittyviä virheitä, kuten middleware-järjestyksen vaikutuksen req.body:n arvoon sekä create- ja patch-validoinnin sopimuserot.
Testauksessa katsottiin RESTI-rajapinnan operaatioiden toteutus ja error-middlewaren toiminta. Käytettiin Supertestiä työnkaluna ja huomattiin "create" vs "patch" validoinnin ero.

## 3. TDD-prosessin kehittyminen sprinttien välillä

Sprintti 1:
TDD-prosessi oli vielä opetteluvaiheessa.
Painopiste oli domain-validoinnissa.
Expressin rooli oli epäselvä, mikä näkyi varovaisena etenemisenä.

Sprintti 2:
TDD vahvistui TaskService-kerroksessa.
Repo toteutettiin osittain scaffolding-tyylisesti (ei täysin TDD), mikä toi vertailupohjaa menetelmällisesti.
Testikirjaston käytön ymmärrys syveni.

Sprintti 3:
Uudet domain-säännöt toteutettiin sujuvasti TDD-syklin mukaisesti.


4. Löydösten luonne ja jakauma

Sprinttien aikana löydökset jakautuivat seuraavasti:

Menetelmä	Löydösten tyyppi
Unit-testit	Loogiset validointi- ja virheenkäsittelyongelmat
Koodikatselmointi	Arkkitehtuuri ja vastuurakenne
CI / Lint	Konfiguraatio ja syntaksi

Yksikkötestit vastasivat liiketoimintalogiikan oikeellisuudesta.
Katselmointi paransi rakenteellista laatua.
CI varmisti jatkuvan laadun.
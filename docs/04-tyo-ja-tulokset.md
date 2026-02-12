
## 1. Toteutetut kokonaisuudet

Projektin ensimmäisten kolmen sprintin aikana toteutettiin seuraavat kokonaisuudet:

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

Tämä kerrosjako selkeytyi erityisesti sprinttien aikana tehdyn koodikatselmoinnin kautta.

## 2. Testauksen tulokset menetelmittäin
2.1 Yksikkötestaus (TDD)

Yksikkötestaus oli ensisijainen kehitysmenetelmä.

Sprintti 1:

Title-validointi toteutettiin klassisella Red–Green–Refactor -syklillä.

Testit paljastivat puutteita validointilogiikassa.

Domain-virheluokka täsmennettiin testien ohjaamana.

Sprintti 2:

TaskService toteutettiin täysin TDD-prosessin mukaisesti.

Testit löysivät loogisia virheitä virheenkäsittelyssä.

Lisäksi ilmeni testikirjaston (Jest) syntaksivirheitä, jotka havaittiin “vihreissä” ajoissa ja korjattiin tarkentamalla testejä.

Sprintti 3:

Uusi domain-sääntö (status) toteutettiin testilähtöisesti ilman merkittäviä syntaksiongelmia.

Tämä osoitti TDD-prosessin sisäistymistä ja varmuuden kasvua.

Havainto:
Yksikkötestaus oli tehokkain menetelmä loogisten virheiden löytämisessä ja domain-sääntöjen tarkentamisessa.

2.2 Koodikatselmointi

Koodikatselmoinnissa havaittiin erityisesti:

Testien nimeämisen vaikutus luettavuuteen

Vastuiden sekoittuminen service- ja repository-kerrosten välillä

Rakenteellisia selkeyttämistarpeita

Katselmointi ei niinkään löytänyt loogisia virheitä, vaan arkkitehtuuriin ja luettavuuteen liittyviä ongelmia.

Havainto:
Koodikatselmointi täydensi yksikkötestausta erityisesti rakenteellisella tasolla.
2.3 CI ja lint

GitHub Actions -CI sekä ESLint:

Paljastivat konfiguraatio- ja export-virheitä

Estivät rikkinäisen koodin yhdistämisen

Varmistivat, että testit ja lint menevät läpi jokaisessa commitissa

Havainto:
CI toimi laadun porttina ja vähensi regressioriskiä.

3. TDD-prosessin kehittyminen sprinttien välillä

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

Virheiden määrä väheni.

Kehitys muuttui systemaattisemmaksi.

Johtopäätös:
TDD:n systemaattinen käyttö paransi kehityksen varmuutta ja vähensi korjauskierrosten määrää sprinttien edetessä.

4. Löydösten luonne ja jakauma

Sprinttien aikana löydökset jakautuivat seuraavasti:

Menetelmä	Löydösten tyyppi
Unit-testit	Loogiset validointi- ja virheenkäsittelyongelmat
Koodikatselmointi	Arkkitehtuuri ja vastuurakenne
CI / Lint	Konfiguraatio ja syntaksi

Yksikkötestit vastasivat liiketoimintalogiikan oikeellisuudesta.
Katselmointi paransi rakenteellista laatua.
CI varmisti jatkuvan laadun.

Reflektio
1. Oppiminen teknologioista ja arkkitehtuurista

Projektin alkuvaiheessa eteneminen oli hidasta, koska pyrin ymmärtämään jokaisen kirjoittamani rivin. Kommentoin koodia itselleni oppimisen tueksi. Tämä hidasti kehitystä, mutta vahvisti JavaScript-osaamista.

JavaScriptin async/await-malli sekä Jestin syntaksi tuottivat alkuvaiheessa haasteita. Erityisesti testikirjaston syntaksivirheet osoittivat, että testien kirjoittaminen voi näyttää helpolta, mutta niiden oikea käyttö vaatii tarkkuutta.

Repository- ja Service-kerroksen erottaminen selkeytti arkkitehtuuria merkittävästi. Ymmärsin vähitellen, miksi datankäsittely ja liiketoimintalogiikka kannattaa erottaa toisistaan.

2. TDD-prosessin kehittyminen

Sprintti 1:
TDD oli opetteluvaiheessa. Red–Green–Refactor-sykli toimi yksittäisen validointifunktion tasolla, mutta kokonaisuuden hallinta oli vielä epävarmaa.

Sprintti 2:
TaskService toteutettiin systemaattisemmin TDD:llä. Tässä vaiheessa huomasin selkeästi, kuinka testit ohjasivat suunnittelua. TaskRepositoryn toteuttaminen osittain ilman TDD:tä (scaffolding-tyylisesti) tarjosi vertailukohdan: testien kirjoittaminen jälkikäteen ei ohjannut rakennetta samalla tavalla.

Sprintti 3:
Uuden domain-säännön lisääminen onnistui sujuvammin TDD-syklillä. Virheiden määrä väheni ja kehityksestä tuli systemaattisempaa. Tämä osoitti TDD-prosessin sisäistymistä.

3. CI ja laadunvarmistuksen merkitys

GitHub Actionsin ja CI-putken käyttöönotto osoitti, että paikallisesti toimiva koodi ei välttämättä ole rakenteellisesti kunnossa.

CI paljasti:

Tyhjän testitiedoston

ESLint-konfiguraatiohaasteita

ESM- ja CommonJS-moduulijärjestelmien sekoittumisen

Staattisen analyysin lisääminen toi kurinalaisuutta kehitykseen. Ymmärsin myös, että CI-putken vaiheiden järjestys vaikuttaa merkittävästi siihen, miten laatuvarmistus toimii.

CI muutti käsitystäni “valmiista koodista”. Valmis ei enää tarkoittanut vain toimivaa ominaisuutta, vaan:

testit vihreänä

lint läpi

CI onnistunut

4. Tekoälyn rooli oppimisessa

Tekoäly toimi sparraajana projektin aikana. Se auttoi:

Rakenteen hahmottamisessa

Expressin käyttöönotossa

Konfiguraatio-ongelmien selvittämisessä

Samalla havaitsin riskin: aloittelijana on helppoa hyväksyä ehdotuksia ymmärtämättä niitä täysin. Projektin aikana opin suhtautumaan tekoälyn tuottamaan koodiin kriittisesti ja tarkistamaan jokaisen ratkaisun itse.

Tekoäly ei korvannut oppimista, mutta pakotti aktiiviseen ymmärtämiseen.

5. TDD ja Scrum -ulottuvuus

Projektin aikana hahmotin eron mikrotason ja makrotason kehityssyklien välillä.

TDD toimi päivittäisenä työskentelytapana (Red–Green–Refactor), kun taas sprinttirakenne tarjosi kehitykselle rytmin ja rajauksen.

Sprinttien edetessä huomasin, että TDD vähensi epävarmuutta sprintin lopussa. Kun testit olivat vihreänä ja CI hyväksyi muutokset, sprintin valmius oli selkeästi mitattavissa.

TDD varmisti toiminnallisuuden oikeellisuuden sprintin sisällä, ja sprinttirakenne varmisti hallitun etenemisen.

6. Mitä tekisin toisin

Ottaisin CI:n käyttöön heti projektin alussa.

Soveltaisin TDD:tä systemaattisemmin myös Repository-tasolla.

Rajaisin sprinttitavoitteet vielä pienemmiksi kokonaisuuksiksi.
  ##  Sprintti 1

Tein: Alustin projektin aiheen, aikataulun, mahdolliset työkalut sekä palautin aiheeni ja opintotavoitteiden kohdat Moodleen. Rakensin projektin, alustin gitin ja tein repon GitHubiin. Aloitin tehtävän titlen validoinnista. Testeihin tule pari kohtaa, jossa testataan onko title oikein. Sitten ajettiin se punaiseksi, luotiin oikea validationError ja sitten validateTask funktio, jotta testi meni vihreäksi. Tässä hyödynnettiin klassista Red-Green-Refactor. Jonkin verran on ongelmia ymmärtää Expressin roolia, joten siksi olen keskittynyt siihen että jokaisessa kohdassa olisi hyvä kommentti. Se helpottaa myös sinua, projektin lukijaa että myös minua oppijana. Kirjoitin myös jonkinverran jo testaustrategiaa ja aloin etsiä Google Scholarista tekstejä. Harmikseen osaan joutuisi kirjautua, tai ne ovat maksumuurin takana eikä UEFilla ole sinne pääsyä. 


## Sprintti 2

Työ: TaskRepo toteutettiin osittain TDD:stä poiketen ns. scaffolding-tyylisesti. Ensin määriteltiin TaskRepon vastuut ja “sopimus”, jonka jälkeen toteutettiin in-memory-implementaatio ja lopuksi sitä vastaavat yksikkötestit. Tässä vaiheessa kehitystä ei siis edetty täysin testilähtöisesti, vaan testit kirjoitettiin toteutuksen jälkeen varmistamaan toiminnallisuus.

TaskRepo on kuitenkin pidetty tarkoituksellisesti yksinkertaisena ja se sisältää vain datan käsittelyyn liittyvän logiikan. Varsinainen liiketoimintalogiikka ja virheenkäsittely on eriytetty TaskService-kerrokseen.

TaskService toteutettiin TDD-prosessin mukaisesti: testit kirjoitettiin ensin ja toteutusta täydennettiin testien ohjaamana. Kehityksen aikana ilmeni virheitä myös “vihreissä” testiajoissa, jotka johtuivat puutteellisesta Jest-syntaksista (esim. toHaveBeenCalled("1") vs. toHaveBeenCalledTimes(1)). Nämä korjattiin testejä tarkentamalla, mikä vahvisti ymmärrystä testauskirjaston käytöstä.


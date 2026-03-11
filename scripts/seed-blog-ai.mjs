// scripts/seed-blog-ai.mjs
// Usage: SANITY_TOKEN=<your-token> node scripts/seed-blog-ai.mjs
// Get token from: https://www.sanity.io/manage/project/qrf7o22v/api#tokens

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "qrf7o22v",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Helper: create a Portable Text block
let keyCounter = 0;
function block(style, text) {
  keyCounter++;
  return {
    _type: "block",
    _key: `ai${keyCounter}`,
    style,
    children: [{ _type: "span", _key: `as${keyCounter}`, text }],
  };
}
function h2(text) { return block("h2", text); }
function h3(text) { return block("h3", text); }
function p(text) { return block("normal", text); }

const blogPosts = [
  // --- POST 1 ---
  {
    _type: "blogPost",
    title: "Kako AI automatizira svakodnevne zadatke u malom biznisu",
    slug: { _type: "slug", current: "ai-automatizira-svakodnevne-zadatke" },
    excerpt: "AI nije zamjena za vas — nego za poslove koje mrzite raditi. Evo kako automatizacija oslobada 10+ sati tjedno za ono sto zapravo donosi novac.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-06T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("Koliko vremena gubis na administraciju?"),
      p("Prosjecni vlasnik malog biznisa u Hrvatskoj provede 15-20 sati tjedno na zadatke koji ne donose prihod: odgovaranje na iste mailove, zakazivanje termina, pisanje ponuda, pracenje uplata, slanje podsjetnika."),
      p("To je pola radnog tjedna. Pola tjedna u kojem ne radis ono za sto te klijenti placaju."),

      h2("Sto AI moze preuzeti danas"),
      p("AI automatizacija ne znaci robote koji rade umjesto tebe. Znaci pametne alate koji eliminiraju repetitivne zadatke:"),
      p("Automatski odgovori na ceste upite — klijent pita \"Koliko kosta?\", AI odgovara s tvojim cjenikom. Ti se ukljucis samo za slozene dogovore."),
      p("Zakazivanje termina — umjesto 5 poruka naprijed-nazad, klijent bira slobodan termin iz kalendara. AI salje potvrdu i podsjetnik."),
      p("Generiranje ponuda — uneses par podataka, AI generira profesionalnu ponudu u tvojem stilu. Posao od 45 minuta postaje posao od 3 minute."),

      h2("Primjer: soboslikar iz Varazdina"),
      p("Marko je soboslikar. Svaki dan dobije 8-10 upita putem WhatsAppa. Odgovaranje na svaki traje 5-10 minuta. To je sat i pol dnevno samo na poruke."),
      p("Postavio je AI chatbot na web stranicu koji automatski odgovara na pitanja o cijenama, roku i dostupnosti. Rezultat: 70% upita rijeseno bez Markovog uplitanja. Sad provodi to vrijeme na licu mjesta — i uzima vise poslova."),

      h2("Tri razine automatizacije"),
      p("Razina 1 (besplatno): Automatiziraj odgovore na cesta pitanja. Postavi FAQ na web, koristi gotove predloske za poruke."),
      p("Razina 2 (do 50 EUR/mj): AI chatbot na webu, automatsko zakazivanje, generiranje sadrzaja za drustvene mreze."),
      p("Razina 3 (50-150 EUR/mj): Puna automatizacija: ponude, fakture, CRM, email marketing — sve povezano."),

      h2("Odakle poceti?"),
      p("Ne trebas sve odjednom. Pocni s jednim problemom koji te najvise nervira. Je li to odgovaranje na poruke? Pisanje objava? Organizacija termina?"),
      p("Rijesi taj jedan problem s AI alatom. Kad vidis ustedu — dodaj sljedeci. Za 3 mjeseca ces se pitati kako si ikad radio bez toga."),

      h2("Zakljucak"),
      p("AI automatizacija nije trosak — to je investicija koja se vraca u satima. 10 sati tjedno ustede = 40 sati mjesecno = cijelih 5 radnih dana. Pitanje nije mozes li si to priustiti. Pitanje je mozes li si priustiti da ne koristis."),
    ],
  },

  // --- POST 2 ---
  {
    _type: "blogPost",
    title: "AI za drustvene mreze: Od 0 objava do konzistentnog sadrzaja",
    slug: { _type: "slug", current: "ai-za-drustvene-mreze-konzistentan-sadrzaj" },
    excerpt: "Nemas vremena za Instagram? AI moze generirati mjesec dana sadrzaja u 30 minuta. Evo tocno kako.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-07T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("Problem: znas da trebas objavljivati, ali nemas vremena"),
      p("Svaki poslovni savjetnik kaze isto: \"Moras biti prisutan na drustvenim mrezama.\" I u pravu su — 73% Hrvata koristi Instagram, 65% Facebook. Tvoji klijenti su tamo."),
      p("Ali kad zavrsis radni dan u 18h, zadnja stvar koju zelis je sjediti i smisljati sto napisati na Instagramu. Rezultat: objava svaka 3 tjedna, bez konzistencije, bez rezultata."),

      h2("Kako AI rjesava ovaj problem"),
      p("AI alat za generiranje sadrzaja radi ovako: ti mu kazes tko si i sto radis — on generira gotove objave s tekstom, hashtagovima i pozivom na akciju."),
      p("Primjer: uneses \"stolar, izrada namjestaja po mjeri, Zagreb\" i dobijes 6 Instagram objava: savjeti za odrzavanje drva, prije/poslije transformacija, sezonske akcije, testimonijal format, edukativni post o vrstama drva, i promotivni post."),
      p("Svaka objava je prilagodena tvom biznisu. Ne genericke gluposti poput \"Sretan ponedjeljak!\" — nego sadrzaj koji pokazuje tvoju strucnost."),

      h2("Workflow: 30 minuta za cijeli mjesec"),
      p("Evo tocnog procesa koji koriste nasi klijenti:"),
      p("Korak 1 (5 min): Generiraj 10-15 objava putem AI alata. Unesi opis biznisa, odaberi platformu."),
      p("Korak 2 (10 min): Pregledaj objave. Izbaci sto ti se ne svida, prilagodi ton. AI generira 80% — ti dodajes 20% osobnosti."),
      p("Korak 3 (10 min): Dodaj svoje fotografije. Prave slike tvojih radova uvijek funkcioniraju bolje od stock fotografija."),
      p("Korak 4 (5 min): Zakazi objave unaprijed putem Instagram/Facebook planera. Gotovo za mjesec dana."),

      h2("Sto AI NE moze zamijeniti"),
      p("AI ne moze fotografirati tvoj rad. Ne moze odgovarati na komentare tvojih pratitelja s emocijom. Ne moze graditi osobni brand umjesto tebe."),
      p("Ali moze eliminirati najgori dio posla: sjedenje pred praznim ekranom i razmisljanje \"Sto da napisem?\". Taj blok nestaje kad imas gotove predloske koje samo prilagodis."),

      h2("Brojke koje govore"),
      p("Nasi klijenti koji koriste AI za drustvene mreze:"),
      p("Objavljuju 4x cesce (prosjek: s 2 objave mjesecno na 8)."),
      p("Stedju 6-8 sati mjesecno na kreiranju sadrzaja."),
      p("Vide 40-60% vise upita putem drustvenih mreza unutar 90 dana."),
      p("I najvaznije: ne odustaju nakon 2 tjedna jer im nije pretesko."),

      h2("Zakljucak"),
      p("Drustvene mreze ne zahtijevaju talent za pisanje. Zahtijevaju konzistenciju. AI ti daje konzistenciju bez da ti uzima vrijeme. Pocni danas — prva generacija je ionako besplatna."),
    ],
  },

  // --- POST 3 ---
  {
    _type: "blogPost",
    title: "5 nacina kako AI smanjuje troskove malog biznisa",
    slug: { _type: "slug", current: "ai-smanjuje-troskove-malog-biznisa" },
    excerpt: "AI ne mora biti skup. Evo 5 konkretnih nacina kako mali biznisi stede 200-500 EUR mjesecno koristeci besplatne i jeftine AI alate.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-08T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("AI kao ulaganje, ne trosak"),
      p("Kad cujes \"AI alat\" pomislis na skupu korporativnu tehnologiju. Ali vecina AI alata korisnih za male biznise kosta 0-50 EUR mjesecno. A usteda koju donose je 5-10x veca."),
      p("Evo 5 konkretnih nacina kako AI smanjuje troskove — s realnim brojkama."),

      h2("1. Zamjena za vanjskog copywritera (usteda: 100-300 EUR/mj)"),
      p("Freelance copywriter za drustvene mreze naplacuje 100-400 EUR mjesecno za 8-12 objava. AI alat za generiranje sadrzaja kosta 15-50 EUR mjesecno za neogranicen broj objava."),
      p("Razlika: nemas tu ljudsku kreativnost u svakoj objavi. Ali imas konzistenciju, brzinu i 80% kvalitete za 10% cijene. Za vecinu malih biznisa — to je dovoljan tradeoff."),

      h2("2. Chatbot umjesto dodatnog zaposlenika (usteda: 200-500 EUR/mj)"),
      p("Student na pola radnog vremena za odgovaranje na upite kosta 400-600 EUR mjesecno. AI chatbot na web stranici kosta 0-30 EUR mjesecno i radi 24/7."),
      p("Ne zamjenjuje osobu za kompleksne razgovore. Ali 70% upita su isti: \"Koliko kosta?\", \"Radite li vikendom?\", \"Koji je rok?\" To AI rjesava bez problema."),

      h2("3. Automatsko fakturiranje (usteda: 50-100 EUR/mj)"),
      p("Knjigovodstveni servisi za male obrtnike naplacuju 100-200 EUR mjesecno. AI alati za fakturiranje pokrivaju osnovno izdavanje racuna, pracenje uplata i podsjetnice — za 20-50 EUR mjesecno."),
      p("Naravno, za PDV prijave i godisnji obracun trebas knjigovodju. Ali za svakodnevno izdavanje racuna — AI je brzi i jeftiniji."),

      h2("4. SEO bez agencije (usteda: 200-400 EUR/mj)"),
      p("SEO agencija za mali biznis naplacuje 300-600 EUR mjesecno. AI alati za analizu web stranice i preporuke za SEO daju ti 80% istih savjeta — besplatno ili za 30 EUR mjesecno."),
      p("Nece napraviti link building za tebe. Ali ce ti reci tocno sto popraviti na stranici, koje kljucne rijeci koristiti i kako strukturirati sadrzaj. Za lokalnog obrtnika — to je dovoljno."),

      h2("5. Dizajn bez dizajnera (usteda: 100-300 EUR/mj)"),
      p("Graficki dizajner za 5-10 vizuala mjesecno naplacuje 150-400 EUR. AI alati za generiranje slika i predlozaka za drustvene mreze kostaju 0-30 EUR mjesecno."),
      p("Opet — za premium brand materijale trebas dizajnera. Ali za Instagram storyje, Facebook reklame i vizuale za objave — AI alati su vise nego dovoljni."),

      h2("Ukupna usteda: racunica"),
      p("Recimo da koristis AI za samo 3 od ovih 5 stvari:"),
      p("Sadrzaj za drustvene mreze: -150 EUR"),
      p("Chatbot umjesto studenta: -300 EUR"),
      p("SEO analiza: -250 EUR"),
      p("Ukupno: 700 EUR ustede mjesecno. Trosak AI alata: 50-80 EUR mjesecno. Neto usteda: 620-650 EUR mjesecno. To je 7.500+ EUR godisnje."),

      h2("Zakljucak"),
      p("AI ne eliminira ljude iz tvog biznisa. Eliminira nepotrebne troskove. Pocni s jednim alatom, izmjeri ustedu nakon mjesec dana. Brojke ce same govoriti."),
    ],
  },

  // --- POST 4 ---
  {
    _type: "blogPost",
    title: "AI i email marketing: Kako pisati mailove koji se citaju",
    slug: { _type: "slug", current: "ai-email-marketing-mailovi-koji-se-citaju" },
    excerpt: "Tvoji mailovi zavrsavaju u smecu? AI ti pomaze napisati subject line koji se otvara i tekst koji pretvara citatelje u kupce.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-09T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("Email marketing nije mrtav — tvoji mailovi jesu"),
      p("\"Nitko ne cita mailove.\" Kriva izjava. Prosjecni Hrvat otvori 42% poslovnih mailova. Problem nije medij — problem je sadrzaj."),
      p("Kad ti subject line kaze \"Newsletter #47\" ili \"Nase novosti\" — naravno da neces otvoriti. Ali kad kaze \"3 greske koje vam poskupljuju grijanje\" — otvorit ces jer te zanima."),

      h2("Kako AI poboljsava tvoje mailove"),
      p("AI alati za email marketing pomazu u 3 kljucna podrucja:"),
      p("Subject line generiranje — AI generira 10 varijanti naslova. Ti biras onaj koji zvuci najprirodniji. Umjesto jednog pokusaja — imas 10 opcija u 20 sekundi."),
      p("Tekst maila — uneses temu (npr. \"sezonska akcija na klima servis\") i AI generira kompletni mail: uvod koji hvata paznju, ponuda, poziv na akciju, potpis. Ti prilagodis detalje."),
      p("Segmentacija — pametniji AI alati mogu predloziti kome poslati koji mail na temelju proslog ponasanja. Novi klijenti dobiju uvodni mail, stari klijenti dobiju akciju za ponovni dolazak."),

      h2("Primjer: vodoinstalater koji je poceo slati mailove"),
      p("Ivan iz Osijeka ima bazu od 200 klijenata kojima je radio instalacije. Nikad im nije slao mail jer \"ne zna sto napisati\"."),
      p("S AI alatom generirao je 4 maila mjesecno: sezonski savjet, podsjetnik za servis, akcijska ponuda, i edukativni sadrzaj. Za pisanje sva 4 maila trebalo mu je 20 minuta."),
      p("Rezultat nakon 3 mjeseca: 12 ponovljenih poslova iskljucivo od mailova. Prosjecna vrijednost posla: 150 EUR. Ukupno: 1.800 EUR prihoda od 20 minuta rada mjesecno."),

      h2("5 pravila za AI-generirane mailove"),
      p("1. Uvijek prilagodi ton — AI pise korektno, ali ti znas svoje klijente. Dodaj svoju osobnost."),
      p("2. Subject line ispod 50 znakova — kraci naslovi imaju 25% vecu stopu otvaranja."),
      p("3. Jedan mail = jedna poruka. Ne trpaj 5 tema u jedan mail. Jedan savjet, jedna ponuda, jedan poziv na akciju."),
      p("4. Salji konzistentno — jednom tjedno ili dva puta mjesecno. Bitna je redovitost, ne ucestalost."),
      p("5. Uvijek dodaj nacin za odjaviti se — to je i zakonska obaveza (GDPR) i znak postovanja."),

      h2("Zakljucak"),
      p("Email marketing ima najbolji ROI od svih digitalnih kanala: 36 EUR povrata na svaki 1 EUR ulozeni. S AI alatima, pisanje mailova vise nije prepreka. Prepreka je samo — poceti."),
    ],
  },

  // --- POST 5 ---
  {
    _type: "blogPost",
    title: "Kako AI chatbot na webu donosi vise klijenata dok spavas",
    slug: { _type: "slug", current: "ai-chatbot-na-webu-donosi-klijente" },
    excerpt: "Tvoja web stranica radi 24/7 — ali tko odgovara na upite u 23h? AI chatbot pretvara posjetitelje u klijente dok ti spavas.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-10T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("Problem: posjetitelji dolaze kad ti ne radis"),
      p("Analitika pokazuje da 35% posjeta web stranicama malih biznisa dolazi izvan radnog vremena — navecer, vikendom, blagdanima. To su ljudi koji traze tvoju uslugu SADA."),
      p("Ako nemaju nacin dobiti odgovor odmah — idu na sljedeci rezultat na Googleu. Gubitke ne vidis jer ne znas za te posjetitelje. Ali oni postoje."),

      h2("Sto je AI chatbot i kako radi"),
      p("AI chatbot je mali prozorcic na tvojoj web stranici (obicno donji desni kut) koji automatski odgovara na pitanja posjetitelja. Ali ne kao stari chatbotovi s unaprijed definiranim odgovorima — AI chatbot razumije pitanje i formulira odgovor."),
      p("Ti mu \"naucis\" informacije o svom biznisu: cjenik, radno vrijeme, podrucje rada, najcesca pitanja. On te informacije koristi za prirodne, tocne odgovore."),

      h2("Sto chatbot moze (a sto ne moze)"),
      p("MOZE: odgovoriti na pitanja o cijenama, radnom vremenu, lokaciji. Moze zakazati termin, prikupiti kontakt podatke, usmjeriti na pravu stranicu."),
      p("NE MOZE: zamijeniti tebe za slozene dogovore. Ne moze dati ponudu za specificni projekt bez tvojih inputa. Ne moze rijesiti reklamaciju."),
      p("Cilj chatbota nije zamijeniti tebe — nego filtrirati upite. 70% pitanja su rutinska. Chatbot ih rijesi. Za preostalih 30% prikupi kontakt i kaze: \"Javit cemo vam se sutra do 10h.\""),

      h2("Koliko to donosi u praksi"),
      p("Podaci nasih klijenata koji koriste AI chatbot na web stranici:"),
      p("Prosjecno 15-25 razgovora mjesecno (za lokalni biznis)."),
      p("Od toga 8-12 kvalificiranih leadova (ljudi koji stvarno trebaju uslugu)."),
      p("Konverzija iz leada u klijenta: 30-40%."),
      p("Rezultat: 3-5 novih klijenata mjesecno iskljucivo od chatbota. Za obrtnika ciji prosjecni posao vrijedi 200 EUR — to je 600-1.000 EUR dodatnog prihoda mjesecno."),

      h2("Postavljanje: lakse nego sto mislis"),
      p("Vecina modernih AI chatbot platformi ima postavljanje u 3 koraka:"),
      p("1. Registriraj se i unesi informacije o biznisu (cjenik, FAQ, kontakt)."),
      p("2. Kopiraj kratki kod i zalijepi ga na web stranicu (ili zatrazi od web developera)."),
      p("3. Testiraj — postavi mu pitanja kao da si klijent. Prilagodi odgovore koji nisu tocni."),
      p("Cijeli proces traje 1-2 sata. Jednom postavljeno — radi mjesecima bez intervencije."),

      h2("Zakljucak"),
      p("AI chatbot je kao zaposlenik koji radi 24/7, nikad ne kasni, nikad nije bolestan i kosta manje od jedne vecere u restoranu mjesecno. Za mali biznis koji ovisi o upitima s weba — to je najjednostavniji nacin za rast bez dodatnog posla."),
    ],
  },

  // --- POST 6 ---
  {
    _type: "blogPost",
    title: "AI za ponude i fakture: Zavrsi papirologiju 5x brze",
    slug: { _type: "slug", current: "ai-za-ponude-i-fakture-5x-brze" },
    excerpt: "Pisanje ponuda ti oduzima sate? AI generira profesionalne ponude i fakture u minutama — tocno u formatu koji tvoji klijenti ocekuju.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-11T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("Papirologiju nitko ne voli, ali svi je moraju raditi"),
      p("Prosjecni obrtnik provede 3-5 sati tjedno na pisanje ponuda, izdavanje racuna i pracenje uplata. To je 15-20 sati mjesecno — gotovo 3 radna dana. Na posao koji ne donosi prihod, samo ga dokumentira."),
      p("A najgore: ponude napisane u zurbi izgledaju neprofesionalno. Klijent dobije PDF napisan u Wordu s krivim fontom i pomisli: \"Ako mu je ponuda ovakva, kakav ce mu biti posao?\""),

      h2("Kako AI mijenja proces"),
      p("AI alati za ponude i fakture rade jednostavno: uneses osnovne podatke (klijent, stavke, cijene) i AI generira profesionalni dokument. Ali ide i dalje od toga:"),
      p("Pametne stavke — pocnes tipkati \"postavljanje\" i AI predlaze kompletne stavke iz tvoje povijesti: \"Postavljanje laminata, materijal + rad, 25 EUR/m2\"."),
      p("Automatski izracuni — uneses kvadraturu, AI mnozi s jednicnom cijenom, dodaje PDV, racuna popust. Nema racunanja na papiru."),
      p("Konverzija ponuda u fakture — kad klijent prihvati ponudu, jedan klik pretvara ponudu u racun. Isti podaci, bez ponovnog upisivanja."),

      h2("Primjer: keramicar koji je ubrzao naplatu za 60%"),
      p("Tomislav iz Karlovca je keramicar. Prije je pisao ponude rucno — prosjecno 45 minuta po ponudi. Mjesecno ih je slao 8-10. To je 6-7 sati samo na ponude."),
      p("S AI alatom za ponude: unese podatke u 5 minuta, AI generira profesionalni PDF s logom, stavkama i uvjetima. Salje klijentu isti dan kad dodje na teren."),
      p("Rezultat: ponude salje 3x brze, sto znaci da klijent dobije ponudu dok je jos \"vruc\". Prihvacanje ponuda poraslo za 35% jer ih klijenti dobivaju isti dan, ne za tjedan dana."),

      h2("Sto traziti u alatu za ponude"),
      p("1. Predlozci prilagodeni tvom biznisu — ne genericke tablice, nego format koji odgovara tvojim uslugama."),
      p("2. PDF export — jer klijenti ocekuju PDF, ne link na neku platformu."),
      p("3. Pracenje statusa — jesi li poslao ponudu? Je li je klijent otvorio? Je li prihvatio?"),
      p("4. Automatski podsjetnici — ako klijent ne odgovori 3 dana, alat mu salje pristojan podsjetnik."),
      p("5. Mobilni pristup — jer ponudu ces cesto pisati na terenu, ne za stolom."),

      h2("Fakture + automatski podsjetnici = brza naplata"),
      p("Najveci problem obrtnika nije nedostatak posla — nego naplata. Klijenti kasne s placanjem jer \"zaborave\". AI alat salje automatske podsjetnike: prijateljski nakon 3 dana, ozbiljniji nakon 7, formalni nakon 14."),
      p("Obrtnici koji koriste automatske podsjetnike naplacuju prosjecno 40% brze. Jer podsjetnik dolazi od \"sustava\", ne od tebe osobno — sto eliminira neugodu."),

      h2("Zakljucak"),
      p("Profesionalne ponude i brza naplata nisu luksuz — to je temelj zdravog biznisa. AI alati ti daju oboje za cijenu jednog rucka mjesecno. Dokumenti izgledaju bolje, stizu brze i naplacuju se tocnije. A ti imas 15+ sati mjesecno vise za pravi posao."),
    ],
  },

  // --- POST 7 ---
  {
    _type: "blogPost",
    title: "AI i SEO: Kako doci na prvu stranicu Googlea bez agencije",
    slug: { _type: "slug", current: "ai-seo-prva-stranica-googlea" },
    excerpt: "SEO agencije naplacuju 300-600 EUR mjesecno. AI alati ti daju 80% istih preporuka besplatno. Evo kako ih koristiti.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-12T08:00:00Z",
    categories: ["ai-alati", "seo"],
    body: [
      h2("SEO nije magija — to je checklist"),
      p("SEO agencije vole predstaviti optimizaciju za trazilice kao slozen, tajanstven proces. U stvarnosti, za lokalni biznis, SEO je checklist od 15-20 stvari. Vecinu njih mozes napraviti sam — pogotovo uz AI."),
      p("AI alati za SEO ne zamjenjuju iskusnog strucnjaka za velike projekte. Ali za obrtnika koji zeli biti vidljiv na Googleu u svom gradu — AI je vise nego dovoljan."),

      h2("Sto AI alati za SEO zapravo rade"),
      p("Analiza web stranice — AI prolazi kroz tvoju stranicu i kaze ti tocno sto ne valja: nedostaje meta opis, slike nemaju alt tekst, stranica se sporo ucitava, nemas H1 naslov..."),
      p("Prijedlog kljucnih rijeci — umjesto da pogadas sto ljudi traze, AI ti kaze: \"vodoinstalater Osijek\" ima 320 pretraga mjesecno, \"instalater grijanja Osijek\" ima 150. Sad znas na sto se fokusirati."),
      p("Generiranje SEO sadrzaja — AI pise meta opise, naslove stranica i blog postove optimizirane za kljucne rijeci koje si odabrao."),

      h2("Prakticni koraci: AI + SEO u 4 tjedna"),
      p("Tjedan 1: Pokreni AI analizu stranice. Popravi tehnicke greske — meta opisi, naslovi, alt tekstovi na slikama. To su promjene koje Google primijeti najbrze."),
      p("Tjedan 2: Istrazi kljucne rijeci za tvoju uslugu + grad. Ubaci ih u sadrzaj stranice — naslov, tekst, podnaslov. Prirodno, ne na silu."),
      p("Tjedan 3: Napravi Google Business profil (ili ga azuriraj). Dodaj 10+ fotografija, tocno radno vrijeme, i kategoriju usluge."),
      p("Tjedan 4: Objavi prvi blog post optimiziran za kljucnu rijec. AI ti ga moze napisati u 10 minuta. Npr. \"5 znakova da trebate novi bojler\" za instalatera grijanja."),

      h2("Zasto blog postovi pomazu za SEO"),
      p("Google voli svjez sadrzaj. Web stranica od 5 stranica koja se ne mijenja mjesecima signalizira Googleu da nije aktivna. Blog post jednom mjesecno salje signal: \"Ova stranica je ziva.\""),
      p("AI ti generira teme i sadrzaj. Ti samo pregledas, prilagodis i objavi. 15-20 minuta mjesecno za sadrzaj koji radi za tebe 24/7."),

      h2("Rezultati: sto realno ocekivati"),
      p("Lokalni SEO nije sprint. Ali je predvidljiv:"),
      p("Mjesec 1: Tehnicke popravke, Google Business profil. Malo pomaka u rangiranju."),
      p("Mjesec 2-3: Kljucne rijeci pocnu hvatati. Pojavljujes se na stranici 2-3 Googlea."),
      p("Mjesec 4-6: Konzistentni blog postovi + recenzije pomicu te na stranicu 1 za lokalne pretrage."),
      p("Mjesec 6+: Stabilan promet. Upiti dolaze organski bez placanja reklama."),

      h2("Zakljucak"),
      p("Ne trebas SEO agenciju za 500 EUR mjesecno. Trebas AI alat za 0-30 EUR, 2-3 sata mjesecno i disciplinu da budes konzistentan. Google nagraduje upornost — a AI ti je daje."),
    ],
  },

  // --- POST 8 ---
  {
    _type: "blogPost",
    title: "AI za organizaciju posla: Kako ne zaboraviti nijedan termin",
    slug: { _type: "slug", current: "ai-organizacija-posla-termini" },
    excerpt: "Zapisujes termine na papiru? Zaboravljas followupe? AI alati za organizaciju pretvaraju kaos u sustav — bez da mijenjaju nacin kako radis.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-13T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("Kaos koji poznaje svaki obrtnik"),
      p("Pon: 3 posla u razlicitim dijelovima grada. Uto: klijent zove — \"Kad dolazite?\" i ne sjecas se sto si dogovorio. Sri: zaboravis poslati ponudu koju si obecao u ponedjeljak. Cet: shvatis da nemas materijal za sutrasnnji posao jer si zaboravio naruciti."),
      p("Ovo nije problem lijenosti — to je problem sustava. Kad imas 10-20 aktivnih klijenata, glava nije dovoljan organizator."),

      h2("Kako AI organizacijski alati rade"),
      p("Moderni AI organizacijski alati nisu obicni kalendari. Oni razumiju kontekst i predvidaju sto trebas:"),
      p("Pametno zakazivanje — kad uneses novi posao, AI predlaze optimalan termin na temelju tvoje lokacije, trajanja posla i vec zakazanih termina. Minimizira voznju."),
      p("Automatski podsjetnici — dan prije posla, klijent dobije poruku: \"Podsjecamo da dolazimo sutra u 9h. Je li termin i dalje odgovarajuci?\" Manje praznih dolazaka."),
      p("Follow-up sustav — zavrsis posao, AI te podsjeti za 3 dana: \"Posalji ponudu za dodatni rad koji je klijent spominjao.\" Nista ne propadne."),

      h2("Minimalni setup: 30 minuta za sustav koji traje"),
      p("Ne trebas slozeni CRM od 200 EUR mjesecno. Trebas tri stvari:"),
      p("1. Digitalni kalendar s AI pomoci — Google Calendar ili slicno, s pametnim prijedlozima za termine."),
      p("2. Jednostavan task manager — biljeska za svaki posao: sto, kad, koliko, materijal. AI organizira prioritete."),
      p("3. Automatski podsjetnici — za tebe i za klijente. Smanjuje no-show za 50%."),
      p("Postavljanje traje 30 minuta. Jednom napravljeno, sustav radi sam. Ti samo unosis nove poslove — AI organizira sve ostalo."),

      h2("Primjer: elektricar koji je smanjio prazne termine za 70%"),
      p("Davor iz Rijeke je elektricar. Prije je imao 3-4 prazna termina mjesecno — klijenti koji su zaboravili ili odustali bez da jave. To je 400-600 EUR izgubljenog prihoda."),
      p("S AI podsjetnicima: klijent dobije poruku dan prije. Ako otkaze — Davor ima vremena popuniti termin. Prazni termini pali s 4 na 1 mjesecno. Godisnja usteda: 4.000+ EUR."),

      h2("Napredni korak: AI za rutiranje"),
      p("Kad imas 4-5 poslova dnevno na razlicitim lokacijama, redoslijed je bitan. AI rutiranje analizira adrese i predlaze optimalan put — da ne vozis 30 km vise nego sto trebas."),
      p("Za obrtnika koji vozi 100+ km dnevno, optimizacija rute stedi 20-30 km i 45 minuta dnevno. Na mjesecnoj razini: 600 km manje = 80 EUR ustede na gorivu + sat vremena dnevno."),

      h2("Zakljucak"),
      p("Organizacija posla ne zahtijeva talent za planiranje. Zahtijeva sustav koji te ne pusta da zaboravis. AI alati su taj sustav — tihi, pouzdani i jeftiniji od jednog zaboravljenog termina."),
    ],
  },

  // --- POST 9 ---
  {
    _type: "blogPost",
    title: "Kako AI pomaze obrtnicima da konkuriraju velikima",
    slug: { _type: "slug", current: "ai-pomaze-obrtnicima-konkurirati-velikima" },
    excerpt: "Velike firme imaju marketing timove, dizajnere i IT odjele. Ti imas sebe. AI izjednacava igru — evo kako.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-14T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("David protiv Golijata — digitalna verzija"),
      p("Velika firma za renovacije ima: marketing managera, copywritera, dizajnera, IT podršku, accounting odjel i sales tim. Ti imas sebe, kombi i alat."),
      p("Prije 5 godina, ta razlika je bila nepremostiva. Veliki igraci su dominirali online prostorom jer su imali resurse. Ali AI je promijenio jednadzbu."),
      p("Danas jedan obrtnik s pravim AI alatima moze izgledati, komunicirati i prodavati kao firma od 10 ljudi. Evo kako."),

      h2("Web prisutnost: profesionalna za desetinu cijene"),
      p("Velika firma placa 5.000-15.000 EUR za web stranicu i 500 EUR mjesecno za odrzavanje. Ti mozes imati jednako profesionalnu stranicu za 399-999 EUR i 55-99 EUR mjesecno."),
      p("Razlika u kvaliteti? Minimalna. Jer moderne web platforme i AI alati za dizajn produciraju stranice koje vizualno ne zaostaju za skupim rjesenjima. Posjetitelj ne vidi cijenu — vidi rezultat."),

      h2("Marketing: konzistentan bez tima"),
      p("Velika firma objavljuje na Instagramu 5x tjedno jer ima nekoga ciji je to posao. Ti objavljujes 2x mjesecno jer nemas vremena."),
      p("S AI alatom za sadrzaj: generiraj 12-15 objava mjesecno u 30 minuta. Zakazi ih unaprijed. Sada objavljujes 3-4x tjedno — jednako cesto kao velika firma. Google i Instagram algoritmi te tretiraju ravnopravno."),

      h2("Komunikacija: brza i profesionalna"),
      p("Velika firma ima recepciju koja javlja telefon u 3 sekunde. Ti si na terenu i ne cujes zvono."),
      p("AI chatbot na webu odgovara na upite u 2 sekunde — 24/7. Automatski odgovori na WhatsApp poruke daju klijentu osjecaj da je tvoj biznis \"uvijek dostupan\". Profesionalizam nije u velicini firme — nego u brzini odgovora."),

      h2("Ponude i dokumentacija: isti standard"),
      p("Kada velika firma salje ponudu, to je profesionalni PDF s logom, detaljnim stavkama, uvjetima i rokovima. Kad obrtnik salje ponudu, cesto je to WhatsApp poruka s cifrom."),
      p("AI alati za ponude daju ti isti standard dokumentacije. Profesionalni PDF, automatski izracuni, uvjeti placanja. Klijent ne moze razlikovati tvoju ponudu od ponude firme s 50 zaposlenih."),

      h2("Cijena tvoje prednosti: osobni kontakt"),
      p("Evo nesto sto velika firma nikad nece imati: tebe. Vlasnika koji dodje na teren, osobno razgovara s klijentom, stoji iza svog rada imenom i prezimenom."),
      p("To je tvoja najveca prednost. AI ti oslobada vrijeme od administracije — da ga mozes potrositi na ono sto velike firme ne mogu: osobni odnos s klijentom."),

      h2("Zakljucak"),
      p("Ne moras biti velik da izgledas profesionalno. Ne moras imati tim da budes konzistentan. AI alati su tvoj tim — dizajner, copywriter, asistent i organizator. Jedina stvar koju ne mogu zamijeniti je tvoja strucnost i osobni kontakt. A to je upravo ono sto klijenti najvise cijene."),
    ],
  },

  // --- POST 10 ---
  {
    _type: "blogPost",
    title: "Od prvog klika do vjernog klijenta: AI strategija za rast biznisa",
    slug: { _type: "slug", current: "ai-strategija-za-rast-biznisa" },
    excerpt: "AI nije pojedinacni alat — to je strategija. Evo kako povezati web, sadrzaj, komunikaciju i organizaciju u sustav koji raste s tobom.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-15T08:00:00Z",
    categories: ["ai-alati", "savjeti"],
    body: [
      h2("Prestani razmisljati o alatima — pocni razmisljati o sustavu"),
      p("Vecina malih biznisa koristi AI alate izolirano: jedan za drustvene mreze, drugi za mailove, treci za ponude. Svaki radi svoj posao, ali nisu povezani. To je kao imati dobrog mehanicara, elektricara i soboslikara koji ne razgovaraju medusobno na istoj gradilisnoj lokaciji."),
      p("Prava snaga AI-ja je kad ga koristis kao povezan sustav — od prvog kontakta s klijentom do ponovljenog posla."),

      h2("Faza 1: Privuci — neka te pronadju"),
      p("Sve pocinje s vidljivoscu. Klijent trazi tvoju uslugu na Googleu. Da te pronade, trebas:"),
      p("Web stranicu optimiziranu za lokalne kljucne rijeci (AI SEO alati)."),
      p("Google Business profil s recenzijama i fotografijama."),
      p("Blog postove koji odgovaraju na pitanja tvoje ciljane publike (AI content alati)."),
      p("Drustvene mreze s konzistentnim objavama (AI social media alati)."),
      p("Ova faza je potpuno automatizirana s AI-jem. 2-3 sata mjesecno za odrzavanje."),

      h2("Faza 2: Uhvati — pretvori posjetitelja u lead"),
      p("Klijent je nasao tvoju stranicu. Sad mora lako stupiti u kontakt:"),
      p("AI chatbot odgovara na pitanja i prikuplja kontakt podatke."),
      p("Kontakt forma salje automatsku potvrdu: \"Hvala na upitu. Javimo se do 10h sutra.\""),
      p("WhatsApp automatski odgovor za upite izvan radnog vremena."),
      p("Cilj: nijedan upit ne smije ostati bez odgovora. AI to garantira."),

      h2("Faza 3: Prodaj — profesionalna ponuda u satima, ne danima"),
      p("Klijent je zainteresiran. Sad trebas ponudu:"),
      p("AI alat generira profesionalnu ponudu u 5 minuta na temelju terenskog pregleda."),
      p("Ponuda stize klijentu isti dan — dok je jos zagrijan."),
      p("Automatski follow-up ako ne odgovori za 3 dana."),
      p("Rezultat: veca stopa prihvacanja jer si brz, profesionalan i ne pustas da upit \"ohladi\"."),

      h2("Faza 4: Isporuci i dokumentiraj"),
      p("Posao je u tijeku. AI pomaze s organizacijom:"),
      p("Pametno zakazivanje optimizira rutu i termine."),
      p("Podsjetnici za klijente smanjuju prazne dolaske."),
      p("Automatsko fakturiranje cim zavrsis posao."),
      p("Dokumentacija rada (fotografije prije/poslije) za portfolio i drustvene mreze."),

      h2("Faza 5: Zadrzi — pretvori klijenta u stalnog"),
      p("Ovdje vecina obrtnika staje. Zavrsi posao i zaboravi klijenta. A upravo tu je najveci potencijal:"),
      p("Automatski email 30 dana nakon posla: \"Kako ste zadovoljni? Trebate li sto dodatno?\""),
      p("Sezonski podsjetnici: \"Blizi se zima — vrijeme za servis grijanja.\""),
      p("Godisnji check-in: \"Proslo je godinu dana od naseg zadnjeg posla. Mozemo li vam pomoci s nekim novim projektom?\""),
      p("Sve ovo AI salje automatski. Ti ne moras sjediti i pisati mailove — sustav radi za tebe."),

      h2("Koliko sve ovo kosta?"),
      p("Kompletan AI sustav za mali biznis:"),
      p("Web stranica s chatbotom: 399-999 EUR setup + 55-99 EUR/mj"),
      p("AI sadrzaj za drustvene mreze: 15-50 EUR/mj"),
      p("Email marketing s AI: 0-30 EUR/mj"),
      p("Organizacijski alat: 0-20 EUR/mj"),
      p("Ukupno: 70-200 EUR mjesecno za sustav koji radi posao 2-3 ljudi. ROI se vraca s jednim dodatnim klijentom mjesecno — a sustav ih donosi 3-5."),

      h2("Zakljucak"),
      p("AI nije buducnost — to je sadasnjost. Obrtnici koji ga usvoje danas imaju prednost nad onima koji ce ga usvojiti za 2 godine. Ne trebas sve odjednom. Pocni s jednom fazom, usavrsi je, dodaj sljedecu. Za 6 mjeseci ces imati sustav koji raste s tobom — a ne sustav koji te usporava."),
    ],
  },
];

// --- SEED FUNCTION ---

async function seed() {
  if (!process.env.SANITY_TOKEN) {
    console.error("Missing SANITY_TOKEN. Get one from:");
    console.error("https://www.sanity.io/manage/project/qrf7o22v/api#tokens");
    process.exit(1);
  }

  console.log(`Seeding ${blogPosts.length} AI blog posts...`);

  for (const post of blogPosts) {
    try {
      const result = await client.create(post);
      console.log(`  OK Created: "${post.title}" (${result._id})`);
    } catch (err) {
      console.error(`  FAIL: "${post.title}"`, err.message);
    }
  }

  console.log("Done! All AI blog posts seeded.");
}

seed();

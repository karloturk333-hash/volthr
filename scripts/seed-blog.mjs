// scripts/seed-blog.mjs
// Usage: SANITY_TOKEN=<your-token> node scripts/seed-blog.mjs
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
    _key: `b${keyCounter}`,
    style,
    children: [{ _type: "span", _key: `s${keyCounter}`, text }],
  };
}
function h2(text) { return block("h2", text); }
function h3(text) { return block("h3", text); }
function p(text) { return block("normal", text); }

const blogPosts = [
  // ─── POST 1 ───────────────────────────────────────────────────────────────
  {
    _type: "blogPost",
    title: "Zašto svaki obrtnik treba web stranicu u 2026.",
    slug: { _type: "slug", current: "zasto-svaki-obrtnik-treba-web-stranicu" },
    excerpt: "87% kupaca traži usluge na Googleu. Bez web stranice, ne postojiš za njih. Evo zašto je 2026. zadnji vlak.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-01T08:00:00Z",
    categories: ["web-dizajn", "savjeti"],
    body: [
      h2("Google je novi imenik"),
      p("Prije 15 godina, kad je netko trebao vodoinstalatera, pitao je susjeda. Danas otvori mobitel i upiše \"vodoinstalater Vrbovec\". Ako te nema na Googleu — za njega ne postojiš."),
      p("Prema istraživanjima, 87% potrošača koristi internet za traženje lokalnih usluga. Od toga 72% posjeti poslovni prostor u krugu od 8 km unutar 24 sata. Ali samo ako te pronađu."),

      h2("Vizitka nije dovoljna"),
      p("\"Imam Facebook stranicu, čemu mi web?\" — čujemo to svaki tjedan. Evo razlike: Facebook stranicu kontrolira Facebook. Algoritam odlučuje tko vidi tvoje objave. Doseg organski pada svake godine."),
      p("Web stranica je tvoja. Ti odlučuješ što piše, kako izgleda i kamo vodi posjetitelja. Google te indeksira 24/7. I najvažnije — kad netko upiše tvoju uslugu + grad, web stranica se pojavi. Facebook stranica često ne."),

      h2("Mobitel prvi, desktop drugi"),
      p("68% svih pretraga u Hrvatskoj dolazi s mobitela. Ako tvoja stranica ne izgleda dobro na ekranu od 6 inča, gubi 2 od 3 posjetitelja. Svaka moderna web stranica mora biti mobilno prilagođena — bez izuzetaka."),

      h2("Koliko to zapravo košta?"),
      p("Većina agencija naplaćuje €3.000–€15.000 za web stranicu. Za obrtnika koji zarađuje €2.000–€5.000 mjesečno, to je preskupo. Ali ne mora biti."),
      p("Danas postoje rješenja od €399 za kompletnu web stranicu, gotovu za 7 dana. S fiksnom cijenom, bez skrivenih troškova, bez ugovora na godinu dana. A uz EU digitalne vaučere, možeš dobiti i do 85% sufinanciranja."),

      h2("Što dobra web stranica mora imati?"),
      p("Ne treba ti 50 stranica. Treba ti 5 stvari:"),
      p("1. Jasna ponuda — što radiš i za koga, u jednoj rečenici."),
      p("2. Kontakt na vidljivom mjestu — telefon, WhatsApp, kontakt forma."),
      p("3. Google Maps lokacija — jer lokalni SEO ovisi o tome."),
      p("4. Slike pravih radova — ne stock fotografije. Tvoji projekti grade povjerenje."),
      p("5. Brzina — stranica se mora učitati za manje od 3 sekunde na mobitelu."),

      h2("Zaključak"),
      p("Web stranica nije luksuz. Za obrtnika u 2026., to je osnovna poslovna infrastruktura — kao telefon ili kombi. Razlika između obrtnika koji raste i onoga koji stagnira često je upravo u tome — može li ga kupac pronaći na internetu."),
      p("Ne trebaš savršenu stranicu. Trebaš funkcionalnu stranicu — i to što prije."),
    ],
  },

  // ─── POST 2 ───────────────────────────────────────────────────────────────
  {
    _type: "blogPost",
    title: "SEO za obrtnike: 5 koraka do prvih rezultata",
    slug: { _type: "slug", current: "seo-za-obrtnike-5-koraka" },
    excerpt: "SEO zvuči komplicirano, ali za lokalni obrt nije. 5 konkretnih koraka koji donose rezultate unutar 90 dana.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-02T08:00:00Z",
    categories: ["seo", "savjeti"],
    body: [
      h2("Što je SEO i zašto te briga?"),
      p("SEO (Search Engine Optimization) znači prilagoditi web stranicu tako da se pojavi kad netko na Googleu traži tvoju uslugu. Npr. \"soboslikar Zagreb\" ili \"automehaničar Varaždin\"."),
      p("Za lokalne obrtnike, SEO nije rocket science. Ne trebaš agenciju koja ti naplaćuje €500 mjesečno. Trebaš 5 stvari — i možeš ih napraviti sam ili s minimalnom pomoći."),

      h2("Korak 1: Google Business Profile"),
      p("Ovo je besplatno i najvažnije. Idi na business.google.com i registriraj svoj obrt. Unesi: točnu adresu, radno vrijeme, broj telefona, kategoriju (npr. \"Vodoinstalater\"), i 5-10 fotografija pravih radova."),
      p("Obrti s kompletnim Google Business profilom dobivaju 7x više klikova od onih bez profila. To je podatak koji ne smiješ ignorirati."),

      h2("Korak 2: Ključne riječi na web stranici"),
      p("Tvoja web stranica mora sadržavati riječi koje ljudi stvarno traže. Ako si elektičar u Splitu, na naslovnoj stranici mora pisati \"elektičar Split\" — ne \"električne usluge na području Dalmacije\"."),
      p("Napiši kako ljudi govore. Koristi ime grada, kvarta, usluge. Google će te nagraditi za to."),

      h2("Korak 3: Recenzije kupaca"),
      p("Svaki put kad završiš posao i klijent je zadovoljan, zatraži recenziju na Googleu. Pošalji mu link. Napravi to lakim."),
      p("Obrti s 20+ recenzija i prosječnom ocjenom iznad 4.5 rangiraju se drastično bolje od konkurencije. Plus, nove mušterije čitaju recenzije prije nego nazovu."),

      h2("Korak 4: Brza web stranica"),
      p("Google mjeri brzinu tvoje stranice. Ako se učitava duže od 3 sekunde na mobitelu, penalizira te u rezultatima. Testiraj svoju stranicu na PageSpeed Insights (besplatan Googleov alat)."),
      p("Cilj: zelena ocjena na mobitelu. Ako je crvena — problem je u hostingu, prevelikim slikama ili lošem kodu. To se da popraviti."),

      h2("Korak 5: Konzistentni podaci"),
      p("Tvoj naziv obrta, adresa i telefon (NAP) moraju biti identični svugdje: na webu, na Googleu, na Facebooku, na imenicima poput Njuškalo ili Žute stranice."),
      p("Ako na webu piše \"Kolodvorska 21\" a na Googleu \"Kolodvorska ul. 21\" — Google to tretira kao dva različita biznisa. Uskladi sve."),

      h2("Koliko brzo se vide rezultati?"),
      p("Lokalni SEO nije sprint, ali nije ni maraton. Ako napravi ovih 5 koraka danas, unutar 60-90 dana vidjet ćeš pomak u Google rezultatima. Neki obrti se popnu na prvu stranicu već nakon mjesec dana."),
      p("Najvažnije: počni. Svaki dan bez web prisutnosti je dan kad mušterija ode konkurentu koji je na Googleu."),
    ],
  },

  // ─── POST 3 ───────────────────────────────────────────────────────────────
  {
    _type: "blogPost",
    title: "EU digitalni vaučeri 2026: Kako do 85% sufinanciranja",
    slug: { _type: "slug", current: "eu-digitalni-vauceri-2026" },
    excerpt: "Hrvatska dijeli digitalne vaučere za web stranice. Do 85% troška pokriva EU. Evo tko može, kako i do kad.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-03T08:00:00Z",
    categories: ["eu-potpore"],
    body: [
      h2("Što su digitalni vaučeri?"),
      p("Digitalni vaučeri su EU potpore namijenjene malim poduzećima i obrtima za digitalizaciju poslovanja. To uključuje: izradu web stranica, web shopova, CRM sustava, digitalni marketing i slično."),
      p("Program provodi Ministarstvo gospodarstva preko HAMAG-BICRO-a (sada HBOR-a), a financira se iz Europskog fonda za regionalni razvoj."),

      h2("Koliko novca možeš dobiti?"),
      p("Ovisno o programu i lokaciji, sufinanciranje ide od 50% do 85% prihvatljivih troškova. Za obrtnike izvan Zagreba, postotak je viši — do 85%."),
      p("Primjer: naručiš web stranicu za €1.000. Uz vaučer od 85%, tvoj trošak je €150. Razliku pokriva EU fond."),
      p("Maksimalni iznos vaučera varira po natječaju — tipično €2.500 do €5.000 za mikro i male poduzetnike."),

      h2("Tko može aplicirati?"),
      p("Uvjeti se razlikuju po natječaju, ali osnovni kriteriji su:"),
      p("1. Registrirani obrt ili tvrtka (d.o.o.) u Hrvatskoj."),
      p("2. Manje od 10 zaposlenih (za mikro poduzetnike) ili manje od 50 (za male)."),
      p("3. Aktivan minimalno 1 godinu."),
      p("4. Nemaš dugovanja prema državi (porezna čistoća)."),
      p("5. Nisi već koristio vaučer u istom programskom razdoblju za isti tip troška."),

      h2("Kako izgleda postupak?"),
      p("Postupak je jednostavniji nego što zvuči:"),
      p("1. Provjeri otvorene natječaje na strukturnifondovi.hr ili HBOR.hr."),
      p("2. Pripremi ponudu od web agencije (treba ti pisana ponuda s jasnim stavkama)."),
      p("3. Ispuni online prijavu — obično traje 2-3 sata s dokumentacijom."),
      p("4. Čekaj odobrenje (tipično 30-60 dana)."),
      p("5. Nakon odobrenja, naruči web stranicu i plati račun."),
      p("6. Pošalji dokaz plaćanja i gotov proizvod — fond ti isplaćuje razliku."),

      h2("Najčešće greške pri prijavi"),
      p("Ponuda koja nije dovoljno detaljno specificirana — fond želi vidjeti točne stavke, ne \"izrada web stranice €1.000\". Bolje: \"dizajn naslovne stranice — €200, razvoj kontakt forme — €150, SEO optimizacija — €250...\""),
      p("Prijava nakon roka — natječaji imaju fiksne rokove i ne čekaju nikoga. Prati objave tjedno."),
      p("Plaćanje prije odobrenja — ako platiš web stranicu prije nego dobiješ odobrenje vaučera, trošak nije prihvatljiv."),

      h2("Kada je sljedeći natječaj?"),
      p("Natječaji se raspisuju nekoliko puta godišnje. U 2026. se očekuje novi krug digitalnih vaučera u drugom kvartalu (travanj-lipanj). Točan datum objave prati na stranicama HBOR-a."),
      p("Savjet: pripremi ponudu i dokumentaciju unaprijed. Kad se natječaj otvori, samo pošalji. Oni koji su spremni — prvi prolaze."),
    ],
  },

  // ─── POST 4 ───────────────────────────────────────────────────────────────
  {
    _type: "blogPost",
    title: "Kako odabrati web agenciju (i ne baciti novac)",
    slug: { _type: "slug", current: "kako-odabrati-web-agenciju" },
    excerpt: "130+ agencija u Hrvatskoj. Cijene od €500 do €20.000. Evo kako razlikovati dobru agenciju od skupe greške.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-04T08:00:00Z",
    categories: ["savjeti", "web-dizajn"],
    body: [
      h2("Problem: sve agencije zvuče isto"),
      p("Svaka web agencija u Hrvatskoj ima istu rečenicu na naslovnoj: \"Izrađujemo moderne web stranice prilagođene vašim potrebama.\" To ti ne govori ništa."),
      p("Ono što te zanima su konkretni odgovori na konkretna pitanja. Evo kojih."),

      h2("Pitanje 1: Koliko točno košta i što je uključeno?"),
      p("Ako agencija kaže \"ovisi o projektu\" ili \"javit ćemo se s ponudom\" — crvena zastava. Svaka ozbiljna agencija za jednostavnu obrtničku stranicu može odmah reći cijenu."),
      p("Traži fiksnu cijenu, ne satni model. Obrtnik ne treba plaćati satnice po €80-150. Treba gotov proizvod za poznat iznos."),
      p("Pitaj: \"Koliko je ukupno, s porezom, bez iznenađenja?\" Ako ne mogu odgovoriti — idi dalje."),

      h2("Pitanje 2: U kojem roku je gotovo?"),
      p("Profesionalna agencija za web stranicu od 5-7 stranica treba 1-2 tjedna. Ako kažu \"6-8 tjedana\" za jednostavan obrtčki web — ili imaju previše posla ili previše birokratskog procesa."),
      p("Pitaj: \"Koji je najkraći realni rok?\" I traži to napisano u ugovoru."),

      h2("Pitanje 3: Tko je vlasnik stranice?"),
      p("Ovo je kritično. Neke agencije rade stranicu na svojoj platformi i ti si \"zaključan\". Ako prestaneš plaćati mjesečnu naknadu, gubi stranicu."),
      p("Traži: stranicu izrađenu na otvorenoj platformi (WordPress, Next.js, ili slično) koju možeš preseliti ako želiš. Sav sadržaj, slike i kod moraju biti tvoji."),

      h2("Pitanje 4: Što ako nešto ne radi?"),
      p("Poslije lansiranja uvijek treba nešto popraviti. Pitaj agenciju: \"Koliko košta popravak? Imate li garanciju?\""),
      p("Dobra agencija uključuje 30-90 dana besplatnih popravaka nakon lansiranja. Odlična agencija ima mjesečni paket održavanja za fiksni iznos."),

      h2("5 crvenih zastava"),
      p("1. Nema portfolio s primjerima sličnih stranica."),
      p("2. Traži 100% uplatu unaprijed."),
      p("3. Ne može pokazati referencu koju možeš nazvati."),
      p("4. Nema ugovor ili ga ne želi dati prije uplate."),
      p("5. Obećava \"prvu poziciju na Googleu\" — to nitko ne može garantirati."),

      h2("Zelene zastave"),
      p("1. Fiksna cijena napisana na webu — bez \"kontaktirajte nas za ponudu\"."),
      p("2. Rok isporuke u ugovoru."),
      p("3. Primjeri živih stranica koje možeš posjetiti."),
      p("4. Jasno definiran mjesečni paket (hosting, održavanje, podrška)."),
      p("5. Plaćanje u ratama ili nakon isporuke."),

      h2("Zaključak"),
      p("Ne trebaš najskuplju agenciju. Trebaš poštenu agenciju. Onu koja ti kaže točno koliko košta, što dobiješ i kad je gotovo. Sve ostalo je marketing."),
    ],
  },

  // ─── POST 5 ───────────────────────────────────────────────────────────────
  {
    _type: "blogPost",
    title: "AI alati za male poduzetnike: Praktični vodič",
    slug: { _type: "slug", current: "ai-alati-za-male-poduzetnike" },
    excerpt: "AI nije samo za velike firme. Evo 5 alata koje obrtnik može koristiti danas — za marketing, tekst i organizaciju.",
    author: "Volt Web Studio",
    publishedAt: "2026-03-05T08:00:00Z",
    categories: ["savjeti"],
    body: [
      h2("AI za obrtnike — bez buzzworda"),
      p("\"Umjetna inteligencija\" zvuči kao nešto iz znanstvene fantastike. Ali u praksi, AI alati su programi koji ti štede vrijeme na poslovima koje radiš svaki dan: pisanje objava za društvene mreže, odgovaranje na upite, organizacija posla."),
      p("Ne trebaš biti informatičar. Ako znaš upisati tekst u tražilicu — znaš koristiti AI alat."),

      h2("1. Pisanje objava za društvene mreže"),
      p("Umjesto da sat vremena razmišljaš što napisati na Instagram, AI alat može generirati 5-10 objava u 30 sekundi. Ti odabereš najdražu, prilagodiš je i objavi."),
      p("Kako to izgleda u praksi: uneseš \"automehaničar, servis klima uređaja, Split\" i dobiješ gotove objave s hashtagovima, pozivom na akciju i svime što treba."),
      p("Ušteda: 3-5 sati tjedno na sadržaju za društvene mreže."),

      h2("2. Odgovaranje na upite kupaca"),
      p("Koliko puta dnevno dobiješ istu poruku: \"Koliko košta?\", \"Radite li vikendom?\", \"Dolazite li u moj kvart?\" AI chatbot na web stranici može automatski odgovarati na ova pitanja — 24/7."),
      p("Ne zamjenjuje tebe za složene razgovore. Ali filtrira 70% pitanja kojima je odgovor uvijek isti."),

      h2("3. Organizacija i fakturiranje"),
      p("Alati poput pametnih kalendara i organizatora mogu automatski rasporediti tvoje termine, slati podsjetnike klijentima i čak generirati račune nakon obavljenog posla."),
      p("Za obrtnika koji vodi 10-20 poslova mjesečno, automatizacija administracije štedi 5-8 sati mjesečno. To je cijeli radni dan."),

      h2("4. Fotografije i vizualni sadržaj"),
      p("Trebaš sliku za objavu na Facebooku ali nemaš profesionalnog fotografa? AI alati za generiranje slika mogu stvoriti vizuale za tvoje objave — bez autorskih prava, bez troška."),
      p("Naravno, za portfolio koristi prave fotografije svojih radova. Ali za promotivne objave, AI slike su sasvim dovoljne."),

      h2("5. SEO i analitika"),
      p("AI alati mogu analizirati tvoju web stranicu i reći ti točno što popraviti da se bolje pozicioniraš na Googleu. Umjesto da plaćaš SEO stručnjaka €300 mjesečno, AI ti može dati 80% istih preporuka besplatno."),

      h2("Koliko to košta?"),
      p("Većina AI alata ima besplatne verzije koje su sasvim dovoljne za obrtnika:"),
      p("Pisanje sadržaja — besplatno do 3 generacije, plaćeni planovi od €15 mjesečno."),
      p("Chatbot — besplatni plan za male stranice, plaćeno od €20 mjesečno."),
      p("Organizacija — besplatno za osnovne funkcije."),
      p("Generiranje slika — besplatno do 50 slika mjesečno."),

      h2("Zaključak"),
      p("AI neće zamijeniti obrtnika. Nitko ne može popraviti cijev ili ožičiti kuću osim tebe. Ali AI može preuzeti dosadne poslove: pisanje, odgovaranje, organiziranje, fakturiranje."),
      p("Počni s jednim alatom. Isprobaj ga tjedan dana. Ako ti štedi barem sat vremena tjedno — isplatio se."),
    ],
  },
];

// ─── SEED FUNCTION ──────────────────────────────────────────────────────────

async function seed() {
  if (!process.env.SANITY_TOKEN) {
    console.error("Missing SANITY_TOKEN. Get one from:");
    console.error("https://www.sanity.io/manage/project/qrf7o22v/api#tokens");
    process.exit(1);
  }

  console.log(`Seeding ${blogPosts.length} blog posts...`);

  for (const post of blogPosts) {
    try {
      const result = await client.create(post);
      console.log(`  ✓ Created: "${post.title}" (${result._id})`);
    } catch (err) {
      console.error(`  ✗ Failed: "${post.title}"`, err.message);
    }
  }

  console.log("Done!");
}

seed();

// =============================================================================
// VOLT — Complete Site Content (Croatian)
// =============================================================================
// This file contains ALL user-facing text for the Volt website.
// Import and use directly in components. No hardcoded strings.
// Last updated: March 2026
// =============================================================================

// ---------------------------------------------------------------------------
// SITE-WIDE
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Volt",
  fullName: "Volt",
  tagline: "Mi vodimo tvoju digitalnu prisutnost.",
  domain: "volt.hr",
  email: "info@volt.hr",
  phone: "+385 95 3765 343",
  whatsapp: "https://wa.me/385953765343",
  address: {
    street: "Kolodvorska 21",
    city: "Vrbovec",
    zip: "10340",
    county: "Zagrebačka županija",
    country: "Hrvatska",
  },
  social: {
    instagram: "https://instagram.com/volt.hr",
    linkedin: "https://linkedin.com/company/volt-hr",
    facebook: "https://facebook.com/volt.hr",
  },
  copyright: `© ${new Date().getFullYear()} Volt. Sva prava pridržana.`,
} as const

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------

export const NAV = {
  links: [
    { label: "Početna", href: "/" },
    { label: "O nama", href: "/o-nama" },
    { label: "Usluge", href: "/usluge" },
    { label: "Cijene", href: "/cijene" },
    { label: "Projekti", href: "/projekti" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  cta: {
    label: "Piši na WhatsApp",
    href: "https://wa.me/385953765343",
  },
} as const

// ---------------------------------------------------------------------------
// HOMEPAGE
// ---------------------------------------------------------------------------

export const HERO = {
  label: "Agencija za obrtnike",
  heading: "Ti radiš svoj posao. Mi vodimo digitalnu prisutnost.",
  descriptor:
    "Web stranica, Instagram, Facebook, Google profil — sve vodimo mi. Ti samo odobriš sadržaj na WhatsAppu. Bez dashboarda, bez kompliciranja.",
  cta: {
    primary: { label: "Piši na WhatsApp", href: "https://wa.me/385953765343" },
    secondary: { label: "Pogledaj cijene", href: "/cijene" },
    tertiary: { label: "Kako radimo", href: "/o-nama" },
  },
  trust: "Fiksne cijene. Bez ugovora. Otkaži bilo kad.",
  speedBadge: {
    score: 100,
    label: "Lighthouse Score",
    sublabel: "Performanse",
  },
} as const

export const CLIENT_LOGOS = {
  label: "Povjerenje obrtnika iz Zagrebačke županije",
  // TODO: Replace with real client logos from Sanity
  placeholders: [
    "Tech Startup",
    "Restoran",
    "Hotel",
    "Apartmani",
    "Frizerski salon",
  ],
} as const

export const ABOUT_SECTION = {
  label: "O Voltu",
  heading: "Digitalna prisutnost bez tvog vremena.",
  body: "133.640 obrtnika u Hrvatskoj. Većina nema web stranicu, Instagram profil ni Google Business. Ne zato što ne žele — nego jer nemaju vremena. Volt vodi kompletnu digitalnu prisutnost za tebe. Ti radiš svoj posao, mi vodimo web, sadržaj i profile.",
  vision: {
    label: "Naša vizija",
    text: "Svaki obrtnik u Hrvatskoj zaslužuje profesionalnu digitalnu prisutnost jednako kvalitetnu kao i posao koji obavlja.",
  },
  mission: {
    label: "Naša misija",
    text: "Vodimo kompletnu digitalnu prisutnost za obrtnike — web, društvene mreže, Google profil i recenzije. Mi radimo, ti se fokusiraš na svoj zanat.",
  },
} as const

// Services accordion for redesigned homepage
export const SERVICES_ACCORDION = {
  label: "Naše usluge",
  items: [
    {
      title: "Upravljanje društvenim mrežama",
      description:
        "Kreiramo i objavljujemo sadržaj za Instagram i Facebook — prilagođen tvojoj branši, na hrvatskom. Ti samo odobriš na WhatsAppu.",
    },
    {
      title: "Web stranica",
      description:
        "Profesionalna web stranica za tvoj obrt u 7 dana. Mobilni dizajn, SEO optimizacija, kontakt forma i Google Maps — sve uključeno u Standard i Premium plan.",
    },
    {
      title: "Google Business upravljanje",
      description:
        "Postavljamo i ažuriramo tvoj Google Business profil, odgovaramo na recenzije i objavljujemo tjedne novosti. Tvoji klijenti te nalaze na Googleu.",
    },
    {
      title: "Mjesečni izvještaji",
      description:
        "Svaki tjedan ili mjesec dobiješ izvještaj s brojem objava, dosegom i angažmanom. Transparentno i mjerljivo.",
    },
  ],
} as const

// Why Us section — 3 value cards
export const WHY_US = {
  label: "Zašto Volt",
  items: [
    {
      title: "Samo WhatsApp",
      body: "Ne trebaš se prijavljivati nigdje. Novi sadržaj dobiješ na WhatsApp — odobri ili odbij jednim dodirom. Gotovo.",
    },
    {
      title: "Fiksne cijene",
      body: "€149, €299 ili €499 mjesečno. Bez ponuda na upit, bez cjenkanja, bez iznenađenja na računu.",
    },
    {
      title: "Profesionalan sadržaj",
      body: "Svaka objava je prilagođena tvojoj branši, na hrvatskom, s hashtagovima i CTA-om. Mi stvaramo, ti odobriš.",
    },
  ],
} as const

// Testimonials table format for redesigned homepage
export const TESTIMONIALS_TABLE = {
  label: "Recenzije klijenata",
  heading: "Rezultati govore glasnije od obećanja.",
  items: [
    {
      number: "01",
      client: "Marko P.",
      role: "Vlasnik autoservisa",
      services: ["Web dizajn", "SEO"],
      year: "2026",
    },
    {
      number: "02",
      client: "Ana K.",
      role: "Frizerski salon",
      services: ["Web dizajn", "Branding"],
      year: "2026",
    },
    {
      number: "03",
      client: "Ivan S.",
      role: "Obrt za građevinu",
      services: ["Web dizajn", "E-commerce"],
      year: "2025",
    },
    {
      number: "04",
      client: "Petra M.",
      role: "Cvjećarnica",
      services: ["Web dizajn"],
      year: "2025",
    },
  ],
} as const

export const MARQUEE_WORDS = [
  "Instagram postovi",
  "Facebook objave",
  "Google Business",
  "upravljanje sadržajem",
  "WhatsApp odobrenja",
  "mjesečni izvještaji",
  "odgovori na recenzije",
  "tjedni kalendar",
  "web stranice",
  "SEO optimizacija",
] as const

export const PORTFOLIO = {
  label: "Naši projekti",
  heading: "Svaki projekt ima svoju priču.",
  subheading: "Pogledajte kako pomažemo obrtnicima da se istaknu na webu.",
  emptyState:
    "Upravo gradimo naš portfolio. U međuvremenu, pogledajte naše cijene ili nas kontaktirajte za besplatnu konzultaciju.",
  cta: { label: "Svi projekti", href: "/projekti" },
  comingSoon: "Uskoro",
} as const

export const STATS = {
  label: "Volt u brojevima",
  items: [
    {
      value: 7,
      suffix: "",
      label: "dana za web stranicu",
      displayValue: "7",
    },
    {
      value: 50,
      suffix: "+",
      label: "objava mjesečno",
    },
    {
      value: 0,
      suffix: "",
      label: "tvojih sati rada",
      displayValue: "0",
    },
    {
      value: 0,
      suffix: "",
      label: "skrivenih troškova",
      displayValue: "€0",
    },
  ],
} as const

export const PRICING_PREVIEW = {
  label: "Cijene",
  heading: "Jednostavne cijene. Bez iznenađenja.",
  subheading: "Sve uključeno. Bez ugovora. Otkaži bilo kad.",
  tiers: [
    {
      name: "Starter",
      price: "149",
      period: "/mj",
      maintenance: "",
      description: "Za obrtnike koji žele profesionalnu prisutnost na mrežama.",
      features: [
        "8 IG/FB objava mjesečno",
        "Google Business setup",
        "Odgovaranje na recenzije",
        "Mjesečni izvještaj",
      ],
      popular: false,
    },
    {
      name: "Standard",
      price: "299",
      period: "/mj",
      maintenance: "",
      description: "Web stranica + aktivne društvene mreže. Najpopularniji izbor.",
      features: [
        "16 IG/FB objava mjesečno",
        "Web stranica uključena",
        "Google Business tjedne objave",
        "Odgovaranje na recenzije",
        "Tjedni izvještaj",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "499",
      period: "/mj",
      maintenance: "",
      description: "Potpuno upravljanje — web, mreže, oglasi i prioritetna podrška.",
      features: [
        "30 IG/FB objava + Stories",
        "Google Business + Google Ads",
        "Web + mjesečna ažuriranja",
        "Prioritetna podrška",
        "Tjedni izvještaj s metrikama",
      ],
      popular: false,
    },
  ],
  cta: { label: "Pogledaj sve detalje", href: "/cijene" },
  note: "Setup fee: €199 jednokratno (besplatno za Premium). Bez ugovora o vezanju.",
  popularBadge: "Najpopularniji",
  currency: "€",
  maintenanceLabel: "/mj",
} as const

export const PRICING_PAGE = {
  hero: {
    label: "Cijene",
    heading: "Transparentne cijene. Bez sitnog tiska.",
    subheading: "Sve uključeno u mjesečnu cijenu. Bez ugovora o vezanju — otkaži bilo kad.",
    trustBadges: [
      { icon: "zap", text: "Rezultati od prvog mjeseca" },
      { icon: "shield-check", text: "Fiksne cijene" },
      { icon: "file-x", text: "Bez ugovora o vezanju" },
    ],
  },
  tiers: [
    {
      name: "Starter",
      price: "149",
      period: "/mj",
      description: "Za obrtnike koji žele profesionalnu prisutnost na mrežama.",
      features: [
        "8 IG/FB objava mjesečno",
        "Google Business setup + ažuriranja",
        "Odgovaranje na recenzije",
        "Mjesečni izvještaj s metrikama",
        "WhatsApp odobrenje sadržaja",
        "Setup fee: €199 jednokratno",
      ],
      popular: false,
      whatsappMessage: "Bok! Zanima me Starter plan (€149/mj) za upravljanje digitalnom prisutnošću. Možemo li dogovoriti besplatnu konzultaciju?",
    },
    {
      name: "Standard",
      price: "299",
      period: "/mj",
      description: "Web stranica + aktivne društvene mreže. Najpopularniji izbor.",
      features: [
        "16 IG/FB objava mjesečno",
        "Web stranica (izrada uključena)",
        "Google Business tjedne objave",
        "Odgovaranje na recenzije",
        "Tjedni izvještaj s metrikama",
        "WhatsApp odobrenje sadržaja",
        "Setup fee: €199 jednokratno",
      ],
      popular: true,
      whatsappMessage: "Bok! Zanima me Standard plan (€299/mj) s web stranicom i upravljanjem mrežama. Možemo li dogovoriti besplatnu konzultaciju?",
    },
    {
      name: "Premium",
      price: "499",
      period: "/mj",
      description: "Potpuno upravljanje — web, mreže, oglasi i prioritetna podrška.",
      features: [
        "30 IG/FB objava + Stories",
        "Google Business + Google Ads upravljanje",
        "Web stranica + mjesečna ažuriranja",
        "Prioritetna podrška (odgovor unutar 4h)",
        "Tjedni izvještaj s detaljnim metrikama",
        "WhatsApp odobrenje sadržaja",
        "Setup fee: besplatno",
      ],
      popular: false,
      whatsappMessage: "Bok! Zanima me Premium plan (€499/mj) s punim upravljanjem digitalne prisutnosti. Možemo li dogovoriti besplatnu konzultaciju?",
    },
  ],
  allInclude: {
    heading: "Svi planovi uključuju",
    items: ["WhatsApp odobrenja", "Profesionalan sadržaj", "Hrvatsko tržište", "Bez ugovora", "Mjesečni/tjedni izvještaji", "GDPR sukladnost"],
  },
  guarantee: {
    heading: "Naše jamstvo",
    text: "Ako niste zadovoljni nakon prvog mjeseca, vraćamo novac. Bez pitanja.",
  },
  currency: "€",
  popularBadge: "Najpopularniji",
  ctaPrimary: "Piši na WhatsApp",
  ctaSecondary: "Pošalji upit",
  note: "Sve cijene su u EUR bez PDV-a. Bez ugovora o vezanju — otkaži bilo kad.",
  addons: {
    heading: "Dodaci za rast",
    subheading: "Nadogradite plan kad budete spremni. Bez ugovora o vezanju.",
    items: [
      {
        name: "Google Ads upravljanje",
        price: "99",
        period: "/mj",
        description: "Mi vodimo vaše Google oglase. Vi dižete telefon.",
        note: "Minimalni oglasni budget: €200/mj (plaćate direktno Googleu)",
        features: [
          "Postavljanje kampanja za lokalnu uslugu",
          "Tjedna optimizacija ključnih riječi",
          "Negativni pojmovi — filtrir tražitelje posla",
          "A/B testiranje oglasa",
          "Mjesečni izvještaj s brojem poziva i leadova",
        ],
        badge: "Novo",
        whatsappMessage: "Bok! Zanima me Google Ads upravljanje add-on za €99/mj. Možemo li dogovoriti poziv?",
      },
      {
        name: "Dodatne objave",
        price: "49",
        period: "/mj",
        description: "Trebate više od osnovnog paketa? Dodajte još 10 objava mjesečno.",
        note: null,
        features: [
          "+10 IG/FB objava mjesečno",
          "Isti profesionalni standard",
          "WhatsApp odobrenje uključeno",
          "Kombinira se s bilo kojim planom",
        ],
        badge: null,
        whatsappMessage: "Bok! Zanima me dodatak od 10 extra objava za €49/mj. Možemo li dogovoriti poziv?",
      },
    ],
  },
} as const

export const EU_GRANT = {
  label: "✦ AKTIVNI NATJEČAJ",
  deadlineBadge: "Rok prijave: 3. travnja 2026.",
  heading: "Do €1.500 od Zagrebačke županije. Za vašu web stranicu.",
  pool: "Fond: €400.000 — lani odobreno svih 206 prijava.",
  breakdown: [
    { amount: "€2.000", label: "Cijena web stranice", highlight: false },
    { amount: "€1.500", label: "Povrat od Županije (75%)", highlight: false },
    { amount: "€500", label: "Vaš stvarni trošak", highlight: true },
  ],
  steps: [
    { num: "01", title: "Naručite stranicu", desc: "Dogovorimo izradu web stranice." },
    { num: "02", title: "Prijavite se za potporu", desc: "Pomažemo s dokumentacijom." },
    { num: "03", title: "Dobijete 75% natrag", desc: "Do €1.500 na vaš račun." },
  ],
  eligibility:
    "Potporu mogu ostvariti mikro poduzetnici (obrt, j.d.o.o., d.o.o.) s poslovnim nastanom u Zagrebačkoj županiji, registrirani najdulje 2 godine.",
  cta: {
    label: "Pitajte nas o potpori",
    href: "https://wa.me/385953765343?text=Zanima%20me%20potpora%20Zaga%C5%ADeba%C4%8Dke%20%C5%BEupanije%20za%20web%20stranicu",
  },
  disclaimer:
    'Natje\u010daj \u201ePotpore za po\u010detak poslovanja poduzetnika za 2026.\u201c \u2014 Zagreba\u010dka \u017eupanija. Provjerite uvjete u slu\u017ebenoj natje\u010dajnoj dokumentaciji. Volt nije konzultant za EU fondove \u2014 poma\u017eemo s tehni\u010dkim dijelom.',
} as const

export const WEBSITE_OFFER = {
  badge: "75% povrat od Županije",
  name: "Web stranica + EU potpora",
  originalPrice: "2.000",
  netPrice: "500",
  grantLabel: "€1.500 financira Zagrebačka županija",
  period: "jednokratno",
  features: [
    "5-straničan responzivni web",
    "Domena + hosting 1 godinu",
    "SEO postavljanje",
    "Google Business profil",
    "Kontakt forma",
    "QR vizitka",
  ],
  cta: {
    label: "Pitajte nas o potpori →",
    href: "https://wa.me/385953765343?text=Zanima%20me%20potpora%20Zaga%C5%ADeba%C4%8Dke%20%C5%BEupanije%20za%20web%20stranicu",
  },
  note: "Dostupno za mikro poduzetnike u Zagrebačkoj županiji registrirane do 2 god.",
} as const

export const FAQ = {
  label: "Česta pitanja",
  heading: "Imate pitanja? Mi imamo odgovore.",
  items: [
    {
      question: "Kako to funkcionira? Što ja moram raditi?",
      answer:
        "Gotovo ništa. Mi kreiramo sadržaj za tvoj obrt — objave za Instagram, Facebook, Google Business. Ti samo na WhatsAppu odobriš ili odbiješ. Jednim dodirom.",
    },
    {
      question: "Trebam li nešto instalirati ili otvarati račune?",
      answer:
        "Ne. Sve vodimo mi. Jedino nam trebaš dati pristup svojim profilima na mrežama (ili ih kreiramo za tebe). Komunikacija ide preko WhatsAppa.",
    },
    {
      question: "Mogu li dobiti EU sufinanciranje?",
      answer:
        "Moguće — Hrvatska je kroz NPOO program dosad nudila digitalne vaučere koji su pokrivali do 90% troškova digitalizacije za mikro, mala i srednja poduzeća. Aktivno pratimo sve nove natječaje i obavještavamo vas čim se otvore. Kontaktirajte nas za aktualne informacije.",
    },
    {
      question: "Što ako nisam zadovoljan sadržajem?",
      answer:
        "Svaku objavu odobriš prije objavljivanja. Ako ti se ne sviđa — odbiješ i mi napravimo novu verziju. Bez dodatnih troškova.",
    },
    {
      question: "Mogu li otkazati bilo kad?",
      answer:
        "Da. Nema ugovora o vezanju. Otkaži na kraju bilo kojeg mjeseca. Ako nisi zadovoljan nakon prvog mjeseca, vraćamo novac.",
    },
    {
      question: "Koliko košta i što je sve uključeno?",
      answer:
        "Starter je €149/mj (8 objava + Google Business). Standard je €299/mj (16 objava + web stranica). Premium je €499/mj (30 objava + Stories + Google Ads + prioritetna podrška). Setup fee je €199 jednokratno (besplatno za Premium). Bez skrivenih troškova.",
    },
  ],
} as const

export const CTA_SECTION = {
  heading: "Tvoj obrt zaslužuje digitalnu prisutnost",
  subheading:
    "Piši nam na WhatsApp i dogovorimo besplatnu konzultaciju. Bez obveza.",
  cta: {
    primary: { label: "Piši na WhatsApp →", href: "https://wa.me/385953765343" },
    whatsapp: { label: "Piši na WhatsApp", href: "https://wa.me/385953765343" },
  },
  trust: "Fiksne cijene. Bez ugovora. 133.640 obrtnika u Hrvatskoj — svaki zaslužuje biti vidljiv online.",
} as const

export const FOOTER = {
  description:
    "Volt je agencija za digitalnu prisutnost obrtnika i malih poduzetnika u Hrvatskoj. Web, sadržaj, društvene mreže — sve vodimo mi.",
  columns: {
    navigation: {
      title: "Navigacija",
      links: [
        { label: "Početna", href: "/" },
        { label: "O nama", href: "/o-nama" },
        { label: "Usluge", href: "/usluge" },
        { label: "Cijene", href: "/cijene" },
        { label: "Projekti", href: "/projekti" },
        { label: "Blog", href: "/blog" },
        { label: "Kontakt", href: "/kontakt" },
      ],
    },
    services: {
      title: "Usluge",
      links: [
        { label: "Društvene mreže", href: "/usluge" },
        { label: "Web stranice", href: "/usluge" },
        { label: "Google Business", href: "/usluge" },
        { label: "SEO optimizacija", href: "/usluge" },
        { label: "Google Ads", href: "/usluge" },
      ],
    },
    contact: {
      title: "Kontakt",
    },
  },
  legal: {
    privacy: { label: "Pravila privatnosti", href: "/privatnost" },
    terms: { label: "Uvjeti korištenja", href: "/uvjeti" },
  },
} as const

// ---------------------------------------------------------------------------
// /O-NAMA PAGE
// ---------------------------------------------------------------------------

export const ABOUT_PAGE = {
  hero: {
    label: "O nama",
    heading: "Jedna osoba. Jedan cilj. Profesionalne web stranice za svakoga.",
  },
  story: {
    label: "Naša priča",
    heading: "Zašto Volt?",
    imageAlt: "Razvoj web stranice",
    paragraphs: [
      "Volt je nastao iz frustracije. Gledao sam kako obrtnici u mojoj okolici — automehaničari, frizeri, vodoinstalateri, pekari — rade vrhunski posao, ali nemaju nikakvu web prisutnost. Ili imaju stranicu iz 2014. koja se ne otvara na mobitelu.",
      "Istovremeno, agencije im nude pakete od €3.000+ i rokove od 2–3 mjeseca. Za obrtnika koji zarađuje poštekim radom, to nije opcija.",
      "Volt rješava taj problem. Vodimo kompletnu digitalnu prisutnost — web stranicu, društvene mreže, Google Business — sve za fiksnu mjesečnu cijenu. Ti samo odobriš sadržaj na WhatsAppu i fokusiraš se na svoj posao.",
    ],
  },
  values: {
    label: "Vrijednosti",
    heading: "Vrijednosti",
    items: [
      {
        title: "Brzina",
        description:
          "7 dana od konzultacije do gotove stranice. Ako zakasnimo — 10% popusta po danu kašnjenja.",
      },
      {
        title: "Transparentnost",
        description:
          "Fiksna cijena koju znate unaprijed. Nema ponuda na upit, nema varijabilnih stavki, nema sitnog tiska.",
      },
      {
        title: "Kvaliteta",
        description:
          "Svaka stranica je ručno kodirana, mobilno prilagođena i optimizirana za brzinu. Google Lighthouse 90+.",
      },
      {
        title: "Rezultati iznad obećanja",
        description:
          "Ne prodajem piksele — prodajem web stranicu koja privlači kupce. Ako ne donosi rezultate, nešto ćemo promijeniti.",
      },
    ],
  },
  process: {
    label: "Kako radimo",
    heading: "Kako radimo",
    steps: [
      {
        day: "Dan 0",
        title: "Besplatna konzultacija",
        description:
          "Poziv od 30 min. Razgovaramo o vašem poslu, ciljevima i očekivanjima. Nakon poziva šaljem ponudu s fiksnom cijenom.",
      },
      {
        day: "Dan 1–2",
        title: "Dizajn i koncept",
        description:
          "Kreiram vizualni koncept prilagođen vašem brandu. Šaljem mockup na odobrenje — ne nastavljam dok niste zadovoljni.",
      },
      {
        day: "Dan 3–5",
        title: "Razvoj",
        description:
          "Kodiram stranicu od nule. Brza, sigurna, SEO-optimizirana. Svaki dan šaljem update s linkom na preview verziju.",
      },
      {
        day: "Dan 6",
        title: "Revizija i sadržaj",
        description:
          "Vi pregledate stranicu i dajete komentare. Ja unosim finalne promjene, optimiziram slike i testiram brzinu.",
      },
      {
        day: "Dan 7",
        title: "Lansiranje",
        description:
          "Povezujem domenu, postavljam SSL i analitiku, prijavljujem stranicu Googleu. Dobivate obuku za ažuriranje sadržaja.",
      },
    ],
  },
} as const

// ---------------------------------------------------------------------------
// /USLUGE PAGE
// ---------------------------------------------------------------------------

export const SERVICES_PAGE = {
  hero: {
    label: "Usluge",
    heading: "Sve što vam treba za digitalnu prisutnost.",
    subheading:
      "Od društvenih mreža do web stranice i Google Ads-a — pokrivamo sve. Vi radite svoj posao, mi brinemo o ostatku.",
  },
  services: [
    {
      slug: "drustvene-mreze",
      title: "Upravljanje društvenim mrežama",
      headline: "Profesionalan sadržaj, bez tvog vremena.",
      description:
        "Kreiramo i objavljujemo sadržaj za Instagram i Facebook prilagođen tvom obrtu. Svaku objavu odobriš jednim dodirom na WhatsAppu. Mi pišemo, dizajniramo i objavljujemo — ti samo kažeš da ili ne.",
      features: [
        "8–30 objava mjesečno (ovisno o planu)",
        "Profesionalni tekstovi na hrvatskom",
        "Hashtagovi i CTA prilagođeni branši",
        "WhatsApp odobrenje prije objave",
      ],
    },
    {
      slug: "web-stranica",
      title: "Web stranica",
      headline: "Profesionalna stranica u 7 dana.",
      description:
        "Kodiram ručno u Next.js — bez WordPressa, bez sporih tema, bez pluginova koji usporavaju stranicu. Rezultat: stranica koja se učitava za manje od sekunde i koja je optimizirana za pretraživače od prvog dana. Uključeno u Standard i Premium plan.",
      features: [
        "Next.js 16 — najbrži React framework",
        "Lighthouse score 90+ garantiran",
        "Mobilno prilagođen dizajn",
        "SSL certifikat i hosting uključen",
      ],
    },
    {
      slug: "google-business",
      title: "Google Business upravljanje",
      headline: "Neka te klijenti nađu na Googleu.",
      description:
        "Postavljamo i ažuriramo tvoj Google Business profil, odgovaramo na recenzije, objavljujemo tjedne novosti i uploadamo fotografije tvojih radova. Tvoji klijenti te nalaze kad pretražuju Google Maps.",
      features: [
        "Tjedne objave na Google Businessu",
        "Odgovaranje na sve recenzije",
        "Ažuriranje radnog vremena i usluga",
        "Praćenje pozicije na Google Mapama",
      ],
    },
    {
      slug: "seo",
      title: "SEO optimizacija",
      headline: "Nađite se na prvoj stranici Googlea.",
      description:
        "Svaka stranica koju radim dolazi s ugrađenom SEO optimizacijom — od strukturiranih podataka i meta tagova do brzine učitavanja i mobilne prilagodbe.",
      features: [
        "Tehnički SEO — brzina, sitemap, robots.txt",
        "Schema.org strukturirani podaci",
        "Meta tagovi i OG slike za dijeljenje",
        "Google Search Console postavljanje",
      ],
    },
    {
      slug: "google-ads",
      title: "Google Ads upravljanje",
      headline: "Mi vodimo oglase. Vi dižete telefon.",
      description:
        "Postavljamo i optimiziramo Google Ads kampanje za lokalne usluge. Fokus na pozive i upite, ne na klikove. Mjesečni izvještaj s brojem leadova. Dostupno kao dodatak uz bilo koji plan.",
      features: [
        "Kampanje za lokalnu uslugu",
        "Tjedna optimizacija ključnih riječi",
        "A/B testiranje oglasa",
        "Mjesečni izvještaj s brojem poziva",
      ],
    },
  ],
} as const

// ---------------------------------------------------------------------------
// /KONTAKT PAGE
// ---------------------------------------------------------------------------

export const CONTACT_PAGE = {
  hero: {
    label: "Kontakt",
    heading: "Javite nam se. Odgovaramo brzo.",
    subheading:
      "Popunite formu ili nas kontaktirajte direktno putem WhatsAppa. Besplatna konzultacija, bez obveza.",
  },
  form: {
    fields: {
      name: { label: "Ime i prezime", placeholder: "Vaše ime" },
      email: { label: "Email", placeholder: "vas@email.com" },
      phone: { label: "Telefon (opcionalno)", placeholder: "+385 ..." },
      service: {
        label: "Što vas zanima?",
        options: [
          "Upravljanje društvenim mrežama",
          "Web stranica + mreže (Standard plan)",
          "Kompletno upravljanje (Premium plan)",
          "Google Ads",
          "Samo web stranica",
          "Nešto drugo",
        ],
      },
      message: {
        label: "Poruka",
        placeholder: "Opišite ukratko što trebate...",
      },
      budget: {
        label: "Okvirni budžet",
        options: [
          "Do €200/mj",
          "€200 – €350/mj",
          "€350 – €500/mj",
          "Više od €500/mj",
          "Ne znam još",
        ],
      },
    },
    submit: "Pošalji upit",
    success:
      "Hvala na upitu! Javimo se unutar 2 sata radnim danom. Ako je hitno — pišite nam na WhatsApp.",
    error:
      "Nešto je pošlo po krivu. Pokušajte ponovno ili nas kontaktirajte direktno.",
  },
  alternatives: {
    whatsapp: {
      label: "WhatsApp",
      description: "Najbrži način za kontakt. Odgovaramo odmah.",
    },
    email: {
      label: "Email",
      description: "Za detaljnije upite. Odgovaramo unutar 2h.",
    },
    call: {
      label: "Poziv",
      description: "Radnim danom 9–17h. Vikendima po dogovoru.",
    },
  },
} as const

// ---------------------------------------------------------------------------
// /PROJEKTI PAGE
// ---------------------------------------------------------------------------

export const PROJECTS_PAGE = {
  hero: {
    label: "Projekti",
    heading: "Stranice koje donose rezultate.",
    subheading:
      "Svaki projekt je jedinstven — prilagođen poslu, publici i ciljevima klijenta.",
  },
  categories: ["Svi", "Web stranice", "Web shopovi", "Landing stranice", "Redizajn"],
  emptyState: {
    heading: "Portfolio se gradi.",
    body: "Upravo radimo na prvim projektima. U međuvremenu, pogledajte naše cijene ili nas kontaktirajte za besplatnu konzultaciju.",
    cta: { label: "Pogledaj cijene", href: "/cijene" },
  },
} as const

// ---------------------------------------------------------------------------
// /PRIVATNOST PAGE
// ---------------------------------------------------------------------------

export const PRIVACY_PAGE = {
  hero: {
    label: "Pravila privatnosti",
    heading: "Pravila privatnosti",
  },
  lastUpdated: "1. ožujka 2026.",
  sections: [
    {
      title: "Voditelj obrade podataka",
      content: "Volt, Kolodvorska 21, 10340 Vrbovec, Hrvatska. Email: info@volt.hr. Telefon: +385 95 3765 343.",
    },
    {
      title: "Koje podatke prikupljamo",
      content: "Prikupljamo samo podatke koje nam dobrovoljno dostavite putem kontakt forme: ime i prezime, email adresa, telefonski broj (opcionalno) i sadržaj poruke. Za klijente s aktivnim planom, obrađujemo i podatke potrebne za pružanje usluge (pristup društvenim mrežama, Google Business profilu).",
    },
    {
      title: "Kolačići",
      content: "Koristimo jedan funkcionalni kolačić (volt_consent) koji bilježi vašu suglasnost za kolačiće. Ako prihvatite sve kolačiće, aktiviramo Google Analytics 4 (GA4) za anonimiziranu analitiku posjeta. GA4 se učitava samo nakon vaše izričite suglasnosti.",
    },
    {
      title: "Svrha obrade",
      content: "Vaše podatke koristimo isključivo za odgovaranje na vaš upit, pripremu ponude i pružanje ugovorenih usluga. Podatke ne prosljeđujemo trećim stranama, osim pružatelju email usluge (Resend) koji obrađuje slanje emailova u naše ime.",
    },
    {
      title: "Pohrana podataka",
      content: "Podatke iz kontakt forme pohranjujemo najdulje 12 mjeseci od primitka upita. Podatke klijenata s aktivnim planom čuvamo za vrijeme trajanja usluge i 6 mjeseci nakon prekida. Analitički podaci u GA4 anonimiziraju se i pohranjuju prema Googleovim pravilima zadržavanja podataka.",
    },
    {
      title: "Vaša prava",
      content: "Sukladno Općoj uredbi o zaštiti podataka (GDPR), imate pravo na: pristup vašim osobnim podacima, ispravak netočnih podataka, brisanje podataka (\"pravo na zaborav\"), ograničenje obrade, prenosivost podataka i prigovor na obradu. Za ostvarivanje bilo kojeg prava, kontaktirajte nas na info@volt.hr.",
    },
    {
      title: "Sigurnost podataka",
      content: "Koristimo SSL enkripciju na cijeloj web stranici. Podaci iz kontakt forme šalju se putem sigurne HTTPS veze. Pristup podacima ograničen je isključivo na ovlaštene osobe.",
    },
    {
      title: "Promjene pravila",
      content: "Zadržavamo pravo izmjene ovih pravila privatnosti. Svaka izmjena bit će objavljena na ovoj stranici s ažuriranim datumom.",
    },
  ],
} as const

// ---------------------------------------------------------------------------
// /UVJETI PAGE
// ---------------------------------------------------------------------------

export const TERMS_PAGE = {
  hero: {
    label: "Uvjeti korištenja",
    heading: "Uvjeti korištenja",
  },
  lastUpdated: "1. ožujka 2026.",
  sections: [
    {
      title: "Opći uvjeti",
      content: "Korištenjem web stranice volt.hr (u daljnjem tekstu: \"Stranica\") prihvaćate ove uvjete korištenja. Stranica je u vlasništvu Volt, Kolodvorska 21, 10340 Vrbovec, Hrvatska.",
    },
    {
      title: "Usluge",
      content: "Volt pruža usluge upravljanja digitalnom prisutnošću, izrade web stranica, upravljanja društvenim mrežama, Google Business profila i srodnih digitalnih usluga. Sve cijene navedene na Stranici su u eurima (EUR) bez PDV-a, osim ako nije drugačije naznačeno.",
    },
    {
      title: "Intelektualno vlasništvo",
      content: "Sav sadržaj na Stranici — uključujući tekstove, grafiku, logotipe, ikone, slike i programski kod — vlasništvo je Volt ili se koristi uz dopuštenje vlasnika. Zabranjena je reprodukcija, distribucija ili javno prikazivanje sadržaja bez prethodne pisane suglasnosti.",
    },
    {
      title: "Isporuka projekata",
      content: "Nakon završetka projekta i potpune uplate, klijent dobiva puna prava korištenja isporučene web stranice. Volt zadržava pravo prikazivanja projekta u svom portfoliju, osim ako se drugačije pisano dogovori.",
    },
    {
      title: "Ograničenje odgovornosti",
      content: "Volt ne odgovara za neizravne, posljedične ili posebne štete proizašle iz korištenja Stranice ili naših usluga. Naša ukupna odgovornost ograničena je na iznos koji je klijent platio za konkretnu uslugu. Ne garantiramo specifične rezultate u pogledu rangiranja na tražilicama ili poslovnih rezultata.",
    },
    {
      title: "Otkazivanje i povrat",
      content: "Klijent može otkazati mjesečni plan u bilo kojem trenutku bez ugovora o vezanju. Jednokratni setup fee se ne vraća nakon početka rada. Ako klijent nije zadovoljan nakon prvog mjeseca, vraćamo mjesečnu naknadu u cijelosti.",
    },
    {
      title: "Privatnost",
      content: "Obrada osobnih podataka regulirana je našim Pravilima privatnosti dostupnima na /privatnost.",
    },
    {
      title: "Mjerodavno pravo",
      content: "Na ove uvjete primjenjuje se pravo Republike Hrvatske. Za sve sporove nadležan je stvarno nadležni sud u Zagrebu.",
    },
    {
      title: "Promjene uvjeta",
      content: "Zadržavamo pravo izmjene ovih uvjeta korištenja. Nastavak korištenja Stranice nakon objave izmjena smatra se prihvaćanjem novih uvjeta.",
    },
  ],
} as const

// ---------------------------------------------------------------------------
// /BLOG PAGE
// ---------------------------------------------------------------------------

export const BLOG_PAGE = {
  hero: {
    label: "Blog",
    heading: "Savjeti za obrtnike i poduzetnike.",
    subheading: "Praktični članci o web dizajnu, SEO-u, EU potporama i digitalnom rastu.",
  },
  emptyState: {
    heading: "Blog se priprema.",
    body: "Uskoro objavljujemo prve članke o web dizajnu, SEO-u i EU digitalnim vaučerima. U međuvremenu, javite nam se za besplatnu konzultaciju.",
    cta: { label: "Piši na WhatsApp", href: "https://wa.me/385953765343" },
  },
  readMore: "Čitaj više →",
  publishedLabel: "Objavljeno",
  backLabel: "← Natrag na blog",
  featuredLabel: "Istaknuto",
  recentLabel: "Najnoviji članci",
  ctaHeading: "Ne propusti korisne savjete",
  ctaBody: "Pratite nas za praktične članke o web dizajnu, SEO-u i EU potporama za obrtnike.",
  ctaCta: { label: "Piši na WhatsApp", href: "https://wa.me/385953765343" },
} as const

// ---------------------------------------------------------------------------
// AI CONTENT GENERATOR (Internal tooling — admin panel only)
// ---------------------------------------------------------------------------

export const AI_CONTENT = {
  dashboard: {
    heading: "AI Content Generator",
    subheading: "Generiraj gotove objave za klijente u sekundi.",
    inputPlaceholder: "Opiši današnju ponudu, akciju ili događaj u 1–3 rečenice (npr. 'Danas akcija na muške šišanja -20%, dođite do 18h!')",
    generateButton: "Generiraj Volt postove",
    generatingText: "Generiranje u tijeku...",
    copySuccess: "Kopirano!",
    copyButton: "Kopiraj",
    imagePromptLabel: "Za Midjourney / DALL-E / Flux",
    historyHeading: "Povijest generiranja",
    historyEmpty: "Još nema generiranja. Započni iznad!",
    limitReached: "Dosegnut limit generiranja.",
    upgradeCta: "Nadogradi plan",
    counterLabel: "generiranja ovaj mjesec",
    platforms: {
      instagram: "Instagram",
      facebook: "Facebook",
    },
    industryLabel: "Branša",
    industryPlaceholder: "Odaberi branšu...",
    industryClear: "Bez filtera",
    modeLabel: "Način",
    modeSingle: "Pojedinačni postovi",
    modeCalendar: "Tjedni kalendar",
    modeReviewReply: "Odgovor na recenziju",
    modeListing: "Opis smjestaja",
    modeDailySpecial: "Dnevni meni / specijal",
    modeWhatsapp: "WhatsApp predlosci",
    modeEmail: "Email predlosci",
    modeBio: "Bio / Profil",
    calendarHeading: "Tjedni kalendar sadržaja",
    calendarDayLabel: "Dan",
    calendarThemeLabel: "Tema",
    reviewReplyHeading: "Odgovori na recenziju",
    reviewReplyInputPlaceholder: "Zalijepi recenziju gosta ovdje...",
    reviewReplyToneProfessional: "Profesionalan",
    reviewReplyToneFriendly: "Prijateljski",
    reviewReplyToneApologetic: "Empatican",
    listingHeading: "Opisi smjestaja",
    listingAirbnb: "Airbnb",
    listingBooking: "Booking.com",
    listingNjuskalo: "Njuskalo",
    listingHighlights: "Kljucne prednosti",
    dailySpecialHeading: "Dnevni specijal",
    whatsappHeading: "WhatsApp predlosci",
    whatsappCopyLabel: "Kopiraj poruku",
    emailHeading: "Email predlosci",
    emailSubjectLabel: "Predmet",
    emailCopyLabel: "Kopiraj email",
    bioHeading: "Bio / Profil opisi",
    bioCopyLabel: "Kopiraj bio",
    storiesHeading: "Instagram Stories",
    promoEmailHeading: "Promo email",
    promoEmailSubjectLabel: "Predmet",
    promoEmailCopyLabel: "Kopiraj email",
    industries: {
      ciscenje: "Čišćenje",
      frizerski_salon: "Frizerski salon",
      automehanicar: "Auto mehaničar",
      pekara: "Pekara",
      vodoinstalater: "Vodoinstalater",
      elektricar: "Električar",
      fitness_trener: "Fitness trener",
      fotograf: "Fotograf",
      ostalo: "Ostalo",
      kafic: "Kafic",
      restoran: "Restoran",
      hotel: "Hotel / Hostel",
      villa_apartman: "Villa / Apartman",
    },
  },
  brandVoice: {
    heading: "Stil komunikacije",
    description: "Odaberi kako zvuči tvoj sadržaj. Jednom postavi — vrijedi za svako generiranje.",
    saved: "Spremljeno!",
    noPreference: "Bez preferencije",
    presets: {
      casual: {
        label: "Opušten i prijateljski",
        description: "Ti-forma, emojiji, opušteno — kao da pišeš prijatelju",
      },
      professional: {
        label: "Profesionalan i stručan",
        description: "Vi-forma, manje emojija, naglasak na činjenice i stručnost",
      },
      warm: {
        label: "Topao i osoban",
        description: "Kao da domaćin osobno piše — priče, detalji, autentičnost",
      },
      energetic: {
        label: "Energičan i prodajan",
        description: "Hitnost, akcije, CTA-ovi — kratke udaračke rečenice",
      },
    },
  },
  seasons: {
    ljeto: "Ljeto",
    advent: "Advent",
    uskrs: "Uskrs",
    valentinovo: "Valentinovo",
    none: "Bez teme",
  },
} as const

// ---------------------------------------------------------------------------
// SEO — Meta tags per page
// ---------------------------------------------------------------------------

export const SEO = {
  home: {
    title: "Volt — Agencija za digitalnu prisutnost obrtnika | Web, mreže, Google Business",
    description:
      "Agencija za obrtnike u Hrvatskoj. Vodimo web stranicu, Instagram, Facebook, Google Business — sve za fiksnu mjesečnu cijenu. Ti odobriš na WhatsAppu, mi objavimo.",
    keywords: [
      "agencija za obrtnike",
      "upravljanje društvenim mrežama",
      "digitalna prisutnost obrtnici",
      "web stranice za obrtnike",
      "google business upravljanje",
      "volt agencija",
      "social media za obrtnike hrvatska",
    ],
  },
  about: {
    title: "O nama — Volt agencija za digitalnu prisutnost obrtnika",
    description:
      "Volt vodi kompletnu digitalnu prisutnost za obrtnike u Hrvatskoj. Web stranica u 7 dana, upravljanje mrežama i Google Business — sve za fiksnu cijenu.",
  },
  services: {
    title: "Usluge — Društvene mreže, web, Google Business, SEO | Volt",
    description:
      "Upravljanje društvenim mrežama, izrada web stranica, Google Business, SEO optimizacija i Google Ads za obrtnike. Fiksne mjesečne cijene.",
  },
  projects: {
    title: "Projekti — Portfolio | Volt",
    description:
      "Pogledajte kako Volt pomaže obrtnicima da izgrade digitalnu prisutnost — web stranice i upravljanje društvenim mrežama.",
  },
  pricing: {
    title: "Cijene — Starter €149/mj, Standard €299/mj, Premium €499/mj | Volt",
    description:
      "Fiksne mjesečne cijene za upravljanje digitalnom prisutnošću. Starter €149/mj, Standard €299/mj (web uključen), Premium €499/mj. Bez ugovora, otkaži bilo kad.",
  },
  contact: {
    title: "Kontakt — Besplatna konzultacija | Volt",
    description:
      "Kontaktirajte Volt za besplatnu konzultaciju. Odgovaramo unutar 2 sata. WhatsApp, email ili poziv — kako vam odgovara.",
  },
  blog: {
    title: "Blog — Digitalni marketing za obrtnike | Volt",
    description:
      "Savjeti o digitalnoj prisutnosti, društvenim mrežama, EU potporama i SEO-u za obrtnike i male poduzetnike u Hrvatskoj.",
  },
  privacy: {
    title: "Pravila privatnosti | Volt",
    description:
      "Pravila privatnosti Volt agencije. Saznajte kako prikupljamo, koristimo i štitimo vaše osobne podatke u skladu s GDPR-om.",
  },
  terms: {
    title: "Uvjeti korištenja | Volt",
    description:
      "Uvjeti korištenja web stranice volt.hr. Informacije o uslugama, intelektualnom vlasništvu i mjerodavnom pravu.",
  },
} as const

// ---------------------------------------------------------------------------
// JSON-LD STRUCTURED DATA
// ---------------------------------------------------------------------------

export const SCHEMA_ORG = {
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://volt.hr/#business",
    name: "Volt",
    description:
      "Agencija za digitalnu prisutnost obrtnika — web stranice, upravljanje društvenim mrežama, Google Business i SEO za obrtnike u Hrvatskoj.",
    url: "https://volt.hr",
    image: "https://volt.hr/images/og-default.png",
    telephone: "+385953765343",
    email: "info@volt.hr",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kolodvorska 21",
      addressLocality: "Vrbovec",
      postalCode: "10340",
      addressRegion: "Zagrebačka županija",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.8727,
      longitude: 16.4219,
    },
    hasMap: "https://maps.google.com/?q=Volt+Web+Studio+Vrbovec",
    areaServed: [
      { "@type": "City", name: "Vrbovec" },
      { "@type": "AdministrativeArea", name: "Zagrebačka županija" },
      { "@type": "Country", name: "Hrvatska" },
    ],
    priceRange: "€149 - €499/mj",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://instagram.com/volt.hr",
      "https://linkedin.com/company/volt-hr",
      "https://facebook.com/volt.hr",
    ],
  },
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Kako funkcionira Volt? Što ja moram raditi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gotovo ništa. Mi kreiramo sadržaj za tvoj obrt. Ti samo na WhatsAppu odobriš ili odbiješ jednim dodirom.",
        },
      },
      {
        "@type": "Question",
        name: "Trebam li nešto instalirati?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ne. Sve vodimo mi. Komunikacija ide preko WhatsAppa. Nema dashboarda ni aplikacija za učiti.",
        },
      },
      {
        "@type": "Question",
        name: "Mogu li dobiti EU sufinanciranje?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da — digitalni vaučeri iz NPOO programa pokrivaju 60–90% troškova digitalizacije za mikro, mala i srednja poduzeća.",
        },
      },
      {
        "@type": "Question",
        name: "Mogu li otkazati bilo kad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da. Nema ugovora o vezanju. Otkaži na kraju bilo kojeg mjeseca.",
        },
      },
      {
        "@type": "Question",
        name: "Koliko košta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Starter €149/mj (8 objava + Google Business). Standard €299/mj (16 objava + web). Premium €499/mj (30 objava + Google Ads). Setup fee €199 jednokratno (besplatno za Premium).",
        },
      },
    ],
  },
  pricingPage: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Upravljanje digitalnom prisutnošću — cijene i planovi",
    url: "https://volt.hr/cijene",
    description: "Fiksne mjesečne cijene za upravljanje digitalnom prisutnošću. Starter €149/mj, Standard €299/mj, Premium €499/mj.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Offer",
            name: "Starter plan",
            price: "149",
            priceCurrency: "EUR",
            description: "8 IG/FB objava mjesečno, Google Business setup, odgovaranje na recenzije, mjesečni izvještaj",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Offer",
            name: "Standard plan",
            price: "299",
            priceCurrency: "EUR",
            description: "16 IG/FB objava mjesečno, web stranica uključena, Google Business tjedne objave, tjedni izvještaj",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Offer",
            name: "Premium plan",
            price: "499",
            priceCurrency: "EUR",
            description: "30 IG/FB objava + Stories, Google Business + Google Ads, web + mjesečna ažuriranja, prioritetna podrška",
          },
        },
      ],
    },
  },
} as const

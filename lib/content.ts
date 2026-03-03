// =============================================================================
// VOLT WEB STUDIO — Complete Site Content (Croatian)
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
  fullName: "Volt Web Studio",
  tagline: "Web koji zarađuje.",
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
  copyright: `© ${new Date().getFullYear()} Volt Web Studio. Sva prava pridržana.`,
} as const

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------

export const NAV = {
  links: [
    { label: "Početna", href: "/" },
    { label: "O nama", href: "/o-nama" },
    { label: "Usluge", href: "/usluge" },
    { label: "Projekti", href: "/projekti" },
    { label: "Cijene", href: "/cijene" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  cta: {
    label: "Započni projekt",
    href: "/kontakt",
  },
} as const

// ---------------------------------------------------------------------------
// HOMEPAGE
// ---------------------------------------------------------------------------

export const HERO = {
  label: "Web studio iz Vrbovca",
  heading: "Izrada web stranica za obrtnike i poduzetnike",
  descriptor:
    "Od dizajna do lansiranja — profesionalna web stranica za vaš obrt u 7 dana.",
  cta: {
    primary: { label: "Besplatna konzultacija", href: "https://wa.me/385953765343" },
    secondary: { label: "Pogledaj cijene", href: "/cijene" },
  },
  trust: "Potpuno transparentno. Od €399.",
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
  heading: "Web studio koji razumije male poduzetnike.",
  body: "Znamo kako izgleda kad trčite između narudžbi, računa i dostava — a web stranica je zadnja stvar na koju mislite. Zato smo napravili proces koji ne traži vaše vrijeme. Vi se javite, mi napravimo sve ostalo. Za 7 dana imate stranicu koja privlači kupce, a ne samo sjedi na internetu.",
  vision: {
    label: "Naša vizija",
    text: "Svaki obrtnik u Hrvatskoj zaslužuje web prisutnost jednako profesionalnu kao i posao koji obavlja. Ne trebate tisuće eura ni mjesece čekanja da to dobijete.",
  },
  mission: {
    label: "Naša misija",
    text: "Omogućiti svakom obrtniku profesionalnu web stranicu — brzo, pošteno, bez kompromisa na kvaliteti. Koristimo moderne alate i AI da ubrzamo proces, a ljudsku ruku da dotjeramo svaki detalj.",
  },
} as const

export const SERVICES = {
  label: "Što radimo",
  heading: "Od ideje do web stranice koja zarađuje.",
  subheading:
    "Četiri koraka. Sedam dana. Nula stresa.",
  items: [
    {
      number: "01",
      title: "Konzultacija",
      description:
        "Besplatni poziv od 30 minuta. Razgovaramo o vašem poslu, ciljevima i željama. Vi pričate, mi slušamo i predlažemo.",
      icon: "phone", // Lucide icon name
    },
    {
      number: "02",
      title: "Dizajn",
      description:
        "Kreiramo vizualni identitet koji odgovara vašem poslu. Moderno, čisto, profesionalno — bez generičnih predložaka.",
      icon: "palette",
    },
    {
      number: "03",
      title: "Razvoj",
      description:
        "Kodiramo stranicu od nule. Brza, mobilno prilagođena, optimizirana za Google. Bez WordPressa i sporih tema.",
      icon: "code",
    },
    {
      number: "04",
      title: "Lansiranje",
      description:
        "Postavljamo domenu, SSL, analitiku i predajemo vam ključeve. Plus — obučimo vas da sami možete ažurirati sadržaj.",
      icon: "rocket",
    },
  ],
} as const

// Services accordion for redesigned homepage
export const SERVICES_ACCORDION = {
  label: "Usluge",
  items: [
    {
      title: "Web dizajn",
      description:
        "Kreiramo vizualni identitet koji odgovara vašem poslu. Moderno, čisto, profesionalno — bez generičnih predložaka.",
    },
    {
      title: "Branding",
      description:
        "Cjelovit vizualni identitet — od logotipa do boja i tipografije. Sve usklađeno s vašom web stranicom.",
    },
    {
      title: "SEO optimizacija",
      description:
        "Strukturirani podaci, brzina učitavanja, meta tagovi — sve što Google traži da vas klijenti pronađu.",
    },
    {
      title: "E-commerce",
      description:
        "Potpuni web shop s košaricom, sigurnim plaćanjem i upravljanjem proizvodima. Vi dodajete proizvode, kupci plaćaju.",
    },
  ],
} as const

// Why Us section — 3 value cards
export const WHY_US = {
  label: "Zašto Volt",
  items: [
    {
      title: "Brza isporuka",
      body: "Gotova web stranica u 7 dana. Ako zakasnimo — 10% popusta po danu kašnjenja. Bez izgovora.",
    },
    {
      title: "Fiksna cijena",
      body: "Znate točno koliko plaćate prije nego što krenemo. Nema ponuda na upit, nema varijabilnih stavki.",
    },
    {
      title: "Rezultati koji prodaju",
      body: "Ne prodajemo piksele — gradimo web stranice koje privlače kupce i pretvaraju posjetitelje u klijente.",
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
  "web dizajn",
  "razvoj",
  "SEO",
  "automatizacija",
  "branding",
  "web shopovi",
  "landing stranice",
  "održavanje",
  "konzultacije",
  "brzina",
] as const

export const PORTFOLIO = {
  label: "Naši projekti",
  heading: "Svaki projekt ima svoju priču.",
  subheading: "Pogledajte kako pomažemo obrtnicima da se istaknu na webu.",
  emptyState:
    "Upravo gradimo naš portfolio. U međuvremenu, pogledajte naše cijene ili nas kontaktirajte za besplatnu konzultaciju.",
  cta: { label: "Svi projekti", href: "/projekti" },
  comingSoon: "Uskoro",
  projects: [
    { name: "AutoServis Pro", category: "Web dizajn", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Salon Ljepote", category: "Branding", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "Pekara Sunce", category: "E-commerce", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "Stolarija Hrast", category: "Web dizajn", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { name: "Elektro Servis", category: "SEO", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { name: "Cvjećarnica Flora", category: "Web dizajn", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
  ],
} as const

export const STATS = {
  label: "Volt u brojevima",
  items: [
    {
      value: 7,
      suffix: "",
      label: "dana do gotove stranice",
    },
    {
      value: 100,
      suffix: "%",
      label: "transparentne cijene",
    },
    {
      value: 85,
      suffix: "%",
      label: "moguće sufinanciranje putem EU vaučera",
    },
    {
      value: 0,
      suffix: "",
      label: "skrivenih troškova",
      displayValue: "€0",
    },
  ],
} as const

export const TESTIMONIALS = {
  label: "Što kažu klijenti",
  heading: "Rezultati govore glasnije od obećanja.",
  // TODO: Replace with real client testimonials from Sanity
  items: [
    {
      quote:
        "Stranica se učitava za sekundu, a dizajn izgleda kao da smo platili pet puta više. Klijenti me sada pronalaze na Googleu — prije su dolazili samo preko preporuka.",
      client: "Ana Kovačević",
      role: "Vlasnica trgovine zdrave hrane",
      location: "Vrbovec",
    },
    {
      quote:
        "Otkad imam novu stranicu s online rezervacijama, popunjenost apartmana je skočila za 40%. Gosti kažu da im je booking jednostavan i brz.",
      client: "Marko Babić",
      role: "Vlasnik apartmana",
      location: "Dugo Selo",
    },
    {
      quote:
        "Naši gosti sada gledaju jelovnik i rezerviraju stol direktno s mobitela. Volt je sve napravio u tjedan dana — bez komplikacija.",
      client: "Ivana Tomić",
      role: "Vlasnica restorana",
      location: "Sveti Ivan Zelina",
    },
  ],
} as const

export const PRICING_PREVIEW = {
  label: "Cijene",
  heading: "Fiksne cijene. Bez iznenađenja.",
  subheading: "Znate točno koliko plaćate — prije nego što krenemo.",
  tiers: [
    {
      name: "Start",
      price: "399",
      period: "jednokratno",
      maintenance: "55",
      description: "Za obrtnike koji trebaju profesionalnu online prisutnost.",
      features: ["Do 3 stranice", "Mobilni dizajn", "Osnovna SEO optimizacija", "Kontakt forma"],
      popular: false,
    },
    {
      name: "Profesionalni",
      price: "699",
      period: "jednokratno",
      maintenance: "85",
      description: "Za poduzetnike koji žele rast i nove klijente.",
      features: [
        "Do 10 stranica",
        "Custom dizajn",
        "CMS sustav",
        "Napredni SEO",
        "Google Analytics",
        "WhatsApp integracija",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "1.299",
      period: "jednokratno",
      maintenance: "149",
      description: "Za tvrtke kojima web donosi stvarni prihod.",
      features: [
        "Neograničen broj stranica",
        "Web shop ili booking",
        "Višejezični sadržaj",
        "Blog sustav",
        "Premium SEO paket",
        "Mjesečno izvješće",
        "Prioritetna podrška",
      ],
      popular: false,
    },
  ],
  cta: { label: "Pogledaj sve detalje", href: "/cijene" },
  note: "Svi paketi uključuju: SSL certifikat, hosting, tehničku podršku. Cijene u EUR bez PDV-a.",
  popularBadge: "Najpopularniji",
  currency: "€",
  maintenanceLabel: "/mj",
} as const

export const PRICING_PAGE = {
  hero: {
    label: "Cijene",
    heading: "Transparentne cijene. Bez sitnog tiska.",
    subheading: "Znate točno koliko plaćate — prije nego što krenemo. Bez ponuda na upit, bez skrivenih troškova.",
    trustBadges: [
      { icon: "zap", text: "Gotovo za 7 dana" },
      { icon: "shield-check", text: "Fiksne cijene" },
      { icon: "file-x", text: "Bez ugovora o vezanju" },
    ],
  },
  tiers: [
    {
      name: "Start",
      price: "399",
      period: "jednokratno",
      maintenance: "55",
      description: "Za obrtnike koji trebaju profesionalnu online prisutnost.",
      features: [
        "Do 3 stranice (naslovnica, o nama, kontakt)",
        "Mobilno prilagođen dizajn",
        "Osnovna SEO optimizacija",
        "Kontakt forma s email obavijestima",
        "SSL certifikat uključen",
        "Google Maps integracija",
        "Povezivanje s društvenim mrežama",
        "Obuka za ažuriranje sadržaja",
      ],
      popular: false,
      whatsappMessage: "Bok! Zanima me Start paket (€399) za izradu web stranice. Možemo li dogovoriti besplatnu konzultaciju?",
    },
    {
      name: "Profesionalni",
      price: "699",
      period: "jednokratno",
      maintenance: "85",
      description: "Za poduzetnike koji žele rast i nove klijente.",
      features: [
        "Do 10 stranica",
        "Custom dizajn prilagođen vašem brandu",
        "CMS sustav za samostalno ažuriranje",
        "Napredna SEO optimizacija",
        "Google Analytics postavljanje",
        "WhatsApp integracija za brzi kontakt",
        "Blog sustav",
        "Schema.org strukturirani podaci",
        "Brzina učitavanja < 2 sekunde",
        "2 runde revizija dizajna",
      ],
      popular: true,
      whatsappMessage: "Bok! Zanima me Profesionalni paket (€699) za izradu web stranice. Možemo li dogovoriti besplatnu konzultaciju?",
    },
    {
      name: "Premium",
      price: "1.299",
      period: "jednokratno",
      maintenance: "149",
      description: "Za tvrtke kojima web donosi stvarni prihod.",
      features: [
        "Neograničen broj stranica",
        "Web shop ili booking sustav",
        "Višejezični sadržaj (HR + EN)",
        "Blog sustav s kategorijama",
        "Premium SEO paket s mjesečnim praćenjem",
        "Mjesečno izvješće o performansama",
        "Prioritetna podrška (odgovor unutar 4h)",
        "Stripe integracija za plaćanje",
        "Automatski emailovi za narudžbe",
        "A/B testiranje landing stranica",
        "Google Search Console postavljanje",
        "Prilagođene animacije i interakcije",
      ],
      popular: false,
      whatsappMessage: "Bok! Zanima me Premium paket (€1.299) za izradu web stranice. Možemo li dogovoriti besplatnu konzultaciju?",
    },
  ],
  allInclude: {
    heading: "Svi paketi uključuju",
    items: ["SSL certifikat", "Hosting prvi mjesec", "Tehničku podršku", "Mobilni dizajn", "Obuku za korištenje", "GDPR kolačići"],
  },
  guarantee: {
    heading: "Naše jamstvo",
    text: "Ako zakasnimo s isporukom, dobivate 10% popusta po danu kašnjenja. Bez izgovora.",
  },
  currency: "€",
  maintenanceLabel: "/mj",
  popularBadge: "Najpopularniji",
  ctaPrimary: "Piši na WhatsApp",
  ctaSecondary: "Pošalji upit",
  maintenanceNote: "održavanje (opcionalno)",
  note: "Sve cijene su u EUR bez PDV-a. Održavanje je opcionalno — bez ugovora o vezanju.",
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
        name: "Google Business upravljanje",
        price: "29",
        period: "/mj",
        description: "Vaš profil na Google Mapama — aktivan i optimiziran svaki tjedan.",
        note: null,
        features: [
          "Tjedne objave na Google Businessu",
          "Odgovaranje na recenzije",
          "Ažuriranje radnog vremena i usluga",
          "Upload novih fotografija radova",
          "Praćenje pozicije na Google Mapama",
        ],
        badge: null,
        whatsappMessage: "Bok! Zanima me Google Business upravljanje add-on za €29/mj. Možemo li dogovoriti poziv?",
      },
    ],
  },
} as const

export const EU_GRANT = {
  label: "EU Potpore",
  heading: "Do 85% troška pokriveno EU vaučerima.",
  body: "Hrvatska poduzeća mogu iskoristiti digitalne vaučere iz Nacionalnog plana oporavka i otpornosti (NPOO) za sufinanciranje izrade web stranica, web shopova i digitalnih alata. Mi vam pomažemo s kompletnom prijavom.",
  highlights: [
    {
      title: "Vaučer za digitalni marketing",
      description: "Do €2.500 za izradu web stranice, landing stranice i SEO optimizaciju.",
      intensity: "90%",
    },
    {
      title: "Vaučer za složena digitalna rješenja",
      description: "Do €19.900 za web aplikacije, automatizaciju i napredne sustave.",
      intensity: "60–90%",
    },
    {
      title: "Novi poziv — Q2 2026",
      description:
        "Alokacija od 3,9 mil. EUR za mikro, male i srednje poduzetnike. Pratimo najave i obavještavamo vas čim se otvori.",
      intensity: "TBD",
    },
  ],
  cta: {
    label: "Saznaj više o vaučerima",
    href: "/kontakt",
  },
  disclaimer:
    "Informacije o EU potporama su indikativne i podložne promjenama. Konačni uvjeti ovise o službenoj natječajnoj dokumentaciji. Volt nije konzultantska agencija za EU fondove — pomažemo s tehničkim dijelom prijave.",
} as const

export const FAQ = {
  label: "Česta pitanja",
  heading: "Imate pitanja? Mi imamo odgovore.",
  items: [
    {
      question: "Koliko dugo traje izrada web stranice?",
      answer:
        "Standardni rok je 7 radnih dana od početka rada. Složeniji projekti (web shopovi, višejezične stranice) mogu trajati 10–14 dana. Točan rok dogovaramo na konzultaciji.",
    },
    {
      question: "Što ako nisam zadovoljan dizajnom?",
      answer:
        "Svaki paket uključuje do 2 runde revizija dizajna. Prije nego što krenemo s razvojem, odobravate vizualni koncept. Ne gradimo ništa dok niste zadovoljni.",
    },
    {
      question: "Trebam li plaćati mjesečno održavanje?",
      answer:
        "Održavanje je opcionalno, ali preporučeno. Uključuje hosting, SSL, tehničku podršku, sigurnosne nadogradnje i manje izmjene sadržaja. Bez održavanja, stranicu preuzimate i sami brinete o hostingu.",
    },
    {
      question: "Mogu li dobiti EU sufinanciranje?",
      answer:
        "Da — ako ste mikro, malo ili srednje poduzeće, imate pravo na digitalne vaučere iz NPOO programa. Sufinanciranje pokriva 60–90% troškova, ovisno o vrsti vaučera. Mi vam pomažemo s tehničkim dijelom prijave.",
    },
    {
      question: "Radite li web shopove?",
      answer:
        "Da. Premium paket uključuje potpuni web shop s košaricom, plaćanjem i upravljanjem proizvodima. Koristi se Stripe za sigurno procesiranje uplata, a vi dobivate CMS za upravljanje proizvodima bez programiranja.",
    },
    {
      question: "Što se dogodi nakon što mi napravite stranicu?",
      answer:
        "Dobivate kompletnu obuku za ažuriranje sadržaja (tekst, slike, blog). Ako imate paket održavanja, mi brinemo o svemu tehničkom — nadogradnje, sigurnost, brzina. Ako nemate, stranicu preuzimate u potpunosti.",
    },
  ],
} as const

export const CTA_SECTION = {
  heading: "Izgradimo nešto zajedno",
  subheading:
    "Vaš obrt zaslužuje web stranicu koja prodaje.",
  cta: {
    primary: { label: "Besplatna konzultacija →", href: "https://wa.me/385953765343" },
    whatsapp: { label: "Piši na WhatsApp", href: "https://wa.me/385953765343" },
  },
  trust: "Odgovaramo unutar 2 sata radnim danom.",
} as const

export const FOOTER = {
  description:
    "Volt je web studio iz Vrbovca specijaliziran za izradu brzih, modernih web stranica za obrtnike i male poduzetnike.",
  columns: {
    navigation: {
      title: "Navigacija",
      links: [
        { label: "Početna", href: "/" },
        { label: "O nama", href: "/o-nama" },
        { label: "Usluge", href: "/usluge" },
        { label: "Projekti", href: "/projekti" },
        { label: "Cijene", href: "/cijene" },
        { label: "Blog", href: "/blog" },
        { label: "Kontakt", href: "/kontakt" },
      ],
    },
    services: {
      title: "Usluge",
      links: [
        { label: "Web dizajn", href: "/usluge#dizajn" },
        { label: "Web razvoj", href: "/usluge#razvoj" },
        { label: "SEO optimizacija", href: "/usluge#seo" },
        { label: "Web shopovi", href: "/usluge#web-shop" },
        { label: "Održavanje", href: "/usluge#odrzavanje" },
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
      "Volt rješava taj problem. Koristim moderne alate i AI-potpomognut razvoj da isporučim profesionalne web stranice u 7 dana po fiksnoj cijeni. Bez cjenkanja, bez skrivenih troškova, bez neugodnih iznenađenja.",
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
    heading: "Sve što vam treba za uspjeh na webu.",
    subheading:
      "Od jednostavne prezentacijske stranice do potpunog web shopa — pokrivamo sve.",
  },
  services: [
    {
      slug: "dizajn",
      title: "Web dizajn",
      headline: "Dizajn koji ne izgleda kao predložak.",
      description:
        "Svaka stranica je dizajnirana od nule, prilagođena vašem poslu i ciljanoj publici. Koristim moderne tipografije, čiste layoute i pametnu hijerarhiju informacija da vaša poruka dođe do kupca u sekundama.",
      features: [
        "Custom dizajn — nema predložaka ni tema",
        "Mobilno prilagođen od prvog piksela",
        "Do 2 runde revizija dizajna",
        "Konzistentan vizualni identitet",
      ],
    },
    {
      slug: "razvoj",
      title: "Web razvoj",
      headline: "Brze stranice koje Google voli.",
      description:
        "Kodiram ručno u Next.js — bez WordPressa, bez sporih tema, bez pluginova koji usporavaju stranicu. Rezultat: stranica koja se učitava za manje od sekunde i koja je optimizirana za pretraživače od prvog dana.",
      features: [
        "Next.js 16 — najbrži React framework",
        "Lighthouse score 90+ garantiran",
        "SSL certifikat uključen",
        "Automatski backup sadržaja",
      ],
    },
    {
      slug: "seo",
      title: "SEO optimizacija",
      headline: "Nađite se na prvoj stranici Googlea.",
      description:
        "Svaka stranica koju radim dolazi s ugrađenom SEO optimizacijom — od strukturiranih podataka i meta tagova do brzine učitavanja i mobilne prilagodbe. Za klijente koji žele više, nudim napredni SEO paket s mjesečnim praćenjem.",
      features: [
        "Tehnički SEO — brzina, sitemap, robots.txt",
        "Schema.org strukturirani podaci",
        "Meta tagovi i OG slike za dijeljenje",
        "Google Search Console postavljanje",
      ],
    },
    {
      slug: "web-shop",
      title: "Web shopovi",
      headline: "Prodajte online — bez komplikacija.",
      description:
        "Potpuni web shop s košaricom, sigurnim plaćanjem putem Stripe-a, upravljanjem proizvodima i automatskim obavijestima. Vi dodajete proizvode, kupci plaćaju — mi brinemo o tehnici.",
      features: [
        "Stripe integracija za kartično plaćanje",
        "Upravljanje proizvodima bez programiranja",
        "Automatski emailovi za narudžbe",
        "Responsive dizajn za kupovinu s mobitela",
      ],
    },
    {
      slug: "odrzavanje",
      title: "Održavanje",
      headline: "Mi brinemo. Vi radite svoj posao.",
      description:
        "Web stranica nije projekt koji napravite i zaboravite. Treba joj redovito ažuriranje, sigurnosne zakrpe i praćenje performansi. Naši planovi održavanja pokrivaju sve — tako da vi ne morate razmišljati o tome.",
      features: [
        "Hosting i SSL uključen",
        "Sigurnosne nadogradnje",
        "Manje izmjene sadržaja (tekst, slike)",
        "Mjesečno izvješće (Premium)",
        "Prioritetna podrška",
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
          "Web stranica",
          "Web shop",
          "Redizajn postojeće stranice",
          "SEO optimizacija",
          "Održavanje",
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
          "Do €500",
          "€500 – €1.000",
          "€1.000 – €2.000",
          "Više od €2.000",
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
// SEO — Meta tags per page
// ---------------------------------------------------------------------------

export const SEO = {
  home: {
    title: "Izrada web stranica za obrtnike | Volt Web Studio",
    description:
      "Profesionalna izrada web stranica za obrtnike u 7 dana. Od €399. Prihvaćamo digitalne vaučere — do 85% sufinanciranja. Web dizajn, SEO, web shopovi.",
    keywords: [
      "izrada web stranica",
      "web dizajn hrvatska",
      "web stranice za obrtnike",
      "web agencija vrbovec",
      "izrada web shopa",
      "SEO optimizacija",
      "volt web studio",
    ],
  },
  about: {
    title: "O nama — Volt Web Studio | Web Dizajn Vrbovec",
    description:
      "Volt je web studio iz Vrbovca specijaliziran za brzu izradu profesionalnih web stranica za obrtnike i male poduzetnike. Fiksne cijene, 7 dana isporuke.",
  },
  services: {
    title: "Usluge — Web Dizajn, Razvoj, SEO | Volt Web Studio",
    description:
      "Web dizajn, razvoj, SEO optimizacija, web shopovi i održavanje. Sve što vam treba za profesionalnu web prisutnost — na jednom mjestu.",
  },
  projects: {
    title: "Projekti — Portfolio Web Stranica | Volt Web Studio",
    description:
      "Pogledajte naše web projekte — stranice, shopove i landing stranice izrađene za obrtnike i male poduzetnike u Hrvatskoj.",
  },
  pricing: {
    title: "Cijene — Web Stranice od €399 | Volt Web Studio",
    description:
      "Fiksne cijene izrade web stranica. Start €399, Profesionalni €699, Premium €1.299. Transparentno, bez skrivenih troškova. EU vaučeri prihvaćeni.",
  },
  contact: {
    title: "Kontakt — Besplatna Konzultacija | Volt Web Studio",
    description:
      "Kontaktirajte Volt web studio za besplatnu konzultaciju. Odgovaramo unutar 2 sata. WhatsApp, email ili poziv — kako vam odgovara.",
  },
  blog: {
    title: "Blog — Web Dizajn Savjeti i EU Potpore | Volt Web Studio",
    description:
      "Savjeti o web dizajnu, SEO optimizaciji, digitalnim vaučerima i online prisutnosti za obrtnike i male poduzetnike u Hrvatskoj.",
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
    name: "Volt Web Studio",
    description:
      "Web studio specijaliziran za izradu profesionalnih web stranica, web shopova i SEO optimizaciju za obrtnike i male poduzetnike u Hrvatskoj.",
    url: "https://volt.hr",
    image: "https://volt.hr/images/og-default.png",
    telephone: "+385953765343",
    email: "info@volt.hr",
    // Address must match SITE.address above
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
    priceRange: "€399 - €2500",
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
        name: "Koliko dugo traje izrada web stranice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standardni rok je 7 radnih dana od početka rada. Složeniji projekti mogu trajati 10–14 dana.",
        },
      },
      {
        "@type": "Question",
        name: "Što ako nisam zadovoljan dizajnom?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Svaki paket uključuje do 2 runde revizija dizajna. Ne gradimo ništa dok niste zadovoljni.",
        },
      },
      {
        "@type": "Question",
        name: "Mogu li dobiti EU sufinanciranje za web stranicu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da — digitalni vaučeri iz NPOO programa pokrivaju 60–90% troškova izrade web stranice za mikro, mala i srednja poduzeća.",
        },
      },
      {
        "@type": "Question",
        name: "Radite li web shopove?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da. Premium paket uključuje potpuni web shop s košaricom, Stripe plaćanjem i upravljanjem proizvodima.",
        },
      },
      {
        "@type": "Question",
        name: "Trebam li plaćati mjesečno održavanje?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Održavanje je opcionalno. Uključuje hosting, SSL, tehničku podršku i manje izmjene sadržaja.",
        },
      },
      {
        "@type": "Question",
        name: "Što se dogodi nakon izrade stranice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dobivate obuku za ažuriranje sadržaja. S paketom održavanja, mi brinemo o svemu tehničkom.",
        },
      },
    ],
  },
  pricingPage: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Web stranice — cijene i paketi",
    url: "https://volt.hr/cijene",
    description: "Fiksne cijene izrade web stranica za obrtnike. Start €399, Profesionalni €699, Premium €1.299.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Offer",
            name: "Start paket",
            price: "399",
            priceCurrency: "EUR",
            description: "Do 3 stranice, mobilni dizajn, osnovna SEO optimizacija, kontakt forma",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Offer",
            name: "Profesionalni paket",
            price: "699",
            priceCurrency: "EUR",
            description: "Do 10 stranica, custom dizajn, CMS sustav, napredna SEO optimizacija",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Offer",
            name: "Premium paket",
            price: "1299",
            priceCurrency: "EUR",
            description: "Neograničen broj stranica, web shop, višejezični sadržaj, premium SEO paket",
          },
        },
      ],
    },
  },
} as const

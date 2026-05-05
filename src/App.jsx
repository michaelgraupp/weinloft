import React, { useEffect, useState } from "react";

const HERO_IMAGES = [
  {
    src: "/images/hero/hero_1.jpeg",
    alt: "Naschgarten mit Blick auf Gamlitz",
  },
  {
    src: "/images/hero/hero_2.jpeg",
    alt: "Modernes Apartment im Weinloft Gamlitz",
  },
  {
    src: "/images/hero/hero_3.jpeg",
    alt: "Balkon mit Blick ins Grüne",
  },
];

const APARTMENTS = [
  {
    name: "Gamlitzblick",
    size: "45 m²",
    guests: "2 Gäste",
    description:
      "Helles Studio mit weitem Blick Richtung Gamlitz – ideal für Paare, die Ruhe, Komfort und die Nähe zum Zentrum schätzen.",
    details: [
      "Balkon mit Ausblick",
      "Vollausgestattete Küche",
      "Modernes Bad",
      "Klimaanlage & WLAN",
      "Maßgefertigte Tischlermöbel aus Vollholz",
    ],
    images: [
      "/images/gamlitzblick/IMG_4693.jpeg",
      "/images/gamlitzblick/IMG_4685.jpeg",
      "/images/gamlitzblick/IMG_4662.jpeg",
      "/images/gamlitzblick/IMG_1705.jpeg",
      "/images/gamlitzblick/IMG_1694.jpeg",
      "/images/gamlitzblick/IMG_1779.jpeg",
      "/images/gamlitzblick/IMG_1796.jpeg",
      "/images/gamlitzblick/IMG_1768.jpeg",
    ],
  },
  {
    name: "Waldblick",
    size: "50 m²",
    guests: "bis 4 Gäste",
    description:
      "Geräumiges Apartment mit Terrasse ins Grüne – besonders angenehm für Familien oder längere Aufenthalte.",
    details: [
      "Offener Wohn-, Schlaf- & Essbereich",
      "Großes Badezimmer mit freistehender Badewanne & Dusche",
      "Großer Balkon mit Weitblick ins Grüne",
      "Klimaanlage & WLAN",
      "Maßgefertigte Tischlermöbel aus Vollholz",
    ],
    images: [
      "/images/waldblick/waldblick_1.jpeg",
      "/images/waldblick/waldblick_2.jpeg",
      "/images/waldblick/waldblick_3.jpeg",
      "/images/waldblick/waldblick_4.jpeg",
      "/images/waldblick/waldblick_5.jpeg",
      "/images/waldblick/waldblick_6.jpeg",
      "/images/waldblick/waldblick_7.jpeg",
      "/images/waldblick/waldblick_8.jpeg",
      "/images/waldblick/waldblick_9.jpeg",
      "/images/waldblick/waldblick_10.jpeg",
    ],
  },
];

const ScrollLink = ({ to, children, className = "" }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(to);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="mb-10 text-center md:text-left">
    {eyebrow && (
      <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#7a7065]">
        {eyebrow}
      </p>
    )}
    <h2 className="font-serif text-3xl md:text-5xl text-[#2b2b2b]">
      {title}
    </h2>
    {text && <p className="mt-4 max-w-2xl text-[#6b6258]">{text}</p>}
  </div>
);

const ApartmentSlider = ({ images, name, onOpen }) => {
  const safeImages = images?.length ? images : ["/images/home_1.jpeg"];
  const [current, setCurrent] = useState(0);

  const next = (e) => {
    e.stopPropagation();
    setCurrent((current + 1) % safeImages.length);
  };

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((current - 1 + safeImages.length) % safeImages.length);
  };

  return (
    <div
      onClick={() => onOpen(safeImages, current, name)}
      className="relative h-72 md:h-96 overflow-hidden rounded-t-3xl bg-stone-200 group cursor-zoom-in"
    >
      <img
  src={safeImages[current]}
  alt={`${name} Bild ${current + 1}`}
  loading="eager"
  decoding="async"
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Vorheriges Bild"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#fbfaf6]/85 hover:bg-[#fbfaf6] rounded-full h-11 w-11 shadow text-2xl flex items-center justify-center"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Nächstes Bild"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#fbfaf6]/85 hover:bg-[#fbfaf6] rounded-full h-11 w-11 shadow text-2xl flex items-center justify-center"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/55 text-white text-xs px-3 py-1 rounded-full">
            {current + 1} / {safeImages.length}
          </div>
        </>
      )}
    </div>
  );
};

const ImageLightbox = ({ lightbox, onClose, onNext, onPrev }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (!lightbox) return null;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      onNext();
    }

    if (distance < -minSwipeDistance) {
      onPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center px-4 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 text-white text-3xl bg-white/10 hover:bg-white/20 rounded-full h-12 w-12"
        aria-label="Galerie schließen"
      >
        ×
      </button>

      {lightbox.images.length > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-4 md:left-8 text-white text-5xl bg-white/10 hover:bg-white/20 rounded-full h-14 w-14 flex items-center justify-center"
          aria-label="Vorheriges Bild"
        >
          ‹
        </button>
      )}

      <img
        src={lightbox.images[lightbox.current]}
        alt={`${lightbox.name} Bild ${lightbox.current + 1}`}
        className="max-h-[82vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl"
      />

      {lightbox.images.length > 1 && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-4 md:right-8 text-white text-5xl bg-white/10 hover:bg-white/20 rounded-full h-14 w-14 flex items-center justify-center"
          aria-label="Nächstes Bild"
        >
          ›
        </button>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
        {lightbox.name} · {lightbox.current + 1} / {lightbox.images.length}
      </div>
    </div>
  );
};

const LEGAL_CONTENT = {
  impressum: {
    title: "Impressum",
    eyebrow: "Rechtliches",
    content: (
      <div className="space-y-5">
        <div>
          <h3 className="font-semibold text-[#2b2b2b]">Angaben gemäß § 5 ECG</h3>
          <p className="mt-2">
            Michael Graupp<br />
            Sernauer Straße 283<br />
            8462 Gamlitz<br />
            Österreich
          </p>
        </div>
        <p>
          Telefon: <a href="tel:+436604950143" className="underline">+43 660 4950143</a><br />
          E-Mail: <a href="mailto:weinloft.gamlitz@gmail.com" className="underline">weinloft.gamlitz@gmail.com</a>
        </p>
        <p>Privatzimmervermietung / Vermietung von Ferienapartments</p>
        <p>Behörde gemäß ECG: Bezirkshauptmannschaft Leibnitz</p>
      </div>
    ),
  },

  datenschutz: {
    title: "Datenschutzerklärung",
    eyebrow: "Datenschutz",
    content: (
      <div className="space-y-5">
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2021).
        </p>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">Kontakt mit uns</h3>
          <p className="mt-2">
            Wenn Sie per Formular oder E-Mail Kontakt mit uns aufnehmen, werden Ihre Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Zur technischen Übermittlung der Formular-Daten nutzen wir den Dienst FormSubmit. Die Datenübertragung erfolgt verschlüsselt (SSL/TLS). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">Zweck und Rechtsgrundlage</h3>
          <p className="mt-2">
            Die Verarbeitung erfolgt zur Beantwortung von Anfragen, zur vorvertraglichen Kommunikation und zur Abwicklung von Buchungen (Art. 6 Abs. 1 lit. b DSGVO).
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">Speicherdauer</h3>
          <p className="mt-2">
            Ihre Daten werden nur so lange gespeichert, wie dies zur Bearbeitung Ihrer Anfrage oder zur Erfüllung gesetzlicher Aufbewahrungspflichten (z. B. steuerrechtliche Pflichten bei Buchungen) erforderlich ist.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">Ihre Rechte</h3>
          <p className="mt-2">
            Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch zu. Kontakt: <a href="mailto:weinloft.gamlitz@gmail.com" className="underline">weinloft.gamlitz@gmail.com</a>.
          </p>
        </div>

        <p>
          Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. In Österreich ist dies die Datenschutzbehörde (Barichgasse 40-42, 1030 Wien).
        </p>
      </div>
    ),
  },

  agb: {
    title: "Allgemeine Geschäftsbedingungen",
    eyebrow: "AGB",
    content: (
      <div className="space-y-5">
        <div>
          <h3 className="font-semibold text-[#2b2b2b]">1. Geltungsbereich</h3>
          <p className="mt-2">Diese Allgemeinen Geschäftsbedingungen gelten für alle Direktbuchungen der Apartments im Weinloft Gamlitz.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">2. Vertragsabschluss</h3>
          <p className="mt-2">Der Vertrag zwischen Gastgeber und Gast kommt durch die Buchungsbestätigung zustande, die per E-Mail oder über eine Buchungsplattform erfolgt.</p>
          <p className="mt-2">Mit der Buchung erkennt der Gast diese AGB an.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">3. An- und Abreise</h3>
          <p className="mt-2">Der Check-in ist ab 15:00 Uhr möglich, der Check-out erfolgt bis spätestens 11:00 Uhr. Abweichungen sind nur nach vorheriger Absprache mit dem Gastgeber möglich.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">4. Preise und Zahlung</h3>
          <p className="mt-2">Die Preise sind in der jeweiligen Buchungsbestätigung angegeben. Zusätzlich fällt eine Nächtigungsabgabe sowie ein Infrastrukturbeitrag in Höhe von derzeit 3,50 € pro Person und Nacht an.</p>
          <p className="mt-2">Der Gesamtbetrag ist bei Buchung fällig, sofern nichts anderes vereinbart wurde.</p>
          <p className="mt-2">Die Zahlung erfolgt per Banküberweisung.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">5. Stornobedingungen</h3>
          <p className="mt-2">Eine kostenfreie Stornierung ist bis 30 Tage vor Anreise bis 18:00 Uhr möglich.</p>
          <p className="mt-2">Bei späterer Stornierung werden 100 % des Gesamtpreises verrechnet.</p>
          <p className="mt-2">Der Gastgeber ist berechtigt, aus wichtigem Grund vom Vertrag zurückzutreten, insbesondere bei höherer Gewalt oder wenn der Gast durch sein Verhalten andere Gäste, Nachbarn oder den Betrieb erheblich beeinträchtigt.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">6. Pflichten des Gastes</h3>
          <p className="mt-2">Der Gast verpflichtet sich, die Apartments und deren Einrichtung pfleglich zu behandeln.</p>
          <p className="mt-2">Schäden sind unverzüglich zu melden. Der Gast haftet für verursachte Schäden in voller Höhe.</p>
          <p className="mt-2">Rauchen ist in den Apartments strengstens untersagt. Bei Verstoß wird eine Reinigungs- und Aufwandsgebühr von 500 € verrechnet.</p>
          <p className="mt-2">Haustiere sind nicht erlaubt. Partys und Feiern sind untersagt.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">7. Haftung</h3>
          <p className="mt-2">Der Gastgeber haftet nur für Schäden, die auf Vorsatz oder grobe Fahrlässigkeit zurückzuführen sind, soweit keine gesetzlich zwingende Haftung besteht.</p>
          <p className="mt-2">Für Wertgegenstände der Gäste wird keine Haftung übernommen.</p>
          <p className="mt-2">Für Fahrräder, E-Bikes oder sonstige Sportgeräte wird keine Haftung übernommen.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">8. Datenschutz</h3>
          <p className="mt-2">Die im Rahmen der Buchung angegebenen personenbezogenen Daten werden gemäß den geltenden Datenschutzbestimmungen verarbeitet.</p>
          <p className="mt-2">Eine Weitergabe an Dritte erfolgt nur, soweit dies zur Vertragserfüllung erforderlich ist. Weitere Informationen finden Sie in der Datenschutzerklärung.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">9. WLAN-Nutzung</h3>
          <p className="mt-2">Das WLAN steht den Gästen während ihres Aufenthalts kostenlos zur Verfügung. Die Nutzung erfolgt auf eigene Verantwortung.</p>
          <p className="mt-2">Die Nutzung für rechtswidrige Zwecke, insbesondere zur Verletzung von Urheberrechten oder zur Verbreitung rechtswidriger Inhalte, ist untersagt.</p>
          <p className="mt-2">Sollte der Gastgeber durch eine missbräuchliche Nutzung des WLANs durch den Gast Ansprüchen Dritter ausgesetzt sein, hält der Gast den Gastgeber diesbezüglich schad- und klaglos.</p>
          <p className="mt-2">Nach erfolgter Abreise ist der Gast nicht mehr berechtigt, das WLAN des Gastgebers zu nutzen. Der Gastgeber übernimmt keine Haftung für über das WLAN übertragene Daten; der Gast ist selbst für den Schutz seiner Daten verantwortlich.</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#2b2b2b]">10. Schlussbestimmungen</h3>
          <p className="mt-2">Es gilt österreichisches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, das sachlich zuständige Gericht in der Steiermark.</p>
        </div>
      </div>
    ),
  },
};

const LegalModal = ({ page, onClose }) => {
  if (!page) return null;
  const item = LEGAL_CONTENT[page];

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 px-4 py-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto rounded-3xl bg-[#fbfaf6] p-6 md:p-10 shadow-2xl relative">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 rounded-full border border-[#cbbfae] px-3 py-1 text-sm hover:bg-[#f3efe6]">
          Schließen
        </button>
        <p className="text-xs uppercase tracking-[0.25em] text-[#7a7065] mb-3">{item.eyebrow}</p>
        <h2 className="font-serif text-3xl md:text-5xl mb-8 text-[#2b2b2b]">{item.title}</h2>
        <div className="text-[#4f4a43] leading-relaxed">{item.content}</div>
      </div>
    </div>
  );
};

function App() {
  const year = new Date().getFullYear();
  const [heroImage, setHeroImage] = useState(0);
  const [legalPage, setLegalPage] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (images, current, name) => {
    setLightbox({ images, current, name });
  };

  const closeLightbox = () => setLightbox(null);

  const nextLightboxImage = () => {
    setLightbox((box) =>
      box ? { ...box, current: (box.current + 1) % box.images.length } : box
    );
  };

  const prevLightboxImage = () => {
    setLightbox((box) =>
      box
        ? {
            ...box,
            current: (box.current - 1 + box.images.length) % box.images.length,
          }
        : box
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#2b2b2b] scroll-smooth">
      <div className="w-full bg-[#3f4b3f] text-stone-100 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span>📍</span>
            <span className="truncate">Sernauer Straße 283 · 8462 Gamlitz, Steiermark</span>
          </div>
          <div className="hidden lg:flex items-center gap-5 whitespace-nowrap">
            <a href="tel:+436604950143" className="hover:text-stone-300">
              📞 +43 660 4950143
            </a>
            <a href="mailto:weinloft.gamlitz@gmail.com" className="hover:text-stone-300">
              ✉️ weinloft.gamlitz@gmail.com
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-[#fbfaf6]/90 backdrop-blur border-b border-[#ddd3c2]">
        <nav className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <ScrollLink to="#home" className="flex items-center gap-3 min-w-0">
            <img
              src="/images/weinloft-logo.jpeg"
              alt="Weinloft Gamlitz Logo"
              className="h-12 w-auto shrink-0"
            />
            <div className="font-serif text-xl md:text-2xl tracking-wide truncate">
              Weinloft Gamlitz
            </div>
          </ScrollLink>

          <div className="hidden md:flex items-center gap-6 text-sm text-[#4f4a43]">
            <ScrollLink to="#home" className="hover:text-stone-950">Start</ScrollLink>
            <ScrollLink to="#apartments" className="hover:text-stone-950">Apartments</ScrollLink>
            <ScrollLink to="#ausstattung" className="hover:text-stone-950">Ausstattung</ScrollLink>
            <ScrollLink to="#lage" className="hover:text-stone-950">Lage</ScrollLink>
            <ScrollLink to="#kontakt" className="hover:text-stone-950">Kontakt</ScrollLink>
          </div>

          <ScrollLink
            to="#buchen"
            className="hidden sm:inline-flex px-4 py-2 bg-[#3f4b3f] text-white rounded-full hover:bg-[#2f3a2f] transition"
          >
            Direkt anfragen
          </ScrollLink>
        </nav>
      </header>

      <section id="home" className="relative min-h-[76vh] md:min-h-[84vh] flex items-center justify-center overflow-hidden">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            role="img"
            aria-label={image.alt}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1800ms] ease-in-out ${
              index === heroImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            style={{ backgroundImage: `url('${image.src}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/45" />

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Hero Bild ${index + 1} anzeigen`}
              onClick={() => setHeroImage(index)}
              className={`h-2 rounded-full transition-all ${
                index === heroImage ? "w-8 bg-[#fbfaf6]" : "w-2 bg-[#fbfaf6]/50"
              }`}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <div className="inline-flex rounded-full bg-[#fbfaf6]/15 backdrop-blur px-4 py-2 text-xs uppercase tracking-[0.25em] mb-5">
            Südsteiermark · Gamlitz
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight drop-shadow">
            Ruhe, Wein & moderner Komfort
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Zwei moderne Apartments am Fuße des Sernauberges – mit Blick auf Gamlitz.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <ScrollLink
              to="#apartments"
              className="w-full sm:w-auto px-6 py-3 bg-[#fbfaf6] text-[#2b2b2b] rounded-full font-medium hover:bg-stone-100 transition"
            >
              Apartments ansehen
            </ScrollLink>
            <ScrollLink
              to="#buchen"
              className="w-full sm:w-auto px-6 py-3 border border-white/70 text-white rounded-full font-medium hover:bg-[#fbfaf6]/15 transition"
            >
              Verfügbarkeit anfragen
            </ScrollLink>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f3efe6]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl mb-6">Weinloft Gamlitz</h2>

          <p className="text-[#4f4a43] leading-relaxed">
            Willkommen im Weinloft Gamlitz – einem Rückzugsort am Fuße des
            Sernauberges, eingebettet in die sanften Hügel der Südsteiermark,
            mit weitem Blick über Gamlitz.
          </p>

          <p className="mt-4 text-[#4f4a43] leading-relaxed">
            Moderne Apartments, ruhige Lage und die Nähe zum Zentrum verbinden
            sich hier zu einem Ort zum Ankommen und Durchatmen.
          </p>
        </div>
      </section>

      <section className="py-10 bg-[#f3efe6] border-b border-[#ddd3c2]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-serif text-3xl">2</div>
            <div className="text-sm text-[#6b6258]">Apartments</div>
          </div>
          <div>
            <div className="font-serif text-3xl">10 Min.</div>
            <div className="text-sm text-[#6b6258]">zu Fuß ins Zentrum</div>
          </div>
          <div>
            <div className="font-serif text-3xl">45–50 m²</div>
            <div className="text-sm text-[#6b6258]">Wohnfläche</div>
          </div>
          <div>
            <div className="font-serif text-3xl">Blick</div>
            <div className="text-sm text-[#6b6258]">auf Gamlitz</div>
          </div>
        </div>
      </section>

      <section id="apartments" className="py-20 bg-[#fbfaf6] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            eyebrow="Wohnen im Weinland"
            title="Unsere Apartments"
            text="Beide Apartments verbinden ruhige Lage, moderne Ausstattung und die Nähe zum Ortszentrum von Gamlitz."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {APARTMENTS.map((apartment) => (
              <article key={apartment.name} className="overflow-hidden rounded-3xl border border-[#ddd3c2] bg-[#fbfaf6] shadow-sm">
                <ApartmentSlider
                  name={apartment.name}
                  images={apartment.images}
                  onOpen={openLightbox}
                />
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-3xl">{apartment.name}</h3>
                      <p className="mt-1 text-sm text-[#7a7065]">
                        {apartment.size} · {apartment.guests}
                      </p>
                    </div>
                    <ScrollLink
                      to="#buchen"
                      className="shrink-0 rounded-full border border-[#cbbfae] px-4 py-2 text-sm hover:bg-[#3f4b3f] hover:text-white transition"
                    >
                      Anfragen
                    </ScrollLink>
                  </div>

                  <p className="mt-4 text-[#4f4a43] leading-relaxed">{apartment.description}</p>

                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#6b6258]">
                    {apartment.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span>✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f3efe6]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-sm bg-[#fbfaf6]">
            <img
              src="/images/naschgarten.jpeg"
              alt="Naschgarten Weinloft Gamlitz"
              className="w-full h-[450px] object-cover rounded-3xl shadow-md hover:scale-[1.02] transition duration-500"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#7a7065] mb-3">
              Besonderes Highlight
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Naschgarten erleben
            </h2>

            <p className="text-[#4f4a43] leading-relaxed">
              Direkt vor dem Weinloft lädt unser kleiner, hauseigener Naschgarten zum Verweilen ein.
            </p>

            <p className="mt-4 text-[#4f4a43] leading-relaxed">
              Zwischen den Reben genießen Sie die Ruhe, kosten frische Trauben und erleben die Südsteiermark ganz persönlich – fernab von Trubel und großen Anlagen.
            </p>
          </div>
        </div>
      </section>

      <section id="ausstattung" className="py-20 bg-[#f3efe6] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            eyebrow="Komfort"
            title="Ausstattung & Highlights"
            text="Alles, was Sie für eine entspannte Auszeit in der Südsteiermark brauchen."
          />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-[#ddd3c2] p-6 bg-[#fbfaf6] shadow-sm">
              <div className="text-3xl mb-4">🛏️</div>
              <h3 className="text-lg font-semibold mb-3">Wohnen & Schlafen</h3>
              <ul className="space-y-2 text-[#6b6258] text-sm">
                <li>Klimaanlage</li>
                <li>Doppelbetten</li>
                <li>Moderner Wohnbereich mit gemütlichem Sofa</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#ddd3c2] p-6 bg-[#fbfaf6] shadow-sm">
              <div className="text-3xl mb-4">🍳</div>
              <h3 className="text-lg font-semibold mb-3">Küche</h3>
              <ul className="space-y-2 text-[#6b6258] text-sm">
                <li>Kochfeld</li>
                <li>Backofen & Kühlschrank</li>
                <li>Kaffeemaschine & Wasserkocher</li>
                <li>Geschirr & Basisgewürze</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#ddd3c2] p-6 bg-[#fbfaf6] shadow-sm">
              <div className="text-3xl mb-4">🍇</div>
              <h3 className="text-lg font-semibold mb-3">Besonderheiten</h3>
              <ul className="space-y-2 text-[#6b6258] text-sm">
                <li>Balkon</li>
                <li>Naschgarten mit Weintrauben</li>
                <li>Kostenlose Parkplätze</li>
                <li>Selbst-Check-in möglich</li>
              </ul>
            </div>
          </div>

          <p className="mt-5 text-xs text-[#7a7065]">Hinweis: Frühstück wird nicht angeboten.</p>
        </div>
      </section>

      <section id="lage" className="py-20 bg-[#fbfaf6] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <SectionTitle
              eyebrow="Lage"
              title="Am Fuße des Sernauberges"
              text="Ruhig gelegen und dennoch nur wenige Minuten vom Zentrum von Gamlitz entfernt – ideal für Buschenschankbesuche, Spaziergänge und Ausflüge entlang der Südsteirischen Weinstraße."
            />
            <ul className="space-y-3 text-[#4f4a43]">
              <li>✓ Blick auf Gamlitz</li>
              <li>✓ Ruhige, naturnahe Umgebung</li>
              <li>✓ Ca. 10 Gehminuten ins Zentrum</li>
              <li>✓ Kostenlose Parkplätze direkt bei der Unterkunft</li>
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[#ddd3c2] shadow-sm bg-stone-100">
            <div className="space-y-3">
              <iframe
                title="Weinloft Gamlitz Karte"
                className="h-[420px] w-full rounded-3xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=15.537,46.712,15.549,46.722&layer=mapnik&marker=46.71719,15.54287"
              />

              <div className="flex flex-wrap gap-4 text-sm px-4 pb-4">
                <a
                  href="https://www.openstreetmap.org/?mlat=46.71719&mlon=15.54287#map=17/46.71719/15.54287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#6b6258] hover:text-[#3f4b3f]"
                >
                  OpenStreetMap öffnen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="buchen" className="py-20 bg-[#3f4b3f] text-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-stone-400">Direktanfrage</p>
            <h2 className="font-serif text-3xl md:text-5xl">Unverbindlich anfragen</h2>
            <p className="mt-4 max-w-2xl mx-auto text-stone-300">
              Senden Sie uns Ihre gewünschte Reisezeit – wir melden uns rasch mit einer Bestätigung oder einem passenden Angebot.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-[#fbfaf6] text-[#2b2b2b] p-6 md:p-8 shadow-xl">
            <form
              className="space-y-5 text-sm"
              action="https://formsubmit.co/weinloft.gamlitz@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Neue Buchungsanfrage – Weinloft Gamlitz" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Vor- und Nachname*</label>
                  <input required className="w-full border border-[#cbbfae] rounded-xl px-3 py-3" name="name" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">E-Mail*</label>
                  <input type="email" required className="w-full border border-[#cbbfae] rounded-xl px-3 py-3" name="email" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Telefon optional</label>
                  <input className="w-full border border-[#cbbfae] rounded-xl px-3 py-3" name="phone" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Gewünschtes Apartment</label>
                  <select name="apartment" className="w-full border border-[#cbbfae] rounded-xl px-3 py-3 bg-[#fbfaf6]">
                    <option value="">egal / noch unentschieden</option>
                    <option value="Gamlitzblick">Gamlitzblick · 2 Personen</option>
                    <option value="Waldblick">Waldblick · bis 4 Personen</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Anreise*</label>
                  <input type="date" required className="w-full border border-[#cbbfae] rounded-xl px-3 py-3" name="arrival" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Abreise*</label>
                  <input type="date" required className="w-full border border-[#cbbfae] rounded-xl px-3 py-3" name="departure" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Personen*</label>
                  <input type="number" min="1" max="6" required className="w-full border border-[#cbbfae] rounded-xl px-3 py-3" name="guests" />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Ihre Nachricht</label>
                <textarea
                  name="message"
                  className="w-full border border-[#cbbfae] rounded-xl px-3 py-3 min-h-[120px]"
                  placeholder="z. B. besondere Wünsche, Kinder, ungefähre Ankunftszeit ..."
                />
              </div>

              <label className="flex items-start gap-3 text-xs text-[#6b6258]">
                <input type="checkbox" required className="mt-1" />
                <span>
                  Ich stimme zu, dass meine Angaben zur Beantwortung der Buchungsanfrage gespeichert und verarbeitet werden.
                </span>
              </label>

              <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-[#3f4b3f] text-white rounded-full hover:bg-[#2f3a2f] transition">
                Buchungsanfrage senden
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-20 bg-[#f3efe6] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#7a7065]">Kontakt</p>
            <h2 className="font-serif text-3xl md:text-5xl">Wir freuen uns auf Ihre Anfrage</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 text-sm">
            <a href="tel:+436604950143" className="rounded-3xl border border-[#ddd3c2] p-6 bg-[#fbfaf6] shadow-sm hover:shadow-md transition">
              <div className="text-2xl mb-3">📞</div>
              <div className="font-semibold">Telefon</div>
              <div className="mt-1 text-[#6b6258]">+43 660 4950143</div>
            </a>
            <a href="mailto:weinloft.gamlitz@gmail.com" className="rounded-3xl border border-[#ddd3c2] p-6 bg-[#fbfaf6] shadow-sm hover:shadow-md transition">
              <div className="text-2xl mb-3">✉️</div>
              <div className="font-semibold">E-Mail</div>
              <div className="mt-1 text-[#6b6258] break-all">weinloft.gamlitz@gmail.com</div>
            </a>
            <div className="rounded-3xl border border-[#ddd3c2] p-6 bg-[#fbfaf6] shadow-sm">
              <div className="text-2xl mb-3">📍</div>
              <div className="font-semibold">Adresse</div>
              <div className="mt-1 text-[#6b6258]">8462 Gamlitz, Österreich</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#3f4b3f] text-stone-100">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/images/weinloft-logo.jpeg" alt="Weinloft Gamlitz Logo" className="h-9 w-auto" />
              <div className="font-serif text-xl">Weinloft Gamlitz</div>
            </div>
            <p className="mt-3 max-w-md text-stone-300">
              Zwei moderne Apartments in ruhiger Lage – ideal für Ihre Auszeit in der Südsteiermark.
            </p>
          </div>

          <div>
            <div className="font-semibold">Navigation</div>
            <ul className="mt-3 space-y-2 text-stone-300">
              <li><ScrollLink to="#apartments" className="hover:text-white">Apartments</ScrollLink></li>
              <li><ScrollLink to="#ausstattung" className="hover:text-white">Ausstattung</ScrollLink></li>
              <li><ScrollLink to="#lage" className="hover:text-white">Lage</ScrollLink></li>
              <li><ScrollLink to="#buchen" className="hover:text-white">Buchung</ScrollLink></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Kontakt</div>
            <ul className="mt-3 space-y-2 text-stone-300">
              <li>📞 +43 660 4950143</li>
              <li className="break-all">✉️ weinloft.gamlitz@gmail.com</li>
              <li>📍 8462 Gamlitz</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-stone-400 flex flex-col sm:flex-row gap-2 items-center justify-between">
            <span>© {year} Weinloft Gamlitz</span>
            <div className="flex gap-4">
              <button type="button" onClick={() => setLegalPage("impressum")} className="hover:text-white">Impressum</button>
              <button type="button" onClick={() => setLegalPage("datenschutz")} className="hover:text-white">Datenschutz</button>
              <button type="button" onClick={() => setLegalPage("agb")} className="hover:text-white">AGB</button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />

      <ImageLightbox
        lightbox={lightbox}
        onClose={closeLightbox}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
      />
    </div>
  );
}

export default App;

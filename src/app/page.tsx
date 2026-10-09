import Image from "next/image";
import Globe from "./components/Globe";
import Rail from "./components/Rail";
import Menu from "./components/Menu";
import Clock from "./components/Clock";
import OC3D from "./components/OC3D";
import { OC_PATH, OC_VIEWBOX } from "./components/oc-mark";
import { DESCRIPTION, NAME, SITE } from "./site";

// All facts below come from www.ocglobaltech.com. OC International is presented only as its parent company.
const OCGT = "https://www.ocglobaltech.com";

const nav = [
  ["Group", "#group"],
  ["OCGT", "#ocgt"],
  ["Platforms", "#platforms"],
  ["Recognition", "#recognition"],
  ["Leadership", "#leadership"],
  ["Careers", "#careers"],
] as const;

const platforms = [
  {
    name: "O'ZONE",
    tag: "Create. Share. Earn.",
    img: "/images/ozone-device-floating.webp",
    w: 1024,
    h: 928,
    alt: "O'ZONE streaming platform shown on a desktop monitor",
    desc: "Stories worth the watch. A video platform that combines content sharing, an AI-powered creation studio and a transparent earning model, where creators receive half of net ad revenue based on real engagement.",
    features: ["AI-powered creation", "Real engagement", "Sustainable earnings"],
    href: `${OCGT}/service`,
  },
  {
    name: "O'CARE",
    tag: "Care. Connect. Protect.",
    img: "/images/ocare-phones-floating.webp",
    w: 849,
    h: 1024,
    alt: "O'CARE app showing a confidential SOS alert screen on two phones",
    desc: "A safer, kinder school for every student. Unified school communication and emotional well-being that identifies and responds to student needs early, with dual chat modes, real-time insights and SOS alerts.",
    features: ["Dual chat", "Early signals", "SOS alerts"],
    href: `${OCGT}/service`,
  },
  {
    name: "O'CHAT",
    tag: "Private. Secure. Yours.",
    img: "/images/ochat-phones-floating.webp",
    w: 870,
    h: 1024,
    alt: "O'CHAT private messaging app on two phones",
    desc: "Private messaging, secure by design. Text, voice and video with end-to-end encryption, sign-up with just a phone number, and backups that stay yours.",
    features: ["End-to-end encrypted", "Disappearing messages", "Encrypted backup"],
    href: `${OCGT}/service`,
  },
  {
    name: "O'SMASH",
    tag: "Train. Track. Win.",
    img: "/images/osmash-phones-floating.webp",
    w: 849,
    h: 1024,
    alt: "O'SMASH badminton coaching app on two phones",
    desc: "Coaching management for badminton coaches and academies. Players, training sessions, attendance and payments, managed in one platform.",
    features: ["Players", "Sessions", "Attendance", "Payments"],
    href: `${OCGT}/service`,
  },
];

const stats = [
  ["4", "Core services"],
  ["3", "Core pillars"],
  ["24/7", "Digital connectivity"],
  ["1", "Digital ecosystem"],
  ["100%", "Malaysia built"],
  ["∞", "Scalable solutions"],
];

const pillars = [
  ["Technology", "Emerging tech that drives scalable, secure and impactful solutions."],
  ["Platforms", "Robust digital ecosystems that connect users, businesses and services."],
  ["Strategy", "Technology aligned with organisational goals to maximise growth and ROI."],
  ["Experience", "Human-centred design that makes complex systems feel simple and clear."],
];

const milestones = [
  {
    date: "Oct 2026",
    title: "MSME status recognition from SME Corp. Malaysia",
    desc: "Officially registered and verified as a Micro, Small and Medium Enterprise.",
    href: `${OCGT}/news/msme-status-sme-corp`,
  },
  {
    date: "Aug 2026",
    title: "Malaysia Digital status by MDEC",
    desc: "A significant step forward, opening new opportunities for innovation and business growth.",
    href: `${OCGT}/news/malaysia-digital-status-mdec`,
  },
  {
    date: "Aug 2026",
    title: "Two recognitions at Malaysia Digital Economy Forum 10.0",
    desc: "MDCC Lifetime Corporate Membership and the Next-Generation Digital Engagement Excellence Award, at ITCC Sabah.",
    href: `${OCGT}/news/mdef-2026-malaysia-digital-economy-forum-sabah`,
  },
  {
    date: "Jun 2026",
    title: "Sole sponsor of Vibeathon AI Coding Challenge 2026",
    desc: "Empowering UTM Faculty of Computing students to build AI-driven solutions for real-world fuel management challenges.",
    href: `${OCGT}/news/vibeathon-ai-coding-challenge-2026-utm`,
  },
  {
    date: "Dec 2025",
    title: "Grant pitching session with Cradle Fund",
    desc: "Presenting the vision, technology roadmap and commercialisation strategy.",
    href: `${OCGT}/news/grant-pitching-session-cradle-fund`,
  },
];

const leaders = [
  ["Lim C.M", "Managing Director"],
  ["Tang Wei Hong", "Chief Technology Officer"],
  ["Mohamad Fazuan Bin Mohd Wafat", "Chief Innovation Officer"],
  ["Lim Jing Horng", "Lead Creative Technologist"],
  ["Chua Chiou Juan", "Senior HR & Administrative Executive"],
];

const roles = ["Full Stack Engineer", "DevOps Engineer", "Digital Marketing Specialist", "Internship"];

function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// The "OC" letters from the OC Global Technology logo, as a vector that takes the text colour.
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={OC_VIEWBOX} className={className} aria-hidden>
      <path d={OC_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

function SecHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="sec-head reveal">
      <span className="flex items-center gap-3">
        <span className="dot">
          <Arrow size={13} />
        </span>
        {label}
      </span>
      <span>({n})</span>
    </div>
  );
}

function External({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

// Structured data for search engines and AI answer engines (schema.org)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: NAME,
      legalName: NAME,
      alternateName: ["OC International", "OC International Holding", "OC International Holdings", "OCIH"],
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/images/ocih-logo.png`, width: 816, height: 498 },
      image: `${SITE}/opengraph-image`,
      description: DESCRIPTION,
      email: "info@ocglobaltech.com",
      telephone: "+6072831973",
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: "+6072831973", email: "info@ocglobaltech.com", areaServed: "MY", availableLanguage: ["en", "ms"] },
      areaServed: "MY",
      subOrganization: { "@id": `${OCGT}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${OCGT}/#organization`,
      name: "OC Global Technology Sdn. Bhd.",
      alternateName: "OCGT",
      url: OCGT,
      logo: `${SITE}/images/ocgt-logo.webp`,
      slogan: "Powering Digital Growth.",
      description:
        "Malaysian technology company and Malaysia Digital (MD) status company building conversation, commerce and community platforms. A subsidiary of OC International Holding Sdn. Bhd.",
      parentOrganization: { "@id": `${SITE}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 09-04, Level 9, City Plaza, Jalan Tebrau",
        addressLocality: "Johor Bahru",
        postalCode: "80300",
        addressRegion: "Johor",
        addressCountry: "MY",
      },
      telephone: "+6072831973",
      email: "info@ocglobaltech.com",
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: "+6072831973", email: "info@ocglobaltech.com" },
      sameAs: ["https://www.linkedin.com/company/oc-global-technology-sdn-bhd"],
      brand: platforms.map((p) => ({ "@type": "Brand", name: p.name, slogan: p.tag, description: p.desc })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "OC International",
      alternateName: ["OC International Holding", "OCIH"],
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {/* ---------- Launch screen ---------- */}
      <div className="intro" aria-hidden>
        <div className="intro-panel">
          <div className="intro-content">
            <svg viewBox={OC_VIEWBOX} className="intro-mark w-[clamp(140px,22vw,260px)] overflow-visible">
              <path d={OC_PATH} pathLength={1} fillRule="evenodd" />
            </svg>
            <div className="wrap absolute inset-x-0 bottom-0 pb-[clamp(24px,4vw,48px)]">
              <div className="t-label flex items-end justify-between gap-6 text-bone/60">
                <p>
                  OC International
                  <br />
                  Holding Sdn. Bhd.
                </p>
                <p className="intro-count text-[clamp(40px,7vw,96px)] leading-none font-medium tracking-[-0.04em] text-bone" />
              </div>
              <div className="mt-5 h-px bg-bone/15">
                <div className="intro-bar h-full bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bone">
        Skip to content
      </a>

      {/* ---------- Navigation ---------- */}
      <header className="nav">
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <a href="#top" className="shrink-0" aria-label="OC International Holding, back to top">
            <Image src="/images/ocih-logo.svg" alt="" width={408} height={249} priority className="h-[52px] w-auto" />
          </a>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-7">
              {nav.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="nav-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-gold hidden sm:inline-flex">
              Get in touch
            </a>
            <Menu items={[...nav, ["Contact", "#contact"]]} />
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section id="top" className="wrap pt-[clamp(56px,9vw,120px)] pb-[clamp(64px,8vw,112px)]">
          <div className="t-label fade-in mb-8 flex items-center justify-between gap-6 text-muted" style={{ "--d": "0ms" } as React.CSSProperties}>
            <p className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-gold" />
              Parent company · Group of companies
            </p>
            <p className="hidden sm:block">
              Johor Bahru · <Clock />
            </p>
          </div>
          <h1 className="text-[clamp(64px,15.5vw,224px)] leading-[0.86] font-medium tracking-[-0.055em]">
            <span className="fade-in block" style={{ "--d": "80ms" } as React.CSSProperties}>
              <span className="sr-only">OC </span>
              <span className="relative mb-[0.04em] block h-[0.7em] w-[1.735em]">
                <OC3D>
                  <Mark className="h-full w-full text-gold" />
                </OC3D>
              </span>
            </span>
            <span className="hero-line">
              <span style={{ "--i": 1 } as React.CSSProperties}>
                International
                <span className="text-gold">.</span>
              </span>
            </span>
          </h1>

          <div className="mt-[clamp(48px,6vw,88px)] grid gap-12 md:grid-cols-12">
            <div className="fade-in md:col-span-6" style={{ "--d": "450ms" } as React.CSSProperties}>
              <p className="t-body max-w-[52ch] text-[clamp(18px,1.5vw,21px)]">
                OC International Holding Sdn. Bhd. is the parent company of a growing group of businesses. Its first group company is OC Global Technology Sdn. Bhd., the Malaysian technology company powering digital
                growth through conversation, commerce and community platforms.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#group" className="btn-ink">
                  <span className="dot">
                    <Arrow />
                  </span>
                  Explore the group
                </a>
                <External href={OCGT} className="btn-ghost">
                  <span className="dot">
                    <Arrow />
                  </span>
                  ocglobaltech.com
                </External>
              </div>
            </div>
            <dl className="fade-in grid grid-cols-2 gap-x-6 gap-y-8 self-end md:col-span-5 md:col-start-8" style={{ "--d": "600ms" } as React.CSSProperties}>
              {[
                ["Role", "Parent company"],
                ["Group companies", "OC Global Technology Sdn.\u00a0Bhd."],
                ["Subsidiary HQ", "Johor Bahru, Malaysia"],
                ["Subsidiary status", "Malaysia Digital (MD) company"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-mist pt-3">
                  <dt className="t-label text-muted">{k}</dt>
                  <dd className="mt-2 text-base font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- Globe interlude ---------- */}
        <section aria-label="The group ecosystem" className="px-[clamp(8px,1.2vw,16px)]">
          <div className="expand relative h-[clamp(520px,86vh,860px)] overflow-hidden rounded-[20px] bg-ash">
            <Globe />
            <div className="t-label expand-pad pointer-events-none absolute inset-0 flex flex-col justify-between p-[clamp(16px,2.4vw,32px)] text-muted">
              <div className="flex justify-between gap-4">
                <span>Fig. 01 — The group ecosystem</span>
                <span className="hidden sm:inline">1.4927° N · 103.7414° E</span>
              </div>
              <div className="flex justify-between gap-4 whitespace-nowrap">
                <span className="hidden sm:inline">Drag to rotate</span>
                <span>1 ecosystem · 4 platforms</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 01 Group structure ---------- */}
        <section id="group" className="section wrap">
          <SecHead n="01" label="Group structure" />
          <div className="mt-16 grid gap-10 md:grid-cols-12">
            <h2 className="t-h1 reveal md:col-span-7">
              One parent.
              <br />
              One subsidiary.
              <br />
              Four platforms.
            </h2>
            <div className="reveal md:col-span-4 md:col-start-9 md:pt-3">
              <p className="t-body">OC International sits at the top of the group as the parent company of OC Global Technology Sdn. Bhd.</p>
              <p className="t-body mt-5">OC Global Technology designs, builds and operates digital solutions end to end. One team, one foundation, focused on lasting impact across Southeast Asia.</p>
            </div>
          </div>

          {/* Diagram */}
          <div className="mt-20 flex flex-col items-center" role="group" aria-label="Group structure diagram">
            <div className="node node-parent reveal w-full max-w-[520px] text-center">
              <p className="t-label">Parent company</p>
              <Mark className="mx-auto mt-4 h-9 w-auto" />
              <p className="t-h3 mt-3">OC International</p>
            </div>
            <div className="wire-v draw h-16" />
            <div className="node node-sub reveal w-full max-w-[520px] text-center">
              <p className="t-label text-gold">Subsidiary</p>
              <p className="t-h3 mt-3">OC Global Technology Sdn.&nbsp;Bhd.</p>
              <p className="mt-2 text-base text-[#bdb7a9]">Johor Bahru, Malaysia</p>
            </div>
            <div className="wire-v draw h-12" />
            <div className="relative w-full">
              <div className="wire-h draw-x absolute top-0 right-[calc((100%-72px)/8)] left-[calc((100%-72px)/8)] hidden md:block" />
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {platforms.map((p, i) => (
                  <li key={p.name} className="reveal flex flex-col items-center" style={{ animationRangeStart: `entry ${i * 6}%` }}>
                    <div className="wire-v draw hidden h-12 md:block" />
                    <div className="node w-full flex-1 text-center transition-colors duration-500 hover:border-ink">
                      <p className="t-label text-muted">0{i + 1}</p>
                      <p className="mt-2 text-xl font-medium tracking-tight">{p.name}</p>
                      <p className="t-small mt-1">{p.tag}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Marquee ---------- */}
        <div className="overflow-hidden border-y border-mist py-6" aria-hidden>
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {["Conversation", "Commerce", "Community", "Conversation", "Commerce", "Community"].map((w, i) => (
                  <span key={i} className="flex items-center text-[clamp(40px,6vw,88px)] font-medium tracking-[-0.035em]">
                    <span className="px-[0.35em]">{w}</span>
                    <span className="inline-block h-[0.22em] w-[0.22em] rounded-full bg-gold" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- 02 OCGT (dark) ---------- */}
        <section id="ocgt" className="on-dark section mt-[var(--section)] bg-ink text-bone">
          <div className="wrap">
            <SecHead n="02" label="Our subsidiary" />
            <div className="mt-16 grid gap-12 md:grid-cols-12">
              <div className="reveal md:col-span-7">
                <Image src="/images/ocgt-logo.webp" alt="OC Global Technology logo" width={359} height={449} className="mb-10 h-20 w-auto" />
                <h2 className="t-h1">
                  Powering
                  <br />
                  Digital <span className="text-gold">Growth.</span>
                </h2>
              </div>
              <div className="reveal md:col-span-5 md:pt-28">
                <p className="text-[clamp(18px,1.5vw,21px)] leading-[1.5] text-[#e8e4da]">
                  OC Global Technology Sdn. Bhd. is a Malaysian technology company building smart, scalable and engaging digital solutions.
                </p>
                <p className="mt-5 text-lg leading-[1.5] text-[#bdb7a9]">
                  From product engineering and digital transformation to scalable ecosystem development, it helps businesses and organisations create meaningful digital experiences across Southeast
                  Asia.
                </p>
                <External href={OCGT} className="btn-ghost mt-10 text-bone">
                  <span className="dot">
                    <Arrow />
                  </span>
                  Visit ocglobaltech.com
                </External>
              </div>
            </div>

            <div className="vt reveal relative mt-24 aspect-[16/9] overflow-hidden rounded-[20px] md:aspect-[21/8]">
              <Image src="/images/art/coil.jpg" alt="" fill sizes="(max-width: 1200px) 100vw, 1200px" className="parallax object-cover" />
            </div>

            <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
              {stats.map(([n, l]) => (
                <div key={l} className="stat reveal">
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-[clamp(40px,4vw,60px)] leading-none font-medium tracking-[-0.04em]">{n}</dd>
                  <dd className="t-label mt-4 text-[#bdb7a9]">{l}</dd>
                </div>
              ))}
            </dl>

            <div className="reveal mt-24 flex flex-col items-start gap-6 border-t border-[#3a362e] pt-10 sm:flex-row sm:items-center">
              <Image src="/images/malaysia-digital-invert.webp" alt="Malaysia Digital logo" width={512} height={296} className="h-14 w-auto" />
              <p className="max-w-[48ch] text-base text-[#bdb7a9]">OC Global Technology Sdn. Bhd. is a Malaysia Digital (MD) Status company.</p>
            </div>
          </div>
        </section>

        {/* ---------- 03 Platforms ---------- */}
        <section id="platforms" className="section">
          <div className="wrap">
            <SecHead n="03" label="Platforms" />
            <div className="mt-16 grid gap-10 md:grid-cols-12">
              <h2 className="t-h1 reveal md:col-span-7">Built in-house. Working as one.</h2>
              <p className="t-body reveal md:col-span-4 md:col-start-9 md:pt-3">Streaming, communication, care and coaching, working as one and powered by a single shared foundation.</p>
            </div>
          </div>
          <div className="mt-16">
            <Rail label="Platforms by OC Global Technology">
              {platforms.map((p, i) => (
                <article key={p.name} className="card">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="card-img">
                      <span className="badge absolute top-4 left-4 z-10 bg-bone">0{i + 1} / 04</span>
                      <Image src={p.img} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 640px) 86vw, 440px" className="absolute inset-0 h-full w-full object-contain p-[9%]" />
                    </div>
                    <div className="px-1 pt-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="t-h3">{p.name}</h3>
                        <span className="t-label text-muted">{p.tag}</span>
                      </div>
                      <p className="t-small mt-3 line-clamp-4">{p.desc}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {p.features.map((f) => (
                          <li key={f} className="badge">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </article>
              ))}
            </Rail>
          </div>
        </section>

        {/* ---------- Ribbons interlude ---------- */}
        <section aria-label="Gold ribbons render" className="mb-[var(--section)] px-[clamp(8px,1.2vw,16px)]">
          <div className="expand relative h-[clamp(420px,78vh,780px)] overflow-hidden rounded-[20px] bg-ash">
            <Image src="/images/art/ribbons.jpg" alt="" fill sizes="100vw" className="parallax object-cover" />
            <div className="t-label expand-pad pointer-events-none absolute inset-0 flex items-end justify-between p-[clamp(16px,2.4vw,32px)] text-ink">
              <span className="rounded-[8px] bg-bone px-2.5 py-1">Fig. 02 — Built in-house</span>
            </div>
          </div>
        </section>

        {/* ---------- 04 Pillars ---------- */}
        <section id="pillars" className="section wrap pt-0">
          <SecHead n="04" label="How OCGT builds" />
          <div className="mt-16 grid gap-10 md:grid-cols-12">
            <h2 className="t-h1 reveal md:col-span-7">
              Setting new standards for <span className="mark">digital trust.</span>
            </h2>
            <p className="t-body reveal md:col-span-4 md:col-start-9 md:pt-3">
              At OC Global Technology, reliability isn&rsquo;t a box to check. It&rsquo;s a commitment strengthened daily with rigorous engineering, continuous innovation and a culture where quality
              comes first.
            </p>
          </div>
          <ol className="mt-20 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(([t, d], i) => (
              <li key={t} className="pillar reveal">
                <p className="t-label text-muted">(0{i + 1})</p>
                <h3 className="t-h3 mt-10">{t}</h3>
                <p className="t-small mt-3">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- 05 Recognition ---------- */}
        <section id="recognition" className="section wrap pt-0">
          <SecHead n="05" label="Recognition" />
          <div className="mt-16 grid gap-10 md:grid-cols-12">
            <h2 className="t-h1 reveal md:col-span-7">Recognised along the way.</h2>
            <p className="t-body reveal md:col-span-4 md:col-start-9 md:pt-3">Recent milestones and recognitions earned by OC Global Technology, from national digital status to industry awards.</p>
          </div>
          <ul className="mt-16 border-b border-mist">
            {milestones.map((m) => (
              <li key={m.title} className="row reveal">
                <External href={m.href} className="group grid gap-2 py-7 md:grid-cols-12 md:gap-6">
                  <span className="t-label pt-1.5 text-muted md:col-span-2">{m.date}</span>
                  <span className="t-h3 md:col-span-5">{m.title}</span>
                  <span className="t-small md:col-span-4">{m.desc}</span>
                  <span className="hidden justify-end md:col-span-1 md:flex">
                    <span className="dot border border-mist transition-colors duration-300 group-hover:border-gold group-hover:bg-gold">
                      <Arrow />
                    </span>
                  </span>
                </External>
              </li>
            ))}
          </ul>

          <External
            href="https://www.dailyexpress.com.my/news/286666/digital-security-and-small-businesses/"
            className="reveal group mt-12 grid gap-6 rounded-[20px] bg-ash p-[clamp(24px,3vw,40px)] transition-colors duration-500 hover:bg-gold-wash md:grid-cols-12"
          >
            <span className="t-label text-muted md:col-span-3">In the press · Daily Express</span>
            <span className="md:col-span-8">
              <span className="t-h2 block">Digital security and small businesses</span>
              <span className="t-small mt-4 block max-w-[60ch]">
                OC Global Technology&rsquo;s Chief Innovation Officer, Mohamad Fazuan Mohd Wafat, joined the cybersecurity panel at the Malaysia Digital Economy Forum 2026, setting out what a small
                business should protect first when the budget is tight.
              </span>
            </span>
            <span className="flex md:col-span-1 md:justify-end">
              <span className="dot bg-ink text-bone">
                <Arrow />
              </span>
            </span>
          </External>
        </section>

        {/* ---------- 06 Leadership ---------- */}
        <section id="leadership" className="section wrap pt-0">
          <SecHead n="06" label="Leadership" />
          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <div className="reveal self-start md:sticky md:top-32 md:col-span-5">
              <h2 className="t-h1">The people building it.</h2>
              <p className="t-body mt-8 max-w-[40ch]">The leadership team at OC Global Technology, supported by a development team of full stack developers and creative technologists.</p>
            </div>
            <ol className="border-b border-mist md:col-span-7">
              {leaders.map(([name, role], i) => (
                <li key={name} className="row reveal grid grid-cols-[40px_1fr] gap-x-4 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-baseline">
                  <span className="t-label text-muted">0{i + 1}</span>
                  <span className="text-[clamp(20px,1.8vw,24px)] font-medium tracking-[-0.012em]">{name}</span>
                  <span className="t-small col-start-2 sm:col-start-3 sm:text-right">{role}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- 07 Careers ---------- */}
        <section id="careers" className="wrap pb-[var(--section)]">
          <SecHead n="07" label="Careers" />
          <div className="reveal mt-16 grid overflow-hidden rounded-[20px] bg-ash md:grid-cols-12">
            <div className="vt relative aspect-[4/3] overflow-hidden bg-ash md:col-span-5 md:aspect-auto md:min-h-[560px]">
              <Image src="/images/art/sculpture.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 500px" className="parallax object-cover mix-blend-multiply" />
            </div>
            <div className="flex flex-col justify-between gap-12 p-[clamp(24px,4vw,56px)] md:col-span-7">
              <div>
                <p className="t-label text-muted">Now hiring at OC Global Technology</p>
                <h2 className="mt-6 text-[clamp(36px,4.2vw,60px)] leading-[0.98] font-medium tracking-[-0.035em]">We&rsquo;re building digital platforms that matter.</h2>
              </div>
              <div className="flex max-w-[44ch] flex-col">
                <p className="t-body">Come build them with us. Internships, graduate roles and full-time positions in Johor Bahru.</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <li key={r} className="badge bg-bone">
                      {r}
                    </li>
                  ))}
                </ul>
                <External href={`${OCGT}/careers`} className="btn-ink mt-8 self-start">
                  <span className="dot">
                    <Arrow />
                  </span>
                  View open roles
                </External>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 08 Contact ---------- */}
        <section id="contact" className="wrap pb-[clamp(64px,8vw,120px)]">
          <SecHead n="08" label="Contact" />
          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <div className="reveal md:col-span-8">
              <h2 className="text-[clamp(56px,8.6vw,124px)] leading-[0.9] font-medium tracking-[-0.045em]">
                Let&rsquo;s build
                <br />
                what&rsquo;s next.
              </h2>
              <a href="mailto:info@ocglobaltech.com" className="btn-gold mt-12 !px-7 !py-4 text-lg">
                info@ocglobaltech.com
                <Arrow size={18} />
              </a>
            </div>
            <dl className="reveal grid content-end gap-8 sm:grid-cols-2 md:col-span-4">
              <div className="border-t border-mist pt-3 sm:col-span-2">
                <dt className="t-label text-muted">OC Global Technology HQ</dt>
                <dd className="mt-2 text-lg leading-snug">
                  Unit 09-04, Level 9, City Plaza,
                  <br />
                  Jalan Tebrau, 80300 Johor Bahru,
                  <br />
                  Johor, Malaysia
                </dd>
              </div>
              <div className="border-t border-mist pt-3">
                <dt className="t-label text-muted">Office</dt>
                <dd className="mt-2 text-lg">
                  <a href="tel:+6072831973" className="nav-link text-lg text-ink">
                    +60 7-283 1973
                  </a>
                </dd>
              </div>
              <div className="border-t border-mist pt-3">
                <dt className="t-label text-muted">WhatsApp</dt>
                <dd className="mt-2 text-lg">
                  <a href="https://wa.me/60132387600" target="_blank" rel="noopener noreferrer" className="nav-link text-lg text-ink">
                    +60 13-238 7600
                  </a>
                </dd>
              </div>
              <div className="border-t border-mist pt-3 sm:col-span-2">
                <dt className="t-label text-muted">LinkedIn</dt>
                <dd className="mt-2 text-lg">
                  <a href="https://www.linkedin.com/company/oc-global-technology-sdn-bhd" target="_blank" rel="noopener noreferrer" className="nav-link text-lg text-ink">
                    OC Global Technology Sdn. Bhd.
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="overflow-hidden border-t border-mist">
        <div className="wrap pt-10">
          <div className="flex flex-col justify-between gap-4 text-base text-muted sm:flex-row">
            <div>
              <p>© 2026 OC International Holding Sdn. Bhd. Parent company of OC Global Technology Sdn. Bhd.</p>
            </div>
            <a href="#top" className="nav-link self-start text-muted">
              Back to top ↑
            </a>
          </div>
          <p aria-hidden className="mt-12 pb-[0.22em] text-[clamp(40px,12.6vw,164px)] leading-[0.86] font-medium tracking-[-0.055em] whitespace-nowrap select-none">
            <span className="flex items-end gap-[0.18em]">
              <Mark className="mb-[0.02em] h-[0.7em] w-auto text-gold" />
              International
            </span>
            <span className="block">Holding Sdn. Bhd.</span>
          </p>
        </div>
      </footer>
    </>
  );
}

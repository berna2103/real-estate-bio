"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Gilda_Display, Jost } from "next/font/google";
import { 
  Building2, 
  ArrowUpRight, 
  Languages, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar,
  Menu,
  X
} from "lucide-react";

const gilda = Gilda_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const content = {
  en: {
    taglineSubtitle: "Bernardo Jimenez · Realty of America",
    heroHeading: "Chicago\nReal Estate",
    heroText: "Thoughtful guidance for buying and selling across Chicago and its surrounding suburbs. In English and Spanish.",
    btnStart: "Start a conversation",
    btnExplore: "Explore homes",
    badgeLocation: "Chicago · Illinois",
    navAbout: "About",
    navMarkets: "Markets",
    navSearch: "Home Search",
    navValuation: "Valuation",
    navTalk: "Let’s talk",
    toggleLabel: "Español",
    cmaBadge: "A considered approach",
    cmaTitle: "A better way to make your next move.",
    cmaText: "Every decision begins with listening. Bernardo brings local knowledge, practical strategy, and steady communication to the moments that matter.",
    valuationBoxTitle: "Request a Thoughtful Valuation",
    valuationBoxSubtitle: "Enter your address below for an instant property assessment",
    featuredBadge: "The places we know",
    featuredTitle: "Featured Office Listings",
    featuredSubtitle: "Explore premier residential opportunities throughout Chicago and the surrounding suburbs.",
    btnAllListings: "View All Properties on MLS",
    aboutBadge: "Meet your broker",
    aboutHeading: "Bernardo Jimenez",
    aboutLead: "A Chicago-area broker who believes clarity is the beginning of every good decision.",
    aboutBody: "With an MBA and a practical, attentive approach, Bernardo works closely with residential buyers and sellers from the city to the surrounding suburbs. The conversation is always personal. The plan is always yours.",
    aboutLic: "English & Spanish · Illinois Licensed Broker # 475.218221",
    ctaHeading: "Good moves begin with a conversation.",
    ctaBody: "Whether you are thinking of selling or ready to find a place of your own, begin with a conversation grounded in your goals.",
    bookCall: "Schedule a 30-Min Strategy Call",
  },
  es: {
    taglineSubtitle: "Bernardo Jimenez · Realty of America",
    heroHeading: "Bienes Raíces\nen Chicago",
    heroText: "Asesoría estratégica y transparente para comprar y vender en Chicago y sus suburbios. En inglés y español.",
    btnStart: "Iniciar conversación",
    btnExplore: "Explorar propiedades",
    badgeLocation: "Chicago · Illinois",
    navAbout: "Acerca de",
    navMarkets: "Mercados",
    navSearch: "Búsqueda",
    navValuation: "Valuación",
    navTalk: "Contáctame",
    toggleLabel: "English",
    cmaBadge: "Un enfoque estratégico",
    cmaTitle: "Una mejor manera de dar tu siguiente paso.",
    cmaText: "Cada decisión comienza escuchando. Bernardo aporta conocimiento del mercado local, estrategia práctica y comunicación constante.",
    valuationBoxTitle: "Calcula el Valor de tu Propiedad",
    valuationBoxSubtitle: "Ingresa tu dirección para recibir un reporte de mercado en tiempo real",
    featuredBadge: "Los lugares que conocemos",
    featuredTitle: "Propiedades Destacadas de la Oficina",
    featuredSubtitle: "Explora oportunidades residenciales exclusivas en Chicago y áreas conurbadas.",
    btnAllListings: "Ver Todas las Propiedades en MLS",
    aboutBadge: "Conoce a tu corredor",
    aboutHeading: "Bernardo Jimenez",
    aboutLead: "Un profesional que cree que la claridad es el punto de partida de toda buena decisión.",
    aboutBody: "Con una maestría en administración de empresas (MBA) y un enfoque práctico y personalizado, Bernardo guía a compradores y vendedores residenciales con absoluta dedicación.",
    aboutLic: "Hablo Español · Licencia de Illinois # 475.218221",
    ctaHeading: "Las mejores decisiones comienzan con una plática.",
    ctaBody: "Ya sea que estés pensando en vender o listo para encontrar tu nuevo hogar, comencemos con una conversación centrada en tus metas.",
    bookCall: "Agenda una Llamada Estratégica (30 Min)",
  }
};

export default function LuxuryRealEstatePage() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
      if (browserLang.toLowerCase().startsWith("es")) {
        setLang("es");
      }
    }
  }, []);

  const t = content[lang];

  return (
    <>
      <Script 
        src="https://em.realscout.com/widgets/realscout-widgets.js" 
        strategy="lazyOnload" 
      />

      <div className={`${gilda.variable} ${jost.variable} font-sans bg-[#f7f5f0] text-[#16242c] selection:bg-[#a89078]/30 min-h-screen flex flex-col`}>
        
        {/* HEADER / NAVIGATION */}
        <header className="fixed inset-x-0 top-0 z-50 bg-[#16242c]/95 backdrop-blur-md border-b border-[#2a3840] text-[#f7f5f0] transition-all">
          <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between gap-6 px-6 md:px-12 lg:px-20">
            <a href="/" className="flex flex-col leading-none">
              <span className="font-['Gilda_Display'] text-[23px] tracking-tight text-white">Bernardo Jimenez</span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-[#a5b0b5]">Realty of America</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-7 lg:flex">
              <a href="#about" className="text-[11px] uppercase tracking-[0.18em] text-[#f7f5f0] hover:text-[#c4a98b] transition-colors">
                {t.navAbout}
              </a>
              <a href="https://bernardojimenez.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.18em] text-[#f7f5f0] hover:text-[#c4a98b] transition-colors">
                {t.navSearch}
              </a>
              <a href="#valuation" className="text-[11px] uppercase tracking-[0.18em] text-[#f7f5f0] hover:text-[#c4a98b] transition-colors">
                {t.navValuation}
              </a>
              <a href="https://calendly.com/listwithbernardo/30min" target="_blank" rel="noopener noreferrer" className="border-b border-[#f7f5f0] pb-0.5 text-[11px] uppercase tracking-[0.18em] text-white hover:text-[#c4a98b] hover:border-[#c4a98b] transition-colors">
                {t.navTalk}
              </a>

              {/* Direct Fast Call Button */}
              <a 
                href="tel:7083140477"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#c4a98b] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>(708) 314-0477</span>
              </a>

              {/* Email Icon */}
              <a 
                href="mailto:bernardo.jimenez@realtyofamerica.com"
                className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 hover:text-[#c4a98b] transition-colors"
                title="Email Bernardo"
                aria-label="Email Bernardo"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10 transition active:scale-95 cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-[#c4a98b]" />
                <span>{t.toggleLabel}</span>
              </button>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <a 
                href="tel:7083140477"
                className="p-2 rounded-full border border-white/20 text-[#c4a98b]"
                aria-label="Call Bernardo"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/20 text-[11px] text-white"
              >
                <Languages className="w-3 h-3 text-[#c4a98b]" />
                <span>{t.toggleLabel}</span>
              </button>

              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white border border-white/20"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#16242c] border-b border-[#2a3840] px-6 py-6 space-y-4 text-sm uppercase tracking-widest text-center">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white/90">{t.navAbout}</a>
              <a href="https://bernardojimenez.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="block py-2 text-white/90">{t.navSearch}</a>
              <a href="#valuation" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white/90">{t.navValuation}</a>
              <a href="https://calendly.com/listwithbernardo/30min" target="_blank" rel="noopener noreferrer" className="block py-2 text-[#c4a98b] font-medium">{t.navTalk}</a>
            </div>
          )}
        </header>

        {/* HERO SECTION WITH CINEMATIC VIDEO */}
        <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#16242c] text-white">
          <video 
            className="absolute inset-0 h-full w-full object-cover"
            src="https://dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net/preview-sites/bd09618a-b933-45b9-217f-08df1a5e6eb3/videos/ce94f303-d734-46f7-acd4-5cd9c67c76e0.mp4"
            poster="https://dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net/preview-sites/bd09618a-b933-45b9-217f-08df1a5e6eb3/images/0151b671-331f-43c7-a29d-d1d96585f898.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-[#16242c]/65" />

          <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-36 md:px-12 md:pb-24 lg:px-20 lg:pb-28">
            <div className="max-w-3xl border-l border-white/60 pl-6 md:pl-10">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-white/90 md:mb-6">
                {t.taglineSubtitle}
              </p>
              
              <h1 className="font-['Gilda_Display'] text-[clamp(3.5rem,7.5vw,7.5rem)] leading-[1.05] tracking-[-0.04em] text-white whitespace-pre-line">
                {t.heroHeading}
              </h1>

              <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-white/90 font-light">
                {t.heroText}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5 md:gap-8">
                <a 
                  href="https://calendly.com/listwithbernardo/30min"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-white bg-white px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#16242c] hover:bg-transparent hover:text-white transition-all duration-300"
                >
                  {t.btnStart}
                </a>
                <a 
                  href="https://bernardojimenez.realscout.com/onboarding"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border-b border-white pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white hover:text-[#c4a98b] hover:border-[#c4a98b] transition-all duration-300"
                >
                  {t.btnExplore}
                </a>
              </div>

              {/* Quick Connect Strip (Phone, Email, Socials) */}
              <div className="mt-10 pt-6 border-t border-white/20 max-w-xl flex flex-wrap items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-4 text-xs tracking-wider uppercase font-medium">
                  <a 
                    href="tel:7083140477" 
                    className="flex items-center gap-1.5 text-[#c4a98b] hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>(708) 314-0477</span>
                  </a>
                  <span className="text-white/30">•</span>
                  <a 
                    href="mailto:bernardo.jimenez@realtyofamerica.com" 
                    className="flex items-center gap-1.5 hover:text-[#c4a98b] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#c4a98b]" />
                    <span>Email</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <a 
                    href="https://www.instagram.com/chicago.realtor2103" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/listwithbernardo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@listwithbernardo" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                    title="TikTok"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.46V8.78a8.2 8.2 0 0 0 4.91 1.62v-3.71z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-white/80 md:mt-20">
              <span className="h-px w-12 bg-white/80" />
              {t.badgeLocation}
            </div>
          </div>
        </section>

        {/* VALUATION & SERVICES SECTION WITH REALSCOUT CMA EMBED */}
        <section id="valuation" className="py-20 md:py-32 bg-[#f7f5f0] text-[#16242c]">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20 grid gap-12 lg:grid-cols-12 lg:items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#6b767d]">
                {t.cmaBadge}
              </p>
              <h2 className="font-['Gilda_Display'] text-[clamp(2.4rem,4vw,4.5rem)] leading-[1.08] tracking-[-0.035em]">
                {t.cmaTitle}
              </h2>
              <p className="max-w-md text-base leading-8 text-[#546168]">
                {t.cmaText}
              </p>

              <div className="pt-6 border-t border-[#ded9cf] space-y-4">
                <a 
                  href="https://bernardojimenez.realscout.com/onboarding" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-[#ded9cf] pb-4 text-[#16242c]"
                >
                  <div>
                    <span className="block font-['Gilda_Display'] text-2xl">Find a home</span>
                    <span className="text-sm text-[#6b767d]">Explore homes across the Chicago area</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href="https://calendly.com/listwithbernardo/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-[#ded9cf] pb-4 text-[#16242c]"
                >
                  <div>
                    <span className="block font-['Gilda_Display'] text-2xl">Schedule a Strategy Call</span>
                    <span className="text-sm text-[#6b767d]">30-minute direct telephone or Zoom consultation</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* RealScout Instant Home Valuation Embed Card */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-2xl border border-[#ded9cf] shadow-xl">
              <div className="text-center max-w-sm mx-auto mb-6">
                <h3 className="font-['Gilda_Display'] text-2xl text-[#16242c]">
                  {t.valuationBoxTitle}
                </h3>
                <p className="text-xs text-[#6b767d] mt-1.5">
                  {t.valuationBoxSubtitle}
                </p>
              </div>

              <div id="realscout-home-value-widget" className="w-full flex justify-center">
                {/* @ts-expect-error - RealScout custom web component */}
                <realscout-home-value 
                  agent-encoded-id="QWdlbnQtMzA4MjQ0" 
                  include-phone 
                  remove-subtitle
                />
              </div>
            </div>

          </div>
        </section>

        {/* FEATURED OFFICE LISTINGS WITH REALSCOUT CAROUSEL */}
        <section className="py-20 md:py-28 bg-[#16242c] text-[#f7f5f0]">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20">
            
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-[#2a3840] pb-8">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#a5b0b5]">
                  {t.featuredBadge}
                </p>
                <h2 className="font-['Gilda_Display'] text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[1.06] tracking-[-0.035em]">
                  {t.featuredTitle}
                </h2>
                <p className="text-sm text-[#a5b0b5] mt-2 max-w-lg">
                  {t.featuredSubtitle}
                </p>
              </div>

              <a 
                href="https://bernardojimenez.realscout.com/onboarding" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-white pb-1 text-xs uppercase tracking-[0.18em] hover:text-[#c4a98b] hover:border-[#c4a98b] transition-colors"
              >
                <span>{t.btnAllListings}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Embedded Carousel Web Component */}
            <div className="w-full bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
              {/* @ts-expect-error - RealScout custom office listings web component */}
              <realscout-office-listings 
  agent-encoded-id="QWdlbnQtMzA4MjQ0" 
  cities="Chicago,Berwyn,Calumet City"
  sort-order="NEWEST" 
  listing-status="For Sale" 
  property-types="SFR,MF,TC" 
  include-seller-listings>
</realscout-office-listings>
            </div>

          </div>
        </section>

        {/* ABOUT BERNARDO SECTION */}
        <section id="about" className="py-20 md:py-32 bg-[#f7f5f0] text-[#16242c]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16 lg:px-12">
            
            <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-2xl bg-[#e6e2d8] border border-[#ded9cf] shadow-md">
              <img 
                src="https://dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net/preview-sites/bd09618a-b933-45b9-217f-08df1a5e6eb3/images/e60545aa-09d2-431e-80ec-da138ef82493.png"
                alt="Bernardo Jimenez, Chicago-area real estate broker"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#6b767d]">
                {t.aboutBadge}
              </p>
              <h2 className="font-['Gilda_Display'] text-[clamp(2.6rem,4vw,4.8rem)] leading-[1.06] tracking-[-0.04em]">
                {t.aboutHeading}
              </h2>
              <p className="text-lg leading-8 font-normal">
                {t.aboutLead}
              </p>
              <p className="leading-8 text-[#546168]">
                {t.aboutBody}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#6b767d] pt-2">
                {t.aboutLic}
              </p>
              
              <div className="pt-6 flex flex-wrap gap-4">
                <a 
                  href="https://calendly.com/listwithbernardo/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#16242c] bg-[#16242c] px-6 py-3.5 text-[11px] uppercase tracking-[0.16em] text-white hover:bg-transparent hover:text-[#16242c] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.bookCall}</span>
                </a>
                
                <a 
                  href="tel:7083140477"
                  className="inline-flex items-center gap-2 border border-[#ded9cf] px-6 py-3.5 text-[11px] uppercase tracking-[0.16em] hover:bg-[#ded9cf]/50 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#16242c]" />
                  <span>(708) 314-0477</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-white text-[#16242c] border-t border-[#ded9cf]">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[340px] md:min-h-[580px]">
              <img 
                src="https://dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net/preview-sites/bd09618a-b933-45b9-217f-08df1a5e6eb3/images/3ccaa6833e043035.jpg"
                alt="Warm living space with natural light"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            
            <div className="flex items-center px-6 py-16 md:px-14 lg:px-20">
              <div className="max-w-lg space-y-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#6b767d]">The next chapter</p>
                <h2 className="font-['Gilda_Display'] text-[clamp(2.4rem,3.8vw,4.5rem)] leading-[1.08] tracking-[-0.035em]">
                  {t.ctaHeading}
                </h2>
                <p className="leading-8 text-[#546168]">
                  {t.ctaBody}
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <a 
                    href="mailto:bernardo.jimenez@realtyofamerica.com"
                    className="border border-[#16242c] bg-[#16242c] px-6 py-4 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-transparent hover:text-[#16242c] transition-colors"
                  >
                    Email Bernardo
                  </a>
                  <a 
                    href="https://calendly.com/listwithbernardo/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#ded9cf] px-6 py-4 text-[11px] uppercase tracking-[0.14em] hover:bg-[#f7f5f0] transition-colors"
                  >
                    Schedule Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#16242c] text-[#f7f5f0] pt-20 pb-10 border-t border-[#2a3840]">
          <div className="mx-auto max-w-[1700px] px-6 md:px-12 lg:px-20">
            <div className="grid gap-12 border-b border-[#2a3840] pb-16 md:grid-cols-[1.4fr_0.6fr_0.6fr]">
              <div>
                <p className="font-['Gilda_Display'] text-[clamp(2.6rem,4.5vw,5rem)] leading-[1.06] tracking-[-0.04em]">
                  Good moves begin<br/>with a conversation.
                </p>
                <a href="mailto:bernardo.jimenez@realtyofamerica.com" className="mt-8 inline-block border-b border-white/80 pb-1 text-sm hover:text-[#c4a98b]">
                  bernardo.jimenez@realtyofamerica.com
                </a>
                <br/>
                <a href="tel:+17083140477" className="mt-3 inline-block text-sm hover:text-[#c4a98b]">
                  (708) 314-0477
                </a>
              </div>

              <div>
                <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[#a5b0b5]">Explore</p>
                <div className="flex flex-col gap-3 text-sm text-[#f7f5f0]/80">
                  <a href="#about" className="hover:text-white">About Bernardo</a>
                  <a href="https://bernardojimenez.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="hover:text-white">Home Search (MLS)</a>
                  <a href="#valuation" className="hover:text-white">Instant Home Valuation</a>
                  <a href="https://calendly.com/listwithbernardo/30min" target="_blank" rel="noopener noreferrer" className="hover:text-white">Schedule 30-Min Call</a>
                </div>
              </div>

              <div>
                <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[#a5b0b5]">Connect</p>
                <div className="flex flex-col gap-3 text-sm text-[#f7f5f0]/80">
                  <a href="https://www.facebook.com/listwithbernardo" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
                  <a href="https://www.tiktok.com/@listwithbernardo" target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
                  <a href="https://www.instagram.com/chicago.realtor2103" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
                </div>
              </div>
            </div>

            {/* Legal & Equal Housing */}
            <div className="grid gap-6 border-b border-[#2a3840] py-8 text-xs text-[#a5b0b5] md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-medium text-white">Bernardo Jimenez · Illinois Licensed Real Estate Broker, License 475.218221</p>
                <p>Realty of America, LLC · Sponsoring broker · 6535 Cermak Rd, Berwyn, IL 60402</p>
                <p>Office: <a href="tel:+17087881900" className="underline">(708) 788-1900</a> · <a href="https://www.realtyofamerica.com/" target="_blank" rel="noopener noreferrer" className="underline">Brokerage website & disclosures</a></p>
              </div>

              <div className="flex items-center gap-3 text-white">
                <svg viewBox="0 0 64 53" role="img" aria-label="Equal Housing Opportunity" className="h-7 w-7 fill-current">
                  <path fillRule="evenodd" clipRule="evenodd" d="M32 1 L63 21 L63 52 L1 52 L1 21 Z M32 7 L58 24 L58 47 L6 47 L6 24 Z M20 23 H44 V30 H20 Z M20 33 H44 V40 H20 Z" />
                </svg>
                <span className="text-xs leading-tight">Equal Housing<br/>Opportunity</span>
              </div>
            </div>

            <div className="pt-6 text-[11px] text-[#a5b0b5] flex flex-col sm:flex-row justify-between gap-2">
              <span>© 2026 Bernardo Jimenez · Realty of America, LLC</span>
              <span>All rights reserved.</span>
            </div>
          </div>
        </footer>

        {/* Floating Mobile Dock (Call, Text, Book) */}
        <div className="fixed bottom-4 inset-x-4 z-40 lg:hidden">
          <div className="mx-auto max-w-sm bg-[#16242c]/95 backdrop-blur-xl border border-white/20 rounded-full py-2.5 px-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-white">
            <a 
              href="tel:7083140477" 
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#c4a98b]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>

            <span className="h-4 w-px bg-white/20" />

            <a 
              href="sms:7083140477" 
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium hover:text-[#c4a98b]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Text</span>
            </a>

            <span className="h-4 w-px bg-white/20" />

            <a 
              href="https://calendly.com/listwithbernardo/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-white hover:text-[#c4a98b]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c4a98b]" />
              <span>Book</span>
            </a>
          </div>
        </div>

      </div>

      {/* Global RealScout Form & Typography Styling */}
      <style jsx global>{`
        realscout-home-value form,
        realscout-home-value .rs-home-value-widget,
        realscout-home-value .form-group {
          margin-left: auto !important;
          margin-right: auto !important;
          justify-content: center !important;
          text-align: center !important;
        }

        realscout-office-listings {
          display: block !important;
          width: 100% !important;
        }

        realscout-office-listings [class*="price"],
        realscout-office-listings .price {
          font-family: var(--font-heading), serif !important;
          color: #16242c !important;
          font-weight: 400 !important;
        }

        realscout-office-listings [class*="address"],
        realscout-office-listings [class*="details"],
        realscout-office-listings span {
          font-family: var(--font-body), sans-serif !important;
        }
      `}</style>
    </>
  );
}
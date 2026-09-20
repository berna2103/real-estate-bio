"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { 
  Home, 
  Search, 
  DollarSign, 
  Phone, 
  Mail, 
  Share2, 
  Calendar,
  Languages,
  Building2,
  ArrowUpRight,
  MessageSquare,
  Sparkles
} from "lucide-react";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair"
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta"
});

const content = {
  en: {
    badge: "Licensed Broker • Chicago & Suburbs",
    tagline: "Strategic guidance. Exceptional real estate results.",
    sharePrompt: "Connect with Bernardo Jimenez - Licensed Real Estate Broker with Realty of America:",
    toggleLabel: "Español",
    quickCall: "Call",
    quickText: "Text",
    quickEmail: "Email",
    cmaTitle: "Instant Home Valuation",
    cmaSubtitle: "Calculate accurate real-time equity & market value for your home",
    featuredTitle: "Featured Office Listings",
    featuredSubtitle: "Curated portfolio of active market inventory",
    viewAllListings: "Explore Complete MLS Portal",
    links: [
      {
        title: "Book a Strategy Call",
        subtitle: "Direct 30-min phone or Zoom consultation",
        href: "https://calendly.com/listwithbernardo/30min",
        icon: Calendar,
        highlight: true,
      },
      {
        title: "Looking to Buy? Start Here!",
        subtitle: "Browse featured listings & curated searches",
        href: "https://bernardojimenez.realscout.com/",
        icon: Home,
      },
      {
        title: "Search All Available Homes",
        subtitle: "Custom MLS search portal & instant alerts",
        href: "https://bernardojimenez.realscout.com/onboarding",
        icon: Search,
      },
      {
        title: "What is Your Home Worth?",
        subtitle: "Full automated equity report",
        href: "https://bernardojimenez.realscout.com/homesearch/home-reports",
        icon: DollarSign,
      },
      {
        title: "Contact Me Directly",
        subtitle: "Mobile • (708) 314-0477",
        href: "tel:7083140477",
        icon: Phone,
      },
    ],
    footerLocation: "Chicago, IL • License # 475.218221",
    footerLegal: "© 2026 Realty of America. Each office is independently owned and operated. Equal Housing Opportunity.",
  },
  es: {
    badge: "Corredor Licenciado • Chicago y Suburbios",
    tagline: "Asesoría estratégica. Resultados excepcionales en bienes raíces.",
    sharePrompt: "Conecta con Bernardo Jimenez - Corredor de Bienes Raíces con Realty of America:",
    toggleLabel: "English",
    quickCall: "Llamar",
    quickText: "Mensaje",
    quickEmail: "Correo",
    cmaTitle: "Valuación Instantánea",
    cmaSubtitle: "Calcula el valor de mercado real y la plusvalía de tu propiedad",
    featuredTitle: "Propiedades Destacadas",
    featuredSubtitle: "Portafolio exclusivo de inventario disponible",
    viewAllListings: "Ver Portal Completo de la MLS",
    links: [
      {
        title: "Agenda una Llamada Estratégica",
        subtitle: "Consulta personalizada de 30 min por teléfono o Zoom",
        href: "https://calendly.com/listwithbernardo/30min",
        icon: Calendar,
        highlight: true,
      },
      {
        title: "¿Buscas Comprar? ¡Empieza Aquí!",
        subtitle: "Propiedades destacadas y búsquedas personalizadas",
        href: "https://bernardojimenez.realscout.com",
        icon: Home,
      },
      {
        title: "Buscar Propiedades Disponibles",
        subtitle: "Portal MLS directo con alertas automáticas",
        href: "https://bernardojimenez.realscout.com/onboarding",
        icon: Search,
      },
      {
        title: "¿Cuánto Vale tu Propiedad?",
        subtitle: "Reporte de valuación detallado",
        href: "https://bernardojimenez.realscout.com/homesearch/home-reports",
        icon: DollarSign,
      },
      {
        title: "Contáctame Directamente",
        subtitle: "Móvil • (708) 314-0477",
        href: "tel:7083140477",
        icon: Phone,
      },
    ],
    footerLocation: "Hablo Español • Chicago, IL • Licencia # 475.218221",
    footerLegal: "© 2026 Realty of America. Cada oficina es de operación independiente. Igualdad de Oportunidades de Vivienda.",
  },
};

export default function LinkInBioPage() {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
      if (browserLang.toLowerCase().startsWith("es")) {
        setLang("es");
      }
    }

    const injectShadowStyles = () => {
      const el = document.querySelector("realscout-office-listings");
      if (el && el.shadowRoot) {
        if (!el.shadowRoot.querySelector("#rs-force-2col")) {
          const style = document.createElement("style");
          style.id = "rs-force-2col";
          style.textContent = `
            .swiper-slide,
            [class*="slide"],
            [class*="card"] {
              width: calc(50% - 6px) !important;
              min-width: calc(50% - 6px) !important;
              max-width: calc(50% - 6px) !important;
              flex: 0 0 calc(50% - 6px) !important;
              box-sizing: border-box !important;
            }
            .swiper-wrapper,
            [class*="wrapper"] {
              display: flex !important;
              gap: 12px !important;
              transform: none !important;
            }
          `;
          el.shadowRoot.appendChild(style);
        }
      }
    };

    const observer = new MutationObserver(() => {
      injectShadowStyles();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    injectShadowStyles();

    return () => observer.disconnect();
  }, []);

  const current = content[lang];

  const handleShare = async () => {
    const shareData = {
      title: "Bernardo Jimenez - REALTOR®",
      text: current.sharePrompt,
      url: typeof window !== "undefined" ? window.location.href : "https://barcias.com",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // SMS fallback
      }
    }

    const body = encodeURIComponent(`${shareData.text} ${shareData.url}`);
    window.location.href = `sms:?&body=${body}`;
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <>
      <Script 
        src="https://em.realscout.com/widgets/realscout-widgets.js" 
        strategy="lazyOnload" 
      />

      <main 
        className={`${jakarta.className} ${playfair.variable} min-h-screen bg-[#0d1f42] bg-gradient-to-b from-[#10295A] via-[#0d224b] to-[#09152b] relative text-white antialiased flex flex-col justify-between px-3 sm:px-6 lg:px-12 py-4 sm:py-8 selection:bg-[#1A9175]/40`}
      >
        {/* Ambient Subtle Gradients for Desktop */}
        <div className="hidden lg:block absolute -top-20 left-1/4 w-[40rem] h-[40rem] bg-[#1A9175]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="hidden lg:block absolute bottom-0 right-10 w-[35rem] h-[35rem] bg-[#DB1263]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Global Floating Header Bar */}
        <header className="w-full max-w-sm lg:max-w-6xl mx-auto flex items-center justify-between mb-4 sm:mb-6">
          <button
            type="button"
            onClick={toggleLanguage}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#10295A] text-xs sm:text-[13px] font-semibold backdrop-blur-xl border border-white/20 transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5 text-[#1A9175] group-hover:text-[#10295A] transition-colors" />
            <span>{current.toggleLabel}</span>
          </button>
          
          <button 
            type="button"
            onClick={handleShare}
            aria-label="Share this link via text or app"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#10295A] backdrop-blur-xl flex items-center justify-center border border-white/20 transition-all duration-300 cursor-pointer shadow-md active:scale-95"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </header>

        {/* Responsive Grid: Single column on mobile, sticky dual-column layout on laptop/desktop */}
        <div className="w-full max-w-sm lg:max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start space-y-4 lg:space-y-0">
          
          {/* LEFT COLUMN: Sticky Floating Bio Card */}
          <section className="lg:col-span-5 lg:sticky lg:top-8 lg:self-start space-y-3 sm:space-y-4">
            <div className="w-full bg-white/[0.05] backdrop-blur-2xl rounded-[2.25rem] sm:rounded-[2.75rem] p-5 sm:p-7 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.45)] relative overflow-hidden transition-all duration-300">
              {/* Subtle Card Glow Highlight */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#1A9175]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Profile Header */}
              <div className="relative flex flex-col items-center text-center">
                
                {/* Realty of America Logo */}
                <div className="relative w-64 sm:w-72 h-13 mb-3 opacity-95 hover:opacity-100 transition-opacity">
                  <Image
                    src="/roa-logo.png"
                    alt="Realty of America"
                    fill
                    sizes="(max-width: 768px) 256px, 288px"
                    priority
                    className="object-contain"
                  />
                </div>

                {/* Headshot with Prestige Ring */}
                <div className="relative mb-3.5 group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#1A9175] to-emerald-400/80 opacity-70 blur-sm group-hover:opacity-100 transition duration-500" />
                  <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden border-[3px] border-white shadow-2xl">
                    <Image
                      src="/headshot.png"
                      alt="Bernardo Jimenez"
                      fill
                      sizes="104px"
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Broker Name & Title */}
                <h1 className="font-['Playfair_Display'] text-2xl sm:text-[26px] font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
                  Bernardo Jimenez
                </h1>

                {/* Credentials Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 rounded-full bg-[#1A9175]/20 border border-[#1A9175]/35 text-[#5eead4] text-[11px] font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A9175] animate-pulse" />
                  <span>{current.badge}</span>
                </div>
                
                <p className="text-[13px] text-[#E6E7E8]/90 mt-2 tracking-wide font-normal max-w-[290px] leading-snug">
                  {current.tagline}
                </p>

                {/* Quick Contact Bar */}
                <div className="grid grid-cols-3 gap-2 w-full mt-4 mb-4 pt-4 border-t border-white/10">
                  <a
                    href="tel:7083140477"
                    className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition duration-200 active:scale-95 group"
                  >
                    <Phone className="w-4 h-4 mb-1 text-[#1A9175] group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-medium tracking-tight text-white/90">{current.quickCall}</span>
                  </a>

                  <a
                    href="sms:7083140477"
                    className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition duration-200 active:scale-95 group"
                  >
                    <MessageSquare className="w-4 h-4 mb-1 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-medium tracking-tight text-white/90">{current.quickText}</span>
                  </a>

                  <a
                    href="mailto:bernardo.jimenez@realtyofamerica.com"
                    className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition duration-200 active:scale-95 group"
                  >
                    <Mail className="w-4 h-4 mb-1 text-sky-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-medium tracking-tight text-white/90">{current.quickEmail}</span>
                  </a>
                </div>

                {/* Social Network Links */}
                <div className="flex items-center justify-center gap-4 mb-4 text-[#E6E7E8]/80">
                  <a
                    href="https://www.facebook.com/listwithbernardo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.tiktok.com/@listwithbernardo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
                    aria-label="TikTok"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.46V8.78a8.2 8.2 0 0 0 4.91 1.62v-3.71z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/chicago.realtor2103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-4.5 h-4.5 stroke-current fill-none stroke-2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Action Link Buttons */}
              <div className="space-y-2.5 w-full">
                {current.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`group relative flex items-center justify-between w-full min-h-[56px] px-4 py-3 rounded-2xl transition-all duration-300 shadow-md active:scale-[0.98] ${
                        link.highlight 
                          ? "bg-gradient-to-r from-white via-white to-[#f0fdf9] border-2 border-[#1A9175] shadow-[0_0_20px_rgba(26,145,117,0.25)] hover:shadow-[0_0_25px_rgba(26,145,117,0.4)]" 
                          : "bg-white hover:bg-[#F8FAFC] border border-white/60"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        link.highlight ? "bg-[#1A9175]/10 text-[#1A9175]" : "bg-[#10295A]/5 text-[#10295A]"
                      }`}>
                        <Icon className="w-[18px] h-[18px] stroke-[2.2]" />
                      </div>

                      <div className="flex-1 text-center px-2">
                        <span className="text-[14.5px] font-bold text-[#10295A] tracking-tight block leading-snug">
                          {link.title}
                        </span>
                        {link.subtitle && (
                          <span className="text-[11.5px] text-[#10295A]/70 block mt-0.5 font-normal leading-tight">
                            {link.subtitle}
                          </span>
                        )}
                      </div>

                      <div className="w-8 h-8 flex items-center justify-center shrink-0 text-[#10295A]/30 group-hover:text-[#10295A]/70 group-hover:translate-x-0.5 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Interactive RealScout Widgets */}
          <section className="lg:col-span-7 space-y-4">
            
            {/* Mobile Divider (Hidden on Desktop) */}
            <div className="flex lg:hidden items-center gap-3 px-3 py-1">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E6E7E8]/70 font-sans flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1A9175]" />
                Featured Tools
              </span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            {/* INSTANT VALUATION CARD */}
            <div className="w-full bg-white text-slate-900 rounded-[2.25rem] sm:rounded-[2.5rem] p-5 sm:p-7 shadow-xl border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A9175]/10 text-[#1A9175] text-[11px] font-bold tracking-wider uppercase mb-2">
                <DollarSign className="w-3.5 h-3.5" />
                Live Equity Estimator
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#10295A] mb-1 font-['Playfair_Display']">
                {current.cmaTitle}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-slate-500 mb-4 max-w-sm">
                {current.cmaSubtitle}
              </p>

              <div 
                id="realscout-home-value-widget" 
                className="w-full flex justify-center items-center [&>realscout-home-value]:w-full [&>realscout-home-value]:flex [&>realscout-home-value]:justify-center"
              >
                {/* @ts-expect-error - RealScout custom web component */}
                <realscout-home-value 
                  agent-encoded-id="QWdlbnQtMzA4MjQ0" 
                  include-phone 
                  remove-subtitle
                />
              </div>
            </div>

            {/* FEATURED OFFICE LISTINGS CARD */}
            <div className="w-full bg-white text-slate-900 rounded-[2.25rem] sm:rounded-[2.5rem] p-5 sm:p-7 shadow-xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10295A]/5 text-[#10295A] text-[10px] font-bold tracking-wider uppercase mb-1">
                    <Building2 className="w-3 h-3 text-[#1A9175]" />
                    MLS Inventory
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#10295A] font-['Playfair_Display']">
                    {current.featuredTitle}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-slate-500 mt-0.5">
                    {current.featuredSubtitle}
                  </p>
                </div>

                <a
                  href="https://bernardojimenez.realscout.com/onboarding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1A9175] hover:text-[#10295A] flex items-center gap-1 transition-colors px-3 py-1.5 rounded-full bg-[#1A9175]/10 hover:bg-[#1A9175]/20 shrink-0"
                >
                  MLS Search
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Office Listings Web Component Container */}
              <div 
                id="realscout-office-listings-widget" 
                className="w-full overflow-hidden"
              >
                {/* @ts-expect-error - RealScout custom office listings web component */}
                <realscout-office-listings 
                  agent-encoded-id="QWdlbnQtMzA4MjQ0" 
                />
              </div>

              {/* Action Button Footer */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <a
                  href="https://bernardojimenez.realscout.com/onboarding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-[#10295A] hover:bg-[#0c1f44] text-white text-xs sm:text-[13px] font-semibold tracking-wide transition-all shadow-md active:scale-[0.99] group"
                >
                  <span>{current.viewAllListings}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#1A9175] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </section>

        </div>

        {/* Global Styles for RealScout Centering */}
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
        `}</style>

        {/* Executive Footer */}
        <footer className="w-full max-w-sm lg:max-w-6xl mx-auto mt-8 sm:mt-12 text-center flex flex-col items-center space-y-2">
          <div 
            className="text-[#E6E7E8]/70 flex flex-col items-center hover:text-white transition-colors" 
            title="Equal Housing Opportunity"
            aria-label="Equal Housing Opportunity"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 9.5V22h20V9.5L12 2zm8 18H4v-9.17l8-6 8 6V20zM6 14h12v2H6zm0-4h12v2H6z" />
            </svg>
          </div>

          <p className="text-[10.5px] text-[#E6E7E8]/85 font-semibold tracking-wider uppercase">
            {current.footerLocation}
          </p>

          <p className="text-[9px] text-[#E6E7E8]/50 leading-relaxed font-light max-w-md">
            {current.footerLegal}
          </p>
        </footer>
      </main>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Gilda_Display, Jost } from "next/font/google";
import { 
  Home, 
  Search, 
  DollarSign, 
  Phone, 
  Mail, 
  Share2, 
  Calendar, 
  Languages, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowLeft 
} from "lucide-react";

const gilda = Gilda_Display({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading"
});

const jost = Jost({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body"
});

const content = {
  en: {
    backHome: "Home",
    sharePrompt: "Connect with Bernardo Jimenez - Licensed Real Estate Broker with Realty of America:",
    toggleLabel: "Español",
    badge: "Illinois Broker # 475.218221",
    tagline: "Strategic guidance. Exceptional real estate results.",
    call: "Call",
    text: "Text",
    email: "Email",
    links: [
      {
        title: "Book a Strategy Call",
        subtitle: "30-min telephone or Zoom consultation",
        href: "https://calendly.com/listwithbernardo/30min",
        icon: Calendar,
        highlight: true,
      },
      {
        title: "Looking to Buy? Start Here!",
        subtitle: "Curated buyer listings & guides",
        href: "https://bernardojimenez.realscout.com/",
        icon: Home,
      },
      {
        title: "Search All Available MLS Homes",
        subtitle: "Real-time custom property portal",
        href: "https://bernardojimenez.realscout.com/onboarding",
        icon: Search,
      },
      {
        title: "What is Your Home Worth?",
        subtitle: "Instant automated equity report",
        href: "https://bernardojimenez.realscout.com/homesearch/home-reports",
        icon: DollarSign,
      },
    ],
    footerLegal: "© 2026 Realty of America, LLC · Equal Housing Opportunity",
  },
  es: {
    backHome: "Inicio",
    sharePrompt: "Conecta con Bernardo Jimenez - Corredor de Bienes Raíces con Realty of America:",
    toggleLabel: "English",
    badge: "Corredor Licenciado # 475.218221",
    tagline: "Asesoría estratégica. Resultados excepcionales en bienes raíces.",
    call: "Llamar",
    text: "Mensaje",
    email: "Correo",
    links: [
      {
        title: "Agenda una Llamada Estratégica",
        subtitle: "Consulta de 30 min por teléfono o Zoom",
        href: "https://calendly.com/listwithbernardo/30min",
        icon: Calendar,
        highlight: true,
      },
      {
        title: "¿Buscas Comprar? ¡Empieza Aquí!",
        subtitle: "Propiedades destacadas y asesoría",
        href: "https://bernardojimenez.realscout.com",
        icon: Home,
      },
      {
        title: "Buscar Propiedades Disponibles",
        subtitle: "Portal MLS directo con alertas",
        href: "https://bernardojimenez.realscout.com/onboarding",
        icon: Search,
      },
      {
        title: "¿Cuánto Vale tu Propiedad?",
        subtitle: "Reporte de plusvalía instantáneo",
        href: "https://bernardojimenez.realscout.com/homesearch/home-reports",
        icon: DollarSign,
      },
    ],
    footerLegal: "© 2026 Realty of America, LLC · Igualdad de Vivienda",
  },
};

export default function ContactBioCardPage() {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
      if (browserLang.toLowerCase().startsWith("es")) {
        setLang("es");
      }
    }
  }, []);

  const current = content[lang];

  const handleShare = async () => {
    const shareData = {
      title: "Bernardo Jimenez - REALTOR®",
      text: current.sharePrompt,
      url: typeof window !== "undefined" ? window.location.href : "https://barcias.com/contact",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fall back to SMS if user cancels share dialog
      }
    }

    const body = encodeURIComponent(`${shareData.text} ${shareData.url}`);
    window.location.href = `sms:?&body=${body}`;
  };

  return (
    <main 
      className={`${jost.variable} ${gilda.variable} font-sans h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#16242c] bg-gradient-to-b from-[#16242c] via-[#101b22] to-[#0a1115] text-[#f7f5f0] antialiased flex flex-col justify-between px-3 sm:px-4 py-2 sm:py-3 selection:bg-[#c4a98b]/30`}
    >
      <div className="w-full max-w-sm mx-auto flex flex-col h-full justify-between">
        
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-1 shrink-0 h-9">
          <a
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#16242c] text-xs font-medium border border-white/15 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{current.backHome}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#16242c] text-xs font-medium border border-white/15 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-[#c4a98b]" />
              <span>{current.toggleLabel}</span>
            </button>

            <button 
              type="button"
              onClick={handleShare}
              aria-label="Share contact card"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#16242c] flex items-center justify-center border border-white/15 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Executive Link-In-Bio Card */}
        <div className="w-full flex-1 flex flex-col justify-center bg-white/[0.05] backdrop-blur-2xl rounded-[2.25rem] px-4 py-3.5 sm:px-5 sm:py-4 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] my-1.5 overflow-hidden">
          
          {/* Profile Header Block */}
          <div className="flex flex-col items-center text-center shrink-0">
            {/* ROA Logo */}
            <div className="relative w-48 h-8 mb-1.5 opacity-95">
              <Image
                src="/roa-logo.png"
                alt="Realty of America"
                fill
                sizes="192px"
                priority
                className="object-contain"
              />
            </div>

            {/* Profile Avatar */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-xl border-2 border-white/90 mb-1.5 ring-2 ring-[#c4a98b]/40">
              <img
                src="https://dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net/preview-sites/bd09618a-b933-45b9-217f-08df1a5e6eb3/images/e60545aa-09d2-431e-80ec-da138ef82493.png"
                alt="Bernardo Jimenez"
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="font-['Gilda_Display'] text-xl font-bold tracking-tight text-white leading-tight">
              Bernardo Jimenez
            </h1>

            <div className="mt-0.5 px-2.5 py-0.5 rounded-full bg-[#c4a98b]/20 border border-[#c4a98b]/30 text-[#e4d4c3] text-[10px] font-medium tracking-wide">
              {current.badge}
            </div>

            <p className="text-[11px] text-[#a5b0b5] mt-1 max-w-[270px] leading-tight font-light">
              {current.tagline}
            </p>

            {/* 3-Button Fast Contact Row */}
            <div className="grid grid-cols-3 gap-2 w-full mt-2.5 pt-2 border-t border-white/10">
              <a
                href="tel:7083140477"
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-[#c4a98b]" />
                <span className="text-[11px] font-medium">{current.call}</span>
              </a>

              <a
                href="sms:7083140477"
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium">{current.text}</span>
              </a>

              <a
                href="mailto:bernardo.jimenez@realtyofamerica.com"
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition active:scale-95"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px] font-medium">{current.email}</span>
              </a>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center justify-center gap-5 mt-2.5 mb-3 text-[#f7f5f0]/80">
              <a 
                href="https://www.facebook.com/listwithbernardo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@listwithbernardo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 hover:text-white"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.46V8.78a8.2 8.2 0 0 0 4.91 1.62v-3.71z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/chicago.realtor2103" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 hover:text-white"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Action Links Stack with Consistent Proportional Spacing */}
          <div className="space-y-2.5 w-full">
            {current.links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group relative flex items-center justify-between w-full min-h-[48px] px-3.5 py-2 rounded-2xl transition-all duration-200 shadow-sm active:scale-[0.98] ${
                    link.highlight 
                      ? "bg-white border-2 border-[#c4a98b] text-[#16242c]" 
                      : "bg-white hover:bg-[#f7f5f0] text-[#16242c]"
                  }`}
                >
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-[#16242c] bg-[#16242c]/5">
                    <Icon className="w-3.5 h-3.5 stroke-[2]" />
                  </div>

                  <div className="flex-1 text-center px-2 min-w-0">
                    <span className="text-[13px] font-semibold tracking-tight block leading-tight truncate">
                      {link.title}
                    </span>
                    {link.subtitle && (
                      <span className="text-[10px] text-[#546168] block leading-tight truncate mt-0.5 font-normal">
                        {link.subtitle}
                      </span>
                    )}
                  </div>

                  <div className="w-5 h-5 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-[#16242c] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              );
            })}
          </div>

        </div>

        {/* Bottom Minimal Legal Row */}
        <footer className="text-center shrink-0 h-6 flex items-center justify-center text-[#a5b0b5]">
          <p className="text-[9px] tracking-wide opacity-75">
            {current.footerLegal}
          </p>
        </footer>

      </div>
    </main>
  );
}
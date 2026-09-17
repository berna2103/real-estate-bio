"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { 
  Home, 
  Search, 
  DollarSign, 
  Phone, 
  Mail, 
  Share2, 
  MoreVertical,
  Calendar,
  Languages
} from "lucide-react";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair"
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta"
});

const content = {
  en: {
    tagline: "Strategic guidance. Exceptional real estate results.",
    sharePrompt: "Connect with Bernardo Jimenez - Licensed Real Estate Broker with Realty of America:",
    toggleLabel: "Español",
    links: [
      {
        title: "Book a Strategy Call",
        subtitle: "Direct phone or Zoom consultation",
        href: "https://calendly.com/listwithbernardo/30min",
        icon: Calendar,
        highlight: true,
      },
      {
        title: "Looking to Buy? Start Here!",
        subtitle: "Browse featured listings",
        href: "https://bernardojimenez.realscout.com/",
        icon: Home,
      },
      {
        title: "Search All Available Homes",
        subtitle: "Custom MLS search portal",
        href: "https://bernardojimenez.realscout.com/onboarding",
        icon: Search,
      },
      {
        title: "What is Your Home Worth?",
        subtitle: "Instant home valuation report",
        href: "https://bernardojimenez.realscout.com/homesearch/home-reports",
        icon: DollarSign,
      },
      {
        title: "Contact Me Directly",
        subtitle: "Call or text • (708) 314-0477",
        href: "tel:7083140477",
        icon: Phone,
      },
    ],
    footerLocation: "Chicago, IL • License # 475.218221",
    footerLegal: "© 2026 Realty of America. Each office is independently owned and operated. Equal Housing Opportunity.",
  },
  es: {
    tagline: "Asesoría estratégica. Resultados excepcionales en bienes raíces.",
    sharePrompt: "Conecta con Bernardo Jimenez - Corredor de Bienes Raíces con Realty of America:",
    toggleLabel: "English",
    links: [
      {
        title: "Agenda una Llamada Estratégica",
        subtitle: "Consulta telefónica o por Zoom",
        href: "https://calendly.com/listwithbernardo/30min",
        icon: Calendar,
        highlight: true,
      },
      {
        title: "¿Buscas Comprar? ¡Empieza Aquí!",
        subtitle: "Propiedades destacadas",
        href: "https://bernardojimenez.realscout.com",
        icon: Home,
      },
      {
        title: "Buscar Propiedades Disponibles",
        subtitle: "Portal de búsqueda MLS",
        href: "https://bernardojimenez.realscout.com/onboarding",
        icon: Search,
      },
      {
        title: "¿Cuánto Vale tu Propiedad?",
        subtitle: "Reporte de valuación instantáneo",
        href: "https://bernardojimenez.realscout.com/homesearch/home-reports",
        icon: DollarSign,
      },
      {
        title: "Contáctame Directamente",
        subtitle: "Llamada o mensaje • (708) 314-0477",
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
        // Fall back to SMS if canceled
      }
    }

    const body = encodeURIComponent(`${shareData.text} ${shareData.url}`);
    window.location.href = `sms:?&body=${body}`;
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  };

  return (
    <main 
      className={`${jakarta.className} ${playfair.variable} min-h-screen bg-[#10295A] text-white antialiased flex flex-col items-center justify-between px-4 py-5 selection:bg-[#DB1263]/30`}
    >
      <div className="w-full max-w-sm mx-auto">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-1 mb-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#10295A] text-[13px] font-semibold backdrop-blur-sm border border-white/15 transition-all duration-200 shadow-sm active:scale-95"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5 text-[#DB1263]" />
            <span>{current.toggleLabel}</span>
          </button>
          
          <button 
            type="button"
            onClick={handleShare}
            aria-label="Share this link via text or app"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#10295A] backdrop-blur-sm flex items-center justify-center border border-white/15 transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          {/* Sized-up ROA Banner */}
          <div className="relative w-72 h-14 mb-3 opacity-95">
            <Image
              src="/roa-logo.png"
              alt="Realty of America"
              fill
              sizes="288px"
              priority
              className="object-contain"
            />
          </div>

          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-xl border-[3px] border-white mb-3 ring-2 ring-[#1A9175]/40">
            <Image
              src="/headshot.png"
              alt="Bernardo Jimenez"
              fill
              sizes="96px"
              priority
              className="object-cover"
            />
          </div>

          <h1 className="font-['Playfair_Display'] text-xl sm:text-2xl font-semibold tracking-wide text-white">
            Bernardo Jimenez <span className="text-[13px] font-normal tracking-normal text-[#E6E7E8]/80 font-sans">REALTOR®</span>
          </h1>
          
          <p className="text-[13px] text-[#E6E7E8]/90 mt-1 tracking-wide font-light max-w-[280px]">
            {current.tagline}
          </p>

          {/* Social Row */}
          <div className="flex items-center justify-center gap-4 mt-3 mb-5 text-[#E6E7E8]">
            <a
              href="https://www.facebook.com/listwithbernardo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-[#1A9175] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@bernardojimenez"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-[#1A9175] transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.46V8.78a8.2 8.2 0 0 0 4.91 1.62v-3.71z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/chicago.realtor2103"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-[#1A9175] transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 stroke-current fill-none stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a
              href="mailto:bernardo.jimenez@realtyofamerica.com"
              className="p-1 hover:text-[#1A9175] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
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
                className={`group relative flex items-center justify-between w-full min-h-[54px] px-4 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] ${
                  link.highlight 
                    ? "bg-white border-2 border-[#1A9175]" 
                    : "bg-white hover:bg-[#F1F2F2]"
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center shrink-0 text-[#1A9175]">
                  <Icon className="w-[18px] h-[18px] stroke-[2]" />
                </div>

                <div className="flex-1 text-center px-2">
                  <span className="text-[14.5px] font-semibold text-[#10295A] tracking-tight block leading-tight">
                    {link.title}
                  </span>
                  {link.subtitle && (
                    <span className="text-[11.5px] text-[#10295A]/70 block mt-0.5 font-normal">
                      {link.subtitle}
                    </span>
                  )}
                </div>

                <div className="w-7 h-7 flex items-center justify-center shrink-0 text-[#10295A]/30 group-hover:text-[#10295A]/60 transition">
                  <MoreVertical className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-sm mx-auto mt-8 mb-2 text-center flex flex-col items-center space-y-2">
        <div 
          className="text-[#E6E7E8]/70 flex flex-col items-center" 
          title="Equal Housing Opportunity"
          aria-label="Equal Housing Opportunity"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L2 9.5V22h20V9.5L12 2zm8 18H4v-9.17l8-6 8 6V20zM6 14h12v2H6zm0-4h12v2H6z" />
          </svg>
        </div>

        <p className="text-[10.5px] text-[#E6E7E8]/85 font-medium tracking-wider uppercase">
          {current.footerLocation}
        </p>

        <p className="text-[9.5px] text-[#E6E7E8]/50 leading-relaxed font-light max-w-xs">
          {current.footerLegal}
        </p>
      </footer>
    </main>
  );
}
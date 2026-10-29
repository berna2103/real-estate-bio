"use client";

import { useState } from "react";
import Link from "next/link";
import { Gilda_Display, Jost } from "next/font/google";
import { ArrowLeft, Phone, Calculator, Scale, X } from "lucide-react";
import MortgageCalculator from "@/app/components/MortgageCalculator";
import AffordabilityCalculator from "@/app/components/AffordabilityCalculator";
import MredLeadCapture from "@/app/components/MredLeadCapture";
import FloatingContactPill from "@/app/components/FloatingContactPill";

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

const HEADSHOT_URL = "https://dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net/preview-sites/bd09618a-b933-45b9-217f-08df1a5e6eb3/images/e60545aa-09d2-431e-80ec-da138ef82493.png";

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<"affordability" | "payment">("affordability");
  const [lang, setLang] = useState<"en" | "es">("es");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadNotes, setLeadNotes] = useState<string>("");

  const handleRequestReport = (summary: string) => {
    setLeadNotes(summary);
    setIsModalOpen(true); // Open the modal instead of scrolling
  };

  return (
    <div className={`${gilda.variable} ${jost.variable} font-sans bg-[#f7f5f0] text-[#16242c] min-h-screen flex flex-col selection:bg-[#c4a98b]/30 relative`}>
      <header className="sticky top-0 z-50 bg-[#16242c]/95 backdrop-blur-md border-b border-[#2a3840] text-[#f7f5f0]">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a5b0b5] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "es" ? "Inicio" : "Back to Home"}</span>
            </Link>

            <span className="h-4 w-px bg-white/20 hidden sm:block" />

            <Link href="/" className="hidden sm:flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30 shrink-0">
                <img src={HEADSHOT_URL} alt="Bernardo Jimenez" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-['Gilda_Display'] text-lg text-white">Bernardo Jimenez</span>
                <span className="text-[9px] uppercase tracking-widest text-[#a5b0b5]">Realty of America</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="px-3 py-1.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10 transition cursor-pointer"
            >
              {lang === "es" ? "English" : "Español"}
            </button>

            <a 
              href="tel:7083140477"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#c4a98b] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(708) 314-0477</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10 md:py-16 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#ded9cf] shadow-md">
            <button
              type="button"
              onClick={() => setActiveTab("affordability")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold transition cursor-pointer ${
                activeTab === "affordability"
                  ? "bg-[#16242c] text-[#c4a98b] shadow-sm"
                  : "text-[#546168] hover:text-[#16242c]"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{lang === "es" ? "¿Cuánto Puedo Calificar? (DTI)" : "How Much Can I Afford?"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("payment")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-semibold transition cursor-pointer ${
                activeTab === "payment"
                  ? "bg-[#16242c] text-[#c4a98b] shadow-sm"
                  : "text-[#546168] hover:text-[#16242c]"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{lang === "es" ? "Pago Mensual & Facturas" : "Monthly Payment & Bills"}</span>
            </button>
          </div>
        </div>

        {activeTab === "affordability" ? (
          <AffordabilityCalculator lang={lang} onRequestReport={handleRequestReport} />
        ) : (
          <MortgageCalculator lang={lang} onRequestReport={handleRequestReport} />
        )}
      </main>

      <FloatingContactPill lang={lang} />

      <footer className="bg-[#16242c] text-[#a5b0b5] py-8 border-t border-[#2a3840] text-center text-xs">
        <p>© 2026 Bernardo Jimenez · Realty of America, LLC · Licensed Illinois Broker # 475.218221 · Equal Housing Opportunity</p>
      </footer>

      {/* OVERLAY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Dark Blurred Backdrop */}
          <div 
            className="absolute inset-0 bg-[#16242c]/85 backdrop-blur-sm cursor-pointer animate-in fade-in duration-200" 
            onClick={() => setIsModalOpen(false)} 
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-200 scrollbar-hide">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-5 right-5 sm:top-7 sm:right-7 z-10 p-2 bg-[#f7f5f0]/50 hover:bg-[#ded9cf] rounded-full text-[#16242c] backdrop-blur-md transition cursor-pointer"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {/* The Form */}
            <MredLeadCapture initialLang={lang} initialNotes={leadNotes} />
          </div>
        </div>
      )}
    </div>
  );
}
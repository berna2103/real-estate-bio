// app/calculator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Gilda_Display, Jost } from "next/font/google";
import { ArrowLeft, Phone, Calendar } from "lucide-react";
import MortgageCalculator from "@/app/components/MortgageCalculator";

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

export const metadata: Metadata = {
  title: "True Living Cost & Mortgage Calculator | Bernardo Jimenez",
  description:
    "Calculate your real monthly homeownership cost in Chicago and Cook County, factoring in principal, interest, taxes, and square-footage-based utilities (gas, electric, water).",
  openGraph: {
    title: "Chicago True Living Cost & Mortgage Calculator | Bernardo Jimenez",
    description:
      "Don't just calculate your mortgage. See the real cost of ownership with Cook County property taxes and estimated monthly utility bills.",
    url: "https://barcias.com/calculator",
    siteName: "Bernardo Jimenez · Realty of America",
    type: "website",
  },
};

const HEADSHOT_URL = "https://dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net/preview-sites/bd09618a-b933-45b9-217f-08df1a5e6eb3/images/e60545aa-09d2-431e-80ec-da138ef82493.png";

export default function CalculatorPage() {
  return (
    <div className={`${gilda.variable} ${jost.variable} font-sans bg-[#f7f5f0] text-[#16242c] min-h-screen flex flex-col selection:bg-[#c4a98b]/30`}>
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#16242c]/95 backdrop-blur-md border-b border-[#2a3840] text-[#f7f5f0]">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a5b0b5] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
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

          <div className="flex items-center gap-4">
            <a 
              href="tel:7083140477"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#c4a98b] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(708) 314-0477</span>
            </a>
            <a 
              href="https://calendly.com/listwithbernardo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-4 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-[#16242c] transition-all"
            >
              Book a Call
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <MortgageCalculator lang="en" />
      </main>

      {/* Footer */}
      <footer className="bg-[#16242c] text-[#a5b0b5] py-8 border-t border-[#2a3840] text-center text-xs">
        <p>© 2026 Bernardo Jimenez · Realty of America, LLC · Licensed Illinois Broker # 475.218221 · Equal Housing Opportunity</p>
      </footer>
    </div>
  );
}
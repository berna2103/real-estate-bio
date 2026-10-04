"use client";

import { useState, useMemo } from "react";
import { Gilda_Display, Jost } from "next/font/google";
import { 
  Building2, 
  HelpCircle, 
  ArrowUpRight, 
  Calendar, 
  Phone,
  ChevronDown,
  ChevronUp,
  Sparkles
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

export default function MortgageCalculator({ lang = "en" }: { lang?: "en" | "es" }) {
  // Primary Form State
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [downPayment, setDownPayment] = useState<number>(70000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(4550); // ~1.3% Cook County benchmark
  const [taxPercent, setTaxPercent] = useState<number>(1.3);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1800);
  const [hoaMonthly, setHoaMonthly] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);

  // Sync Down Payment Dollar & %
  const handleDownPaymentAmountChange = (val: number) => {
    setDownPayment(val);
    if (homePrice > 0) {
      setDownPaymentPercent(Number(((val / homePrice) * 100).toFixed(1)));
    }
  };

  const handleDownPaymentPercentChange = (pct: number) => {
    setDownPaymentPercent(pct);
    setDownPayment(Math.round((pct / 100) * homePrice));
  };

  const handleHomePriceChange = (val: number) => {
    setHomePrice(val);
    setDownPayment(Math.round((downPaymentPercent / 100) * val));
    setPropertyTaxAnnual(Math.round((taxPercent / 100) * val));
  };

  const handleTaxPercentChange = (pct: number) => {
    setTaxPercent(pct);
    setPropertyTaxAnnual(Math.round((pct / 100) * homePrice));
  };

  const handleTaxAmountChange = (val: number) => {
    setPropertyTaxAnnual(val);
    if (homePrice > 0) {
      setTaxPercent(Number(((val / homePrice) * 100).toFixed(2)));
    }
  };

  // Financial Calculations
  const loanAmount = Math.max(0, homePrice - downPayment);

  const monthlyPrincipalAndInterest = useMemo(() => {
    if (loanAmount <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return loanAmount / totalPayments;
    const pmt =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(pmt);
  }, [loanAmount, interestRate, loanTermYears]);

  const monthlyPropertyTax = Math.round(propertyTaxAnnual / 12);
  const monthlyInsurance = Math.round(homeInsuranceAnnual / 12);
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + hoaMonthly;

  // Donut Chart Segment Slicing
  const segments = useMemo(() => {
    if (totalMonthlyPayment <= 0) return [];
    const piPct = monthlyPrincipalAndInterest / totalMonthlyPayment;
    const taxPct = monthlyPropertyTax / totalMonthlyPayment;
    const insPct = monthlyInsurance / totalMonthlyPayment;
    const hoaPct = hoaMonthly / totalMonthlyPayment;

    return [
      { 
        name: lang === "en" ? "Principal & Interest" : "Capital e Interés", 
        value: monthlyPrincipalAndInterest, 
        color: "#c4a98b", 
        pct: piPct 
      },
      { 
        name: lang === "en" ? "Property Taxes" : "Impuestos Prediales", 
        value: monthlyPropertyTax, 
        color: "#f7f5f0", 
        pct: taxPct 
      },
      { 
        name: lang === "en" ? "Home Insurance" : "Seguro de Propiedad", 
        value: monthlyInsurance, 
        color: "#7a8a92", 
        pct: insPct 
      },
      { 
        name: lang === "en" ? "HOA Dues" : "Cuotas HOA", 
        value: hoaMonthly, 
        color: "#d97706", 
        pct: hoaPct 
      },
    ].filter(s => s.value > 0);
  }, [monthlyPrincipalAndInterest, monthlyPropertyTax, monthlyInsurance, hoaMonthly, totalMonthlyPayment, lang]);

  // SVG Geometry Calculation (Radius 70, Stroke 20 => ViewBox 200x200)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulativeStroke = 0;

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Ambient Luxury Halo Glow Behind Container */}
      <div className="absolute -inset-2 rounded-[2.75rem] bg-gradient-to-r from-[#c4a98b]/20 via-[#16242c]/5 to-[#c4a98b]/25 blur-3xl opacity-80 pointer-events-none" />

      <div className={`${gilda.variable} ${jost.variable} font-sans relative w-full bg-white rounded-[2rem] border border-[#ded9cf] p-6 sm:p-10 lg:p-12 shadow-[0_25px_65px_-15px_rgba(22,36,44,0.12)] text-[#16242c]`}>
        
        {/* Editorial Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ded9cf] pb-8 mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16242c] text-[#c4a98b] text-[10px] uppercase tracking-[0.24em] font-semibold mb-3.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4a98b] animate-pulse" />
              {lang === "en" ? "Interactive Financial Suite" : "Suite Financiera Interactiva"}
            </div>
            <h2 className="font-['Gilda_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#16242c] tracking-tight leading-tight">
              {lang === "en" ? "The Real Cost of Ownership." : "El Costo Real de tu Próximo Hogar."}
            </h2>
            <p className="text-xs sm:text-sm text-[#546168] mt-2 max-w-xl font-light leading-relaxed">
              {lang === "en"
                ? "Simulate your estimated all-in monthly commitment—factoring in real Cook County tax assessments, realistic hazard insurance, and custom down payment programs."
                : "Calcula tu inversión mensual estimada integrando los impuestos prediales de Cook County, seguros de propiedad y programas de enganche a tu medida."}
            </p>
          </div>

          {/* Quick Context Benchmark Pill */}
          <div className="hidden lg:flex flex-col items-end text-right border-l border-[#ded9cf] pl-8">
            <span className="text-[10px] uppercase tracking-widest text-[#7a8a92] font-semibold">
              Cook County Tax Rate
            </span>
            <span className="font-['Gilda_Display'] text-xl text-[#16242c] mt-0.5">
              ~1.3% - 2.1% Typical
            </span>
            <span className="text-[10px] text-[#8c6d48] mt-0.5 font-medium">
              Live updates below
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Inputs & Presets */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick 1-Tap Price Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#7a8a92]">
                  {lang === "en" ? "Select Market Price Tier" : "Elegir Rango de Mercado"}
                </span>
                <span className="text-[10.5px] text-[#8c6d48] font-medium">
                  {lang === "en" ? "1-Click Preset" : "1 Clic"}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[250000, 350000, 475000, 650000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleHomePriceChange(preset)}
                    className={`py-2 px-1 rounded-xl text-xs font-medium transition cursor-pointer border ${
                      homePrice === preset
                        ? "bg-[#16242c] text-white border-[#16242c] shadow-sm ring-2 ring-[#c4a98b]/40"
                        : "bg-[#f7f5f0] hover:bg-white text-[#546168] border-[#ded9cf]"
                    }`}
                  >
                    ${(preset / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Home Value Input */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                {lang === "en" ? "Purchase Price" : "Precio de Compra"}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => handleHomePriceChange(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Down Payment Dual Input */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                {lang === "en" ? "Down Payment" : "Enganche Inicial"}
              </label>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => handleDownPaymentAmountChange(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
                  />
                </div>
                <div className="col-span-4 relative">
                  <input
                    type="number"
                    step="0.5"
                    value={downPaymentPercent}
                    onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
                    className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition text-right"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
                </div>
              </div>
            </div>

            {/* Loan Term & Interest Rate */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                  {lang === "en" ? "Loan Term" : "Plazo de Hipoteca"}
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition cursor-pointer"
                >
                  <option value={30}>30-Year Fixed</option>
                  <option value={20}>20-Year Fixed</option>
                  <option value={15}>15-Year Fixed</option>
                  <option value={10}>10-Year Fixed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                  {lang === "en" ? "Interest Rate" : "Tasa de Interés"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.125"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition text-right"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
                </div>
              </div>
            </div>

            {/* Toggle Advanced Costs */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8c6d48] hover:text-[#16242c] transition pt-1 cursor-pointer"
            >
              <span>
                {showAdvanced 
                  ? (lang === "en" ? "Hide Taxes & Insurance" : "Ocultar Impuestos y Seguro") 
                  : (lang === "en" ? "Show Taxes & Insurance" : "Mostrar Impuestos y Seguro")}
              </span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Advanced Taxes / Insurance / HOA Fields */}
            {showAdvanced && (
              <div className="space-y-4 pt-3 border-t border-[#ded9cf]">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                    {lang === "en" ? "Annual Property Tax (Cook Co.)" : "Impuesto Predial Anual"}
                  </label>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-8 relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                      <input
                        type="number"
                        value={propertyTaxAnnual}
                        onChange={(e) => handleTaxAmountChange(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
                      />
                    </div>
                    <div className="col-span-4 relative">
                      <input
                        type="number"
                        step="0.05"
                        value={taxPercent}
                        onChange={(e) => handleTaxPercentChange(Number(e.target.value))}
                        className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition text-right"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                      {lang === "en" ? "Home Insurance / Yr" : "Seguro Anual"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                      <input
                        type="number"
                        value={homeInsuranceAnnual}
                        onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                      {lang === "en" ? "HOA Dues / Mo" : "Cuota HOA / Mes"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                      <input
                        type="number"
                        value={hoaMonthly}
                        onChange={(e) => setHoaMonthly(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Premium Architectural Visual Panel */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#16242c] text-[#f7f5f0] p-7 sm:p-9 rounded-[1.75rem] shadow-xl border border-white/10">
            
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2a3840]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#c4a98b] font-semibold">
                {lang === "en" ? "Monthly Payment Breakdown" : "Desglose de Inversión Mensual"}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#a5b0b5]">
                {loanTermYears}Y Fixed @ {interestRate}%
              </span>
            </div>

            {/* Donut Chart & Legend Centerpiece */}
            <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-8">
              
              {/* SVG Donut Visual */}
              <div className="relative w-48 h-48 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#22333d"
                    strokeWidth="20"
                  />
                  {segments.map((seg, idx) => {
                    const dashLength = seg.pct * circumference;
                    const dashOffset = -cumulativeStroke;
                    cumulativeStroke += dashLength;
                    return (
                      <circle
                        key={idx}
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="20"
                        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-500 ease-out"
                      />
                    );
                  })}
                </svg>

                {/* Donut Center Amount Lockup */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                  <span className="text-[9.5px] uppercase tracking-widest text-[#a5b0b5] font-medium">
                    {lang === "en" ? "Total / Mo" : "Total / Mes"}
                  </span>
                  <span className="font-['Gilda_Display'] text-3xl sm:text-4xl font-bold text-white leading-tight">
                    ${totalMonthlyPayment.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Segment Legend */}
              <div className="space-y-3 w-full max-w-[220px]">
                {segments.map((seg, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: seg.color }} />
                      <span className="text-[#a5b0b5] font-light">{seg.name}</span>
                    </div>
                    <span className="font-semibold text-white">${seg.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Direct Strategic CTAs */}
            <div className="grid sm:grid-cols-2 gap-3 pt-6 border-t border-[#2a3840]">
              <a
                href="https://calendly.com/listwithbernardo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition active:scale-95 text-left"
              >
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider text-[#c4a98b] font-semibold block">
                    {lang === "en" ? "Financing Strategy" : "Estrategia Financiera"}
                  </span>
                  <span className="text-xs font-medium text-white block mt-0.5">
                    {lang === "en" ? "Schedule a 30-Min Call" : "Agendar Consulta de 30 Min"}
                  </span>
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-[#c4a98b] group-hover:text-white transition-colors">
                  <span>{lang === "en" ? "Speak with Bernardo" : "Hablar con Bernardo"}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              <a
                href="https://bernardojimenez.realscout.com/onboarding"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-3.5 rounded-xl bg-[#c4a98b] hover:bg-[#b5997a] text-[#16242c] transition active:scale-95 text-left"
              >
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider text-[#16242c]/70 font-semibold block">
                    {lang === "en" ? "Real-Time MLS Search" : "Búsqueda en MLS"}
                  </span>
                  <span className="text-xs font-bold text-[#16242c] block mt-0.5">
                    {lang === "en" ? "Find Homes in This Range" : "Ver Casas en Este Rango"}
                  </span>
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-[#16242c] font-semibold">
                  <span>{lang === "en" ? "Open RealScout Feed" : "Abrir RealScout"}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
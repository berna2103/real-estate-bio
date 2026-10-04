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
  ChevronUp
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
  // Inputs
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [downPayment, setDownPayment] = useState<number>(70000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(4550); // ~1.3% Cook County avg
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

  // Calculations
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

  // Donut SVG Segments
  const segments = useMemo(() => {
    if (totalMonthlyPayment <= 0) return [];
    const piPct = monthlyPrincipalAndInterest / totalMonthlyPayment;
    const taxPct = monthlyPropertyTax / totalMonthlyPayment;
    const insPct = monthlyInsurance / totalMonthlyPayment;
    const hoaPct = hoaMonthly / totalMonthlyPayment;

    return [
      { name: lang === "en" ? "Principal & Interest" : "Principal e Interés", value: monthlyPrincipalAndInterest, color: "#16242c", pct: piPct },
      { name: lang === "en" ? "Property Taxes" : "Impuestos Prediales", value: monthlyPropertyTax, color: "#c4a98b", pct: taxPct },
      { name: lang === "en" ? "Home Insurance" : "Seguro de Propiedad", value: monthlyInsurance, color: "#7a8a92", pct: insPct },
      { name: lang === "en" ? "HOA Dues" : "Cuotas de Asociación (HOA)", value: hoaMonthly, color: "#3d4b53", pct: hoaPct },
    ].filter(s => s.value > 0);
  }, [monthlyPrincipalAndInterest, monthlyPropertyTax, monthlyInsurance, hoaMonthly, totalMonthlyPayment, lang]);

  // SVG Circumference for 200x200 viewBox (Radius 70, Stroke 22)
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.82
  let cumulativeStroke = 0;

  return (
    <div className={`${gilda.variable} ${jost.variable} font-sans w-full bg-white rounded-3xl border border-[#ded9cf] p-6 sm:p-10 shadow-[0_20px_50px_rgba(22,36,44,0.06)] text-[#16242c]`}>
      
      {/* Top Header Badge */}
      <div className="border-b border-[#ded9cf] pb-6 mb-8 text-center sm:text-left">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#8c6d48] font-semibold">
          {lang === "en" ? "Financial Advisory Tool" : "Herramienta Financiera"}
        </span>
        <h2 className="font-['Gilda_Display'] text-3xl sm:text-4xl text-[#16242c] mt-1.5">
          {lang === "en" ? "Estimated Mortgage & Monthly Investment" : "Calculadora de Hipoteca y Pago Mensual"}
        </h2>
        <p className="text-xs sm:text-sm text-[#546168] mt-1 max-w-2xl font-light">
          {lang === "en"
            ? "Calculate your estimated principal, Cook County property taxes, insurance, and HOA dues with real-time breakdowns."
            : "Estima tu pago de capital, intereses, impuestos prediales de Cook County y seguros en tiempo real."}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Controls / Inputs */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Home Value */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
              {lang === "en" ? "Home Purchase Price" : "Precio de la Propiedad"}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => handleHomePriceChange(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition"
              />
            </div>
          </div>

          {/* Down Payment (Dual Input: $ and %) */}
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
                  className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition"
                />
              </div>
              <div className="col-span-4 relative">
                <input
                  type="number"
                  step="0.5"
                  value={downPaymentPercent}
                  onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
                  className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition text-right"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
              </div>
            </div>
          </div>

          {/* Loan Term & Rate Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                {lang === "en" ? "Loan Term" : "Plazo"}
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition cursor-pointer"
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
                  className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition text-right"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
              </div>
            </div>
          </div>

          {/* Toggle Taxes & Advanced Fields */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8c6d48] hover:text-[#16242c] transition pt-1 cursor-pointer"
          >
            <span>{showAdvanced ? (lang === "en" ? "Hide Taxes & Insurance" : "Ocultar Impuestos y Seguro") : (lang === "en" ? "Show Taxes & Insurance" : "Mostrar Impuestos y Seguro")}</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="space-y-4 pt-3 border-t border-[#ded9cf]">
              {/* Property Tax (Dual Input) */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                  {lang === "en" ? "Annual Property Tax" : "Impuesto Predial Anual"}
                </label>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-8 relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                    <input
                      type="number"
                      value={propertyTaxAnnual}
                      onChange={(e) => handleTaxAmountChange(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition"
                    />
                  </div>
                  <div className="col-span-4 relative">
                    <input
                      type="number"
                      step="0.05"
                      value={taxPercent}
                      onChange={(e) => handleTaxPercentChange(Number(e.target.value))}
                      className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
                  </div>
                </div>
              </div>

              {/* Home Insurance & HOA */}
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
                      className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition"
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
                      className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Visual Donut + Breakdown + Lead CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#f7f5f0] p-6 sm:p-8 rounded-2xl border border-[#ded9cf]">
          
          {/* Donut Chart & Total */}
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center pb-6 border-b border-[#ded9cf]">
            
            {/* SVG Donut */}
            <div className="relative w-44 h-44 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke="#e8e4dc"
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

              {/* Donut Center Total Lockup */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#7a8a92] font-medium">
                  {lang === "en" ? "Est. Monthly" : "Pago Estimado"}
                </span>
                <span className="font-['Gilda_Display'] text-2xl sm:text-3xl font-bold text-[#16242c] leading-tight">
                  ${totalMonthlyPayment.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-2 w-full max-w-[240px]">
              {segments.map((seg, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                    <span className="text-[#546168]">{seg.name}</span>
                  </div>
                  <span className="font-semibold text-[#16242c]">${seg.value.toLocaleString()}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Integrated Trust & Advisory CTA Cards */}
          <div className="grid sm:grid-cols-2 gap-3 mt-6 pt-2">
            <div className="bg-white p-4 rounded-xl border border-[#ded9cf] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8c6d48] font-semibold">
                  {lang === "en" ? "Pre-Approval & Rates" : "Pre-Aprobación"}
                </span>
                <h4 className="font-['Gilda_Display'] text-base text-[#16242c] mt-0.5">
                  {lang === "en" ? "Ready to buy?" : "¿Listo para comprar?"}
                </h4>
                <p className="text-[11px] text-[#6b767d] mt-1 font-light leading-relaxed">
                  {lang === "en"
                    ? "Connect with my preferred bilingual lenders for low down payment & grant options."
                    : "Conéctate con prestamistas locales para préstamos FHA y subsidios de enganche."}
                </p>
              </div>
              <a
                href="https://calendly.com/listwithbernardo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full bg-[#16242c] hover:bg-[#2a3840] text-white py-2 rounded-lg text-xs font-medium uppercase tracking-wider text-center transition flex items-center justify-center gap-1 active:scale-95"
              >
                <span>{lang === "en" ? "Consult with Bernardo" : "Hablar con Bernardo"}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#ded9cf] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8c6d48] font-semibold">
                  {lang === "en" ? "MLS Listings" : "Inventario Real"}
                </span>
                <h4 className="font-['Gilda_Display'] text-base text-[#16242c] mt-0.5">
                  {lang === "en" ? "Browse Active Homes" : "Buscar Propiedades"}
                </h4>
                <p className="text-[11px] text-[#6b767d] mt-1 font-light leading-relaxed">
                  {lang === "en"
                    ? "Search verified properties in Southeast Chicago and the South Suburbs with real-time alerts."
                    : "Explora propiedades activas en East Side, Hegewisch y Berwyn en tiempo real."}
                </p>
              </div>
              <a
                href="https://bernardojimenez.realscout.com/onboarding"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full bg-[#c4a98b] hover:bg-[#b5997a] text-[#16242c] py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition flex items-center justify-center gap-1 active:scale-95"
              >
                <span>{lang === "en" ? "Search RealScout" : "Ver Propiedades"}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
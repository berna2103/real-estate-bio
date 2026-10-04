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
  Zap,
  Flame,
  Droplets,
  Wifi,
  Sliders,
  CheckCircle2
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
  // Mode Selection: "piti" (standard) or "true_cost" (with utilities)
  const [calculationMode, setCalculationMode] = useState<"piti" | "true_cost">("true_cost");

  // Primary Financial Inputs
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

  // Home Size & Utility Estimates (Cook County / Chicago specific benchmarks)
  const [squareFootage, setSquareFootage] = useState<number>(1850);
  const [gasMonthly, setGasMonthly] = useState<number>(135); // Heating baseline
  const [electricMonthly, setElectricMonthly] = useState<number>(125); // ComEd baseline
  const [waterMonthly, setWaterMonthly] = useState<number>(85); // City Water & Sewer
  const [internetMonthly, setInternetMonthly] = useState<number>(70); // High-speed broadband
  const [customUtilitiesOverridden, setCustomUtilitiesOverridden] = useState<boolean>(false);

  // Auto-calculate utilities from square footage unless manually tweaked
  const updateUtilitiesFromSqFt = (sqft: number) => {
    setSquareFootage(sqft);
    if (!customUtilitiesOverridden) {
      // Benchmark: Gas ~$0.07/sqft, Electric ~$40 base + ~$0.045/sqft, Water ~$45 base + ~$0.02/sqft
      const estimatedGas = Math.round(sqft * 0.072);
      const estimatedElectric = Math.round(40 + sqft * 0.046);
      const estimatedWater = Math.round(45 + sqft * 0.021);
      setGasMonthly(estimatedGas);
      setElectricMonthly(estimatedElectric);
      setWaterMonthly(estimatedWater);
    }
  };

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

  // Financial Computations
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

  const totalUtilitiesMonthly = useMemo(() => {
    if (calculationMode === "piti") return 0;
    return gasMonthly + electricMonthly + waterMonthly + internetMonthly;
  }, [calculationMode, gasMonthly, electricMonthly, waterMonthly, internetMonthly]);

  const totalMonthlyOutflow =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + hoaMonthly + totalUtilitiesMonthly;

  // Donut Chart Segments
  const segments = useMemo(() => {
    if (totalMonthlyOutflow <= 0) return [];
    const piPct = monthlyPrincipalAndInterest / totalMonthlyOutflow;
    const taxPct = monthlyPropertyTax / totalMonthlyOutflow;
    const insPct = monthlyInsurance / totalMonthlyOutflow;
    const hoaPct = hoaMonthly / totalMonthlyOutflow;
    const utilPct = totalUtilitiesMonthly / totalMonthlyOutflow;

    const list = [
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
    ];

    if (calculationMode === "true_cost" && totalUtilitiesMonthly > 0) {
      list.push({
        name: lang === "en" ? "Utilities & Living Bills" : "Servicios & Facturas",
        value: totalUtilitiesMonthly,
        color: "#2dd4bf", // Luminous architectural teal for bills
        pct: utilPct
      });
    }

    return list.filter(s => s.value > 0);
  }, [
    monthlyPrincipalAndInterest, 
    monthlyPropertyTax, 
    monthlyInsurance, 
    hoaMonthly, 
    totalUtilitiesMonthly, 
    totalMonthlyOutflow, 
    calculationMode, 
    lang
  ]);

  // SVG Geometry (Radius 70, Stroke 20 => ViewBox 200x200)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulativeStroke = 0;

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Ambient Luxury Halo Glow */}
      <div className="absolute -inset-2 rounded-[2.75rem] bg-gradient-to-r from-[#c4a98b]/20 via-[#16242c]/5 to-[#2dd4bf]/15 blur-3xl opacity-80 pointer-events-none" />

      <div className={`${gilda.variable} ${jost.variable} font-sans relative w-full bg-white rounded-[2rem] border border-[#ded9cf] p-6 sm:p-10 lg:p-12 shadow-[0_25px_65px_-15px_rgba(22,36,44,0.12)] text-[#16242c]`}>
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ded9cf] pb-8 mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16242c] text-[#c4a98b] text-[10px] uppercase tracking-[0.24em] font-semibold mb-3.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4a98b] animate-pulse" />
              {lang === "en" ? "Proprietary Advisory Tool" : "Herramienta Exclusiva de Asesoría"}
            </div>
            <h2 className="font-['Gilda_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#16242c] tracking-tight leading-tight">
              {lang === "en" ? "The Real Cost of Living." : "El Costo Real de Vivir en tu Propiedad."}
            </h2>
            <p className="text-xs sm:text-sm text-[#546168] mt-2 max-w-xl font-light leading-relaxed">
              {lang === "en"
                ? "Standard calculators stop at the mortgage. We calculate your actual monthly outflow including realistic Cook County heating, electric, water, and connectivity based on home size."
                : "Las calculadoras tradicionales solo muestran la hipoteca. Aquí calculamos tu gasto mensual real incluyendo gas, luz, agua e internet según el metraje de la casa."}
            </p>
          </div>

          {/* Mode Switcher: Mortgage Only vs True Living Cost */}
          <div className="inline-flex p-1 rounded-2xl bg-[#f7f5f0] border border-[#ded9cf] shrink-0">
            <button
              type="button"
              onClick={() => setCalculationMode("piti")}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer ${
                calculationMode === "piti"
                  ? "bg-[#16242c] text-white shadow-sm"
                  : "text-[#546168] hover:text-[#16242c]"
              }`}
            >
              {lang === "en" ? "Mortgage Only (PITI)" : "Solo Hipoteca"}
            </button>
            <button
              type="button"
              onClick={() => setCalculationMode("true_cost")}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                calculationMode === "true_cost"
                  ? "bg-[#16242c] text-[#2dd4bf] shadow-sm ring-1 ring-[#2dd4bf]/40"
                  : "text-[#546168] hover:text-[#16242c]"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#2dd4bf]" />
              <span>{lang === "en" ? "True Living Cost (+ Bills)" : "Costo Real (+ Servicios)"}</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Inputs & Square Footage / Utility Engine */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Price Preset Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#7a8a92]">
                  {lang === "en" ? "Select Market Price Tier" : "Elegir Rango de Precio"}
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

            {/* SQUARE FOOTAGE & UTILITIES MODULE (Visible when True Cost is Selected) */}
            {calculationMode === "true_cost" && (
              <div className="p-5 rounded-2xl bg-[#f7f5f0] border border-[#ded9cf] space-y-4">
                <div className="flex items-center justify-between border-b border-[#ded9cf] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#16242c] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#2dd4bf]" />
                      <span>{lang === "en" ? "Home Size & Utilities Engine" : "Motor de Metraje y Servicios"}</span>
                    </span>
                    <p className="text-[11px] text-[#6b767d] mt-0.5 font-light">
                      {lang === "en" ? "Estimated using Cook County residential averages" : "Estimado con promedios residenciales del condado de Cook"}
                    </p>
                  </div>
                  <span className="font-['Gilda_Display'] text-xl font-bold text-[#16242c]">
                    {squareFootage.toLocaleString()} sq ft
                  </span>
                </div>

                {/* Range Slider for Square Footage */}
                <div>
                  <input
                    type="range"
                    min={800}
                    max={4000}
                    step={50}
                    value={squareFootage}
                    onChange={(e) => updateUtilitiesFromSqFt(Number(e.target.value))}
                    className="w-full h-2 bg-[#ded9cf] rounded-lg appearance-none cursor-pointer accent-[#16242c]"
                  />
                  <div className="flex justify-between text-[10px] text-[#7a8a92] mt-1 font-medium">
                    <span>800 sq ft (Condo)</span>
                    <span>1,850 sq ft (Bungalow)</span>
                    <span>3,500+ sq ft (Executive)</span>
                  </div>
                </div>

                {/* 4 Editable Utility Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  
                  {/* Gas */}
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span>{lang === "en" ? "Gas (Heat)" : "Gas"}</span>
                    </div>
                    <div className="mt-1 relative">
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                      <input
                        type="number"
                        value={gasMonthly}
                        onChange={(e) => {
                          setCustomUtilitiesOverridden(true);
                          setGasMonthly(Number(e.target.value));
                        }}
                        className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Electric */}
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>{lang === "en" ? "Electric" : "Electricidad"}</span>
                    </div>
                    <div className="mt-1 relative">
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                      <input
                        type="number"
                        value={electricMonthly}
                        onChange={(e) => {
                          setCustomUtilitiesOverridden(true);
                          setElectricMonthly(Number(e.target.value));
                        }}
                        className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Water / Sewer */}
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span>{lang === "en" ? "Water/Sewer" : "Agua/Drenaje"}</span>
                    </div>
                    <div className="mt-1 relative">
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                      <input
                        type="number"
                        value={waterMonthly}
                        onChange={(e) => {
                          setCustomUtilitiesOverridden(true);
                          setWaterMonthly(Number(e.target.value));
                        }}
                        className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Internet */}
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase">
                      <Wifi className="w-3 h-3 text-emerald-500" />
                      <span>{lang === "en" ? "Internet" : "Internet"}</span>
                    </div>
                    <div className="mt-1 relative">
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                      <input
                        type="number"
                        value={internetMonthly}
                        onChange={(e) => {
                          setCustomUtilitiesOverridden(true);
                          setInternetMonthly(Number(e.target.value));
                        }}
                        className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-[#546168]">
                  <span>{lang === "en" ? "Est. Monthly Utilities Total:" : "Total Estimado de Facturas:"}</span>
                  <span className="font-bold text-[#16242c]">+${totalUtilitiesMonthly.toLocaleString()} / mo</span>
                </div>
              </div>
            )}

            {/* Toggle Standard Taxes & Insurance */}
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

          {/* RIGHT COLUMN: Architectural Dark Panel + Donut Visual + Lead CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#16242c] text-[#f7f5f0] p-7 sm:p-9 rounded-[1.75rem] shadow-xl border border-white/10">
            
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2a3840]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#c4a98b] font-semibold">
                {calculationMode === "true_cost" 
                  ? (lang === "en" ? "All-In Living Outflow" : "Presupuesto Mensual Total")
                  : (lang === "en" ? "Standard Mortgage (PITI)" : "Hipoteca Estándar")}
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
                  <span className="text-[9px] uppercase tracking-widest text-[#a5b0b5] font-medium">
                    {calculationMode === "true_cost" 
                      ? (lang === "en" ? "True Living Cost" : "Costo Total Real")
                      : (lang === "en" ? "Est. Mortgage" : "Pago Estimado")}
                  </span>
                  <span className="font-['Gilda_Display'] text-3xl sm:text-4xl font-bold text-white leading-tight">
                    ${totalMonthlyOutflow.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-[#c4a98b] tracking-wider uppercase mt-0.5">
                    {lang === "en" ? "Per Month" : "Por Mes"}
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
                    {lang === "en" ? "Affordability Review" : "Asesoría Financiera"}
                  </span>
                  <span className="text-xs font-medium text-white block mt-0.5">
                    {lang === "en" ? "Book 30-Min Strategy Call" : "Agendar Consulta de 30 Min"}
                  </span>
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-[#c4a98b] group-hover:text-white transition-colors">
                  <span>{lang === "en" ? "Talk with Bernardo" : "Hablar con Bernardo"}</span>
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
                    {lang === "en" ? "Live MLS Property Search" : "Búsqueda en MLS"}
                  </span>
                  <span className="text-xs font-bold text-[#16242c] block mt-0.5">
                    {lang === "en" ? "Homes in This Budget" : "Casas en Este Presupuesto"}
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
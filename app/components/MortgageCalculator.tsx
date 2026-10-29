"use client";

import { useState, useMemo } from "react";
import { Gilda_Display, Jost } from "next/font/google";
import { 
  ArrowUpRight, 
  ChevronDown,
  ChevronUp,
  Zap,
  Flame,
  Droplets,
  Wifi,
  Sliders,
  FileText
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

interface MortgageCalculatorProps {
  lang?: "en" | "es";
  onRequestReport?: (summaryNotes: string) => void;
}

export default function MortgageCalculator({ lang = "en", onRequestReport }: MortgageCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<"piti" | "true_cost">("true_cost");
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [downPayment, setDownPayment] = useState<number>(70000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(4550);
  const [taxPercent, setTaxPercent] = useState<number>(1.3);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1800);
  const [hoaMonthly, setHoaMonthly] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);

  const [squareFootage, setSquareFootage] = useState<number>(1850);
  const [gasMonthly, setGasMonthly] = useState<number>(135);
  const [electricMonthly, setElectricMonthly] = useState<number>(125);
  const [waterMonthly, setWaterMonthly] = useState<number>(85);
  const [internetMonthly, setInternetMonthly] = useState<number>(70);
  const [customUtilitiesOverridden, setCustomUtilitiesOverridden] = useState<boolean>(false);

  const updateUtilitiesFromSqFt = (sqft: number) => {
    setSquareFootage(sqft);
    if (!customUtilitiesOverridden) {
      setGasMonthly(Math.round(sqft * 0.072));
      setElectricMonthly(Math.round(40 + sqft * 0.046));
      setWaterMonthly(Math.round(45 + sqft * 0.021));
    }
  };

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

  const loanAmount = Math.max(0, homePrice - downPayment);

  // 1. Calculate Principal & Interest
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

  // 2. Calculate PMI (0.5% annually if Down Payment is less than 20%)
  const monthlyPMI = useMemo(() => {
    if (downPaymentPercent < 20 && loanAmount > 0) {
      return Math.round((loanAmount * 0.005) / 12);
    }
    return 0;
  }, [downPaymentPercent, loanAmount]);

  const monthlyPropertyTax = Math.round(propertyTaxAnnual / 12);
  const monthlyInsurance = Math.round(homeInsuranceAnnual / 12);

  const totalUtilitiesMonthly = useMemo(() => {
    if (calculationMode === "piti") return 0;
    return gasMonthly + electricMonthly + waterMonthly + internetMonthly;
  }, [calculationMode, gasMonthly, electricMonthly, waterMonthly, internetMonthly]);

  // 3. Update Total Monthly Outflow to include PMI
  const totalMonthlyOutflow =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + hoaMonthly + monthlyPMI + totalUtilitiesMonthly;

  const triggerReportRequest = () => {
    const summary = lang === "es"
      ? `Interesado en reporte para propiedad de $${homePrice.toLocaleString()} con enganche de $${downPayment.toLocaleString()} (${downPaymentPercent}%). Presupuesto mensual estimado: $${totalMonthlyOutflow.toLocaleString()}/mes.`
      : `Requesting report for property priced at $${homePrice.toLocaleString()} with down payment of $${downPayment.toLocaleString()} (${downPaymentPercent}%). Estimated monthly outflow: $${totalMonthlyOutflow.toLocaleString()}/mo.`;

    if (onRequestReport) {
      onRequestReport(summary);
    } else {
      const el = document.getElementById("mred-lead-capture");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 4. Inject PMI dynamically into the Donut Chart if > 0
  const segments = useMemo(() => {
    if (totalMonthlyOutflow <= 0) return [];
    
    const list = [
      { name: lang === "en" ? "Principal & Interest" : "Capital e Interés", value: monthlyPrincipalAndInterest, color: "#c4a98b", pct: monthlyPrincipalAndInterest / totalMonthlyOutflow },
      { name: lang === "en" ? "Property Taxes" : "Impuestos Prediales", value: monthlyPropertyTax, color: "#f7f5f0", pct: monthlyPropertyTax / totalMonthlyOutflow },
      { name: lang === "en" ? "Home Insurance" : "Seguro de Propiedad", value: monthlyInsurance, color: "#7a8a92", pct: monthlyInsurance / totalMonthlyOutflow },
    ];

    if (monthlyPMI > 0) {
      list.push({ 
        name: lang === "en" ? "PMI (Mortgage Insurance)" : "PMI (Seguro Hipotecario)", 
        value: monthlyPMI, 
        color: "#546168", // Deep slate tone fitting your luxury palette
        pct: monthlyPMI / totalMonthlyOutflow 
      });
    }

    if (hoaMonthly > 0) {
      list.push({ name: lang === "en" ? "HOA Dues" : "Cuotas HOA", value: hoaMonthly, color: "#d97706", pct: hoaMonthly / totalMonthlyOutflow });
    }

    if (calculationMode === "true_cost" && totalUtilitiesMonthly > 0) {
      list.push({ name: lang === "en" ? "Utilities & Living Bills" : "Servicios & Facturas", value: totalUtilitiesMonthly, color: "#2dd4bf", pct: totalUtilitiesMonthly / totalMonthlyOutflow });
    }

    return list.filter(s => s.value > 0);
  }, [monthlyPrincipalAndInterest, monthlyPropertyTax, monthlyInsurance, monthlyPMI, hoaMonthly, totalUtilitiesMonthly, totalMonthlyOutflow, calculationMode, lang]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulativeStroke = 0;

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="absolute -inset-2 rounded-[2.75rem] bg-gradient-to-r from-[#c4a98b]/20 via-[#16242c]/5 to-[#2dd4bf]/15 blur-3xl opacity-80 pointer-events-none" />

      <div className={`${gilda.variable} ${jost.variable} font-sans relative w-full bg-white rounded-[2rem] border border-[#ded9cf] p-6 sm:p-10 lg:p-12 shadow-[0_25px_65px_-15px_rgba(22,36,44,0.12)] text-[#16242c]`}>
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

          <div className="inline-flex p-1 rounded-2xl bg-[#f7f5f0] border border-[#ded9cf] shrink-0">
            <button type="button" onClick={() => setCalculationMode("piti")} className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer ${calculationMode === "piti" ? "bg-[#16242c] text-white shadow-sm" : "text-[#546168] hover:text-[#16242c]"}`}>
              {lang === "en" ? "Mortgage Only (PITI)" : "Solo Hipoteca"}
            </button>
            <button type="button" onClick={() => setCalculationMode("true_cost")} className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 cursor-pointer ${calculationMode === "true_cost" ? "bg-[#16242c] text-[#2dd4bf] shadow-sm ring-1 ring-[#2dd4bf]/40" : "text-[#546168] hover:text-[#16242c]"}`}>
              <Zap className="w-3.5 h-3.5 text-[#2dd4bf]" />
              <span>{lang === "en" ? "True Cost (+ Bills)" : "Costo Real"}</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#7a8a92]">{lang === "en" ? "Select Market Price Tier" : "Elegir Rango de Precio"}</span>
                <span className="text-[10.5px] text-[#8c6d48] font-medium">{lang === "en" ? "1-Click Preset" : "1 Clic"}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[250000, 350000, 475000, 650000].map((preset) => (
                  <button key={preset} type="button" onClick={() => handleHomePriceChange(preset)} className={`py-2 px-1 rounded-xl text-xs font-medium transition cursor-pointer border ${homePrice === preset ? "bg-[#16242c] text-white border-[#16242c] shadow-sm ring-2 ring-[#c4a98b]/40" : "bg-[#f7f5f0] hover:bg-white text-[#546168] border-[#ded9cf]"}`}>
                    ${(preset / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">{lang === "en" ? "Purchase Price" : "Precio de Compra"}</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                <input type="number" value={homePrice} onChange={(e) => handleHomePriceChange(Number(e.target.value))} className="w-full pl-8 pr-4 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">{lang === "en" ? "Down Payment" : "Enganche Inicial"}</label>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                  <input type="number" value={downPayment} onChange={(e) => handleDownPaymentAmountChange(Number(e.target.value))} className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition" />
                </div>
                <div className="col-span-4 relative">
                  <input type="number" step="0.5" value={downPaymentPercent} onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))} className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition text-right" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">{lang === "en" ? "Loan Term" : "Plazo de Hipoteca"}</label>
                <select value={loanTermYears} onChange={(e) => setLoanTermYears(Number(e.target.value))} className="w-full px-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition cursor-pointer">
                  <option value={30}>30-Year Fixed</option>
                  <option value={20}>20-Year Fixed</option>
                  <option value={15}>15-Year Fixed</option>
                  <option value={10}>10-Year Fixed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">{lang === "en" ? "Interest Rate" : "Tasa de Interés"}</label>
                <div className="relative">
                  <input type="number" step="0.125" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition text-right" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
                </div>
              </div>
            </div>

            {calculationMode === "true_cost" && (
              <div className="p-5 rounded-2xl bg-[#f7f5f0] border border-[#ded9cf] space-y-4">
                <div className="flex items-center justify-between border-b border-[#ded9cf] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#16242c] flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-[#2dd4bf]" /><span>{lang === "en" ? "Home Size & Utilities Engine" : "Motor de Metraje"}</span></span>
                  </div>
                  <span className="font-['Gilda_Display'] text-xl font-bold text-[#16242c]">{squareFootage.toLocaleString()} sq ft</span>
                </div>
                <div>
                  <input type="range" min={800} max={4000} step={50} value={squareFootage} onChange={(e) => updateUtilitiesFromSqFt(Number(e.target.value))} className="w-full h-2 bg-[#ded9cf] rounded-lg appearance-none cursor-pointer accent-[#16242c]" />
                  <div className="flex justify-between text-[10px] text-[#7a8a92] mt-1 font-medium"><span>800 sq ft</span><span>1,850 sq ft</span><span>3,500+ sq ft</span></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase"><Flame className="w-3 h-3 text-orange-500" /><span>{lang === "en" ? "Gas (Heat)" : "Gas"}</span></div>
                    <div className="mt-1 relative"><span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span><input type="number" value={gasMonthly} onChange={(e) => { setCustomUtilitiesOverridden(true); setGasMonthly(Number(e.target.value)); }} className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none" /></div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase"><Zap className="w-3 h-3 text-amber-500" /><span>{lang === "en" ? "Electric" : "Luz"}</span></div>
                    <div className="mt-1 relative"><span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span><input type="number" value={electricMonthly} onChange={(e) => { setCustomUtilitiesOverridden(true); setElectricMonthly(Number(e.target.value)); }} className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none" /></div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase"><Droplets className="w-3 h-3 text-blue-500" /><span>{lang === "en" ? "Water" : "Agua"}</span></div>
                    <div className="mt-1 relative"><span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span><input type="number" value={waterMonthly} onChange={(e) => { setCustomUtilitiesOverridden(true); setWaterMonthly(Number(e.target.value)); }} className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none" /></div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#ded9cf]">
                    <div className="flex items-center gap-1 text-[10px] text-[#7a8a92] font-semibold uppercase"><Wifi className="w-3 h-3 text-emerald-500" /><span>Internet</span></div>
                    <div className="mt-1 relative"><span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span><input type="number" value={internetMonthly} onChange={(e) => { setCustomUtilitiesOverridden(true); setInternetMonthly(Number(e.target.value)); }} className="w-full pl-4 pr-1 py-1 text-xs font-semibold text-[#16242c] bg-transparent focus:outline-none" /></div>
                  </div>
                </div>
              </div>
            )}

            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8c6d48] hover:text-[#16242c] transition pt-1 cursor-pointer">
              <span>{showAdvanced ? (lang === "en" ? "Hide Taxes & Insurance" : "Ocultar Impuestos y Seguro") : (lang === "en" ? "Show Taxes & Insurance" : "Mostrar Impuestos y Seguro")}</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvanced && (
              <div className="space-y-4 pt-3 border-t border-[#ded9cf]">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">{lang === "en" ? "Annual Property Tax (Cook Co.)" : "Impuesto Predial Anual"}</label>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-8 relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                      <input type="number" value={propertyTaxAnnual} onChange={(e) => handleTaxAmountChange(Number(e.target.value))} className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition" />
                    </div>
                    <div className="col-span-4 relative">
                      <input type="number" step="0.05" value={taxPercent} onChange={(e) => handleTaxPercentChange(Number(e.target.value))} className="w-full pl-3 pr-7 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition text-right" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">{lang === "en" ? "Home Insurance / Yr" : "Seguro Anual"}</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                      <input type="number" value={homeInsuranceAnnual} onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value))} className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">{lang === "en" ? "HOA Dues / Mo" : "Cuota HOA / Mes"}</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7a8a92] font-medium">$</span>
                      <input type="number" value={hoaMonthly} onChange={(e) => setHoaMonthly(Number(e.target.value))} className="w-full pl-8 pr-3 py-2.5 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#16242c] text-[#f7f5f0] p-7 sm:p-9 rounded-[1.75rem] shadow-xl border border-white/10">
            <div className="flex items-center justify-between pb-6 border-b border-[#2a3840]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#c4a98b] font-semibold">{calculationMode === "true_cost" ? (lang === "en" ? "All-In Living Outflow" : "Presupuesto Mensual Total") : (lang === "en" ? "Standard Mortgage (PITI)" : "Hipoteca Estándar")}</span>
              <span className="text-[10px] uppercase tracking-wider text-[#a5b0b5]">{loanTermYears}Y Fixed @ {interestRate}%</span>
            </div>

            <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="relative w-48 h-48 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#22333d" strokeWidth="20" />
                  {segments.map((seg, idx) => {
                    const dashLength = seg.pct * circumference;
                    const dashOffset = -cumulativeStroke;
                    cumulativeStroke += dashLength;
                    return (
                      <circle key={idx} cx="100" cy="100" r={radius} fill="transparent" stroke={seg.color} strokeWidth="20" strokeDasharray={`${dashLength} ${circumference - dashLength}`} strokeDashoffset={dashOffset} className="transition-all duration-500 ease-out" />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#a5b0b5] font-medium">{calculationMode === "true_cost" ? (lang === "en" ? "True Living Cost" : "Costo Total Real") : (lang === "en" ? "Est. Mortgage" : "Pago Estimado")}</span>
                  <span className="font-['Gilda_Display'] text-3xl sm:text-4xl font-bold text-white leading-tight">${totalMonthlyOutflow.toLocaleString()}</span>
                  <span className="text-[9px] text-[#c4a98b] tracking-wider uppercase mt-0.5">{lang === "en" ? "Per Month" : "Por Mes"}</span>
                </div>
              </div>
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

            {/* STRATEGIC LEAD MAGNET CTA */}
            <div className="mt-4 pt-5 border-t border-[#2a3840]">
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-lg">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#c4a98b] flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4a98b] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c4a98b]" />
                    </span>
                    {lang === "es" ? "Paso Final Requerido" : "Next Step Available"}
                  </span>
                  <p className="text-[13px] text-white font-semibold">
                    {lang === "es" 
                      ? "¿Quieres guardar este desglose y verificar subsidios IHDA ($15k)?" 
                      : "Want to save this breakdown & verify IHDA grant options ($15k)?"}
                  </p>
                  <p className="text-[10px] text-[#a5b0b5] font-light">
                    {lang === "es" 
                      ? "Toma 30 segundos • 100% Gratis • Sin compromiso." 
                      : "Takes 30 seconds • 100% Free • No commitment."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={triggerReportRequest}
                  className="relative overflow-hidden shrink-0 w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#c4a98b] to-[#d6c0a4] hover:from-[#b5997a] hover:to-[#c4a98b] text-[#16242c] text-xs font-extrabold uppercase tracking-wider transition-all active:scale-95 text-center shadow-[0_0_20px_rgba(196,169,139,0.25)] cursor-pointer group flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <FileText className="w-4 h-4" />
                  <span>{lang === "es" ? "Desbloquear Mi Reporte" : "Unlock My Report"}</span>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-[#2a3840] mt-4">
              <a href="https://calendly.com/listwithbernardo/30min" target="_blank" rel="noopener noreferrer" className="group flex flex-col justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition active:scale-95 text-left">
                <div><span className="text-[9.5px] uppercase tracking-wider text-[#c4a98b] font-semibold block">{lang === "en" ? "Affordability Review" : "Asesoría Financiera"}</span><span className="text-xs font-medium text-white block mt-0.5">{lang === "en" ? "Book 30-Min Call" : "Agendar Llamada de 30 Min"}</span></div>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#c4a98b] group-hover:text-white transition-colors"><span>{lang === "en" ? "Talk with Bernardo" : "Hablar con Bernardo"}</span><ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></div>
              </a>
              <a href="https://bernardojimenez.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="group flex flex-col justify-between p-3 rounded-xl bg-[#c4a98b] hover:bg-[#b5997a] text-[#16242c] transition active:scale-95 text-left">
                <div><span className="text-[9.5px] uppercase tracking-wider text-[#16242c]/70 font-semibold block">{lang === "en" ? "Live MLS Search" : "Búsqueda en MLS"}</span><span className="text-xs font-bold text-[#16242c] block mt-0.5">{lang === "en" ? "Homes in This Budget" : "Casas en Este Presupuesto"}</span></div>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#16242c] font-semibold"><span>{lang === "en" ? "Open RealScout Feed" : "Abrir RealScout"}</span><ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useMemo } from "react";
import { Gilda_Display, Jost } from "next/font/google";
import { 
  Building2, 
  HelpCircle, 
  ArrowUpRight, 
  DollarSign,
  Car,
  CreditCard,
  GraduationCap,
  Scale,
  ShieldAlert,
  CheckCircle2,
  Calendar,
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

export default function AffordabilityCalculator({ lang = "es" }: { lang?: "en" | "es" }) {
  // Income & Down Payment
  const [annualSalary, setAnnualSalary] = useState<number>(85000);
  const [monthlyGrossIncome, setMonthlyGrossIncome] = useState<number>(7083);
  const [cashDownPayment, setCashDownPayment] = useState<number>(30000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // Monthly Debts
  const [carPayment, setCarPayment] = useState<number>(420);
  const [creditCardsMin, setCreditCardsMin] = useState<number>(150);
  const [studentLoans, setStudentLoans] = useState<number>(180);
  const [otherDebts, setOtherDebts] = useState<number>(0);

  // Sync Salary and Monthly Gross
  const handleSalaryChange = (val: number) => {
    setAnnualSalary(val);
    setMonthlyGrossIncome(Math.round(val / 12));
  };

  const handleMonthlyIncomeChange = (val: number) => {
    setMonthlyGrossIncome(val);
    setAnnualSalary(val * 12);
  };

  const totalMonthlyDebt = carPayment + creditCardsMin + studentLoans + otherDebts;

  // 28/36 Rule Engine
  const maxHousingPaymentFrontEnd = useMemo(() => {
    return Math.round(monthlyGrossIncome * 0.28);
  }, [monthlyGrossIncome]);

  const maxTotalDebtBackEnd = useMemo(() => {
    return Math.round(monthlyGrossIncome * 0.36);
  }, [monthlyGrossIncome]);

  const maxHousingPaymentBackEnd = useMemo(() => {
    return Math.max(0, maxTotalDebtBackEnd - totalMonthlyDebt);
  }, [maxTotalDebtBackEnd, totalMonthlyDebt]);

  // The binding qualification number is the lower of Front-End and Back-End
  const qualifyingMonthlyPayment = useMemo(() => {
    return Math.min(maxHousingPaymentFrontEnd, maxHousingPaymentBackEnd);
  }, [maxHousingPaymentFrontEnd, maxHousingPaymentBackEnd]);

  // Reverse calculate purchase price from PITI
  // Estimated deductions: Property tax (~1.5% in Cook County), Insurance (~$150/mo)
  const estimatedMaxPurchasePrice = useMemo(() => {
    if (qualifyingMonthlyPayment <= 200) return 0;
    
    // Allocate ~72% of payment to Principal & Interest (remaining 28% covers Cook Co. taxes + insurance)
    const availableForPI = Math.max(100, qualifyingMonthlyPayment * 0.72);
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    const maxLoan =
      (availableForPI * (Math.pow(1 + monthlyRate, totalPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));

    return Math.round(maxLoan + cashDownPayment);
  }, [qualifyingMonthlyPayment, interestRate, loanTermYears, cashDownPayment]);

  // DTI Ratios for Visual Gauge
  const frontEndRatio = monthlyGrossIncome > 0 
    ? ((qualifyingMonthlyPayment / monthlyGrossIncome) * 100).toFixed(1) 
    : "0";
  const backEndRatio = monthlyGrossIncome > 0 
    ? (((qualifyingMonthlyPayment + totalMonthlyDebt) / monthlyGrossIncome) * 100).toFixed(1) 
    : "0";

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Halo Glow */}
      <div className="absolute -inset-2 rounded-[2.75rem] bg-gradient-to-r from-[#c4a98b]/20 via-[#16242c]/5 to-[#c4a98b]/20 blur-3xl opacity-80 pointer-events-none" />

      <div className={`${gilda.variable} ${jost.variable} font-sans relative w-full bg-white rounded-[2rem] border border-[#ded9cf] p-6 sm:p-10 lg:p-12 shadow-[0_25px_65px_-15px_rgba(22,36,44,0.12)] text-[#16242c]`}>
        
        {/* Editorial Header */}
        <div className="border-b border-[#ded9cf] pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16242c] text-[#c4a98b] text-[10px] uppercase tracking-[0.24em] font-semibold mb-3.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4a98b] animate-pulse" />
            {lang === "es" ? "Regla 28/36 & DTI" : "28/36 DTI Rule Engine"}
          </div>
          <h2 className="font-['Gilda_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#16242c] tracking-tight leading-tight">
            {lang === "es" ? "¿Cuánto Puedo Calificar con mi Salario?" : "How Much Home Can You Afford?"}
          </h2>
          <p className="text-xs sm:text-sm text-[#546168] mt-2 max-w-2xl font-light leading-relaxed">
            {lang === "es"
              ? "Los prestamistas hipotecarios evalúan tu capacidad de pago usando la relación deuda-ingreso (DTI). Ingresa tus ingresos y deudas mensuales para conocer tu poder de compra real."
              : "Lenders look beyond salary alone. Enter your gross income and monthly debts to calculate your exact qualification ceiling using standard 28/36 underwriting guidelines."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Inputs (Income, Down Payment, Debts) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Income Section */}
            <div className="p-5 rounded-2xl bg-[#f7f5f0] border border-[#ded9cf] space-y-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#16242c] block">
                {lang === "es" ? "1. Ingresos Brutos (Antes de Impuestos)" : "1. Gross Income (Pre-Tax)"}
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#546168] mb-1">
                    {lang === "es" ? "Salario Anual" : "Annual Salary"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92] font-semibold">$</span>
                    <input
                      type="number"
                      step={1000}
                      value={annualSalary}
                      onChange={(e) => handleSalaryChange(Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-2 bg-white border border-[#ded9cf] rounded-xl text-xs sm:text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#546168] mb-1">
                    {lang === "es" ? "Ingreso Mensual" : "Monthly Gross"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92] font-semibold">$</span>
                    <input
                      type="number"
                      value={monthlyGrossIncome}
                      onChange={(e) => handleMonthlyIncomeChange(Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-2 bg-white border border-[#ded9cf] rounded-xl text-xs sm:text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#546168] mb-1">
                  {lang === "es" ? "Enganche en Efectivo Ahorrado" : "Available Cash Down Payment"}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92] font-semibold">$</span>
                  <input
                    type="number"
                    step={1000}
                    value={cashDownPayment}
                    onChange={(e) => setCashDownPayment(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 bg-white border border-[#ded9cf] rounded-xl text-xs sm:text-sm font-semibold text-[#16242c] focus:outline-none focus:border-[#16242c]"
                  />
                </div>
              </div>
            </div>

            {/* Monthly Debts Section */}
            <div className="p-5 rounded-2xl bg-[#f7f5f0] border border-[#ded9cf] space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#ded9cf] pb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#16242c]">
                  {lang === "es" ? "2. Deudas Fijas Mensuales" : "2. Monthly Debt Obligations"}
                </span>
                <span className="text-xs font-semibold text-[#8c6d48]">
                  Total: ${totalMonthlyDebt}/mo
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1 text-[10px] text-[#546168] uppercase font-semibold mb-1">
                    <Car className="w-3 h-3 text-[#16242c]" />
                    <span>{lang === "es" ? "Pago de Auto" : "Car Payment"}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                    <input
                      type="number"
                      value={carPayment}
                      onChange={(e) => setCarPayment(Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-1.5 bg-white border border-[#ded9cf] rounded-lg text-xs font-semibold text-[#16242c] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-[10px] text-[#546168] uppercase font-semibold mb-1">
                    <CreditCard className="w-3 h-3 text-[#16242c]" />
                    <span>{lang === "es" ? "Mínimo Tarjetas" : "Credit Cards Min"}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                    <input
                      type="number"
                      value={creditCardsMin}
                      onChange={(e) => setCreditCardsMin(Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-1.5 bg-white border border-[#ded9cf] rounded-lg text-xs font-semibold text-[#16242c] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-[10px] text-[#546168] uppercase font-semibold mb-1">
                    <GraduationCap className="w-3 h-3 text-[#16242c]" />
                    <span>{lang === "es" ? "Estudiantiles" : "Student Loans"}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                    <input
                      type="number"
                      value={studentLoans}
                      onChange={(e) => setStudentLoans(Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-1.5 bg-white border border-[#ded9cf] rounded-lg text-xs font-semibold text-[#16242c] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-[10px] text-[#546168] uppercase font-semibold mb-1">
                    <DollarSign className="w-3 h-3 text-[#16242c]" />
                    <span>{lang === "es" ? "Otras Deudas" : "Other Loans"}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7a8a92]">$</span>
                    <input
                      type="number"
                      value={otherDebts}
                      onChange={(e) => setOtherDebts(Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-1.5 bg-white border border-[#ded9cf] rounded-lg text-xs font-semibold text-[#16242c] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Qualification Results & Buying Budget */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#16242c] text-[#f7f5f0] p-7 sm:p-9 rounded-[1.75rem] shadow-xl border border-white/10">
            
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2a3840]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#c4a98b] font-semibold">
                {lang === "es" ? "Presupuesto Máximo de Compra" : "Affordability Calculation"}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#a5b0b5]">
                {loanTermYears}Y @ {interestRate}%
              </span>
            </div>

            {/* Estimated Purchase Price Centerpiece */}
            <div className="py-6 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#a5b0b5] block mb-1">
                {lang === "es" ? "Rango Estimado de Compra" : "Estimated Maximum Purchase Price"}
              </span>
              <span className="font-['Gilda_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
                ${estimatedMaxPurchasePrice.toLocaleString()}
              </span>
              <span className="text-xs text-[#c4a98b] block mt-2 font-medium">
                {lang === "es"
                  ? `Cuota Máxima de Vivienda: $${qualifyingMonthlyPayment.toLocaleString()}/mes`
                  : `Max Monthly Housing Budget: $${qualifyingMonthlyPayment.toLocaleString()}/mo`}
              </span>
            </div>

            {/* DTI Diagnostics Panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5 my-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#a5b0b5]">
                  {lang === "es" ? "Front-End DTI (Solo Casa, Máx 28%):" : "Front-End DTI (Housing Only, Max 28%):"}
                </span>
                <span className="font-bold text-white">{frontEndRatio}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#c4a98b] h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (Number(frontEndRatio) / 28) * 100)}%` }} 
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#a5b0b5]">
                  {lang === "es" ? "Back-End DTI (Casa + Deudas, Máx 36%):" : "Back-End DTI (House + Debts, Max 36%):"}
                </span>
                <span className={`font-bold ${Number(backEndRatio) > 36 ? "text-amber-400" : "text-emerald-400"}`}>
                  {backEndRatio}%
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${Number(backEndRatio) > 36 ? "bg-amber-400" : "bg-emerald-400"}`} 
                  style={{ width: `${Math.min(100, (Number(backEndRatio) / 36) * 100)}%` }} 
                />
              </div>

              {Number(backEndRatio) > 36 && (
                <p className="text-[11px] text-amber-300/90 pt-1 leading-relaxed font-light">
                  {lang === "es"
                    ? "Tus pagos de auto y tarjetas están reduciendo tu presupuesto de vivienda. Reducir $200 de deudas fijas aumentaría tu poder de compra en ~$25,000."
                    : "Your fixed debts are reducing your housing budget. Paying down $200 in monthly debt could increase your purchasing power by ~$25,000."}
                </p>
              )}
            </div>

            {/* Bottom Direct CTA Strip */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-[#2a3840]">
              <a
                href="https://calendly.com/listwithbernardo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition active:scale-95 text-left"
              >
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider text-[#c4a98b] font-semibold block">
                    {lang === "es" ? "¿Dudas con tu DTI?" : "Personal DTI Review"}
                  </span>
                  <span className="text-xs font-medium text-white block mt-0.5">
                    {lang === "es" ? "Agenda una Llamada Conmigo" : "Book a 30-Min Strategy Call"}
                  </span>
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-[#c4a98b] group-hover:text-white transition-colors">
                  <span>{lang === "es" ? "Consulta Gratuita" : "Free Consultation"}</span>
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
                    {lang === "es" ? "Casas en tu Presupuesto" : "Target MLS Search"}
                  </span>
                  <span className="text-xs font-bold text-[#16242c] block mt-0.5">
                    {lang === "es" ? `Buscar hasta $${estimatedMaxPurchasePrice.toLocaleString()}` : `Search up to $${estimatedMaxPurchasePrice.toLocaleString()}`}
                  </span>
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-[#16242c] font-semibold">
                  <span>{lang === "es" ? "Ver Propiedades en MLS" : "Open RealScout MLS"}</span>
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
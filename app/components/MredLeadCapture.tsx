"use client";

import { useState, useEffect } from "react";
import { Gilda_Display, Jost } from "next/font/google";
import { Send, RefreshCw, Mail, Phone, Languages, ChevronDown } from "lucide-react";

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

interface MredLeadCaptureProps {
  initialLang?: "en" | "es";
  initialNotes?: string;
}

const formTranslations = {
  en: {
    badge: "Direct connectMLS Portal",
    title: "Connect with Bernardo Jimenez",
    subtitle: "Submit your details below to register directly in my MLS database for private listing alerts.",
    nameLabel: "Full Name",
    firstNamePlaceholder: "First Name",
    lastNamePlaceholder: "Last Name",
    emailLabel: "Email Address",
    mobilePhoneLabel: "Mobile Phone",
    homePhoneLabel: "Home / Alt Phone",
    phonePlaceholder: "(708) 000-0000",
    altPhonePlaceholder: "(Optional)",
    interestLabel: "Area of Interest",
    interests: [
      { id: "A0C68EB21EB53CC5E040010A36011814", label: "Buy a Home" },
      { id: "A0C68EB21EB63CC5E040010A36011814", label: "Buy a Home for the First Time" },
      { id: "A0C68EB21EB73CC5E040010A36011814", label: "Sell a Home" },
      { id: "A0C68EB21EB83CC5E040010A36011814", label: "Buy and Sell a Home" },
      { id: "A0C68EB21EB93CC5E040010A36011814", label: "Rent a Home" },
      { id: "A0C68EB21EBA3CC5E040010A36011814", label: "Relocate" },
      { id: "A0C68EB21EBB3CC5E040010A36011814", label: "Investment" },
      { id: "A0C68EB21EBC3CC5E040010A36011814", label: "Other" },
    ],
    detailsLabel: "How can I help you?",
    detailsPlaceholder: "Share preferred neighborhoods, budget, timeline, or specific questions...",
    charsRemaining: "chars left",
    captchaLabel: "Security Verification Code",
    captchaPlaceholder: "Enter Code",
    submitButton: "Submit to connectMLS Portal",
    disclaimer: "Your privacy is strictly safeguarded. Leads register directly with Bernardo Jimenez via Midwest Real Estate Data (MRED).",
  },
  es: {
    badge: "Portal Oficial de Contacto MRED",
    title: "Platiquemos Sobre tus Planes",
    subtitle: "Ingresa tus datos para conectarte directamente con mi base de datos del MLS y recibir alertas personalizadas.",
    nameLabel: "Nombre Completo",
    firstNamePlaceholder: "Nombre",
    lastNamePlaceholder: "Apellido",
    emailLabel: "Correo Electrónico",
    mobilePhoneLabel: "Teléfono Móvil",
    homePhoneLabel: "Teléfono Secundario",
    phonePlaceholder: "(708) 000-0000",
    altPhonePlaceholder: "(Opcional)",
    interestLabel: "Tipo de Interés",
    interests: [
      { id: "A0C68EB21EB53CC5E040010A36011814", label: "Comprar una Casa" },
      { id: "A0C68EB21EB63CC5E040010A36011814", label: "Comprar Casa por Primera Vez" },
      { id: "A0C68EB21EB73CC5E040010A36011814", label: "Vender mi Casa" },
      { id: "A0C68EB21EB83CC5E040010A36011814", label: "Vender y Comprar Casa" },
      { id: "A0C68EB21EB93CC5E040010A36011814", label: "Rentar una Propiedad" },
      { id: "A0C68EB21EBA3CC5E040010A36011814", label: "Reubicación (Mudanza a Chicago)" },
      { id: "A0C68EB21EBB3CC5E040010A36011814", label: "Inversión Inmobiliaria" },
      { id: "A0C68EB21EBC3CC5E040010A36011814", label: "Otro Asunto" },
    ],
    detailsLabel: "¿Cómo puedo ayudarte?",
    detailsPlaceholder: "Comparte tus vecindarios de interés, presupuesto, tiempos o preguntas específicas...",
    charsRemaining: "caracteres restantes",
    captchaLabel: "Código de Seguridad",
    captchaPlaceholder: "Ingresar Código",
    submitButton: "Enviar a connectMLS",
    disclaimer: "Tus datos están protegidos y se registran directamente con Bernardo Jimenez a través de MRED connectMLS.",
  }
};

export default function MredLeadCapture({ initialLang = "en", initialNotes = "" }: MredLeadCaptureProps) {
  const [lang, setLang] = useState<"en" | "es">(initialLang);
  const [mobilePhone, setMobilePhone] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const maxNotesLength = 2048;

  useEffect(() => {
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  const t = formTranslations[lang];

  const formatPhoneNumber = (value: string) => {
    const rawDigits = value.replace(/\D/g, "").slice(0, 10);
    if (rawDigits.length === 0) return "";
    if (rawDigits.length <= 3) return `(${rawDigits}`;
    if (rawDigits.length <= 6) return `(${rawDigits.slice(0, 3)}) ${rawDigits.slice(3)}`;
    return `(${rawDigits.slice(0, 3)}) ${rawDigits.slice(3, 6)}-${rawDigits.slice(6, 10)}`;
  };

  const handleMobilePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobilePhone(formatPhoneNumber(e.target.value));
  };

  const handleHomePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHomePhone(formatPhoneNumber(e.target.value));
  };

  const refreshCaptcha = () => {
    setCaptchaKey(Date.now());
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl px-2 sm:px-0">
      <div className="absolute -inset-1.5 sm:-inset-2 rounded-[2.5rem] bg-gradient-to-r from-[#c4a98b]/20 via-[#16242c]/5 to-[#c4a98b]/25 blur-2xl opacity-75 pointer-events-none" />

      <div className={`${gilda.variable} ${jost.variable} font-sans relative w-full bg-white rounded-[1.75rem] sm:rounded-[2rem] border border-[#ded9cf] p-5 sm:p-10 shadow-[0_20px_50px_-15px_rgba(22,36,44,0.1)] text-[#16242c]`}>
        <div className="flex items-start justify-between border-b border-[#ded9cf] pb-5 sm:pb-6 mb-6 gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8c6d48] font-semibold block">
              {t.badge}
            </span>
            <h3 className="font-['Gilda_Display'] text-2xl sm:text-3xl text-[#16242c] mt-1 tracking-tight leading-snug">
              {t.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#546168] mt-1 font-light leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#ded9cf] bg-[#f7f5f0] hover:bg-white text-xs font-medium text-[#16242c] transition shadow-sm active:scale-95 cursor-pointer mt-0.5"
            aria-label="Switch form language"
          >
            <Languages className="w-3.5 h-3.5 text-[#8c6d48]" />
            <span>{lang === "en" ? "Español" : "English"}</span>
          </button>
        </div>

        <form
          name="capture"
          method="post"
          target="_self"
          action="https://connectmls.mredllc.com/common/externalAction.jsp?do=dynaconn.soy.setup.leadwidget.SubmitLeadForm"
          className="space-y-4 sm:space-y-5"
        >
          <input type="hidden" name="agentID" id="agentID" value="273410" />

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
              {t.nameLabel} <span className="text-[#8c6d48]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <input
                type="text"
                name="firstname"
                required
                placeholder={t.firstNamePlaceholder}
                className="w-full px-4 py-2.5 sm:py-3 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] placeholder:text-[#a5b0b5] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
              />
              <input
                type="text"
                name="lastname"
                required
                placeholder={t.lastNamePlaceholder}
                className="w-full px-4 py-2.5 sm:py-3 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] placeholder:text-[#a5b0b5] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
              {t.emailLabel} <span className="text-[#8c6d48]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="emailaddr"
                required
                inputMode="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] placeholder:text-[#a5b0b5] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
              />
              <Mail className="w-4 h-4 text-[#7a8a92] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                {t.mobilePhoneLabel}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="mobilephone"
                  inputMode="tel"
                  value={mobilePhone}
                  onChange={handleMobilePhoneChange}
                  placeholder={t.phonePlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] placeholder:text-[#a5b0b5] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
                />
                <Phone className="w-4 h-4 text-[#7a8a92] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
                {t.homePhoneLabel}
              </label>
              <input
                type="tel"
                name="homephone"
                inputMode="tel"
                value={homePhone}
                onChange={handleHomePhoneChange}
                placeholder={t.altPhonePlaceholder}
                className="w-full px-4 py-2.5 sm:py-3 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] placeholder:text-[#a5b0b5] focus:outline-none focus:border-[#16242c] focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-1.5">
              {t.interestLabel} <span className="text-[#8c6d48]">*</span>
            </label>
            <div className="relative">
              <select
                name="clienttype"
                id="clienttype"
                defaultValue="A0C68EB21EB53CC5E040010A36011814"
                className="w-full appearance-none px-4 py-2.5 sm:py-3 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] focus:outline-none focus:border-[#16242c] focus:bg-white transition cursor-pointer pr-10"
              >
                {t.interests.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#7a8a92] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#16242c]">
                {t.detailsLabel}
              </label>
              <span className="text-[10px] sm:text-[11px] text-[#7a8a92]">
                {maxNotesLength - notes.length} {t.charsRemaining}
              </span>
            </div>
            <textarea
              name="notes"
              id="notes"
              rows={3}
              maxLength={maxNotesLength}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.detailsPlaceholder}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#f7f5f0] border border-[#ded9cf] rounded-xl text-sm font-medium text-[#16242c] placeholder:text-[#a5b0b5] focus:outline-none focus:border-[#16242c] focus:bg-white transition resize-none leading-relaxed"
            />
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#f7f5f0] border border-[#ded9cf]">
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#16242c] mb-2">
              {t.captchaLabel} <span className="text-[#8c6d48]">*</span>
            </label>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              <div className="relative overflow-hidden rounded-lg border border-[#ded9cf] bg-white h-11 px-2.5 flex items-center shrink-0 shadow-sm">
                <img
                  src={`https://connectmls.mredllc.com/common/kaptcha.jpg?ts=${captchaKey}`}
                  alt="MRED Security Verification Captcha"
                  className="h-8 max-w-[130px] object-contain"
                />
              </div>

              <button
                type="button"
                onClick={refreshCaptcha}
                title="Refresh verification code"
                className="h-11 w-11 flex items-center justify-center rounded-lg border border-[#ded9cf] bg-white hover:bg-[#ded9cf]/30 text-[#546168] transition shrink-0 active:scale-95 cursor-pointer"
                aria-label="Refresh security code"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <input
                type="text"
                name="kaptcha"
                required
                autoCapitalize="characters"
                autoCorrect="off"
                placeholder={t.captchaPlaceholder}
                className="flex-1 min-w-[120px] h-11 px-3.5 bg-white border border-[#ded9cf] rounded-lg text-sm font-bold tracking-widest text-[#16242c] uppercase focus:outline-none focus:border-[#16242c]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#16242c] hover:bg-[#22333d] text-white text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 shadow-lg transition active:scale-98 cursor-pointer mt-2"
          >
            <span>{t.submitButton}</span>
            <Send className="w-3.5 h-3.5 text-[#c4a98b]" />
          </button>

          <p className="text-[10px] text-center text-[#7a8a92] leading-relaxed pt-1 font-light">
            {t.disclaimer}
          </p>
        </form>
      </div>
    </div>
  );
}
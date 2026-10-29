"use client";

import { MessageSquare } from "lucide-react";

export default function FloatingContactPill({ lang = "en" }: { lang?: "en" | "es" }) {
  const scrollToContact = () => {
    const el = document.getElementById("mred-lead-capture");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 lg:hidden">
      <button
        type="button"
        onClick={scrollToContact}
        className="flex items-center gap-2 bg-[#16242c] text-[#f7f5f0] border border-[#c4a98b]/50 px-4 py-2.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.4)] active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Contact Agent"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4a98b] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c4a98b]" />
        </span>
        <span className="text-xs uppercase tracking-wider font-semibold">
          {lang === "es" ? "Contactar a Bernardo" : "Contact Agent"}
        </span>
        <MessageSquare className="w-3.5 h-3.5 text-[#c4a98b]" />
      </button>
    </div>
  );
}
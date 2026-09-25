// app/blog/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gilda_Display, Jost } from "next/font/google";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  Languages, 
  Phone, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { POSTS } from "@/lib/posts";

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
const ITEMS_PER_PAGE = 6;

export default function BlogIndexPage() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(POSTS.map(p => lang === "en" ? p.category : p.categoryEs));
    return ["All", ...Array.from(cats)];
  }, [lang]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All" || selectedCategory === "Todos") {
      return POSTS;
    }
    return POSTS.filter(p => (lang === "en" ? p.category : p.categoryEs) === selectedCategory);
  }, [selectedCategory, lang]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 380, behavior: "smooth" });
    }
  };

  return (
    <div className={`${gilda.variable} ${jost.variable} font-sans bg-[#f7f5f0] text-[#16242c] min-h-screen flex flex-col selection:bg-[#c4a98b]/30`}>
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#16242c]/95 backdrop-blur-md border-b border-[#2a3840] text-[#f7f5f0]">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 md:px-12">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a5b0b5] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "en" ? "Home" : "Inicio"}</span>
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
              href="https://calendly.com/listwithbernardo/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 border border-white/20 px-4 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-[#16242c] transition-all"
            >
              <span>{lang === "en" ? "Book a Call" : "Agendar Llamada"}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setLang(lang === "en" ? "es" : "en");
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10 transition cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-[#c4a98b]" />
              <span>{lang === "en" ? "Español" : "English"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="bg-[#16242c] text-white pt-20 pb-14 px-6 md:px-12 border-b border-[#2a3840]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#c4a98b] mb-3">
            {lang === "en" ? "Southeast Chicago & South Suburbs" : "Sureste de Chicago & Suburbios del Sur"}
          </p>
          <h1 className="font-['Gilda_Display'] text-[clamp(2.5rem,5vw,4.5rem)] leading-tight tracking-tight">
            {lang === "en" ? "Local Real Estate Journal" : "Diario Inmobiliario Local"}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            {lang === "en" 
              ? "Verified neighborhood guides, local dining icons, property tax strategies, and market analysis across East Side, Hegewisch, Berwyn, and Cook County."
              : "Guías de vecindarios, iconos culinarios locales, estrategias tributarias y análisis de mercado en East Side, Hegewisch, Berwyn y el condado de Cook."
            }
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat 
                    ? "bg-[#c4a98b] text-[#16242c] font-semibold shadow-md" 
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="flex-1 py-14 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        
        {currentPosts.length === 0 ? (
          <div className="text-center py-16 text-[#6b767d]">
            <p className="text-lg">{lang === "en" ? "No articles found in this category." : "No se encontraron artículos en esta categoría."}</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <article 
                key={post.slug}
                className="group flex flex-col bg-white rounded-2xl border border-[#ded9cf] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image 
                    src={post.image} 
                    alt={lang === "en" ? post.title : post.titleEs}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#16242c]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9.5px] uppercase tracking-widest text-[#c4a98b] font-medium border border-white/10">
                    {lang === "en" ? post.category : post.categoryEs}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-[#6b767d] mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-['Gilda_Display'] text-xl md:text-2xl text-[#16242c] group-hover:text-[#8c6d48] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {lang === "en" ? post.title : post.titleEs}
                      </Link>
                    </h2>

                    <p className="mt-2.5 text-[#546168] text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                      {lang === "en" ? post.excerpt : post.excerptEs}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#ded9cf] flex items-center justify-between">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest font-semibold text-[#16242c] group-hover:text-[#c4a98b] transition-colors"
                    >
                      <span>{lang === "en" ? "Read Article" : "Leer Artículo"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <span className="text-[10px] text-[#8c6d48] uppercase tracking-widest font-medium">
                      Bernardo Jimenez
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Interactive Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-[#ded9cf] flex items-center justify-between max-w-xl mx-auto">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#ded9cf] bg-white text-xs uppercase tracking-wider text-[#16242c] hover:bg-[#16242c] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === "en" ? "Prev" : "Ant"}</span>
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-full text-xs font-semibold transition cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#16242c] text-white shadow-md ring-2 ring-[#c4a98b]"
                      : "bg-white border border-[#ded9cf] text-[#546168] hover:bg-[#ded9cf]/40"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#ded9cf] bg-white text-xs uppercase tracking-wider text-[#16242c] hover:bg-[#16242c] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <span>{lang === "en" ? "Next" : "Sig"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Advisory Callout Box */}
        <div className="mt-16 bg-[#16242c] text-white rounded-3xl p-8 md:p-12 text-center border border-[#2a3840] max-w-4xl mx-auto shadow-2xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#c4a98b] mb-3">
            {lang === "en" ? "Direct Real Estate Consultation" : "Consulta Inmobiliaria Directa"}
          </p>
          <h2 className="font-['Gilda_Display'] text-3xl md:text-4xl text-white">
            {lang === "en" ? "Have a question about a specific property or neighborhood?" : "¿Tienes preguntas sobre un vecindario o propiedad en específico?"}
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
            {lang === "en"
              ? "Every real estate move begins with honest conversation and local market clarity. Call or schedule a 30-minute consultation with me anytime."
              : "Cada decisión comienza con una conversación honesta y números claros. Llámame o agenda una llamada de 30 minutos conmigo."
            }
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://calendly.com/listwithbernardo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#16242c] px-7 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#f7f5f0] transition-colors"
            >
              {lang === "en" ? "Schedule a Strategy Call" : "Agendar Consulta Directa"}
            </a>
            <a
              href="tel:7083140477"
              className="border border-white/30 text-white px-7 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#c4a98b]" />
              <span>(708) 314-0477</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#16242c] text-[#a5b0b5] py-8 border-t border-[#2a3840] text-center text-xs">
        <p>© 2026 Bernardo Jimenez · Realty of America, LLC · Equal Housing Opportunity</p>
      </footer>
    </div>
  );
}
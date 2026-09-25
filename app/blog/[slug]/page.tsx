// app/blog/[slug]/page.tsx
"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Gilda_Display, Jost } from "next/font/google";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Languages, 
  Phone, 
  Mail, 
  Share2,
  CalendarCheck
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

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [lang, setLang] = useState<"en" | "es">("en");

  const post = POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Bernardo Jimenez",
      jobTitle: "Licensed Real Estate Broker",
      affiliation: "Realty of America",
      url: "https://barcias.com"
    },
    publisher: {
      "@type": "Organization",
      name: "Realty of America",
      url: "https://barcias.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className={`${gilda.variable} ${jost.variable} font-sans bg-[#f7f5f0] text-[#16242c] min-h-screen flex flex-col selection:bg-[#c4a98b]/30`}>
        
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-[#16242c]/95 backdrop-blur-md border-b border-[#2a3840] text-[#f7f5f0]">
          <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
            <Link href="/blog" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a5b0b5] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "en" ? "All Articles" : "Todos los Artículos"}</span>
            </Link>

            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10 transition cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-[#c4a98b]" />
              <span>{lang === "en" ? "Español" : "English"}</span>
            </button>
          </div>
        </header>

        {/* Article Container */}
        <main className="flex-1 py-12 md:py-20 px-6 max-w-3xl mx-auto w-full">
          
          {/* Header Metadata */}
          <div className="text-center mb-10">
            <span className="inline-block bg-[#16242c] text-[#c4a98b] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {lang === "en" ? post.category : post.categoryEs}
            </span>

            <h1 className="font-['Gilda_Display'] text-3xl sm:text-4xl md:text-5xl leading-tight text-[#16242c]">
              {lang === "en" ? post.title : post.titleEs}
            </h1>

            <div className="flex items-center justify-center gap-4 text-xs text-[#6b767d] mt-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>

          {/* Lead Photo */}
{/* Inside app/blog/[slug]/page.tsx */}
<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-12 shadow-lg border border-[#ded9cf]">
  <Image 
    src={post.image} 
    alt={lang === "en" ? post.title : post.titleEs}
    fill
    priority
    sizes="(max-width: 768px) 100vw, 768px"
    className="object-cover"
  />
</div>

          {/* Body Content */}
          <div className="space-y-6 text-[#2a3840] text-base md:text-lg leading-relaxed font-light">
            {(lang === "en" ? post.contentEn : post.contentEs).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Author Box */}
          <div className="mt-14 p-6 sm:p-8 bg-white rounded-2xl border border-[#ded9cf] shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#16242c] shrink-0">
              <img src={HEADSHOT_URL} alt="Bernardo Jimenez" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-['Gilda_Display'] text-2xl text-[#16242c]">Bernardo Jimenez</h3>
              <p className="text-xs uppercase tracking-widest text-[#6b767d] mt-0.5">
                {lang === "en" ? "Licensed Real Estate Broker · Realty of America" : "Corredor Inmobiliario Licenciado · Realty of America"}
              </p>
              <p className="text-sm text-[#546168] mt-2 font-light">
                {lang === "en"
                  ? "Assisting buyers, sellers, and property investors across Chicago and the surrounding suburbs with transparent, strategic guidance."
                  : "Asesorando a compradores, vendedores e inversionistas en Chicago y sus suburbios con comunicación directa y estratégica."
                }
              </p>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="mt-10 bg-[#16242c] text-white p-8 rounded-2xl text-center space-y-4">
            <h4 className="font-['Gilda_Display'] text-2xl text-white">
              {lang === "en" ? "Planning your next move?" : "¿Planeando tu siguiente paso inmobiliario?"}
            </h4>
            <p className="text-sm text-white/80 max-w-md mx-auto font-light">
              {lang === "en"
                ? "Schedule a 30-minute telephone or Zoom strategy session with me to discuss your timeline, valuation, or buying plan."
                : "Agenda una sesión estratégica de 30 minutos conmigo por teléfono o Zoom para revisar tus metas y opciones."
              }
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href="https://calendly.com/listwithbernardo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#16242c] px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#f7f5f0] transition-colors"
              >
                {lang === "en" ? "Book Strategy Call" : "Agendar Llamada"}
              </a>
              <a
                href="tel:7083140477"
                className="border border-white/30 text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors"
              >
                (708) 314-0477
              </a>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-[#16242c] text-[#a5b0b5] py-8 border-t border-[#2a3840] text-center text-xs">
          <p>© 2026 Bernardo Jimenez · Realty of America, LLC · Equal Housing Opportunity</p>
        </footer>
      </div>
    </>
  );
}
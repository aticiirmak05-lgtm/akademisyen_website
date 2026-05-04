import { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Hakkında — Bahadır Uçan",
  description:
    "Karikatürist ve akademisyen Bahadır Uçan hakkında. Karikatür, 2D/3D animasyon ve akademik araştırmalar.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        
        {/* ── HEADER ── */}
        <section className="pt-80 pb-48 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <span 
              className="accent-badge"
            >
              Sanatçı & Akademisyen
            </span>
            <h1
              className="hero-title mt-8"
            >
              Hakkında
            </h1>
            <p
              className="hero-subtitle mt-12"
              style={{ maxWidth: '800px' }}
            >
              Bahadır Uçan, karikatür sanatı ve 2D/3D animasyon alanında üretim
              yapan bir sanatçı ve akademisyendir. Eserleri, akademik disiplinin
              sıkı çerçevesi ile mizahın özgür çizgisini bir araya getirir.
            </p>
          </div>
        </section>

        {/* ── CONTENT GRID ── */}
        <section className="px-6 md:px-12 lg:px-24 py-48">
          <div className="max-w-6xl mx-auto">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-48"
            >
              
              {/* Uzmanlık Alanları */}
              <div>
                <h3 className="text-2xl font-semibold mb-12 text-foreground flex items-center gap-3">
                  <span className="w-8 h-1 bg-accent-primary"></span>
                  Uzmanlık
                </h3>
                <ul className="flex flex-col gap-8 text-muted font-sans text-base tracking-wide">
                  <li className="border-b border-border hover:border-accent-primary transition-colors py-6 flex justify-between">
                    <span>Karikatür & İllüstrasyon</span>
                    <span className="text-accent-primary">01</span>
                  </li>
                  <li className="border-b border-border hover:border-accent-primary transition-colors py-6 flex justify-between">
                    <span>2D Animasyon</span>
                    <span className="text-accent-primary">02</span>
                  </li>
                  <li className="border-b border-border hover:border-accent-primary transition-colors py-6 flex justify-between">
                    <span>3D Animasyon</span>
                    <span className="text-accent-primary">03</span>
                  </li>
                  <li className="border-b border-border hover:border-accent-primary transition-colors py-6 flex justify-between">
                    <span>Akademik Araştırma</span>
                    <span className="text-accent-primary">04</span>
                  </li>
                  <li className="border-b border-border hover:border-accent-primary transition-colors py-6 flex justify-between">
                    <span>Görsel İletişim</span>
                    <span className="text-accent-primary">05</span>
                  </li>
                </ul>
              </div>

              {/* Kimlik */}
              <div>
                <h3 className="text-2xl font-semibold mb-12 text-foreground flex items-center gap-3">
                  <span className="w-8 h-1 bg-accent-secondary"></span>
                  Kimlik
                </h3>
                <div className="space-y-8 text-muted leading-relaxed text-base bg-surface p-12 border border-border hover:border-accent-secondary transition-colors">
                  <p>
                    Sanat ve akademinin kesişim noktasında çalışan Bahadır Uçan,
                    mizahı bir iletişim aracı olarak ele alır. Her eseri, hem
                    görsel bir ifade hem de düşünsel bir sorgulamadır.
                  </p>
                  <p>
                    Çizgilerindeki dinamizm, akademik araştırmalarından beslenen derin bir
                    gözlem yeteneğinin sonucudur.
                  </p>
                </div>

                <div className="mt-12 flex gap-6">
                  <a href="/category/karikatur" className="btn-secondary text-sm px-8 py-4">
                    Karikatürleri Gör
                  </a>
                  <a href="/category/animasyon" className="btn-secondary text-sm px-8 py-4">
                    Animasyonları İzle
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MANIFESTO QUOTE ── */}
        <section className="px-6 md:px-12 lg:px-24 py-48 mt-24 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="font-serif text-3xl md:text-5xl italic text-foreground leading-snug"
            >
              "Bir karikatür, akademik bir makale kadar ciddi; <br className="hidden md:block"/>
              <span className="text-accent-primary">
                bir animasyon kadar özgür olabilir.
              </span>"
            </h2>
            <div className="mt-12 text-muted text-sm tracking-widest uppercase flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-border"></span>
              Bahadır Uçan
              <span className="w-12 h-[1px] bg-border"></span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

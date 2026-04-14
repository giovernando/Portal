import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { guruData, staffData } from "@/data/guruStaffData";

const GuruStaff = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <Layout>
      <PageHeader title="Guru & Staff" subtitle="Tenaga pendidik dan kependidikan profesional" />

      {/* Guru - Horizontal Scroll */}
      <section className="py-16 bg-card">
        <div className="container">
          <ScrollReveal className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Tenaga Pendidik</h2>
              <p className="text-sm text-muted-foreground mt-1">{guruData.length} guru profesional dan berdedikasi</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </ScrollReveal>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {guruData.map((g) => (
              <Link
                key={g.id}
                to={`/tentang/guru-staff/${g.id}`}
                className="min-w-[250px] bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow snap-start flex-shrink-0 group cursor-pointer"
              >
                <div className="overflow-hidden rounded-2xl w-20 h-20 mx-auto mb-4 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                  <img
                    src={g.photo}
                    alt={g.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{g.name}</p>
                  <p className="text-sm text-primary font-medium mt-1">{g.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{g.pendidikan}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground">Tenaga Kependidikan</h2>
            <p className="text-sm text-muted-foreground mt-1">Staff pendukung yang profesional</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {staffData.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 80}>
                <Link 
                  to={`/tentang/guru-staff/${s.id}`}
                  className="block bg-card rounded-xl p-5 border border-border shadow-sm text-center hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-full w-16 h-16 mx-auto mb-3 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                    <img
                      src={s.photo}
                      alt={s.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.role}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuruStaff;

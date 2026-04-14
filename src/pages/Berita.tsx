import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { beritaData } from "@/data/beritaData";

const Berita = () => {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const totalPages = Math.ceil(beritaData.length / perPage);
  const displayed = beritaData.slice((page - 1) * perPage, page * perPage);

  return (
    <Layout>
      <PageHeader title="Berita & Acara" subtitle="Informasi terbaru seputar kegiatan sekolah" />

      <section className="section-padding bg-card">
        <div className="container space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            {displayed.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 100}>
                <Link to={`/berita/${item.id}`} className="block bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group cursor-pointer transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" /> {item.date}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.excerpt}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    page === i + 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Berita;

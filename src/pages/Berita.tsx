import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { beritaService, NewsRecord } from "@/services/beritaService";
import { format } from "date-fns";

const Berita = () => {
  const [news, setNews] = useState<NewsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await beritaService.getNews();
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / perPage);
  const displayed = news.slice((page - 1) * perPage, page * perPage);

  return (
    <Layout>
      <PageHeader title="Berita & Acara" subtitle="Informasi terbaru seputar kegiatan sekolah" />

      <section className="section-padding bg-card">
        <div className="container space-y-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p>Memuat berita terbaru...</p>
              </div>
            ) : displayed.length === 0 ? (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                Belum ada berita yang diterbitkan.
              </div>
            ) : (
              displayed.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 100}>
                  <Link to={`/berita/${item.slug}`} className="block h-full bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group cursor-pointer transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.thumbnail_url || "/placeholder.svg"} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy" 
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <Calendar className="w-3.5 h-3.5" /> 
                        {format(new Date(item.published_date), 'dd MMMM yyyy')}
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))
            )}
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

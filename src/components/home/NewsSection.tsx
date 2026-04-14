import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { beritaService, NewsRecord } from "@/services/beritaService";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export const NewsSection = () => {
  const [news, setNews] = useState<NewsRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await beritaService.getNews();
        setNews(data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching homepage news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="section-padding bg-card">
      <div className="container space-y-12">
        <ScrollReveal className="text-center space-y-3">
          <h2 className="section-title">Berita & Acara Terbaru</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden border border-border animate-pulse h-[350px]">
                <div className="aspect-video bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-5 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </div>
              </div>
            ))
          ) : news.length === 0 ? (
            <div className="col-span-full py-10 text-center text-muted-foreground">
              Belum ada berita terbaru.
            </div>
          ) : (
            news.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 150}>
                <Link to={`/berita/${item.slug}`} className="block bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group cursor-pointer transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.thumbnail_url || "/placeholder.svg"} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy" 
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Calendar className="w-3.5 h-3.5" /> 
                      {format(new Date(item.published_date), 'dd MMM yyyy')}
                    </div>
                    <h3 className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    <div className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors">
                      Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))
          )}
        </div>
        
        {news.length > 0 && (
          <div className="text-center pt-4">
            <Link to="/berita">
              <Button variant="outline" className="rounded-full px-8">
                Lihat Semua Berita
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { beritaData } from "@/data/beritaData";

export const NewsSection = () => (
  <section className="section-padding bg-card">
    <div className="container space-y-12">
      <ScrollReveal className="text-center space-y-3">
        <h2 className="section-title">Berita & Acara Terbaru</h2>
        <div className="gold-bar mx-auto" />
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {beritaData.slice(0, 3).map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 150}>
            <Link to={`/berita/${item.id}`} className="block bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group cursor-pointer transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" /> {item.date}
                </div>
                <h3 className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                <div className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

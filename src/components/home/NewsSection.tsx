import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import studentsImg from "@/assets/students.jpg";
import labImg from "@/assets/lab.jpg";
import classroomImg from "@/assets/classroom.jpg";

const news = [
  { title: "Penerimaan Peserta Didik Baru 2025/2026", date: "15 Maret 2025", img: studentsImg, excerpt: "Pendaftaran PPDB tahun ajaran baru telah dibuka. Segera daftarkan putra-putri Anda." },
  { title: "Juara Olimpiade Sains Nasional", date: "20 Februari 2025", img: labImg, excerpt: "Siswa kami berhasil meraih medali emas dalam Olimpiade Sains Nasional tingkat provinsi." },
  { title: "Renovasi Laboratorium Komputer", date: "10 Januari 2025", img: classroomImg, excerpt: "Laboratorium komputer telah direnovasi dengan fasilitas terbaru untuk mendukung pembelajaran digital." },
];

export const NewsSection = () => (
  <section className="section-padding bg-card">
    <div className="container space-y-12">
      <ScrollReveal className="text-center space-y-3">
        <h2 className="section-title">Berita & Acara Terbaru</h2>
        <div className="gold-bar mx-auto" />
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {news.map((item, i) => (
          <ScrollReveal key={i} delay={i * 150}>
            <div className="bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group">
              <div className="aspect-video overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" /> {item.date}
                </div>
                <h3 className="font-display font-semibold text-foreground line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                <Link to="/berita" className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

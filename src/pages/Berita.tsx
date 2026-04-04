import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar } from "lucide-react";
import studentsImg from "@/assets/students.jpg";
import classroomImg from "@/assets/classroom.jpg";
import libraryImg from "@/assets/library.jpg";
import labImg from "@/assets/lab.jpg";
import sportsImg from "@/assets/sports.jpg";

const allNews = [
  { title: "Penerimaan Peserta Didik Baru 2025/2026", date: "15 Maret 2025", img: studentsImg, content: "Pendaftaran PPDB tahun ajaran baru telah resmi dibuka. Segera daftarkan putra-putri Anda untuk bergabung dengan Sekolah Nusantara." },
  { title: "Juara Olimpiade Sains Nasional", date: "20 Februari 2025", img: labImg, content: "Siswa kami berhasil meraih medali emas dalam Olimpiade Sains Nasional tingkat provinsi Jawa Tengah." },
  { title: "Renovasi Laboratorium Komputer", date: "10 Januari 2025", img: classroomImg, content: "Laboratorium komputer telah direnovasi dengan 40 unit komputer terbaru untuk mendukung pembelajaran digital." },
  { title: "Workshop Kurikulum Merdeka", date: "5 Desember 2024", img: libraryImg, content: "Para guru mengikuti workshop implementasi Kurikulum Merdeka untuk meningkatkan kualitas pembelajaran." },
  { title: "Turnamen Futsal Antar Sekolah", date: "28 November 2024", img: sportsImg, content: "Tim futsal sekolah berhasil meraih juara 2 dalam turnamen futsal antar sekolah se-kecamatan." },
  { title: "Perayaan Hari Guru Nasional", date: "25 November 2024", img: studentsImg, content: "Sekolah mengadakan acara peringatan Hari Guru Nasional dengan berbagai penampilan dari siswa." },
];

const Berita = () => {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const totalPages = Math.ceil(allNews.length / perPage);
  const displayed = allNews.slice((page - 1) * perPage, page * perPage);

  return (
    <Layout>
      <PageHeader title="Berita & Acara" subtitle="Informasi terbaru seputar kegiatan sekolah" />

      <section className="section-padding bg-card">
        <div className="container space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            {displayed.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group">
                  <div className="aspect-video overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" /> {item.date}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                </div>
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

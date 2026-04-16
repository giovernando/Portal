import { useRef } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Target, Eye, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import principalImg from "@/assets/principal.jpg";
import studentsImg from "@/assets/students.jpg";

const teachers = [
  { name: "Reza Kendrawan, S.Pd", role: "Kepala Sekolah" },
  { name: "Linggadi Shudqiyanto, S.Pd", role: "Wakil Kepala Sekolah" },
  { name: "Ayuk Rosayanti, S.Pd", role: "Guru Matematika" },
  { name: "Niken Ernawati, S.Pd", role: "Guru Bahasa Inggris" },
  { name: "Bima Sofyanto, S.Pd", role: "Guru Penjaskes" },
  { name: "Fajar Agustian, S.Pd", role: "Guru Bahasa Mandarin" },
  { name: "Dewi Lestari, S.Pd", role: "Guru IPA" },
  { name: "Andi Pratama, S.Pd", role: "Guru IPS" },
];

const TentangKami = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <PageHeader title="Tentang Kami" subtitle="Mengenal lebih dekat SMA PGRI 4 Palembang" />

      {/* Visi Misi */}
      <section className="section-padding bg-card">
        <div className="container grid md:grid-cols-2 gap-10">
          <ScrollReveal>
            <div className="bg-secondary rounded-xl p-8 space-y-4 h-full">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground">Visi</h2>
              <div className="gold-bar" />
              <p className="text-muted-foreground leading-relaxed">
                Menjadi lembaga pendidikan terdepan yang mencetak generasi cerdas, berakhlak mulia, berwawasan global, dan siap menjadi pemimpin masa depan.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="bg-secondary rounded-xl p-8 space-y-4 h-full">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground">Misi</h2>
              <div className="gold-bar" />
              <ul className="text-muted-foreground leading-relaxed space-y-2">
                <li>• Menyelenggarakan pendidikan berkualitas berbasis kurikulum nasional</li>
                <li>• Membentuk karakter siswa yang berakhlak mulia dan berjiwa pemimpin</li>
                <li>• Mengembangkan potensi siswa melalui kegiatan akademik dan non-akademik</li>
                <li>• Menciptakan lingkungan belajar yang aman, nyaman, dan inspiratif</li>
                <li>• Menjalin kerjasama dengan orang tua dan masyarakat</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-secondary">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={studentsImg} alt="Siswa" className="w-full h-auto" loading="lazy" width={800} height={600} />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={200}>
            <div className="space-y-5">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h2 className="section-title">Sejarah Sekolah</h2>
              <div className="gold-bar" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  SMA PGRI 4 Palembang didirikan pada tahun 1985 dengan visi untuk memberikan pendidikan berkualitas bagi masyarakat Indonesia. Bermula dari sebuah bangunan sederhana dengan hanya beberapa kelas, sekolah ini terus berkembang menjadi institusi pendidikan modern.
                </p>
                <p>
                  Selama lebih dari tiga dekade, SMA PGRI 4 Palembang telah meluluskan ribuan siswa berprestasi yang kini berkarya di berbagai bidang, baik di dalam maupun luar negeri.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Teachers - Horizontal Carousel */}
      <section className="section-padding bg-card">
        <div className="container space-y-12">
          <ScrollReveal className="text-center space-y-3">
            <h2 className="section-title">Daftar Guru</h2>
            <div className="gold-bar mx-auto" />
          </ScrollReveal>

          <div className="relative">
            {/* Scroll buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card shadow-card border border-border rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Scroll kiri"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-card shadow-card border border-border rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Scroll kanan"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {teachers.map((t, i) => (
                <div key={i} className="flex-shrink-0 w-44 text-center space-y-3 group">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-secondary shadow-card border-2 border-accent/20 group-hover:border-accent transition-colors">
                    <img src={principalImg} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TentangKami;

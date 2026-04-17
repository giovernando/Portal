import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Building2, GraduationCap, MapPin, Award, Users, BookOpen, Monitor, Trophy } from "lucide-react";
import studentsImg from "@/assets/students.jpg";

const keunggulan = [
  {
    icon: Award,
    title: "Akreditasi A",
    desc: "Terakreditasi A oleh BAN-S/M sebagai bukti standar mutu pendidikan yang tinggi.",
  },
  {
    icon: Users,
    title: "Tenaga Pendidik Profesional",
    desc: "Didukung oleh guru-guru berpengalaman dan bersertifikasi di bidangnya masing-masing.",
  },
  {
    icon: BookOpen,
    title: "Kurikulum Merdeka",
    desc: "Menerapkan Kurikulum Merdeka yang berfokus pada pengembangan kompetensi dan karakter siswa.",
  },
  {
    icon: Monitor,
    title: "Fasilitas Modern",
    desc: "Dilengkapi laboratorium komputer, laboratorium IPA, perpustakaan digital, dan ruang multimedia.",
  },
  {
    icon: Trophy,
    title: "Prestasi Gemilang",
    desc: "Siswa-siswi aktif meraih prestasi di berbagai kompetisi akademik dan non-akademik tingkat nasional.",
  },
  {
    icon: GraduationCap,
    title: "Alumni Berprestasi",
    desc: "Ribuan alumni yang sukses berkarier di berbagai bidang, baik di tingkat nasional maupun internasional.",
  },
];

const Sejarah = () => (
  <Layout>
    <PageHeader title="Tentang Sekolah" subtitle="Mengenal lebih dekat SMA PGRI 4 Palembang" />

    {/* Profil Sekolah */}
    <section className="py-16 bg-card">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building2 className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-display font-bold text-foreground text-center">Profil Sekolah</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-justify">
              SMA PGRI 4 Palembang merupakan salah satu lembaga pendidikan tingkat menengah atas yang berlokasi di Kota Palembang, Provinsi Sumatera Selatan. Sekolah ini beralamat di Jalan Taqwa Mata Merah, Kelurahan Sei Selincah, Kecamatan Kalidoni.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify">
              SMA PGRI 4 Palembang didirikan berdasarkan Surat Keputusan Nomor 182/I11.4/F4e yang ditetapkan pada tanggal 6 Februari 1987. Sejak awal berdirinya, sekolah ini berada di bawah naungan yayasan sebagai wujud nyata partisipasi masyarakat dalam mendukung penyelenggaraan pendidikan yang berkualitas.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify">
              Sebagai institusi pendidikan swasta, SMA PGRI 4 Palembang senantiasa berkomitmen dalam meningkatkan mutu pendidikan melalui penyelenggaraan proses pembelajaran yang terencana, sistematis, dan berkelanjutan. Legalitas operasional sekolah terus diperbarui, dengan izin operasional terakhir yang ditetapkan pada tanggal 16 Oktober 2020.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify">
              Dalam pelaksanaan kegiatan pembelajaran, SMA PGRI 4 Palembang menerapkan sistem pembelajaran pada waktu siang dengan enam hari sekolah. Kegiatan pendidikan didukung oleh ketersediaan sarana dan prasarana yang memadai guna menunjang proses belajar mengajar yang efektif dan kondusif.
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify">
              Dengan pengalaman lebih dari tiga dekade dalam dunia pendidikan, SMA PGRI 4 Palembang terus menunjukkan eksistensinya sebagai lembaga pendidikan yang adaptif terhadap perkembangan zaman. Puncaknya, pada tahun 2026, SMA PGRI 4 Palembang telah bertransformasi menjadi <span className="font-semibold text-primary">"SEKOLAH MODEL"</span> yang tidak hanya unggul dalam aspek akademik, tetapi juga menjadi rujukan dalam penerapan inovasi pembelajaran, penguatan karakter peserta didik, serta pengelolaan pendidikan yang profesional dan berdaya saing tinggi di tingkat regional maupun nasional.
            </p>

            {/* Info Singkat */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl space-y-2 text-center">
                <MapPin className="w-6 h-6 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lokasi</span>
                <span className="text-sm font-medium">Kalidoni, Palembang</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl space-y-2 text-center">
                <Building2 className="w-6 h-6 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Berdiri Sejak</span>
                <span className="text-sm font-medium">1987</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl space-y-2 text-center">
                <Users className="w-6 h-6 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Siswa Aktif</span>
                <span className="text-sm font-medium">1.240+</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl space-y-2 text-center">
                <Award className="w-6 h-6 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</span>
                <span className="text-sm font-medium">Sekolah Model</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Keunggulan Sekolah */}
    <section className="py-16 bg-secondary">
      <div className="container max-w-5xl">
        <ScrollReveal className="text-center mb-12 space-y-3">
          <h2 className="section-title">Keunggulan Kami</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Berbagai keunggulan yang menjadikan SMA PGRI 4 Palembang sebagai pilihan terbaik untuk masa depan putra-putri Anda.
          </p>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keunggulan.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Sejarah;

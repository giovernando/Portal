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
    <PageHeader title="Tentang Sekolah" subtitle="Mengenal lebih dekat Sekolah Nusantara" />

    {/* Profil Sekolah */}
    <section className="py-16 bg-card">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-display font-bold text-foreground">Profil Sekolah</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Sekolah Nusantara adalah lembaga pendidikan yang berkomitmen untuk menciptakan generasi
                unggul, berkarakter, dan berdaya saing global. Didirikan pada tahun 1985, sekolah ini
                telah menjadi salah satu institusi pendidikan terkemuka di wilayahnya.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dengan mengedepankan nilai-nilai integritas, inovasi, dan kepedulian, Sekolah Nusantara
                menyediakan lingkungan belajar yang kondusif dan mendukung perkembangan potensi setiap siswa
                secara optimal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Berlokasi strategis dan didukung fasilitas modern, sekolah ini menjadi pilihan utama
                bagi orang tua yang menginginkan pendidikan terbaik untuk putra-putri mereka.
              </p>

              {/* Info Singkat */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Kota Nusantara, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4 text-accent" />
                  <span>Berdiri sejak 1985</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-accent" />
                  <span>1.200+ Siswa Aktif</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-accent" />
                  <span>Akreditasi A</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={studentsImg} alt="Siswa Sekolah Nusantara" className="w-full h-72 object-cover" loading="lazy" />
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
            Berbagai keunggulan yang menjadikan Sekolah Nusantara sebagai pilihan terbaik untuk masa depan putra-putri Anda.
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

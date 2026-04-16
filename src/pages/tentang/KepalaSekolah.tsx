import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Award, BookOpen, Heart, GraduationCap } from "lucide-react";
import principalImg from "@/assets/principal.jpg";

const biodata = [
  { label: "Nama Lengkap", value: "Reza Kendrawan, S.Pd, M.Pd" },
  { label: "NIP", value: "196801152000121003" },
  { label: "Tempat, Tanggal Lahir", value: "Semarang, 15 Januari 1968" },
  { label: "Pendidikan Terakhir", value: "S2 Manajemen Pendidikan" },
  { label: "Masa Jabatan", value: "2018 - Sekarang" },
];

const prestasi = [
  "Kepala Sekolah Berprestasi Tingkat Provinsi 2022",
  "Penghargaan Inovasi Pendidikan dari Kemendikbud 2021",
  "Narasumber Konferensi Pendidikan Nasional 2023",
  "Penulis buku 'Pendidikan Karakter Abad 21'",
];

const KepalaSekolah = () => (
  <Layout>
    <PageHeader title="Profil Kepala Sekolah" subtitle="Pemimpin yang menginspirasi" />

    <section className="py-16 bg-card">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0">
              <img
                src={principalImg}
                alt="Kepala Sekolah"
                className="w-64 h-80 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="space-y-6 flex-1">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  Reza Kendrawan, S.Pd, M.Pd
                </h2>
                <p className="text-primary font-medium">Kepala SMA PGRI 4 Palembang</p>
              </div>
              <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground text-lg">
                "Pendidikan bukan hanya tentang akademik, tetapi tentang membentuk manusia
                yang utuh — berilmu, berakhlak, dan bermanfaat bagi sesama."
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                Berpengalaman lebih dari 20 tahun di dunia pendidikan, beliau telah membawa
                SMA PGRI 4 Palembang meraih berbagai penghargaan tingkat nasional. Di bawah
                kepemimpinannya, sekolah terus berinovasi dalam metode pengajaran dan
                pengembangan karakter siswa.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Biodata */}
    <section className="py-16 bg-secondary">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" /> Biodata
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            {biodata.map((b, i) => (
              <div key={i} className={`flex flex-col sm:flex-row ${i !== biodata.length - 1 ? "border-b border-border" : ""}`}>
                <div className="sm:w-1/3 px-6 py-4 bg-secondary/50 text-sm font-medium text-foreground">{b.label}</div>
                <div className="sm:w-2/3 px-6 py-4 text-sm text-muted-foreground">{b.value}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Prestasi & Filosofi */}
    <section className="py-16 bg-card">
      <div className="container max-w-4xl grid md:grid-cols-2 gap-8">
        <ScrollReveal>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full">
            <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" /> Prestasi & Penghargaan
            </h3>
            <ul className="space-y-3">
              {prestasi.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="bg-primary rounded-2xl p-6 text-primary-foreground h-full">
            <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" /> Filosofi Pendidikan
            </h3>
            <div className="space-y-3 text-sm opacity-90 leading-relaxed">
              <p>
                Beliau percaya bahwa setiap anak memiliki potensi unik yang harus dikembangkan
                secara holistik melalui pendekatan yang humanis dan personal.
              </p>
              <p>
                Dengan prinsip "Mendidik dengan Hati", beliau selalu mendorong seluruh
                civitas akademika untuk memberikan pendidikan terbaik dengan penuh kasih sayang.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default KepalaSekolah;

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Target, Eye, CheckCircle } from "lucide-react";

const tujuan = [
  "Menghasilkan lulusan yang berkompeten dan berkarakter mulia.",
  "Menyediakan lingkungan belajar yang aman, nyaman, dan inspiratif.",
  "Mendorong inovasi dalam metode pembelajaran.",
  "Membangun kemitraan strategis dengan dunia usaha dan industri.",
];

const VisiMisi = () => (
  <Layout>
    <PageHeader title="Visi & Misi" subtitle="Fondasi arah pendidikan kami" />

    <section className="py-16 bg-card">
      <div className="container max-w-4xl space-y-12">
        {/* Visi */}
        <ScrollReveal>
          <div className="bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold">Visi</h2>
            </div>
            <blockquote className="text-xl md:text-2xl font-display leading-relaxed italic opacity-95">
              "Menjadi lembaga pendidikan unggulan yang menghasilkan generasi berkarakter,
              berprestasi, dan berwawasan global berlandaskan nilai-nilai kebangsaan."
            </blockquote>
          </div>
        </ScrollReveal>

        {/* Misi */}
        <ScrollReveal delay={100}>
          <div className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">Misi</h2>
            </div>
            <ul className="space-y-4">
              {[
                "Menyelenggarakan pendidikan berkualitas berbasis kurikulum nasional dan internasional.",
                "Membentuk karakter siswa yang berakhlak mulia, disiplin, dan bertanggung jawab.",
                "Mengembangkan potensi akademik dan non-akademik siswa secara optimal.",
                "Menciptakan lingkungan belajar yang kondusif, inovatif, dan menyenangkan.",
                "Menjalin kerja sama dengan berbagai pihak untuk meningkatkan mutu pendidikan.",
                "Mempersiapkan siswa agar mampu bersaing di era globalisasi.",
              ].map((m, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Tujuan */}
        <ScrollReveal delay={200}>
          <div className="bg-secondary rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Tujuan</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {tujuan.map((t, i) => (
                <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default VisiMisi;

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookOpen, Lightbulb, Users, Globe } from "lucide-react";

const prinsip = [
  { icon: Lightbulb, title: "Pembelajaran Berbasis Proyek", desc: "Siswa belajar melalui proyek nyata yang relevan dengan kehidupan sehari-hari." },
  { icon: Users, title: "Kolaboratif", desc: "Mendorong kerja sama tim dan diskusi antar siswa untuk memperdalam pemahaman." },
  { icon: Globe, title: "Wawasan Global", desc: "Mengintegrasikan perspektif global dalam setiap mata pelajaran." },
  { icon: BookOpen, title: "Literasi Digital", desc: "Membekali siswa dengan kemampuan teknologi untuk era digital." },
];

const mapel = [
  { kategori: "Kelompok A (Umum)", items: ["Pendidikan Agama", "PKn", "Bahasa Indonesia", "Matematika", "IPA", "IPS", "Bahasa Inggris"] },
  { kategori: "Kelompok B (Pilihan)", items: ["Seni Budaya", "Pendidikan Jasmani", "Prakarya/TIK", "Bahasa Mandarin", "Bahasa Jepang"] },
  { kategori: "Muatan Lokal", items: ["Bahasa Daerah", "Pendidikan Lingkungan", "Kewirausahaan"] },
];

const Kurikulum = () => (
  <Layout>
    <PageHeader title="Kurikulum" subtitle="Kurikulum pendidikan yang diterapkan" />

    {/* Overview */}
    <section className="py-16 bg-card">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-accent" />
              <h2 className="text-2xl font-display font-bold">Kurikulum Merdeka</h2>
            </div>
            <p className="opacity-90 leading-relaxed text-lg">
              SMA PGRI 4 Palembang menerapkan Kurikulum Merdeka yang memberikan kebebasan kepada
              sekolah dan guru untuk mengembangkan pembelajaran sesuai kebutuhan dan potensi siswa.
              Kurikulum ini menekankan pada pengembangan kompetensi dan karakter melalui
              pembelajaran bermakna dan kontekstual.
            </p>
          </div>
        </ScrollReveal>

        {/* Prinsip */}
        <ScrollReveal className="text-center mb-8 space-y-3">
          <h2 className="section-title">Prinsip Pembelajaran</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {prinsip.map((p, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm text-center hover:shadow-md transition-shadow h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <p.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Mata Pelajaran */}
    <section className="py-16 bg-secondary">
      <div className="container max-w-4xl">
        <ScrollReveal className="text-center mb-10 space-y-3">
          <h2 className="section-title">Struktur Mata Pelajaran</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>
        <div className="space-y-6">
          {mapel.map((m, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-display font-bold text-foreground mb-4">{m.kategori}</h3>
                <div className="flex flex-wrap gap-2">
                  {m.items.map((item, j) => (
                    <span key={j} className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Kurikulum;

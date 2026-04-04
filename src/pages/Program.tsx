import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookOpen, Calculator, Globe, Palette, Dumbbell, Monitor } from "lucide-react";

const programs = [
  { icon: BookOpen, title: "Kurikulum Merdeka", desc: "Implementasi Kurikulum Merdeka yang memberikan fleksibilitas dan fokus pada pengembangan kompetensi dan karakter siswa.", color: "bg-primary/10 text-primary" },
  { icon: Calculator, title: "Matematika & Sains", desc: "Program unggulan bidang MIPA dengan pendekatan hands-on learning dan persiapan olimpiade sains.", color: "bg-accent/20 text-accent-foreground" },
  { icon: Globe, title: "Bahasa Asing", desc: "Program bahasa Inggris intensif dan bahasa Mandarin sebagai bekal komunikasi global.", color: "bg-primary/10 text-primary" },
  { icon: Palette, title: "Seni & Budaya", desc: "Pengembangan kreativitas melalui seni rupa, musik, tari tradisional, dan teater.", color: "bg-accent/20 text-accent-foreground" },
  { icon: Dumbbell, title: "Olahraga & Kesehatan", desc: "Program olahraga terstruktur termasuk futsal, basket, bulu tangkis, dan pencak silat.", color: "bg-primary/10 text-primary" },
  { icon: Monitor, title: "Teknologi Informasi", desc: "Literasi digital dan pemrograman dasar untuk mempersiapkan siswa di era digital.", color: "bg-accent/20 text-accent-foreground" },
];

const Program = () => {
  return (
    <Layout>
      <PageHeader title="Program Akademik" subtitle="Program pembelajaran unggulan untuk masa depan cerah" />

      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-8 space-y-4 hover-card-lift shadow-card border border-border h-full">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${p.color}`}>
                    <p.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Program;

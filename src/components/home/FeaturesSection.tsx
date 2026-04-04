import { GraduationCap, BookOpen, Users, Trophy } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const features = [
  { icon: GraduationCap, title: "Kurikulum Nasional", desc: "Mengikuti standar kurikulum nasional terbaru dengan pendekatan pembelajaran modern dan inovatif." },
  { icon: BookOpen, title: "Ekstrakurikuler", desc: "Beragam kegiatan ekstrakurikuler untuk mengembangkan minat dan bakat siswa secara optimal." },
  { icon: Users, title: "Guru Berpengalaman", desc: "Tenaga pendidik profesional dan berpengalaman yang siap membimbing setiap siswa." },
  { icon: Trophy, title: "Prestasi Gemilang", desc: "Berbagai penghargaan dan prestasi di tingkat regional maupun nasional." },
];

export const FeaturesSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container space-y-12">
      <ScrollReveal className="text-center space-y-3">
        <h2 className="section-title">Keunggulan Kami</h2>
        <div className="gold-bar mx-auto" />
        <p className="section-subtitle mx-auto">
          Menghadirkan pendidikan berkualitas dengan berbagai keunggulan yang membedakan kami.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <ScrollReveal key={i} delay={i * 100} direction="scale">
            <div className="bg-card rounded-2xl p-7 text-center space-y-4 hover-card-lift shadow-card h-full border border-border/50 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

import { ScrollReveal } from "@/components/ScrollReveal";
import principalImg from "@/assets/principal.jpg";

export const WelcomeSection = () => (
  <section className="section-padding bg-card">
    <div className="container grid lg:grid-cols-2 gap-12 items-center">
      <ScrollReveal direction="left">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={principalImg} alt="Kepala Sekolah" className="w-full h-auto max-w-md mx-auto" loading="lazy" width={512} height={640} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-2xl -z-10" />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={200}>
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="section-title">Sambutan Kepala Sekolah</h2>
            <div className="gold-bar" />
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Assalamu'alaikum warahmatullahi wabarakatuh,</p>
            <p>Salam sejahtera bagi kita semua.</p>
            <p>
              Dengan penuh rasa syukur dan bangga, saya menyambut para siswa, orang tua, serta seluruh masyarakat yang telah mempercayakan pendidikan putra-putrinya kepada <strong className="text-foreground">SMA PGRI 4 Palembang</strong>.
            </p>
            <p>
              Sekolah ini hadir sebagai lembaga pendidikan yang berkomitmen untuk mencetak generasi yang cerdas, berakhlak mulia, serta siap menghadapi tantangan zaman.
            </p>
          </div>
          <p className="font-display font-semibold text-foreground">
            Reza Kendrawan, S.Pd<br />
            <span className="text-sm text-muted-foreground font-body">Kepala SMA PGRI 4 Palembang</span>
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

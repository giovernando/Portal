import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

export const CtaSection = () => (
  <section className="section-padding bg-accent">
    <div className="container text-center space-y-6">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-foreground">
          Siap Bergabung dengan Sekolah Nusantara?
        </h2>
        <p className="text-accent-foreground/80 max-w-xl mx-auto mt-3">
          Pendaftaran PPDB tahun ajaran 2025/2026 telah dibuka. Jangan lewatkan kesempatan ini!
        </p>
        <div className="pt-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-green-dark rounded-full px-10 font-semibold">
            <Link to="/ppdb">Daftar Sekarang</Link>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

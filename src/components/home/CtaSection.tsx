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
            <a href="https://wa.me/6285729319861?text=Halo%2C%20saya%20ingin%20mendaftar%20di%20Sekolah%20Nusantara." target="_blank" rel="noopener noreferrer">Daftar Sekarang</a>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

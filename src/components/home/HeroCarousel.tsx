import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-school.jpg";
import heroCampusImg from "@/assets/hero-campus.jpg";
import heroGradImg from "@/assets/hero-graduation.jpg";
import heroLabImg from "@/assets/hero-lab.jpg";
import classroomImg from "@/assets/classroom.jpg";
import libraryImg from "@/assets/library.jpg";
import labImg from "@/assets/lab.jpg";

interface HeroSlide {
  img: string;
  title: string;
  highlight: string;
  subtitle: string;
}

const heroSlides: HeroSlide[] = [
  { img: heroImg, title: "SEKOLAH", highlight: "NUSANTARA", subtitle: "Membangun Masa Depan dengan Pendidikan Bermutu" },
  { img: heroCampusImg, title: "LINGKUNGAN", highlight: "KONDUSIF", subtitle: "Kampus hijau dan modern untuk belajar yang nyaman" },
  { img: heroGradImg, title: "PRESTASI", highlight: "GEMILANG", subtitle: "Mencetak lulusan berprestasi dan berkarakter" },
  { img: heroLabImg, title: "FASILITAS", highlight: "MODERN", subtitle: "Laboratorium lengkap untuk pembelajaran sains terbaik" },
];

function useHeroCarousel(slideCount: number, interval = 5000) {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slideCount), [slideCount]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slideCount) % slideCount), [slideCount]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  return { current, next, prev, goTo: setCurrent };
}

export const HeroCarousel = () => {
  const { current, next, prev, goTo } = useHeroCarousel(heroSlides.length);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img src={heroSlides[current].img} alt={heroSlides[current].highlight} className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
            className="text-primary-foreground space-y-6"
          >
            <div className="inline-block bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium text-accent">
              Tahun Ajaran 2025/2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
              {heroSlides[current].title}<br />
              <span className="text-accent">{heroSlides[current].highlight}</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg leading-relaxed">
              {heroSlides[current].subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 rounded-full">
                <a href="https://wa.me/6285729319861?text=Halo%2C%20saya%20ingin%20mendaftar%20di%20Sekolah%20Nusantara." target="_blank" rel="noopener noreferrer">Daftar Sekarang</a>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary shadow-lg hover:bg-primary/90 hover:text-white font-semibold px-8 rounded-full transition-all duration-200">
                <Link to="/tentang">Tentang Kami</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="hidden lg:flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-accent/30 shadow-elevated">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={heroSlides[current].img}
                  alt="Kampus"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-6 -left-6 grid grid-cols-3 gap-3">
              {[classroomImg, libraryImg, labImg].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="w-24 h-20 rounded-lg overflow-hidden shadow-card border-2 border-card"
                >
                  <img src={img} alt="Fasilitas" className="w-full h-full object-cover" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors" aria-label="Previous slide">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors" aria-label="Next slide">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-accent" : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

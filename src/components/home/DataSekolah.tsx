import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-school.jpg";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: GraduationCap, value: 85, label: "Guru & Pengajar" },
  { icon: Users, value: 12, label: "Tata Usaha" },
  { icon: BookOpen, value: 1240, suffix: "+", label: "Siswa Aktif" },
  { icon: Award, value: 18, label: "Ekstrakurikuler" },
];

function useCountUp(target: number, duration = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, trigger]);

  return count;
}

const CountUpCard = ({ stat, delay }: { stat: StatItem; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(stat.value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollReveal delay={delay} direction="scale">
      <div ref={ref} className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15 rounded-2xl p-6 sm:p-8 text-center space-y-3 hover:bg-primary-foreground/15 transition-colors duration-300">
        <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mx-auto">
          <stat.icon className="w-7 h-7 text-accent" />
        </div>
        <p className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground">
          {count}{stat.suffix || ""}
        </p>
        <p className="text-sm text-primary-foreground/75 font-medium">{stat.label}</p>
      </div>
    </ScrollReveal>
  );
};

export const DataSekolah = () => (
  <section className="relative py-20 lg:py-28 overflow-hidden">
    {/* Parallax BG */}
    <div className="absolute inset-0 -z-10">
      <img
        src={heroImg}
        alt=""
        className="w-full h-full object-cover"
        style={{ transform: "translateZ(0)" }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-primary/85" />
    </div>

    <div className="container space-y-12">
      <ScrollReveal className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
          Data Sekolah
        </h2>
        <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        <p className="text-primary-foreground/80 max-w-xl mx-auto">
          Sekolah Nusantara terus berkembang dalam memberikan pendidikan terbaik.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <CountUpCard key={i} stat={stat} delay={i * 100} />
        ))}
      </div>
    </div>
  </section>
);

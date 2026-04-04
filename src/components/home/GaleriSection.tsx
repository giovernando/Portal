import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import classroomImg from "@/assets/classroom.jpg";
import libraryImg from "@/assets/library.jpg";
import labImg from "@/assets/lab.jpg";
import heroImg from "@/assets/hero-school.jpg";
import studentsImg from "@/assets/students.jpg";
import heroCampusImg from "@/assets/hero-campus.jpg";

const gallery = [
  { src: heroImg, alt: "Gedung Sekolah" },
  { src: classroomImg, alt: "Ruang Kelas" },
  { src: libraryImg, alt: "Perpustakaan" },
  { src: labImg, alt: "Laboratorium" },
  { src: studentsImg, alt: "Kegiatan Siswa" },
  { src: heroCampusImg, alt: "Kampus" },
];

export const GaleriSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container space-y-12">
      <ScrollReveal className="text-center space-y-3">
        <h2 className="section-title">Galeri Sekolah</h2>
        <div className="gold-bar mx-auto" />
        <p className="section-subtitle mx-auto">Dokumentasi kegiatan dan fasilitas Sekolah Nusantara.</p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((img, i) => (
          <ScrollReveal key={i} delay={i * 80} direction="scale">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-card group cursor-pointer">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 rounded-xl flex items-end p-4">
                <span className="text-primary-foreground font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.alt}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/galeri">
            Lihat Semua Galeri <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </ScrollReveal>
    </div>
  </section>
);

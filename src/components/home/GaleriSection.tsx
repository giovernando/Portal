import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { galeriService, GalleryRecord } from "@/services/galeriService";

// Fallback static images jika Supabase kosong
import classroomImg from "@/assets/classroom.jpg";
import libraryImg from "@/assets/library.jpg";
import labImg from "@/assets/lab.jpg";
import heroImg from "@/assets/hero-school.jpg";
import studentsImg from "@/assets/students.jpg";
import heroCampusImg from "@/assets/hero-campus.jpg";

const FALLBACK: GalleryRecord[] = [
  { id: "1", title: "Gedung Sekolah",   image_url: heroImg,       description: null },
  { id: "2", title: "Ruang Kelas",      image_url: classroomImg,  description: null },
  { id: "3", title: "Perpustakaan",     image_url: libraryImg,    description: null },
  { id: "4", title: "Laboratorium",     image_url: labImg,        description: null },
  { id: "5", title: "Kegiatan Siswa",   image_url: studentsImg,   description: null },
  { id: "6", title: "Kampus",           image_url: heroCampusImg, description: null },
];

export const GaleriSection = () => {
  const [gallery, setGallery] = useState<GalleryRecord[]>([]);

  useEffect(() => {
    galeriService
      .getGallery()
      .then((data) => setGallery(data.length > 0 ? data.slice(0, 6) : FALLBACK))
      .catch(() => setGallery(FALLBACK));
  }, []);

  const items = gallery.length > 0 ? gallery : FALLBACK;

  return (
    <section className="section-padding bg-secondary">
      <div className="container space-y-12">
        <ScrollReveal className="text-center space-y-3">
          <h2 className="section-title">Galeri Sekolah</h2>
          <div className="gold-bar mx-auto" />
          <p className="section-subtitle mx-auto">
            Dokumentasi kegiatan dan fasilitas SMA PGRI 4 Palembang.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 80} direction="scale">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-card group cursor-pointer">
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 rounded-xl flex items-end p-4">
                  <span className="text-primary-foreground font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {img.title}
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
};

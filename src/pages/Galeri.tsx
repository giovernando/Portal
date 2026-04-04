import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import classroomImg from "@/assets/classroom.jpg";
import libraryImg from "@/assets/library.jpg";
import labImg from "@/assets/lab.jpg";
import sportsImg from "@/assets/sports.jpg";
import computerLabImg from "@/assets/computer-lab.jpg";
import mosqueImg from "@/assets/mosque.jpg";
import heroImg from "@/assets/hero-school.jpg";
import studentsImg from "@/assets/students.jpg";

const images = [
  { src: heroImg, alt: "Gedung Sekolah" },
  { src: classroomImg, alt: "Ruang Kelas" },
  { src: libraryImg, alt: "Perpustakaan" },
  { src: labImg, alt: "Laboratorium" },
  { src: sportsImg, alt: "Lapangan Olahraga" },
  { src: computerLabImg, alt: "Lab Komputer" },
  { src: mosqueImg, alt: "Mushola" },
  { src: studentsImg, alt: "Kegiatan Siswa" },
];

const Galeri = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Layout>
      <PageHeader title="Galeri Foto" subtitle="Dokumentasi kegiatan dan fasilitas sekolah" />

      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60} direction="scale">
                <button
                  onClick={() => setSelected(i)}
                  className="aspect-square rounded-xl overflow-hidden shadow-card hover-card-lift w-full group"
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-card p-2" onClick={() => setSelected(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Galeri;

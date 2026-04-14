import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { galeriService, GalleryRecord } from "@/services/galeriService";

const Galeri = () => {
  const [gallery, setGallery] = useState<GalleryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galeriService.getGallery();
        setGallery(data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <Layout>
      <PageHeader title="Galeri Foto" subtitle="Dokumentasi kegiatan dan fasilitas sekolah" />

      <section className="section-padding bg-card">
        <div className="container">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Memuat koleksi foto...</p>
            </div>
          ) : gallery.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground bg-secondary/30 rounded-3xl border-2 border-dashed border-border">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Belum ada foto di galeri.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <ScrollReveal key={img.id} delay={i * 60} direction="scale">
                  <button
                    onClick={() => setSelected(i)}
                    className="aspect-square rounded-xl overflow-hidden shadow-card hover-card-lift w-full group relative"
                  >
                    <img 
                      src={img.image_url} 
                      alt={img.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-xs font-medium truncate">{img.title}</p>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && gallery[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex flex-col items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute top-6 right-6 flex gap-4">
              <button 
                className="text-white/70 hover:text-white p-2 transition-colors bg-white/10 rounded-full" 
                onClick={() => setSelected(null)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="max-w-5xl w-full flex flex-col items-center gap-6">
              <motion.img
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                src={gallery[selected].image_url}
                alt={gallery[selected].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="text-center space-y-2 px-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-white font-display font-bold text-2xl">{gallery[selected].title}</h3>
                {gallery[selected].description && (
                  <p className="text-white/60 text-sm max-w-2xl mx-auto">{gallery[selected].description}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Galeri;

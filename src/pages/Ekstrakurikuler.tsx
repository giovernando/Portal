import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, Users, Trophy, Loader2, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ekskulService, EkskulRecord } from "@/services/ekskulService";

const Ekstrakurikuler = () => {
  const [ekskulList, setEkskulList] = useState<EkskulRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EkskulRecord | null>(null);

  useEffect(() => {
    const fetchEkskul = async () => {
      try {
        const data = await ekskulService.getEkskul();
        setEkskulList(data);
      } catch (err) {
        console.error("Error fetching extracurriculars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEkskul();
  }, []);

  return (
    <Layout>
      <PageHeader title="Ekstrakurikuler" subtitle="Kembangkan minat dan bakat melalui beragam kegiatan ekstrakurikuler" />

      <section className="section-padding bg-card">
        <div className="container space-y-12">
          <ScrollReveal className="text-center space-y-3">
            <h2 className="section-title">Kegiatan Ekstrakurikuler</h2>
            <div className="gold-bar mx-auto" />
            <p className="section-subtitle mx-auto">
              Kami menyediakan beragam kegiatan ekstrakurikuler untuk mendukung pengembangan minat, bakat, dan karakter siswa.
            </p>
          </ScrollReveal>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Memuat daftar ekstrakurikuler...</p>
            </div>
          ) : ekskulList.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-3xl">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p>Belum ada kegiatan ekstrakurikuler yang terdaftar.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {ekskulList.map((ekskul, i) => (
                <ScrollReveal key={ekskul.id} delay={i * 100} direction="scale">
                  <button
                    onClick={() => setSelected(ekskul)}
                    className="text-left bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group w-full"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={ekskul.image_url || "/placeholder.svg"}
                        alt={ekskul.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{ekskul.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{ekskul.description || "Tidak ada deskripsi."}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1 font-medium text-primary bg-primary/5 px-2 py-1 rounded">
                          <Clock className="w-3.5 h-3.5" />
                          {ekskul.schedule || "Jadwal belum diatur"}
                        </span>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selected.image_url || "/placeholder.svg"} alt={selected.name} className="w-full aspect-video object-cover rounded-t-2xl" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-foreground/60 text-card p-2 rounded-full hover:bg-foreground/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <h2 className="font-display font-bold text-2xl text-foreground">{selected.name}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{selected.description || "Informasi detail mengenai kegiatan ini belum tersedia."}</p>

                <div className="grid gap-4">
                  <div className="bg-secondary rounded-lg p-4 space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">Jadwal & Waktu</span>
                    </div>
                    <p className="text-sm text-foreground">{selected.schedule || "Menyusul"}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">Pembina / Koordinator</span>
                    </div>
                    <p className="text-sm text-foreground">{selected.coordinator || "Staff Pengajar"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Ekstrakurikuler;

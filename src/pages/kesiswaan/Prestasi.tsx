import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Trophy, Medal, Award, Star, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { prestasiService, PrestasiRecord } from "@/services/prestasiService";

const kategoriConfig = {
  akademik: { icon: Award, bg: "bg-blue-100 text-blue-700", label: "Akademik" },
  olahraga: { icon: Medal, bg: "bg-green-100 text-green-700", label: "Olahraga" },
  seni: { icon: Star, bg: "bg-purple-100 text-purple-700", label: "Seni" },
  lainnya: { icon: Trophy, bg: "bg-accent/10 text-accent", label: "Lainnya" },
};

const Prestasi = () => {
  const [prestasi, setPrestasi] = useState<PrestasiRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrestasi = async () => {
      try {
        const data = await prestasiService.getAchievements();
        setPrestasi(data);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrestasi();
  }, []);

  const stats = [
    { value: prestasi.length.toString(), label: "Total Penghargaan" },
    { value: prestasi.filter(p => p.tingkat === 'Nasional').length.toString(), label: "Tingkat Nasional" },
    { value: prestasi.filter(p => p.tingkat === 'Provinsi').length.toString(), label: "Tingkat Provinsi" },
    { value: "3", label: "Tahun Berturut-turut" },
  ];

  if (loading) {
    return (
      <Layout>
        <PageHeader title="Prestasi Siswa" subtitle="Pencapaian membanggakan siswa Sekolah Nusantara" />
        <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>Memuat prestasi siswa...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Prestasi Siswa" subtitle="Pencapaian membanggakan siswa Sekolah Nusantara" />

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center text-primary-foreground">
                  <p className="text-3xl md:text-4xl font-display font-bold text-accent">{s.value}</p>
                  <p className="text-sm opacity-80 mt-1">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Daftar Prestasi */}
      <section className="py-16 bg-card">
        <div className="container max-w-5xl">
          <ScrollReveal className="text-center mb-12 space-y-3">
            <h2 className="section-title">Daftar Prestasi</h2>
            <div className="gold-bar mx-auto" />
          </ScrollReveal>

          <div className="space-y-8">
            {prestasi.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                Belum ada data prestasi yang terdaftar.
              </div>
            ) : (
              prestasi.map((p, i) => {
                const config = kategoriConfig[p.kategori] || kategoriConfig.lainnya;
                return (
                  <ScrollReveal key={p.id} delay={i * 60}>
                    <Link to={`/kesiswaan/prestasi/${p.slug}`} className="flex flex-col md:flex-row bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group cursor-pointer no-underline text-current">
                      {/* Informasi (Kiri) */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-center order-2 md:order-1">
                        <div className="flex items-center flex-wrap gap-y-2 gap-x-3 mb-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg}`}>
                            <config.icon className="w-3.5 h-3.5 mr-1.5" />
                            {config.label}
                          </span>
                          <span className="text-sm text-muted-foreground md:border-l border-border md:pl-3">
                            Tingkat {p.tingkat}
                          </span>
                          <span className="text-sm text-muted-foreground border-l border-border pl-3">
                            {p.tahun}
                          </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {p.judul}
                        </h3>
                        <p className="text-muted-foreground text-sm border-l-2 border-accent pl-3">
                          Diraih oleh: <span className="font-semibold text-foreground uppercase tracking-wide">{p.siswa}</span>
                        </p>
                      </div>

                      {/* Foto (Kanan) */}
                      <div className="md:w-[40%] aspect-video md:aspect-auto relative overflow-hidden shrink-0 order-1 md:order-2">
                        <img
                          src={p.img_url || "/placeholder.svg"}
                          alt={p.judul}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Prestasi;

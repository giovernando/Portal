import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, Trophy, Medal, Award, Star, Loader2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { prestasiService, PrestasiRecord } from "@/services/prestasiService";

const kategoriConfig = {
  akademik: { icon: Award, bg: "bg-blue-100/50 text-blue-700", label: "Akademik" },
  olahraga: { icon: Medal, bg: "bg-green-100/50 text-green-700", label: "Olahraga" },
  seni: { icon: Star, bg: "bg-purple-100/50 text-purple-700", label: "Seni" },
  lainnya: { icon: Trophy, bg: "bg-accent/10 text-accent", label: "Lainnya" },
};

const PrestasiDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [prestasi, setPrestasi] = useState<PrestasiRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const data = await prestasiService.getAchievementBySlug(id); // Use id parameter as slug
        setPrestasi(data);
      } catch (err) {
        console.error("Error fetching achievement detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>Memuat detail prestasi...</p>
        </div>
      </Layout>
    );
  }

  if (!prestasi) {
    return <Navigate to="/kesiswaan/prestasi" replace />;
  }

  const config = kategoriConfig[prestasi.kategori] || kategoriConfig.lainnya;

  return (
    <Layout>
      <div className="bg-primary/5 py-8 border-b border-border">
        <div className="container max-w-4xl">
          <Link
            to="/kesiswaan/prestasi"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Daftar Prestasi
          </Link>
        </div>
      </div>

      <article className="py-16 bg-card min-h-[60vh]">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="space-y-8">
              
              {/* Header Badge */}
              <div className="flex items-center flex-wrap gap-y-2 gap-x-4">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${config.bg}`}>
                  <config.icon className="w-4 h-4 mr-2" />
                  {config.label}
                </span>
                <span className="text-sm font-medium text-muted-foreground border-l border-border pl-4">
                  Tingkat {prestasi.tingkat}
                </span>
                <span className="text-sm font-medium text-muted-foreground border-l border-border pl-4">
                  {prestasi.tahun}
                </span>
                <span className="text-sm font-medium text-muted-foreground border-l border-border pl-4">
                  Pemenang: <span className="font-semibold text-foreground uppercase">{prestasi.siswa}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                {prestasi.judul}
              </h1>

              {/* Cover Image */}
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-elevated border border-border mt-8">
                <img
                  src={prestasi.img_url || "/placeholder.svg"}
                  alt={prestasi.judul}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Descriptions */}
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mt-8 whitespace-pre-wrap">
                <p className="leading-relaxed">
                  {prestasi.deskripsi || "Informasi detail mengenai prestasi ini belum ditambahkan."}
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </article>
    </Layout>
  );
};

export default PrestasiDetail;

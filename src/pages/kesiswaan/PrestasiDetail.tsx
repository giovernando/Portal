import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, Trophy, Medal, Award, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getPrestasiById } from "@/data/prestasiData";

const kategoriConfig = {
  akademik: { icon: Award, bg: "bg-blue-100/50 text-blue-700", label: "Akademik" },
  olahraga: { icon: Medal, bg: "bg-green-100/50 text-green-700", label: "Olahraga" },
  seni: { icon: Star, bg: "bg-purple-100/50 text-purple-700", label: "Seni" },
  lainnya: { icon: Trophy, bg: "bg-accent/10 text-accent", label: "Lainnya" },
};

const PrestasiDetail = () => {
  const { id } = useParams<{ id: string }>();
  const prestasi = id ? getPrestasiById(id) : undefined;

  if (!prestasi) {
    return <Navigate to="/kesiswaan/prestasi" replace />;
  }

  const config = kategoriConfig[prestasi.kategori];

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
                  src={prestasi.imgSrc}
                  alt={prestasi.judul}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Descriptions */}
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mt-8">
                {prestasi.deskripsi.map((paragraph, i) => (
                  <p key={i} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

            </div>
          </ScrollReveal>
        </div>
      </article>
    </Layout>
  );
};

export default PrestasiDetail;

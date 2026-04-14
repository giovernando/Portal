import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, Calendar, Loader2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { beritaService, NewsRecord } from "@/services/beritaService";
import { format } from "date-fns";

const BeritaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [berita, setBerita] = useState<NewsRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      try {
        const data = await beritaService.getNewsBySlug(slug);
        setBerita(data);
      } catch (err) {
        console.error("Error fetching news detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>Memuat isi berita...</p>
        </div>
      </Layout>
    );
  }

  if (!berita) {
    return <Navigate to="/berita" replace />;
  }

  return (
    <Layout>
      <div className="bg-primary/5 py-8 border-b border-border">
        <div className="container max-w-4xl">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>

      <article className="py-16 bg-card min-h-[60vh]">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="space-y-8">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(berita.published_date), 'dd MMMM yyyy')}</span>
                </div>
                <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                  {berita.title}
                </h1>
              </div>

              {/* Cover Image */}
              <div className="w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden shadow-elevated border border-border">
                <img
                  src={berita.thumbnail_url || "/placeholder.svg"}
                  alt={berita.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                {berita.excerpt && (
                  <p className="text-xl font-medium text-foreground leading-relaxed italic border-l-4 border-accent pl-6 mb-8">
                    {berita.excerpt}
                  </p>
                )}
                <div 
                  className="rich-text-content"
                  dangerouslySetInnerHTML={{ __html: berita.content || "" }} 
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </Layout>
  );
};

export default BeritaDetail;

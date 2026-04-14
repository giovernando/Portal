import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, Mail, BookOpen, GraduationCap, Briefcase, Loader2, User as UserIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { guruService, TeacherRecord } from "@/services/guruService";

const ProfilDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<TeacherRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const data = await guruService.getTeachers();
        const found = data.find(t => t.id === id);
        setPerson(found || null);
      } catch (err) {
        console.error("Error fetching profile detail:", err);
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
          <p>Memuat profil...</p>
        </div>
      </Layout>
    );
  }

  if (!person) {
    return <Navigate to="/tentang/guru-staff" replace />;
  }

  return (
    <Layout>
      <div className="bg-primary/5 py-8 border-b border-border">
        <div className="container">
          <Link
            to="/tentang/guru-staff"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Daftar Guru & Staff
          </Link>
        </div>
      </div>

      <section className="py-16 bg-card min-h-[60vh]">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-sm flex flex-col md:flex-row gap-10">
              {/* Photo Column */}
              <div className="shrink-0 flex flex-col items-center gap-6">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-primary/10 shadow-md">
                  {person.photo_url ? (
                    <img
                      src={person.photo_url}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      <UserIcon className="w-20 h-20" />
                    </div>
                  )}
                </div>
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 text-sm bg-secondary px-4 py-2 rounded-full text-foreground hover:text-primary transition-colors hover:shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Kirim Email</span>
                  </a>
                )}
              </div>

              {/* Info Column */}
              <div className="flex-grow space-y-8">
                <div>
                  <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                    {person.name}
                  </h1>
                  <p className="text-xl text-primary font-medium">{person.role}</p>
                </div>

                {person.bio && (
                  <div className="text-muted-foreground leading-relaxed">
                    <p>{person.bio}</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                  {person.pendidikan_terakhir && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <GraduationCap className="w-5 h-5 text-accent" />
                        Pendidikan
                      </div>
                      <p className="text-sm text-muted-foreground">{person.pendidikan_terakhir}</p>
                    </div>
                  )}

                  {person.mata_pelajaran && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <BookOpen className="w-5 h-5 text-accent" />
                        Mata Pelajaran
                      </div>
                      <p className="text-sm text-muted-foreground">{person.mata_pelajaran}</p>
                    </div>
                  )}

                  {person.nip && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Briefcase className="w-5 h-5 text-accent" />
                        NIP / NUPTK
                      </div>
                      <p className="text-sm text-muted-foreground">{person.nip}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilDetail;

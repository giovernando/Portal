import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar, Star, BookOpen, PartyPopper, FileText, Download, Loader2, AlertCircle } from "lucide-react";
import { akademikService, AcademicCalendarRecord } from "@/services/akademikService";
import { Button } from "@/components/ui/button";

interface EventItem {
  bulan: string;
  kegiatan: string;
  tanggal: string;
  tipe: "akademik" | "kegiatan" | "libur";
}

const semester1: EventItem[] = [
  { bulan: "Juli", kegiatan: "Penerimaan Peserta Didik Baru", tanggal: "1-15 Juli", tipe: "akademik" },
  { bulan: "Juli", kegiatan: "Masa Pengenalan Lingkungan Sekolah (MPLS)", tanggal: "17-19 Juli", tipe: "kegiatan" },
  { bulan: "Agustus", kegiatan: "Peringatan HUT RI ke-80", tanggal: "17 Agustus", tipe: "kegiatan" },
  { bulan: "September", kegiatan: "Penilaian Tengah Semester 1", tanggal: "18-22 September", tipe: "akademik" },
  { bulan: "Oktober", kegiatan: "Class Meeting & Pekan Olahraga", tanggal: "16-20 Oktober", tipe: "kegiatan" },
  { bulan: "November", kegiatan: "Penilaian Akhir Semester 1", tanggal: "27 Nov - 8 Des", tipe: "akademik" },
  { bulan: "Desember", kegiatan: "Pembagian Rapor Semester 1", tanggal: "22 Desember", tipe: "akademik" },
  { bulan: "Desember", kegiatan: "Libur Semester", tanggal: "23 Des - 1 Jan", tipe: "libur" },
];

const semester2: EventItem[] = [
  { bulan: "Januari", kegiatan: "Awal Semester 2", tanggal: "2 Januari", tipe: "akademik" },
  { bulan: "Februari", kegiatan: "Peringatan Isra Mi'raj", tanggal: "8 Februari", tipe: "libur" },
  { bulan: "Maret", kegiatan: "Penilaian Tengah Semester 2", tanggal: "11-15 Maret", tipe: "akademik" },
  { bulan: "Maret", kegiatan: "Ujian Sekolah Kelas IX", tanggal: "18-22 Maret", tipe: "akademik" },
  { bulan: "April", kegiatan: "Pekan Kreativitas & Seni", tanggal: "14-18 April", tipe: "kegiatan" },
  { bulan: "Mei", kegiatan: "Penilaian Akhir Semester 2", tanggal: "26 Mei - 6 Juni", tipe: "akademik" },
  { bulan: "Juni", kegiatan: "Wisuda Kelas IX", tanggal: "14 Juni", tipe: "kegiatan" },
  { bulan: "Juni", kegiatan: "Pembagian Rapor & Libur Semester", tanggal: "21 Juni", tipe: "akademik" },
];

const tipeIcon = { akademik: BookOpen, kegiatan: PartyPopper, libur: Star };
const tipeBg = { akademik: "bg-primary/10 text-primary", kegiatan: "bg-accent/10 text-accent", libur: "bg-rose-100 text-rose-600" };

const SemesterSection = ({ title, events }: { title: string; events: EventItem[] }) => (
  <div className="space-y-6">
    <ScrollReveal>
      <h3 className="text-xl font-display font-bold text-foreground inline-flex items-center gap-2">
        <div className="w-1.5 h-6 bg-accent rounded-full" />
        {title}
      </h3>
    </ScrollReveal>
    <div className="grid sm:grid-cols-2 gap-4">
      {events.map((e, i) => {
        const Icon = tipeIcon[e.tipe];
        return (
          <ScrollReveal key={i} delay={i * 40}>
            <div className="flex items-center gap-4 bg-background rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow h-full">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tipeBg[e.tipe]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm line-clamp-1">{e.kegiatan}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">{e.bulan} • {e.tanggal}</p>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  </div>
);

const Kalender = () => {
  const [calendar, setCalendar] = useState<AcademicCalendarRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const data = await akademikService.getCalendar();
        // Get the active one, or the latest
        const active = data.find(c => c.is_active) || data[0];
        setCalendar(active || null);
      } catch (err) {
        console.error("Error fetching calendar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  return (
    <Layout>
      <PageHeader title="Kalender Akademik" subtitle="Panduan waktu kegiatan belajar mengajar tahunan" />
      
      <section className="py-16 bg-card">
        <div className="container max-w-5xl space-y-16">
          
          {/* Official Document Download */}
          <ScrollReveal>
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground relative overflow-hidden group shadow-elevated">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/20">
                  <FileText className="w-10 h-10 text-accent" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    {loading ? "Memuat Kalender..." : calendar ? calendar.title : "Dokumen Kalender Akademik"}
                  </h2>
                  <p className="text-white/70 max-w-xl">
                    {calendar 
                      ? `Kalender resmi tahun ajaran ${calendar.year} Semester ${calendar.semester}. Silakan unduh file PDF/Gambar untuk detail lengkap.`
                      : "File kalender resmi belum diunggah oleh pihak kurikulum sekolah."}
                  </p>
                </div>
                
                {calendar && (
                  <div className="shrink-0 flex flex-col gap-3">
                    <a href={calendar.file_url} target="_blank" rel="noopener noreferrer" className="block">
                      <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full rounded-full px-8">
                        <Download className="w-4 h-4 mr-2" /> Unduh Dokumen
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Legend & Agenda */}
          <div className="space-y-12">
            <ScrollReveal className="text-center space-y-3">
              <h2 className="section-title">Ringkasan Agenda Tahunan</h2>
              <div className="gold-bar mx-auto" />
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                {[
                  { label: "Akademik", cls: tipeBg.akademik },
                  { label: "Kegiatan Siswa", cls: tipeBg.kegiatan },
                  { label: "Hari Libur", cls: tipeBg.libur },
                ].map((l) => (
                  <span key={l.label} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${l.cls}`}>
                    {l.label}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-1 gap-12">
              <SemesterSection title="Semester Ganjil (Juli - Desember)" events={semester1} />
              <SemesterSection title="Semester Genap (Januari - Juni)" events={semester2} />
            </div>
          </div>

          <ScrollReveal>
             <div className="bg-secondary/50 rounded-2xl p-6 border border-border flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <p className="font-bold text-foreground">Catatan Penting:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Jadwal di atas bersifat estimasi dan dapat berubah sesuai Surat Keputusan Kepala Sekolah.</li>
                    <li>Detail rincian kegiatan harian tersedia pada file dokumen yang dapat diunduh di atas.</li>
                    <li>Hari libur nasiona mengikuti ketetapan Surat Keputusan Bersama (SKB) 3 Menteri.</li>
                  </ul>
                </div>
             </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Kalender;

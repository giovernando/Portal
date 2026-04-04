import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar, Star, BookOpen, PartyPopper } from "lucide-react";

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
  <div>
    <ScrollReveal className="mb-6">
      <h3 className="text-xl font-display font-bold text-foreground">{title}</h3>
    </ScrollReveal>
    <div className="space-y-3">
      {events.map((e, i) => {
        const Icon = tipeIcon[e.tipe];
        return (
          <ScrollReveal key={i} delay={i * 60}>
            <div className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tipeBg[e.tipe]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{e.kegiatan}</p>
                <p className="text-xs text-muted-foreground">{e.bulan}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{e.tanggal}</span>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  </div>
);

const Kalender = () => (
  <Layout>
    <PageHeader title="Kalender Akademik" subtitle="Jadwal kegiatan akademik tahun ajaran 2025/2026" />
    <section className="py-16">
      <div className="container max-w-3xl space-y-12">
        {/* Legend */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: "Akademik", cls: tipeBg.akademik },
              { label: "Kegiatan", cls: tipeBg.kegiatan },
              { label: "Libur", cls: tipeBg.libur },
            ].map((l) => (
              <span key={l.label} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${l.cls}`}>
                {l.label}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <SemesterSection title="Semester 1 (Juli - Desember)" events={semester1} />
        <SemesterSection title="Semester 2 (Januari - Juni)" events={semester2} />
      </div>
    </section>
  </Layout>
);

export default Kalender;

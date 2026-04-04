import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Clock } from "lucide-react";

type Kelas = "VII" | "VIII" | "IX";

const jadwalData: Record<Kelas, { jam: string; senin: string; selasa: string; rabu: string; kamis: string; jumat: string }[]> = {
  VII: [
    { jam: "07:00-07:45", senin: "Upacara", selasa: "Matematika", rabu: "B. Indonesia", kamis: "IPA", jumat: "Agama" },
    { jam: "07:45-08:30", senin: "Matematika", selasa: "Matematika", rabu: "B. Indonesia", kamis: "IPA", jumat: "Agama" },
    { jam: "08:30-09:15", senin: "B. Inggris", selasa: "IPS", rabu: "PKn", kamis: "Seni Budaya", jumat: "Penjaskes" },
    { jam: "09:30-10:15", senin: "B. Inggris", selasa: "IPS", rabu: "PKn", kamis: "Seni Budaya", jumat: "Penjaskes" },
    { jam: "10:15-11:00", senin: "IPA", selasa: "B. Indonesia", rabu: "Matematika", kamis: "TIK", jumat: "-" },
    { jam: "11:00-11:45", senin: "IPA", selasa: "B. Indonesia", rabu: "Prakarya", kamis: "TIK", jumat: "-" },
    { jam: "12:30-13:15", senin: "B. Mandarin", selasa: "Agama", rabu: "Prakarya", kamis: "B. Daerah", jumat: "-" },
    { jam: "13:15-14:00", senin: "B. Mandarin", selasa: "BK", rabu: "Penjaskes", kamis: "B. Daerah", jumat: "-" },
  ],
  VIII: [
    { jam: "07:00-07:45", senin: "Upacara", selasa: "IPA", rabu: "Matematika", kamis: "B. Inggris", jumat: "Agama" },
    { jam: "07:45-08:30", senin: "IPA", selasa: "IPA", rabu: "Matematika", kamis: "B. Inggris", jumat: "Agama" },
    { jam: "08:30-09:15", senin: "Matematika", selasa: "B. Indonesia", rabu: "IPS", kamis: "PKn", jumat: "Penjaskes" },
    { jam: "09:30-10:15", senin: "Matematika", selasa: "B. Indonesia", rabu: "IPS", kamis: "Seni Budaya", jumat: "Penjaskes" },
    { jam: "10:15-11:00", senin: "B. Indonesia", selasa: "B. Inggris", rabu: "TIK", kamis: "Seni Budaya", jumat: "-" },
    { jam: "11:00-11:45", senin: "B. Inggris", selasa: "Prakarya", rabu: "TIK", kamis: "B. Daerah", jumat: "-" },
    { jam: "12:30-13:15", senin: "Agama", selasa: "Prakarya", rabu: "PKn", kamis: "BK", jumat: "-" },
    { jam: "13:15-14:00", senin: "B. Mandarin", selasa: "B. Mandarin", rabu: "Penjaskes", kamis: "B. Daerah", jumat: "-" },
  ],
  IX: [
    { jam: "07:00-07:45", senin: "Upacara", selasa: "Matematika", rabu: "IPA", kamis: "B. Indonesia", jumat: "Agama" },
    { jam: "07:45-08:30", senin: "Matematika", selasa: "Matematika", rabu: "IPA", kamis: "B. Indonesia", jumat: "Agama" },
    { jam: "08:30-09:15", senin: "IPA", selasa: "B. Inggris", rabu: "B. Indonesia", kamis: "IPS", jumat: "Penjaskes" },
    { jam: "09:30-10:15", senin: "IPA", selasa: "B. Inggris", rabu: "PKn", kamis: "IPS", jumat: "Penjaskes" },
    { jam: "10:15-11:00", senin: "B. Inggris", selasa: "IPS", rabu: "Matematika", kamis: "TIK", jumat: "-" },
    { jam: "11:00-11:45", senin: "PKn", selasa: "Seni Budaya", rabu: "Prakarya", kamis: "TIK", jumat: "-" },
    { jam: "12:30-13:15", senin: "Agama", selasa: "Seni Budaya", rabu: "Prakarya", kamis: "BK", jumat: "-" },
    { jam: "13:15-14:00", senin: "B. Daerah", selasa: "B. Mandarin", rabu: "B. Mandarin", kamis: "B. Daerah", jumat: "-" },
  ],
};

const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"] as const;

const Jadwal = () => {
  const [kelas, setKelas] = useState<Kelas>("VII");

  return (
    <Layout>
      <PageHeader title="Jadwal Pelajaran" subtitle="Jadwal kegiatan belajar mengajar" />
      <section className="py-16">
        <div className="container max-w-6xl">
          <ScrollReveal>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-display font-bold text-foreground">Kelas {kelas}</h2>
              </div>
              <div className="flex gap-2">
                {(["VII", "VIII", "IX"] as Kelas[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setKelas(k)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      kelas === k
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Kelas {k}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Jam</th>
                    {hari.map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jadwalData[kelas].map((j, i) => (
                    <tr key={i} className="border-t border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground whitespace-nowrap">{j.jam}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{j.senin}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{j.selasa}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{j.rabu}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{j.kamis}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{j.jumat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mt-6 bg-accent/10 rounded-xl p-4 border border-accent/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Catatan:</strong> Jadwal dapat berubah sewaktu-waktu. Istirahat pukul 09:15-09:30 dan 11:45-12:30.
                Kegiatan ekstrakurikuler dilaksanakan setiap Senin dan Kamis pukul 14:30-16:00.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Jadwal;

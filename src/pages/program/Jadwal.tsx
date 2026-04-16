import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Clock, BookOpen, User, Loader2, Calendar } from "lucide-react";
import { akademikService, ScheduleRecord } from "@/services/akademikService";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const CLASSES = ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"];

const Jadwal = () => {
  const [activeClass, setActiveClass] = useState("7A");
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const data = await akademikService.getSchedules(activeClass);
        setSchedules(data);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [activeClass]);

  // Group schedules by day
  const groupedSchedules = DAYS.reduce((acc, day) => {
    const daySchedules = schedules
      .filter((s) => s.day_of_week === day)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
    if (daySchedules.length > 0) acc[day] = daySchedules;
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <Layout>
      <PageHeader title="Jadwal Pelajaran" subtitle="Jadwal kegiatan belajar mengajar SMA PGRI 4 Palembang" />
      
      <section className="py-16 bg-card">
        <div className="container max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Jadwal Kelas {activeClass}</h2>
                  <p className="text-sm text-muted-foreground">Tahun Pelajaran 2024/2025</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {CLASSES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveClass(c)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      activeClass === c
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Kelas {c}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>Memuat jadwal pelajaran...</p>
            </div>
          ) : Object.keys(groupedSchedules).length === 0 ? (
            <div className="py-20 text-center text-muted-foreground bg-secondary/30 rounded-3xl border-2 border-dashed">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p>Belum ada jadwal yang diatur untuk Kelas {activeClass}.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DAYS.map((day, idx) => {
                const dayData = groupedSchedules[day];
                if (!dayData) return null;
                
                return (
                  <ScrollReveal key={day} delay={idx * 100}>
                    <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden h-full">
                      <div className="bg-primary px-6 py-4">
                        <h3 className="text-primary-foreground font-display font-bold text-lg">{day}</h3>
                      </div>
                      <div className="p-2">
                        {dayData.map((item, i) => (
                          <div 
                            key={item.id} 
                            className={`p-4 flex items-start gap-4 ${
                              i !== dayData.length - 1 ? "border-b border-border" : ""
                            }`}
                          >
                            <div className="text-xs font-mono font-bold text-primary bg-primary/5 px-2 py-1 rounded min-w-[85px] text-center shrink-0">
                              {item.start_time.substring(0, 5)} - {item.end_time.substring(0, 5)}
                            </div>
                            <div className="space-y-1 mt-0.5">
                              <p className="font-bold text-sm text-foreground leading-tight">{item.subject}</p>
                              {item.teachers && (
                                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                  <User className="w-3 h-3" />
                                  <span>{item.teachers.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          <ScrollReveal delay={200}>
            <div className="mt-12 bg-accent/5 rounded-2xl p-6 border border-accent/10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-bold text-foreground">Informasi Tambahan</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Jadwal dapat berubah sesua kebijakan kurikulum sekolah. 
                  Pastikan siswa selalu memantau pengumuman terbaru melalui wali kelas masing-masing.
                  Istirahat I: 09:15 - 09:30, Istirahat II: 11:45 - 12:30.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Jadwal;

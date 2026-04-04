import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, Users, Trophy } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import badmintonImg from "@/assets/ekskul-badminton.jpg";
import tariImg from "@/assets/ekskul-tari.jpg";
import robotikImg from "@/assets/ekskul-robotik.jpg";
import pramukaImg from "@/assets/ekskul-pramuka.jpg";
import musikImg from "@/assets/ekskul-musik.jpg";
import seniImg from "@/assets/ekskul-seni.jpg";

interface Ekskul {
  title: string;
  category: string;
  img: string;
  schedule: string;
  members: string;
  desc: string;
  achievements: string[];
  gallery: string[];
}

const ekstrakurikulerData: Ekskul[] = [
  {
    title: "Badminton",
    category: "Olahraga",
    img: badmintonImg,
    schedule: "Selasa & Kamis, 15:00 - 17:00",
    members: "30 Siswa",
    desc: "Kegiatan badminton untuk mengembangkan kemampuan fisik, strategi, dan sportivitas siswa. Dilatih oleh pelatih profesional bersertifikat nasional.",
    achievements: ["Juara 1 Turnamen Antar Sekolah 2024", "Juara 3 Kejuaraan Kabupaten 2024"],
    gallery: [badmintonImg],
  },
  {
    title: "Tari Tradisional",
    category: "Seni & Budaya",
    img: tariImg,
    schedule: "Senin & Rabu, 15:00 - 17:00",
    members: "25 Siswa",
    desc: "Melestarikan budaya Indonesia melalui seni tari tradisional dari berbagai daerah. Siswa mempelajari tari Saman, Jaipong, dan tarian nusantara lainnya.",
    achievements: ["Juara 1 Festival Tari Daerah 2024", "Tampil di Hari Pendidikan Nasional"],
    gallery: [tariImg],
  },
  {
    title: "Robotik",
    category: "Teknologi",
    img: robotikImg,
    schedule: "Rabu & Jumat, 15:00 - 17:00",
    members: "20 Siswa",
    desc: "Klub robotik yang mengajarkan pemrograman, elektronika, dan desain mekanik. Siswa belajar membuat robot dari dasar hingga mampu berkompetisi.",
    achievements: ["Finalis Kompetisi Robotik Nasional 2024", "Best Design Award Regional 2024"],
    gallery: [robotikImg],
  },
  {
    title: "Pramuka",
    category: "Kepemimpinan",
    img: pramukaImg,
    schedule: "Sabtu, 07:00 - 12:00",
    members: "50 Siswa",
    desc: "Kegiatan pramuka untuk membentuk karakter kepemimpinan, kemandirian, dan jiwa sosial siswa melalui aktivitas outdoor dan pengabdian masyarakat.",
    achievements: ["Penggalang Tergiat Tingkat Kecamatan 2024", "Raimuna Nasional 2024"],
    gallery: [pramukaImg],
  },
  {
    title: "Band & Musik",
    category: "Seni & Budaya",
    img: musikImg,
    schedule: "Selasa & Kamis, 15:00 - 17:00",
    members: "15 Siswa",
    desc: "Wadah kreativitas musikal siswa yang mencakup band, paduan suara, dan musik tradisional. Tampil di berbagai acara sekolah dan kompetisi.",
    achievements: ["Juara 2 Festival Band Pelajar 2024", "Pengisi acara Wisuda 2024"],
    gallery: [musikImg],
  },
  {
    title: "Seni Rupa",
    category: "Seni & Budaya",
    img: seniImg,
    schedule: "Senin & Rabu, 15:00 - 17:00",
    members: "18 Siswa",
    desc: "Mengembangkan bakat seni rupa siswa melalui lukis, gambar, kerajinan tangan, dan desain grafis. Karya siswa dipamerkan secara berkala.",
    achievements: ["Juara 1 Lomba Poster Lingkungan 2024", "Pameran Seni Sekolah 2024"],
    gallery: [seniImg],
  },
];

const Ekstrakurikuler = () => {
  const [selected, setSelected] = useState<Ekskul | null>(null);

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ekstrakurikulerData.map((ekskul, i) => (
              <ScrollReveal key={i} delay={i * 100} direction="scale">
                <button
                  onClick={() => setSelected(ekskul)}
                  className="text-left bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group w-full"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={ekskul.img}
                      alt={ekskul.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {ekskul.category}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-foreground">{ekskul.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{ekskul.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{ekskul.schedule.split(",")[0]}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{ekskul.members}</span>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
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
                <img src={selected.img} alt={selected.title} className="w-full aspect-video object-cover rounded-t-2xl" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-foreground/60 text-card p-2 rounded-full hover:bg-foreground/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="absolute bottom-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                  {selected.category}
                </span>
              </div>

              <div className="p-6 space-y-5">
                <h2 className="font-display font-bold text-2xl text-foreground">{selected.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{selected.desc}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary rounded-lg p-4 space-y-1">
                    <Clock className="w-5 h-5 text-primary" />
                    <p className="text-xs text-muted-foreground">Jadwal</p>
                    <p className="text-sm font-medium text-foreground">{selected.schedule}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 space-y-1">
                    <Users className="w-5 h-5 text-primary" />
                    <p className="text-xs text-muted-foreground">Anggota</p>
                    <p className="text-sm font-medium text-foreground">{selected.members}</p>
                  </div>
                </div>

                {selected.achievements.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-accent" /> Prestasi
                    </h3>
                    <ul className="space-y-2">
                      {selected.achievements.map((a, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Ekstrakurikuler;

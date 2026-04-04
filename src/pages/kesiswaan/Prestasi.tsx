import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Trophy, Medal, Award, Star } from "lucide-react";

import studentMale1 from "@/assets/portraits/student-male-1.jpg";
import studentFemale1 from "@/assets/portraits/student-female-1.jpg";
import studentMale2 from "@/assets/portraits/student-male-2.jpg";
import studentFemale2 from "@/assets/portraits/student-female-2.jpg";
import studentMale3 from "@/assets/portraits/student-male-3.jpg";
import studentFemale3 from "@/assets/portraits/student-female-3.jpg";

interface PrestasiItem {
  judul: string;
  tahun: string;
  tingkat: string;
  siswa: string;
  kategori: "akademik" | "olahraga" | "seni" | "lainnya";
  photo: string;
}

const prestasiList: PrestasiItem[] = [
  { judul: "Juara 1 Olimpiade Matematika", tahun: "2024", tingkat: "Nasional", siswa: "Ahmad Fauzan", kategori: "akademik", photo: studentMale1 },
  { judul: "Juara 2 Lomba Robotik", tahun: "2024", tingkat: "Provinsi", siswa: "Tim Robotik", kategori: "akademik", photo: studentMale2 },
  { judul: "Juara 1 Badminton Tunggal Putra", tahun: "2024", tingkat: "Kabupaten", siswa: "Dimas Arya", kategori: "olahraga", photo: studentMale3 },
  { judul: "Juara 3 Debat Bahasa Inggris", tahun: "2023", tingkat: "Provinsi", siswa: "Putri Amelia", kategori: "akademik", photo: studentFemale1 },
  { judul: "Juara 1 Tari Tradisional", tahun: "2023", tingkat: "Kabupaten", siswa: "Tim Tari", kategori: "seni", photo: studentFemale2 },
  { judul: "Juara 2 Lomba Cerpen Nasional", tahun: "2023", tingkat: "Nasional", siswa: "Sinta Dewi", kategori: "akademik", photo: studentFemale3 },
  { judul: "Juara 1 Pencak Silat", tahun: "2023", tingkat: "Provinsi", siswa: "M. Ridwan", kategori: "olahraga", photo: studentMale2 },
  { judul: "Sekolah Adiwiyata", tahun: "2022", tingkat: "Provinsi", siswa: "Sekolah", kategori: "lainnya", photo: studentMale1 },
  { judul: "Juara 1 Paduan Suara", tahun: "2022", tingkat: "Kabupaten", siswa: "Tim Paduan Suara", kategori: "seni", photo: studentFemale1 },
  { judul: "Juara 2 Olimpiade Sains", tahun: "2022", tingkat: "Provinsi", siswa: "Rizky Pratama", kategori: "akademik", photo: studentMale3 },
];

const kategoriConfig = {
  akademik: { icon: Award, bg: "bg-blue-100 text-blue-700", label: "Akademik" },
  olahraga: { icon: Medal, bg: "bg-green-100 text-green-700", label: "Olahraga" },
  seni: { icon: Star, bg: "bg-purple-100 text-purple-700", label: "Seni" },
  lainnya: { icon: Trophy, bg: "bg-accent/10 text-accent", label: "Lainnya" },
};

const stats = [
  { value: "50+", label: "Total Penghargaan" },
  { value: "15", label: "Tingkat Nasional" },
  { value: "25", label: "Tingkat Provinsi" },
  { value: "3", label: "Tahun Berturut-turut" },
];

const Prestasi = () => (
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
    <section className="py-16">
      <div className="container max-w-4xl">
        <ScrollReveal className="text-center mb-10 space-y-3">
          <h2 className="section-title">Daftar Prestasi</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>

        <div className="space-y-4">
          {prestasiList.map((p, i) => {
            const config = kategoriConfig[p.kategori];
            return (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={p.photo}
                    alt={p.siswa}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{p.judul}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.siswa} · {p.tahun}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.bg}`}>
                      {config.label}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Tingkat {p.tingkat}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  </Layout>
);

export default Prestasi;

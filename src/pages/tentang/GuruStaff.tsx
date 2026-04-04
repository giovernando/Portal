import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";

import guruMale1 from "@/assets/portraits/guru-male-1.jpg";
import guruMale2 from "@/assets/portraits/guru-male-2.jpg";
import guruMale3 from "@/assets/portraits/guru-male-3.jpg";
import guruMale4 from "@/assets/portraits/guru-male-4.jpg";
import guruFemale1 from "@/assets/portraits/guru-female-1.jpg";
import guruFemale2 from "@/assets/portraits/guru-female-2.jpg";
import guruFemale3 from "@/assets/portraits/guru-female-3.jpg";
import staffFemale1 from "@/assets/portraits/staff-female-1.jpg";
import staffMale1 from "@/assets/portraits/staff-male-1.jpg";
import staffFemale2 from "@/assets/portraits/staff-female-2.jpg";
import staffMale2 from "@/assets/portraits/staff-male-2.jpg";
import staffMale3 from "@/assets/portraits/staff-male-3.jpg";

const guru = [
  { name: "Reza Kendrawan, S.Pd", role: "Kepala Sekolah", pendidikan: "S2 Manajemen Pendidikan", photo: guruMale1 },
  { name: "Linggadi Shudqiyanto, S.Pd", role: "Wakil Kepala Sekolah", pendidikan: "S1 Pendidikan Fisika", photo: guruMale2 },
  { name: "Ayuk Rosayanti, S.Pd", role: "Guru Matematika", pendidikan: "S1 Pendidikan Matematika", photo: guruFemale1 },
  { name: "Niken Ernawati, S.Pd", role: "Guru Bahasa Inggris", pendidikan: "S1 Pendidikan Bahasa Inggris", photo: guruFemale2 },
  { name: "Bima Sofyanto, S.Pd", role: "Guru Penjaskes", pendidikan: "S1 Pendidikan Olahraga", photo: guruMale3 },
  { name: "Fajar Agustian, S.Pd", role: "Guru Bahasa Mandarin", pendidikan: "S1 Sastra Mandarin", photo: guruMale4 },
  { name: "Dewi Lestari, S.Pd", role: "Guru IPA", pendidikan: "S1 Pendidikan Biologi", photo: guruFemale3 },
  { name: "Andi Pratama, S.Pd", role: "Guru IPS", pendidikan: "S1 Pendidikan Sejarah", photo: guruMale2 },
  { name: "Ratna Sari, S.Pd", role: "Guru Bahasa Indonesia", pendidikan: "S1 Pendidikan Bahasa", photo: guruFemale1 },
  { name: "Hendra Wijaya, S.Kom", role: "Guru TIK", pendidikan: "S1 Teknik Informatika", photo: guruMale4 },
];

const staff = [
  { name: "Siti Nurhaliza, S.E", role: "Kepala Tata Usaha", photo: staffFemale1 },
  { name: "Rahmat Hidayat", role: "Staff Administrasi", photo: staffMale1 },
  { name: "Ani Suryani", role: "Staff Keuangan", photo: staffFemale2 },
  { name: "Bambang Setiawan", role: "Petugas Perpustakaan", photo: staffMale2 },
  { name: "Supardi", role: "Petugas Keamanan", photo: staffMale3 },
];

const GuruStaff = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <Layout>
      <PageHeader title="Guru & Staff" subtitle="Tenaga pendidik dan kependidikan profesional" />

      {/* Guru - Horizontal Scroll */}
      <section className="py-16 bg-card">
        <div className="container">
          <ScrollReveal className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Tenaga Pendidik</h2>
              <p className="text-sm text-muted-foreground mt-1">{guru.length} guru profesional dan berdedikasi</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </ScrollReveal>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {guru.map((g, i) => (
              <div
                key={i}
                className="min-w-[250px] bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow snap-start flex-shrink-0"
              >
                <img
                  src={g.photo}
                  alt={g.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4"
                />
                <div className="text-center">
                  <p className="font-semibold text-foreground">{g.name}</p>
                  <p className="text-sm text-primary font-medium mt-1">{g.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{g.pendidikan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground">Tenaga Kependidikan</h2>
            <p className="text-sm text-muted-foreground mt-1">Staff pendukung yang profesional</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {staff.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-card rounded-xl p-5 border border-border shadow-sm text-center hover:shadow-md transition-shadow">
                  <img
                    src={s.photo}
                    alt={s.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                  />
                  <p className="font-semibold text-foreground text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuruStaff;

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Users, Flag, Calendar, Megaphone } from "lucide-react";

import studentMale1 from "@/assets/portraits/student-male-1.jpg";
import studentFemale1 from "@/assets/portraits/student-female-1.jpg";
import studentMale2 from "@/assets/portraits/student-male-2.jpg";
import studentFemale2 from "@/assets/portraits/student-female-2.jpg";
import studentMale3 from "@/assets/portraits/student-male-3.jpg";
import studentFemale3 from "@/assets/portraits/student-female-3.jpg";

const pengurus = [
  { jabatan: "Ketua Umum", nama: "Ahmad Fauzan", kelas: "IX-A", photo: studentMale1 },
  { jabatan: "Wakil Ketua", nama: "Putri Amelia", kelas: "IX-B", photo: studentFemale1 },
  { jabatan: "Sekretaris 1", nama: "Rizky Pratama", kelas: "IX-A", photo: studentMale2 },
  { jabatan: "Sekretaris 2", nama: "Nadia Safitri", kelas: "VIII-A", photo: studentFemale2 },
  { jabatan: "Bendahara 1", nama: "Sinta Dewi", kelas: "IX-C", photo: studentFemale3 },
  { jabatan: "Bendahara 2", nama: "Rina Wulandari", kelas: "VIII-B", photo: studentFemale1 },
];

const seksi = [
  { jabatan: "Sie. Keagamaan", nama: "M. Ridwan", kelas: "IX-B", photo: studentMale3 },
  { jabatan: "Sie. Olahraga & Kesehatan", nama: "Dimas Arya", kelas: "IX-A", photo: studentMale2 },
  { jabatan: "Sie. Seni & Budaya", nama: "Anisa Putri", kelas: "VIII-C", photo: studentFemale2 },
  { jabatan: "Sie. Kebersihan & Lingkungan", nama: "Bayu Setiawan", kelas: "VIII-A", photo: studentMale1 },
  { jabatan: "Sie. Humas & Dokumentasi", nama: "Lina Mariana", kelas: "VIII-B", photo: studentFemale3 },
  { jabatan: "Sie. Keamanan & Ketertiban", nama: "Rafi Hidayat", kelas: "IX-C", photo: studentMale3 },
];

const programs = [
  { icon: Calendar, title: "MPLS", desc: "Masa Pengenalan Lingkungan Sekolah untuk siswa baru." },
  { icon: Flag, title: "Upacara & Peringatan", desc: "Menyelenggarakan upacara bendera dan peringatan hari besar." },
  { icon: Megaphone, title: "Class Meeting", desc: "Mengadakan pertandingan antar kelas setiap akhir semester." },
  { icon: Users, title: "Bakti Sosial", desc: "Kegiatan sosial untuk membantu masyarakat sekitar." },
];

const Osis = () => (
  <Layout>
    <PageHeader title="Organisasi Siswa" subtitle="OSIS Sekolah Nusantara Periode 2024/2025" />

    {/* About */}
    <section className="py-16 bg-card">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-accent" />
              <h2 className="text-2xl font-display font-bold">Tentang OSIS</h2>
            </div>
            <p className="opacity-90 leading-relaxed text-lg">
              Organisasi Siswa Intra Sekolah (OSIS) Sekolah Nusantara merupakan wadah bagi seluruh siswa
              untuk mengembangkan jiwa kepemimpinan, kreativitas, dan semangat gotong royong.
              OSIS berperan aktif dalam menyelenggarakan berbagai kegiatan yang mendukung
              pengembangan karakter dan soft skill siswa.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Pengurus Inti */}
    <section className="py-16 bg-secondary">
      <div className="container max-w-5xl">
        <ScrollReveal className="text-center mb-10 space-y-3">
          <h2 className="section-title">Pengurus Inti</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pengurus.map((p, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm text-center hover:shadow-md transition-shadow">
                <img
                  src={p.photo}
                  alt={p.nama}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                />
                <p className="font-semibold text-foreground">{p.nama}</p>
                <p className="text-sm text-primary font-medium mt-0.5">{p.jabatan}</p>
                <p className="text-xs text-muted-foreground mt-1">Kelas {p.kelas}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Seksi */}
    <section className="py-16 bg-card">
      <div className="container max-w-5xl">
        <ScrollReveal className="text-center mb-10 space-y-3">
          <h2 className="section-title">Seksi-Seksi</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seksi.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                <img
                  src={s.photo}
                  alt={s.nama}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-semibold text-foreground">{s.nama}</p>
                  <p className="text-sm text-primary font-medium mt-0.5">{s.jabatan}</p>
                  <p className="text-xs text-muted-foreground mt-1">Kelas {s.kelas}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Program Kerja */}
    <section className="py-16 bg-secondary">
      <div className="container max-w-4xl">
        <ScrollReveal className="text-center mb-10 space-y-3">
          <h2 className="section-title">Program Kerja</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Osis;

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";

import guruMale1 from "@/assets/portraits/guru-male-1.jpg";
import guruMale2 from "@/assets/portraits/guru-male-2.jpg";
import guruMale3 from "@/assets/portraits/guru-male-3.jpg";
import guruMale4 from "@/assets/portraits/guru-male-4.jpg";
import guruFemale2 from "@/assets/portraits/guru-female-2.jpg";
import guruFemale3 from "@/assets/portraits/guru-female-3.jpg";
import staffFemale1 from "@/assets/portraits/staff-female-1.jpg";
import komiteMale1 from "@/assets/portraits/komite-male-1.jpg";
import komiteFemale1 from "@/assets/portraits/komite-female-1.jpg";

const pimpinan = [
  { jabatan: "Kepala Sekolah", nama: "Reza Kendrawan, S.Pd", photo: guruMale1 },
];

const wakil = [
  { jabatan: "Wakil Kepala Sekolah Bid. Kurikulum", nama: "Linggadi Shudqiyanto, S.Pd", photo: guruMale2 },
  { jabatan: "Wakil Kepala Sekolah Bid. Kesiswaan", nama: "Bima Sofyanto, S.Pd", photo: guruMale3 },
  { jabatan: "Wakil Kepala Sekolah Bid. Sarana", nama: "Fajar Agustian, S.Pd", photo: guruMale4 },
];

const koordinator = [
  { jabatan: "Kepala Tata Usaha", nama: "Siti Nurhaliza, S.E", photo: staffFemale1 },
  { jabatan: "Koordinator BK", nama: "Niken Ernawati, S.Pd", photo: guruFemale2 },
  { jabatan: "Koordinator Perpustakaan", nama: "Dewi Lestari, S.Pd", photo: guruFemale3 },
  { jabatan: "Koordinator Laboratorium", nama: "Andi Pratama, S.Pd", photo: guruMale2 },
];

const komite = [
  { jabatan: "Ketua Komite", nama: "H. Sugianto, S.H", photo: komiteMale1 },
  { jabatan: "Sekretaris Komite", nama: "Dra. Ratna Sari", photo: komiteFemale1 },
];

const Struktur = () => (
  <Layout>
    <PageHeader title="Struktur Organisasi" subtitle="Susunan organisasi SMA PGRI 4 Palembang" />
    <section className="py-16">
      <div className="container max-w-4xl space-y-12">
        {/* Pimpinan */}
        <ScrollReveal>
          <div className="text-center">
            <div className="inline-block bg-primary text-primary-foreground rounded-2xl px-8 py-6 shadow-lg">
              <img src={pimpinan[0].photo} alt={pimpinan[0].nama} loading="lazy" width={512} height={512} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-accent" />
              <p className="text-sm opacity-80 mb-1">{pimpinan[0].jabatan}</p>
              <p className="text-xl font-display font-bold">{pimpinan[0].nama}</p>
            </div>
            <div className="w-0.5 h-8 bg-border mx-auto" />
          </div>
        </ScrollReveal>

        {/* Wakil */}
        <ScrollReveal delay={100}>
          <div className="text-center mb-4">
            <h3 className="text-lg font-display font-bold text-foreground">Wakil Kepala Sekolah</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {wakil.map((w, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border-2 border-primary/20 text-center shadow-sm hover:shadow-md transition-shadow">
                <img src={w.photo} alt={w.nama} loading="lazy" width={512} height={512} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
                <p className="font-semibold text-foreground">{w.nama}</p>
                <p className="text-xs text-muted-foreground mt-1">{w.jabatan}</p>
              </div>
            ))}
          </div>
          <div className="w-0.5 h-8 bg-border mx-auto" />
        </ScrollReveal>

        {/* Koordinator */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-4">
            <h3 className="text-lg font-display font-bold text-foreground">Koordinator & Staff</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {koordinator.map((k, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border border-border text-center shadow-sm">
                <img src={k.photo} alt={k.nama} loading="lazy" width={512} height={512} className="w-14 h-14 rounded-full object-cover mx-auto mb-3" />
                <p className="font-semibold text-foreground text-sm">{k.nama}</p>
                <p className="text-xs text-muted-foreground mt-1">{k.jabatan}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Komite */}
        <ScrollReveal delay={300}>
          <div className="text-center mb-4">
            <h3 className="text-lg font-display font-bold text-foreground">Komite Sekolah</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
            {komite.map((k, i) => (
              <div key={i} className="bg-accent/10 rounded-xl p-5 border border-accent/20 text-center">
                <img src={k.photo} alt={k.nama} loading="lazy" width={512} height={512} className="w-14 h-14 rounded-full object-cover mx-auto mb-3" />
                <p className="font-semibold text-foreground">{k.nama}</p>
                <p className="text-xs text-muted-foreground mt-1">{k.jabatan}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default Struktur;

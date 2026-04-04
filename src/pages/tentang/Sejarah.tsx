import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Building2, Milestone } from "lucide-react";
import studentsImg from "@/assets/students.jpg";

const timeline = [
  { year: "1985", event: "Pendirian Sekolah Nusantara dengan 3 ruang kelas dan 50 siswa pertama." },
  { year: "1990", event: "Pembangunan gedung lantai 2 dan penambahan program ekstrakurikuler." },
  { year: "1995", event: "Diresmikan laboratorium IPA dan perpustakaan baru." },
  { year: "2000", event: "Meraih akreditasi A untuk pertama kalinya." },
  { year: "2005", event: "Pembangunan aula serbaguna dan lapangan olahraga." },
  { year: "2010", event: "Penerapan kurikulum berbasis teknologi informasi." },
  { year: "2015", event: "Pembangunan laboratorium komputer dan multimedia." },
  { year: "2020", event: "Implementasi pembelajaran hybrid dan kurikulum digital." },
  { year: "2024", event: "Menjadi sekolah rujukan nasional dengan fasilitas modern." },
];

const Sejarah = () => (
  <Layout>
    <PageHeader title="Sejarah Sekolah" subtitle="Perjalanan panjang menuju pendidikan berkualitas" />

    {/* Intro */}
    <section className="py-16 bg-card">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-display font-bold text-foreground">Awal Mula</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Sekolah Nusantara didirikan pada tahun 1985 oleh sekelompok tokoh pendidikan yang memiliki
                visi untuk menciptakan lembaga pendidikan berkualitas yang terjangkau oleh semua kalangan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Bermula dari sebuah bangunan sederhana di pinggiran kota, sekolah ini terus tumbuh dan berkembang
                berkat dedikasi para guru, dukungan orang tua, dan semangat belajar para siswa.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Kini, setelah hampir empat dekade berdiri, Sekolah Nusantara telah menghasilkan ribuan alumni
                yang berkiprah di berbagai bidang, baik di tingkat nasional maupun internasional.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={studentsImg} alt="Siswa Sekolah" className="w-full h-72 object-cover" loading="lazy" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-16 bg-secondary">
      <div className="container max-w-3xl">
        <ScrollReveal className="text-center mb-12 space-y-3">
          <h2 className="section-title">Tonggak Sejarah</h2>
          <div className="gold-bar mx-auto" />
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 ring-4 ring-secondary z-10" />

                  {/* Card */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-0" : "md:pl-0"}`}>
                    <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <Milestone className="w-4 h-4 text-accent" />
                        <span className="text-lg font-display font-bold text-primary">{item.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Sejarah;

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import classroomImg from "@/assets/classroom.jpg";
import libraryImg from "@/assets/library.jpg";
import labImg from "@/assets/lab.jpg";
import sportsImg from "@/assets/sports.jpg";
import computerLabImg from "@/assets/computer-lab.jpg";
import mosqueImg from "@/assets/mosque.jpg";

const facilities = [
  { img: classroomImg, title: "Ruang Kelas Modern", desc: "Ruang kelas yang nyaman dengan fasilitas multimedia dan pendingin ruangan." },
  { img: libraryImg, title: "Perpustakaan", desc: "Koleksi buku yang lengkap dan ruang baca yang nyaman untuk mendukung literasi siswa." },
  { img: labImg, title: "Laboratorium IPA", desc: "Laboratorium sains lengkap dengan peralatan modern untuk praktikum." },
  { img: sportsImg, title: "Lapangan Olahraga", desc: "Lapangan serbaguna untuk basket, futsal, dan kegiatan upacara." },
  { img: computerLabImg, title: "Lab Komputer", desc: "Lab komputer dengan perangkat terbaru dan akses internet berkecepatan tinggi." },
  { img: mosqueImg, title: "Mushola", desc: "Tempat ibadah yang bersih dan nyaman untuk kegiatan keagamaan siswa." },
];

const Fasilitas = () => {
  return (
    <Layout>
      <PageHeader title="Sarana & Fasilitas" subtitle="Fasilitas lengkap untuk mendukung kegiatan belajar mengajar" />

      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl overflow-hidden shadow-card hover-card-lift border border-border group">
                  <div className="aspect-video overflow-hidden">
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-display font-semibold text-lg text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Fasilitas;

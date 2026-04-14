import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Alamat", value: "Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia" },
  { icon: Phone, label: "Telepon", value: "085729319861" },
  { icon: Mail, label: "Email", value: "info@sekolahnusantara.sch.id" },
  { icon: Clock, label: "Jam Operasional", value: "Senin - Jumat: 07:00 - 15:00" },
];

const Kontak = () => {
  return (
    <Layout>
      <PageHeader title="Hubungi Kami" subtitle="Kami siap membantu Anda" />

      <section className="section-padding bg-card">
        <div className="container grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal>
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="font-display font-bold text-2xl text-foreground">Informasi Kontak</h2>
                <div className="gold-bar" />
                <p className="text-muted-foreground">Jangan ragu untuk menghubungi kami jika ada pertanyaan.</p>
              </div>
              <div className="space-y-6">
                {contactInfo.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Google Maps */}
          <ScrollReveal delay={200}>
            <div className="bg-secondary rounded-2xl p-4 space-y-4 h-full">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">Lokasi Kami</h2>
                <div className="gold-bar mt-2" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-border" style={{ height: "400px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Sekolah Nusantara"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;

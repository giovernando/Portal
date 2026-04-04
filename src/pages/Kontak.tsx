import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().trim().email("Format email tidak valid").max(255),
  subject: z.string().trim().min(3, "Subjek minimal 3 karakter").max(200),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: MapPin, label: "Alamat", value: "Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia" },
  { icon: Phone, label: "Telepon", value: "085729319861" },
  { icon: Mail, label: "Email", value: "info@sekolahnusantara.sch.id" },
  { icon: Clock, label: "Jam Operasional", value: "Senin - Jumat: 07:00 - 15:00" },
];

const Kontak = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Contact:", data);
    toast({ title: "Pesan Terkirim!", description: "Terima kasih, kami akan segera merespons pesan Anda." });
    reset();
  };

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

          {/* Contact Form */}
          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary rounded-2xl p-8 space-y-5">
              <h2 className="font-display font-bold text-xl text-foreground">Kirim Pesan</h2>
              <div className="gold-bar" />
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input id="name" {...register("name")} placeholder="Nama Anda" />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="email@contoh.com" />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subjek</Label>
                <Input id="subject" {...register("subject")} placeholder="Topik pesan" />
                {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <textarea id="message" {...register("message")} rows={5} placeholder="Tulis pesan Anda..." className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-green-dark font-semibold">
                Kirim Pesan
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;

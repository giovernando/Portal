import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ppdbSchema = z.object({
  namaLengkap: z.string().trim().min(3, "Nama lengkap minimal 3 karakter").max(100),
  tempatLahir: z.string().trim().min(2, "Tempat lahir wajib diisi").max(100),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  jenisKelamin: z.string().min(1, "Jenis kelamin wajib dipilih"),
  agama: z.string().min(1, "Agama wajib dipilih"),
  alamat: z.string().trim().min(10, "Alamat minimal 10 karakter").max(300),
  namaOrtu: z.string().trim().min(3, "Nama orang tua minimal 3 karakter").max(100),
  pekerjaanOrtu: z.string().trim().min(2, "Pekerjaan wajib diisi").max(100),
  noHpOrtu: z.string().trim().min(10, "Nomor HP minimal 10 digit").max(15),
  email: z.string().trim().email("Format email tidak valid").max(255),
});

type PPDBFormData = z.infer<typeof ppdbSchema>;

const usePPDBForm = () => {
  const form = useForm<PPDBFormData>({
    resolver: zodResolver(ppdbSchema),
    defaultValues: {
      namaLengkap: "", tempatLahir: "", tanggalLahir: "", jenisKelamin: "",
      agama: "", alamat: "", namaOrtu: "", pekerjaanOrtu: "", noHpOrtu: "", email: "",
    },
  });

  const onSubmit = (data: PPDBFormData) => {
    console.log("PPDB Data:", data);
    toast({ title: "Pendaftaran Berhasil!", description: "Data pendaftaran Anda telah dikirim. Kami akan menghubungi Anda segera." });
    form.reset();
  };

  return { form, onSubmit };
};

const PPDB = () => {
  const { form, onSubmit } = usePPDBForm();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <Layout>
      <PageHeader title="PPDB Online" subtitle="Pendaftaran Peserta Didik Baru Tahun Ajaran 2025/2026" />

      <section className="section-padding bg-card">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl shadow-elevated border border-border p-8 md:p-10 space-y-8">
              {/* Student Data */}
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Data Calon Siswa</h2>
                <div className="gold-bar" />

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                    <Input id="namaLengkap" {...register("namaLengkap")} placeholder="Masukkan nama lengkap" />
                    {errors.namaLengkap && <p className="text-sm text-destructive">{errors.namaLengkap.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                    <Input id="tempatLahir" {...register("tempatLahir")} placeholder="Kota kelahiran" />
                    {errors.tempatLahir && <p className="text-sm text-destructive">{errors.tempatLahir.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                    <Input id="tanggalLahir" type="date" {...register("tanggalLahir")} />
                    {errors.tanggalLahir && <p className="text-sm text-destructive">{errors.tanggalLahir.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                    <select id="jenisKelamin" {...register("jenisKelamin")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Pilih</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    {errors.jenisKelamin && <p className="text-sm text-destructive">{errors.jenisKelamin.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agama">Agama *</Label>
                    <select id="agama" {...register("agama")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Pilih</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                    {errors.agama && <p className="text-sm text-destructive">{errors.agama.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat Lengkap *</Label>
                  <textarea id="alamat" {...register("alamat")} rows={3} placeholder="Masukkan alamat lengkap" className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
                  {errors.alamat && <p className="text-sm text-destructive">{errors.alamat.message}</p>}
                </div>
              </div>

              {/* Parent Data */}
              <div className="space-y-5">
                <h2 className="font-display font-bold text-xl text-foreground">Data Orang Tua / Wali</h2>
                <div className="gold-bar" />

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="namaOrtu">Nama Orang Tua / Wali *</Label>
                    <Input id="namaOrtu" {...register("namaOrtu")} placeholder="Nama orang tua/wali" />
                    {errors.namaOrtu && <p className="text-sm text-destructive">{errors.namaOrtu.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pekerjaanOrtu">Pekerjaan *</Label>
                    <Input id="pekerjaanOrtu" {...register("pekerjaanOrtu")} placeholder="Pekerjaan orang tua" />
                    {errors.pekerjaanOrtu && <p className="text-sm text-destructive">{errors.pekerjaanOrtu.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="noHpOrtu">Nomor HP *</Label>
                    <Input id="noHpOrtu" {...register("noHpOrtu")} placeholder="08xxxxxxxxxx" />
                    {errors.noHpOrtu && <p className="text-sm text-destructive">{errors.noHpOrtu.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="email@contoh.com" />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-green-dark font-semibold rounded-lg">
                Kirim Pendaftaran
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default PPDB;

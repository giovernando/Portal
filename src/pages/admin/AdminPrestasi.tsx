import { useEffect, useState } from "react";
import { prestasiService, PrestasiRecord, generatePrestasiSlug } from "@/services/prestasiService";
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Award, Medal, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const kategoriIcons = {
  akademik: Award,
  olahraga: Medal,
  seni: Star,
  lainnya: Trophy,
};

export default function AdminPrestasi() {
  const [data, setData] = useState<PrestasiRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form States
  const [formData, setFormData] = useState<Partial<PrestasiRecord>>({ 
    kategori: "akademik",
    tahun: new Date().getFullYear().toString()
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const records = await prestasiService.getAchievements();
      setData(records);
    } catch (err) {
      toast.error("Gagal mengambil data Prestasi.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase()) ||
    item.siswa.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (record?: PrestasiRecord) => {
    if (record) {
      setEditingId(record.id);
      setFormData(record);
    } else {
      setEditingId(null);
      setFormData({ 
        kategori: "akademik", 
        tahun: new Date().getFullYear().toString(),
        judul: "",
        siswa: "",
        tingkat: "",
        deskripsi: ""
      });
    }
    setFile(null);
    setIsOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const judul = e.target.value;
    setFormData(prev => ({
      ...prev,
      judul,
      slug: generatePrestasiSlug(judul)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul || !formData.slug || !formData.siswa) {
      toast.error("Judul, Slug, dan Nama Siswa wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await prestasiService.updateAchievement(editingId, formData, file || undefined);
        toast.success("Prestasi berhasil diperbarui.");
      } else {
        await prestasiService.createAchievement(formData as Omit<PrestasiRecord, "id"|"created_at">, file || undefined);
        toast.success("Prestasi berhasil ditambahkan.");
      }
      setIsOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan prestasi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data prestasi ini secara permanen?")) return;
    try {
      await prestasiService.deleteAchievement(id);
      toast.success("Data prestasi dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">Kelola Prestasi Siswa</h1>
          <p className="text-sm text-slate-500 mt-1">Daftar pencapaian gemilang siswa di berbagai bidang.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Prestasi
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input 
              placeholder="Cari judul atau nama siswa..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-20">Foto</TableHead>
                <TableHead>Prestasi & Siswa</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tingkat & Tahun</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">Memuat data...</TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">Belum ada data prestasi.</TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => {
                  const Icon = kategoriIcons[item.kategori] || Trophy;
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.img_url ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border">
                            <img src={item.img_url} alt={item.judul} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-800 line-clamp-1">{item.judul}</div>
                        <div className="text-xs text-slate-500 mt-0.5">Oleh: {item.siswa}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="capitalize">{item.kategori}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-slate-700">{item.tingkat}</div>
                        <div className="text-xs text-slate-500">{item.tahun}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenModal(item)}>
                            <Edit className="w-4 h-4 text-slate-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Data Prestasi" : "Tambah Prestasi Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="judul">Judul Prestasi</Label>
                <Input id="judul" required placeholder="Cth: Juara 1 Lomba Matematika" value={formData.judul || ""} onChange={handleTitleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siswa">Nama Siswa / Kelompok</Label>
                <Input id="siswa" required placeholder="Cth: Ahmad Fauzi" value={formData.siswa || ""} onChange={(e) => setFormData({...formData, siswa: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori</Label>
                <select 
                  id="kategori"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.kategori || "akademik"}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value as any})}
                >
                  <option value="akademik">Akademik</option>
                  <option value="olahraga">Olahraga</option>
                  <option value="seni">Seni</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tingkat">Tingkat</Label>
                <Input id="tingkat" placeholder="Cth: Nasional, Internasional" value={formData.tingkat || ""} onChange={(e) => setFormData({...formData, tingkat: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tahun">Tahun Pengambilan</Label>
                <Input id="tahun" type="number" value={formData.tahun || ""} onChange={(e) => setFormData({...formData, tahun: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi Singkat (Opsional)</Label>
              <Textarea id="deskripsi" placeholder="Ceritakan singkat mengenai pencapaian ini..." value={formData.deskripsi || ""} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="img">Foto Bukti / Piagam (Opsional)</Label>
              <Input id="img" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan Prestasi"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

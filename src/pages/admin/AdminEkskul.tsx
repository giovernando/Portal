import { useEffect, useState } from "react";
import { ekskulService, EkskulRecord } from "@/services/ekskulService";
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Music, Bike, Palette, ShieldCheck, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminEkskul() {
  const [data, setData] = useState<EkskulRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form States
  const [formData, setFormData] = useState<Partial<EkskulRecord>>({ name: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const records = await ekskulService.getEkskul();
      setData(records);
    } catch (err) {
      toast.error("Gagal mengambil data Ekstrakurikuler.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (record?: EkskulRecord) => {
    if (record) {
      setEditingId(record.id);
      setFormData(record);
    } else {
      setEditingId(null);
      setFormData({ name: "", description: "", schedule: "", coordinator: "" });
    }
    setFile(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Nama Ekstrakurikuler wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await ekskulService.updateEkskul(editingId, formData, file || undefined);
        toast.success("Kegiatan Ekstrakurikuler diperbarui.");
      } else {
        await ekskulService.createEkskul(formData as Omit<EkskulRecord, "id"|"created_at">, file || undefined);
        toast.success("Kegiatan Ekstrakurikuler ditambahkan.");
      }
      setIsOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus kegiatan ini?")) return;
    try {
      await ekskulService.deleteEkskul(id);
      toast.success("Data berhasil dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">Manajemen Ekstrakurikuler</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola daftar klub dan kegiatan pilihan siswa.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Kegiatan
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b">
          <div className="relative max-w-[300px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input 
              placeholder="Cari nama kegiatan..." 
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
                <TableHead className="w-16">Foto</TableHead>
                <TableHead>Nama Kegiatan</TableHead>
                <TableHead>Koordinator</TableHead>
                <TableHead>Jadwal Rutin</TableHead>
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
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">Belum ada data tersedia.</TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.image_url ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border">
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800">{item.name}</TableCell>
                    <TableCell>{item.coordinator || "-"}</TableCell>
                    <TableCell>
                      <span className="inline-flex py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {item.schedule || "-"}
                      </span>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Ekstrakurikuler" : "Tambah Ekskul Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Kegiatan</Label>
              <Input id="name" required placeholder="Cth: Pramuka, Karawitan" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coordinator">Pembimbing / Koordinator</Label>
                <Input id="coordinator" placeholder="Cth: Pak Budi" value={formData.coordinator || ""} onChange={(e) => setFormData({...formData, coordinator: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sch">Jadwal (Hari & Jam)</Label>
                <Input id="sch" placeholder="Cth: Sabtu, 08:00 - 10:00" value={formData.schedule || ""} onChange={(e) => setFormData({...formData, schedule: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desk">Deskripsi Kegiatan</Label>
              <Textarea id="desk" placeholder="Jelaskan mengenai kegiatan ini..." rows={3} value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="img">Foto Kegiatan (Opsional)</Label>
              <Input id="img" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan Data"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

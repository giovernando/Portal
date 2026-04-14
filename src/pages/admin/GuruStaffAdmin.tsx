import { useEffect, useState } from "react";
import { guruService, TeacherRecord } from "@/services/guruService";
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminGuruStaff() {
  const [data, setData] = useState<TeacherRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form States
  const [formData, setFormData] = useState<Partial<TeacherRecord>>({ type: "guru" });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const records = await guruService.getTeachers();
      setData(records);
    } catch (err) {
      toast.error("Gagal mengambil data Guru & Staff.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (record?: TeacherRecord) => {
    if (record) {
      setEditingId(record.id);
      setFormData(record);
    } else {
      setEditingId(null);
      setFormData({ type: "guru" });
    }
    setFile(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        await guruService.updateTeacher(editingId, formData, file || undefined);
        toast.success("Berhasil mengubah data.");
      } else {
        await guruService.createTeacher(formData as Omit<TeacherRecord, "id">, file || undefined);
        toast.success("Berhasil menambah data baru.");
      }
      setIsOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      await guruService.deleteTeacher(id);
      toast.success("Data dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">Kelola Guru & Staff</h1>
          <p className="text-sm text-slate-500 mt-1">Daftar semua tenaga pendidik dan kependidikan.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Baru
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input 
              placeholder="Cari nama guru..." 
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
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Jabatan / Peran</TableHead>
                <TableHead>Posisi</TableHead>
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
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">Tidak ada data ditemukan.</TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.photo_url ? (
                        <img src={item.photo_url} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-slate-800">{item.name}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.type === 'guru' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {item.type.toUpperCase()}
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
            <DialogTitle>{editingId ? "Edit Guru & Staff" : "Tambah Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" required value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipe</Label>
                <select 
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.type || "guru"}
                  onChange={(e) => setFormData({...formData, type: e.target.value as "guru"|"staff"})}
                >
                  <option value="guru">Guru</option>
                  <option value="staff">Staff/Tata Usaha</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Jabatan / Role</Label>
                <Input id="role" placeholder="Cth: Guru BP, Kepala Sekolah" required value={formData.role || ""} onChange={(e) => setFormData({...formData, role: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mapel">Mata Pelajaran (Opsional)</Label>
              <Input id="mapel" value={formData.mata_pelajaran || ""} onChange={(e) => setFormData({...formData, mata_pelajaran: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Unggah Foto (Opsional)</Label>
              <Input id="photo" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
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

import { useEffect, useState } from "react";
import { akademikService, AcademicCalendarRecord } from "@/services/akademikService";
import { Plus, Trash2, CalendarDays, FileText as FileIcon, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminKalender() {
  const [data, setData] = useState<AcademicCalendarRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AcademicCalendarRecord>>({ 
    semester: "Ganjil", 
    year: "2024/2025",
    is_active: false 
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const records = await akademikService.getCalendar();
      setData(records);
    } catch (err) {
      toast.error("Gagal mengambil data Kalender.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({ semester: "Ganjil", year: "2023/2024", is_active: false });
    setFile(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !file) {
      toast.error("Judul dan File Kalender (PDF/Image) wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      await akademikService.createCalendarItem(formData as Omit<AcademicCalendarRecord, "id"|"file_url"|"created_at">, file);
      toast.success("Kalender Akademik berhasil diunggah.");
      setIsOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Gagal mengunggah kalender.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus file kalender ini?")) return;
    try {
      await akademikService.deleteCalendarItem(id);
      toast.success("Kalender dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  const handleSetActive = async (item: AcademicCalendarRecord) => {
    try {
      // Logic for changing active status (Simplified: setting others to false should be done in DB logic, but here we just toggle)
      await akademikService.updateCalendarItem(item.id, { is_active: !item.is_active });
      toast.success("Status kalender diperbarui.");
      fetchData();
    } catch {
      toast.error("Gagal mengubah status.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">Kalender Akademik</h1>
          <p className="text-sm text-slate-500 mt-1">Unggah dan kelola panduan waktu belajar mengajar tahunan.</p>
        </div>
        <Button onClick={handleOpenModal} className="shrink-0 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          Unggah Kalender
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Tahun Ajaran & Semester</TableHead>
                <TableHead>Nama Kalender</TableHead>
                <TableHead>Status Aktif</TableHead>
                <TableHead>File</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">Memuat data...</TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">Belum ada kalender yang diunggah.</TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-700">T.A {item.year}</div>
                      <div className="text-xs text-slate-500">Semester {item.semester}</div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-800">{item.title}</TableCell>
                    <TableCell>
                      <button 
                         onClick={() => handleSetActive(item)}
                         className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          item.is_active 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        {item.is_active ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                        {item.is_active ? "AKTIF" : "ARSIP"}
                      </button>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={item.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        <FileIcon className="w-4 h-4" />
                        Lihat Dokumen
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
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
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Unggah Kalender Akademik</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Kalender</Label>
              <Input id="title" required placeholder="Cth: Kalender Akademik 2024/2025" value={formData.title || ""} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Tahun Ajaran</Label>
                <Input id="year" required placeholder="Cth: 2024/2025" value={formData.year || ""} onChange={(e) => setFormData({...formData, year: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <select 
                  id="semester"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={formData.semester || "Ganjil"}
                  onChange={(e) => setFormData({...formData, semester: e.target.value as any})}
                >
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File Dokumen (PDF atau Gambar Kalender)</Label>
              <Input id="file" type="file" required accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <p className="text-[10px] text-muted-foreground">Format yang didukung: JPG, PNG, PDF. Maks 10MB.</p>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Mengunggah..." : "Simpan Dokumen"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useEffect, useState } from "react";
import { akademikService, ScheduleRecord } from "@/services/akademikService";
import { guruService, TeacherRecord } from "@/services/guruService";
import { Plus, Search, Edit, Trash2, CalendarClock, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function AdminJadwal() {
  const [data, setData] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [filterClass, setFilterClass] = useState("7A");
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form States
  const [formData, setFormData] = useState<Partial<ScheduleRecord>>({ 
    day_of_week: "Senin", 
    class_name: "7A",
    start_time: "07:00",
    end_time: "08:00"
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
    fetchTeachers();
  }, [filterClass]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const records = await akademikService.getSchedules(filterClass);
      setData(records);
    } catch (err) {
      toast.error("Gagal mengambil data Jadwal.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const records = await guruService.getTeachers();
      setTeachers(records);
    } catch {}
  };

  const handleOpenModal = (record?: any) => {
    if (record) {
      setEditingId(record.id);
      setFormData({
        ...record,
        // PostgreSQL time string might be HH:MM:SS, HTML input needs HH:MM
        start_time: record.start_time.substring(0, 5),
        end_time: record.end_time.substring(0, 5),
      });
    } else {
      setEditingId(null);
      setFormData({ 
        day_of_week: "Senin", 
        class_name: filterClass,
        start_time: "07:00",
        end_time: "08:00",
        subject: ""
      });
    }
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.class_name) {
      toast.error("Mata Pelajaran dan Kelas wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await akademikService.updateSchedule(editingId, formData);
        toast.success("Jadwal diperbarui.");
      } else {
        await akademikService.createSchedule(formData as Omit<ScheduleRecord, "id"|"created_at">);
        toast.success("Jadwal ditambahkan.");
      }
      setIsOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan jadwal.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus jadwal pelajaran ini?")) return;
    try {
      await akademikService.deleteSchedule(id);
      toast.success("Jadwal dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">Jadwal Pelajaran</h1>
          <p className="text-sm text-slate-500 mt-1">Atur kurikulum dan jam tatap muka untuk setiap kelas.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Jadwal
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="class-filter" className="text-sm font-medium text-slate-500">Pilih Kelas:</Label>
            <select 
              id="class-filter"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              {["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"].map(c => (
                <option key={c} value={c}>Kelas {c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Hari</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Guru Pengampu</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">Memuat jadwal...</TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                    <div className="flex flex-col items-center">
                      <CalendarClock className="w-8 h-8 opacity-20 mb-2" />
                      <p>Jadwal untuk kelas {filterClass} belum diatur.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold text-slate-700">{item.day_of_week}</TableCell>
                    <TableCell>
                      <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 italic">
                        {item.start_time.substring(0, 5)} - {item.end_time.substring(0, 5)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span className="font-medium text-slate-800">{item.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-600">
                        <User className="w-3.5 h-3.5" />
                        <span className="text-sm">{item.teachers?.name || "Belum ditentukan"}</span>
                      </div>
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
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Item Jadwal" : "Tambah Jadwal Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Hari</Label>
                <select 
                  id="day"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={formData.day_of_week || "Senin"}
                  onChange={(e) => setFormData({...formData, day_of_week: e.target.value})}
                >
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Kelas</Label>
                <select 
                  id="class"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={formData.class_name || "7A"}
                  onChange={(e) => setFormData({...formData, class_name: e.target.value})}
                >
                  {["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C"].map(c => (
                    <option key={c} value={c}>Kelas {c}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 text-primary">
                <Label htmlFor="start">Jam Mulai</Label>
                <Input id="start" type="time" required value={formData.start_time || ""} onChange={(e) => setFormData({...formData, start_time: e.target.value})} />
              </div>
              <div className="space-y-2 text-primary">
                <Label htmlFor="end">Jam Selesai</Label>
                <Input id="end" type="time" required value={formData.end_time || ""} onChange={(e) => setFormData({...formData, end_time: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subj">Mata Pelajaran</Label>
              <Input id="subj" required placeholder="Cth: Matematika, Bahasa Indo" value={formData.subject || ""} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher">Guru Pengampu</Label>
              <select 
                id="teacher"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={formData.teacher_id || ""}
                onChange={(e) => setFormData({...formData, teacher_id: e.target.value})}
              >
                <option value="">Pilih Guru (Opsional)</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan Jadwal"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

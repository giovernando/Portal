import { useEffect, useState } from "react";
import { beritaService, NewsRecord, generateSlug } from "@/services/beritaService";
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";

export default function AdminBerita() {
  const [data, setData] = useState<NewsRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form States
  const [formData, setFormData] = useState<Partial<NewsRecord>>({ 
    published_date: new Date().toISOString().split('T')[0],
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const records = await beritaService.getNews();
      setData(records);
    } catch (err) {
      toast.error("Gagal mengambil data Berita.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (record?: NewsRecord) => {
    if (record) {
      setEditingId(record.id);
      setFormData(record);
    } else {
      setEditingId(null);
      setFormData({ 
        published_date: new Date().toISOString().split('T')[0],
        title: "",
        content: "",
        excerpt: ""
      });
    }
    setFile(null);
    setIsOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title) // Auto-generate slug when title changes
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast.error("Judul dan Slug wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await beritaService.updateNews(editingId, formData, file || undefined);
        toast.success("Berita berhasil diperbarui.");
      } else {
        await beritaService.createNews(formData as Omit<NewsRecord, "id"|"created_at"|"updated_at">, file || undefined);
        toast.success("Berita berhasil ditambahkan.");
      }
      setIsOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan berita.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini secara permanen?")) return;
    try {
      await beritaService.deleteNews(id);
      toast.success("Berita berhasil dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus berita.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">Cetak Berita</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola artikel dan informasi kegiatan sekolah yang menarik.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tulis Berita Baru
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input 
              placeholder="Cari berdasarkan judul berita..." 
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
                <TableHead className="w-20">Thumbnail</TableHead>
                <TableHead>Informasi Publikasi</TableHead>
                <TableHead className="hidden md:table-cell">Cuplikan (Excerpt)</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-slate-500">Memuat artikel...</TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-slate-500">Tidak ada berita yang ditemukan.</TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.thumbnail_url ? (
                        <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-200">
                          <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-800 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>{format(new Date(item.published_date), 'dd MMM yyyy')}</span>
                        <span>•</span>
                        <span className="text-blue-500 truncate max-w-[200px]">/{item.slug}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-slate-500">
                      <div className="line-clamp-2">{item.excerpt || "-"}</div>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Berita" : "Tulis Berita Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 py-4">
            
            {/* Header Form Area */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Berita</Label>
                  <Input 
                    id="title" 
                    required 
                    placeholder="Masukkan judul artikel"
                    value={formData.title || ""} 
                    onChange={handleTitleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug (Otomatis)</Label>
                  <Input 
                    id="slug" 
                    required 
                    value={formData.slug || ""} 
                    onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal Publikasi</Label>
                  <Input 
                    id="date" 
                    type="date"
                    required 
                    value={formData.published_date || ""} 
                    onChange={(e) => setFormData({...formData, published_date: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Unggah Gambar Thumbnail</Label>
                  <Input 
                    id="thumbnail" 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  />
                  {formData.thumbnail_url && !file && (
                    <p className="text-xs text-emerald-600 mt-1">✓ Thumbnail sudah tersedia.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Teks Cuplikan Singkat (Excerpt)</Label>
              <Textarea 
                id="excerpt" 
                placeholder="Deskripsi singkat yang muncul di halaman utama sebelum artikel dibaca."
                rows={3}
                value={formData.excerpt || ""} 
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
              />
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2 border rounded-md p-1 shadow-sm">
              <Label className="px-2 pt-2 block mb-2">Konten Lengkap Berita</Label>
              <ReactQuill 
                theme="snow" 
                value={formData.content || ""} 
                onChange={(val) => setFormData({...formData, content: val})} 
                className="h-[300px] mb-12"
              />
            </div>
            
            <DialogFooter className="pt-6">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Memproses..." : "Terbitkan Berita"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

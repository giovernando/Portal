import { useEffect, useState } from "react";
import { galeriService, GalleryRecord } from "@/services/galeriService";
import { Plus, Search, Trash2, Image as ImageIcon, Briefcase, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminGaleri() {
  const [data, setData] = useState<GalleryRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryRecord>>({ title: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const records = await galeriService.getGallery();
      setData(records);
    } catch (err) {
      toast.error("Gagal mengambil data Galeri.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = () => {
    setFormData({ title: "", description: "" });
    setFile(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !file) {
      toast.error("Judul dan Foto wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      await galeriService.createGalleryItem(formData as Omit<GalleryRecord, "id"|"image_url"|"created_at">, file);
      toast.success("Foto berhasil ditambahkan ke galeri.");
      setIsOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Gagal mengunggah foto.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus foto ini dari galeri?")) return;
    try {
      await galeriService.deleteGalleryItem(id);
      toast.success("Foto dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus foto.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-800">Galeri Foto Sekolah</h1>
          <p className="text-sm text-slate-500 mt-1">Dokumentasi momen berharga dan fasilitas utama sekolah.</p>
        </div>
        <Button onClick={handleOpenModal} className="shrink-0 flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Tambah Foto
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative max-w-sm flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input 
              placeholder="Cari judul foto..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-lg" />
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center text-slate-400 border-2 border-dashed rounded-xl">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p>Belum ada foto yang diunggah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredData.map((img) => (
              <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border bg-slate-50">
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <button onClick={() => handleDelete(img.id)} className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold truncate">{img.title}</p>
                    <p className="text-white/60 text-[10px] line-clamp-1">{img.description || ""}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Unggah Foto Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul / Nama Foto</Label>
              <Input id="title" required placeholder="Cth: Lapangan Olahraga" value={formData.title || ""} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="desc">Deskripsi Singkat (Opsional)</Label>
              <Textarea id="desc" placeholder="Keterangan singkat mengenai foto ini..." value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Pilih File Foto</Label>
              <Input id="photo" type="file" required accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? "Mengunggah..." : "Simpan ke Galeri"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

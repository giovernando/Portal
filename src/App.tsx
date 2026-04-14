import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import Program from "./pages/Program";
import Fasilitas from "./pages/Fasilitas";
import Ekstrakurikuler from "./pages/Ekstrakurikuler";
import PPDB from "./pages/PPDB";
import Berita from "./pages/Berita";
import BeritaDetail from "./pages/BeritaDetail";
import Galeri from "./pages/Galeri";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";

// Sub-pages: Profil
import Sejarah from "./pages/tentang/Sejarah";
import VisiMisi from "./pages/tentang/VisiMisi";
import Struktur from "./pages/tentang/Struktur";
import KepalaSekolah from "./pages/tentang/KepalaSekolah";
import GuruStaff from "./pages/tentang/GuruStaff";
import ProfilDetail from "./pages/tentang/ProfilDetail";

// Sub-pages: Akademik
import Kurikulum from "./pages/program/Kurikulum";
import Jadwal from "./pages/program/Jadwal";
import Kalender from "./pages/program/Kalender";

// Sub-pages: Kesiswaan
import Prestasi from "./pages/kesiswaan/Prestasi";
import PrestasiDetail from "./pages/kesiswaan/PrestasiDetail";
import Osis from "./pages/kesiswaan/Osis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/tentang/sejarah" element={<Sejarah />} />
          <Route path="/tentang/visi-misi" element={<VisiMisi />} />
          <Route path="/tentang/struktur" element={<Struktur />} />
          <Route path="/tentang/kepala-sekolah" element={<KepalaSekolah />} />
          <Route path="/tentang/guru-staff" element={<GuruStaff />} />
          <Route path="/tentang/guru-staff/:id" element={<ProfilDetail />} />
          <Route path="/program" element={<Program />} />
          <Route path="/program/kurikulum" element={<Kurikulum />} />
          <Route path="/program/jadwal" element={<Jadwal />} />
          <Route path="/program/kalender" element={<Kalender />} />
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
          <Route path="/kesiswaan/prestasi" element={<Prestasi />} />
          <Route path="/kesiswaan/prestasi/:id" element={<PrestasiDetail />} />
          <Route path="/kesiswaan/osis" element={<Osis />} />
          <Route path="/ppdb" element={<PPDB />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:slug" element={<BeritaDetail />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

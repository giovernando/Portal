import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={schoolLogo} alt="Logo" className="w-10 h-10" />
              <span className="font-display font-bold text-lg">SEKOLAH NUSANTARA</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Membangun Masa Depan dengan Pendidikan Bermutu. Mencetak generasi cerdas, berakhlak mulia, dan siap menghadapi tantangan zaman.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Menu</h4>
            <div className="w-10 h-0.5 bg-accent rounded-full" />
            <nav className="flex flex-col gap-2 text-sm">
              {[
                { label: "Beranda", path: "/" },
                { label: "Tentang Kami", path: "/tentang" },
                { label: "Program Akademik", path: "/program" },
                { label: "Fasilitas", path: "/fasilitas" },
                { label: "PPDB Online", path: "/ppdb" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Kontak</h4>
            <div className="w-10 h-0.5 bg-accent rounded-full" />
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span className="opacity-80">Jl. Pendidikan No. 123, Jakarta Selatan, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <span className="opacity-80">085729319861</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                <span className="opacity-80">info@sekolahnusantara.sch.id</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Jam Operasional</h4>
            <div className="w-10 h-0.5 bg-accent rounded-full" />
            <div className="space-y-2 text-sm opacity-80">
              <p>Senin - Jumat: 07:00 - 15:00</p>
              <p>Sabtu: 07:00 - 12:00</p>
              <p>Minggu: Tutup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 text-center text-sm opacity-70">
          © {new Date().getFullYear()} Sekolah Nusantara. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
};

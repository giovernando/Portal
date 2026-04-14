import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import schoolLogo from "@/assets/school-logo.png";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  path: string;
  children?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Beranda", path: "/" },
  {
    label: "Profil",
    path: "/tentang",
    children: [
      { label: "Tentang Sekolah", path: "/tentang/sejarah" },
      { label: "Visi & Misi", path: "/tentang/visi-misi" },
      { label: "Struktur Organisasi", path: "/tentang/struktur" },
      { label: "Profil Kepala Sekolah", path: "/tentang/kepala-sekolah" },
      { label: "Guru & Staff", path: "/tentang/guru-staff" },
    ],
  },
  {
    label: "Akademik",
    path: "/program",
    children: [
      { label: "Kurikulum", path: "/program/kurikulum" },
      { label: "Jadwal Pelajaran", path: "/program/jadwal" },
      { label: "Kalender Akademik", path: "/program/kalender" },
    ],
  },
  {
    label: "Kesiswaan",
    path: "/kesiswaan",
    children: [
      { label: "Ekstrakurikuler", path: "/ekstrakurikuler" },
      { label: "Prestasi", path: "/kesiswaan/prestasi" },
      { label: "Organisasi Siswa", path: "/kesiswaan/osis" },
    ],
  },
  { label: "Berita", path: "/berita" },
  { label: "Galeri", path: "/galeri" },
  { label: "Kontak", path: "/kontak" },
];

function DesktopDropdown({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const enter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const leave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 pt-1 z-50"
          >
            <div className="bg-card rounded-lg shadow-lg border border-border py-2 min-w-[200px]">
              {item.children!.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDropdown({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium transition-colors",
          isActive ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary hover:text-primary"
        )}
      >
        {item.label}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-1 space-y-0.5">
              {item.children!.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary rounded-md hover:bg-secondary/60 transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActivePath = (item: NavItem) => {
    if (location.pathname === item.path) return true;
    return item.children?.some((c) => location.pathname === c.path) ?? false;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2">
        <div className="container flex items-center justify-center gap-6 flex-wrap">
          <a href="tel:085729319861" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone className="w-3 h-3" /> 085729319861
          </a>
          <a href="mailto:bantuanvelocity@gmail.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail className="w-3 h-3" /> bantuanvelocity@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-card"
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={schoolLogo} alt="Logo Sekolah" className="w-10 h-10 md:w-12 md:h-12" />
            <span className="font-display font-bold text-lg md:text-xl text-primary">
              SEKOLAH NUSANTARA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.path} item={item} isActive={isActivePath(item)} />
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors relative group",
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full transition-transform duration-200 origin-left",
                      location.pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              )
            )}
            {/* PPDB CTA Button */}
            <Link
              to="/ppdb"
              className={cn(
                "ml-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                "bg-accent text-accent-foreground hover:brightness-110 hover:shadow-md"
              )}
            >
              PPDB
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-card border-t border-border"
            >
              <div className="container py-4 flex flex-col gap-1">
                <Link
                  to="/"
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    location.pathname === "/"
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-primary"
                  )}
                >
                  Beranda
                </Link>

                {navItems.slice(1).map((item) =>
                  item.children ? (
                    <MobileDropdown key={item.path} item={item} isActive={isActivePath(item)} />
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                        location.pathname === item.path
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}

                <Link
                  to="/ppdb"
                  className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-center bg-accent text-accent-foreground"
                >
                  PPDB Online
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

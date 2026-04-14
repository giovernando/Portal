import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Images, 
  Award, 
  Activity, 
  CalendarDays, 
  CalendarClock,
  LogOut,
  Building2,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Guru & Staff", path: "/admin/guru-staff" },
  { icon: Newspaper, label: "Berita", path: "/admin/berita" },
  { icon: Images, label: "Galeri", path: "/admin/galeri" },
  { icon: Award, label: "Prestasi", path: "/admin/prestasi" },
  { icon: Activity, label: "Ekstrakurikuler", path: "/admin/ekskul" },
  { icon: CalendarClock, label: "Jadwal Pelajaran", path: "/admin/jadwal" },
  { icon: CalendarDays, label: "Kalender Akademik", path: "/admin/kalender" },
];

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

const SidebarContent = ({ pathname }: { pathname: string }) => {
  const { signOut } = useAuth();
  
  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-accent text-accent-foreground flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
        <span className="font-display font-bold text-lg text-white">Admin Panel</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu Utama</div>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-slate-400 hover:bg-slate-900 hover:text-white transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen sticky top-0 z-20">
        <SidebarContent pathname={location.pathname} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b bg-white flex items-center px-4 sticky top-0 z-20">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 border-r-0">
              <SidebarContent pathname={location.pathname} />
            </SheetContent>
          </Sheet>
          <div className="ml-4 font-display font-bold text-slate-800">Admin Portal</div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Building2, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to dashboard
  if (!authLoading && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Mohon isi email dan password.");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Gagal masuk. Periksa kembali kredensial Anda.");
    } else {
      toast.success("Berhasil masuk.");
      navigate("/admin/dashboard");
    }
  };

  if (authLoading) return null; // or a spinner

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Informational Panel */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-2xl">Administrator</span>
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">
          Sistem Informasi Manajemen Sekolah
        </h1>
        <p className="text-primary-foreground/80 leading-relaxed max-w-md">
          Kelola data staf dan guru, berita sekolah, prestasi kesiswaan, hingga jadwal pelajaran dalam satu platform terpusat yang aman dan intuitif.
        </p>
      </div>

      {/* Login Form Panel */}
      <div className="flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-display font-bold text-foreground">Masuk Admin</h2>
            <p className="text-muted-foreground text-sm">
              Gunakan kredensial yang telah didaftarkan.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Admin</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@sekolah.sch.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Kata Sandi</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk ke Dashboard"
              )}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground pt-4">
            kembali ke <a href="/" className="text-primary hover:underline font-medium">Situs Publik</a>
          </div>
        </div>
      </div>
    </div>
  );
}

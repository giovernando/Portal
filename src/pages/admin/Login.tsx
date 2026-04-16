import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { AnimatedLoginPage } from "@/components/ui/animated-characters-login-page";

export default function AdminLogin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Already authenticated → go straight to dashboard
  if (!authLoading && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (authLoading) return null;

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setErrorMessage("Mohon isi email dan password.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || "Gagal masuk. Periksa kembali kredensial Anda.");
      toast.error(error.message || "Gagal masuk.");
    } else {
      toast.success("Berhasil masuk.");
      navigate("/admin/dashboard");
    }
  };

  return (
    <AnimatedLoginPage
      onSubmit={handleLogin}
      isLoading={isLoading}
      errorMessage={errorMessage}
      brandName="Administrator"
      brandSubtitle="Sistem Informasi Manajemen Sekolah"
      footerLinks={[]}
    />
  );
}

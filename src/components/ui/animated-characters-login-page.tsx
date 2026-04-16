"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

// ─── Pupil ──────────────────────────────────────────────────────────────────

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }
    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;
    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

// ─── EyeBall ─────────────────────────────────────────────────────────────────

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }
    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

// ─── AnimatedCharacters ───────────────────────────────────────────────────────

interface AnimatedCharactersProps {
  isTyping: boolean;
  password: string;
  showPassword: boolean;
}

const AnimatedCharacters = ({
  isTyping,
  password,
  showPassword,
}: AnimatedCharactersProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking – purple
  useEffect(() => {
    const scheduleBlink = () => {
      const t = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  // Blinking – black
  useEffect(() => {
    const scheduleBlink = () => {
      const t = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  // Look at each other when typing starts
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const t = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(t);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  // Purple peek when password is visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const t = setTimeout(() => {
          setIsPurplePeeking(true);
          setTimeout(() => setIsPurplePeeking(false), 800);
        }, Math.random() * 3000 + 2000);
        return t;
      };
      const t = schedulePeek();
      return () => clearTimeout(t);
    } else {
      setIsPurplePeeking(false);
    }
  }, [password, showPassword, isPurplePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));
    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const hidingPassword = password.length > 0 && !showPassword;
  const showingPassword = password.length > 0 && showPassword;

  return (
    <div className="relative" style={{ width: "550px", height: "400px" }}>
      {/* Purple – back layer */}
      <div
        ref={purpleRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "70px",
          width: "180px",
          height: isTyping || hidingPassword ? "440px" : "400px",
          backgroundColor: "#6C3FF5",
          borderRadius: "10px 10px 0 0",
          zIndex: 1,
          transform: showingPassword
            ? "skewX(0deg)"
            : isTyping || hidingPassword
            ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
            : `skewX(${purplePos.bodySkew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-8 transition-all duration-700 ease-in-out"
          style={{
            left: showingPassword
              ? "20px"
              : isLookingAtEachOther
              ? "55px"
              : `${45 + purplePos.faceX}px`,
            top: showingPassword
              ? "35px"
              : isLookingAtEachOther
              ? "65px"
              : `${40 + purplePos.faceY}px`,
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={18}
              pupilSize={7}
              maxDistance={5}
              eyeColor="white"
              pupilColor="#2D2D2D"
              isBlinking={isPurpleBlinking}
              forceLookX={
                showingPassword
                  ? isPurplePeeking
                    ? 4
                    : -4
                  : isLookingAtEachOther
                  ? 3
                  : undefined
              }
              forceLookY={
                showingPassword
                  ? isPurplePeeking
                    ? 5
                    : -4
                  : isLookingAtEachOther
                  ? 4
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Black – middle layer */}
      <div
        ref={blackRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "240px",
          width: "120px",
          height: "310px",
          backgroundColor: "#2D2D2D",
          borderRadius: "8px 8px 0 0",
          zIndex: 2,
          transform: showingPassword
            ? "skewX(0deg)"
            : isLookingAtEachOther
            ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
            : isTyping || hidingPassword
            ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
            : `skewX(${blackPos.bodySkew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-700 ease-in-out"
          style={{
            left: showingPassword
              ? "10px"
              : isLookingAtEachOther
              ? "32px"
              : `${26 + blackPos.faceX}px`,
            top: showingPassword
              ? "28px"
              : isLookingAtEachOther
              ? "12px"
              : `${32 + blackPos.faceY}px`,
          }}
        >
          {[0, 1].map((i) => (
            <EyeBall
              key={i}
              size={16}
              pupilSize={6}
              maxDistance={4}
              eyeColor="white"
              pupilColor="#2D2D2D"
              isBlinking={isBlackBlinking}
              forceLookX={
                showingPassword ? -4 : isLookingAtEachOther ? 0 : undefined
              }
              forceLookY={
                showingPassword ? -4 : isLookingAtEachOther ? -4 : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Orange – front left */}
      <div
        ref={orangeRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "0px",
          width: "240px",
          height: "200px",
          zIndex: 3,
          backgroundColor: "#FF9B6B",
          borderRadius: "120px 120px 0 0",
          transform: showingPassword
            ? "skewX(0deg)"
            : `skewX(${orangePos.bodySkew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-8 transition-all duration-200 ease-out"
          style={{
            left: showingPassword ? "50px" : `${82 + (orangePos.faceX || 0)}px`,
            top: showingPassword ? "85px" : `${90 + (orangePos.faceY || 0)}px`,
          }}
        >
          {[0, 1].map((i) => (
            <Pupil
              key={i}
              size={12}
              maxDistance={5}
              pupilColor="#2D2D2D"
              forceLookX={showingPassword ? -5 : undefined}
              forceLookY={showingPassword ? -4 : undefined}
            />
          ))}
        </div>
      </div>

      {/* Yellow – front right */}
      <div
        ref={yellowRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "310px",
          width: "140px",
          height: "230px",
          backgroundColor: "#E8D754",
          borderRadius: "70px 70px 0 0",
          zIndex: 4,
          transform: showingPassword
            ? "skewX(0deg)"
            : `skewX(${yellowPos.bodySkew || 0}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-200 ease-out"
          style={{
            left: showingPassword ? "20px" : `${52 + (yellowPos.faceX || 0)}px`,
            top: showingPassword ? "35px" : `${40 + (yellowPos.faceY || 0)}px`,
          }}
        >
          {[0, 1].map((i) => (
            <Pupil
              key={i}
              size={12}
              maxDistance={5}
              pupilColor="#2D2D2D"
              forceLookX={showingPassword ? -5 : undefined}
              forceLookY={showingPassword ? -4 : undefined}
            />
          ))}
        </div>
        {/* Mouth */}
        <div
          className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
          style={{
            left: showingPassword ? "10px" : `${40 + (yellowPos.faceX || 0)}px`,
            top: showingPassword ? "88px" : `${88 + (yellowPos.faceY || 0)}px`,
          }}
        />
      </div>
    </div>
  );
};

// ─── Props for the login page component ──────────────────────────────────────

export interface AnimatedLoginPageProps {
  /** Called on form submit with email + password */
  onSubmit: (email: string, password: string) => Promise<void>;
  /** Optional error message to display below the form */
  errorMessage?: string;
  /** Whether the submit is in progress */
  isLoading?: boolean;
  /** Brand / school name shown in the left panel */
  brandName?: string;
  /** Subtitle shown under the brand icon */
  brandSubtitle?: string;
  /** Footer links rendered at the bottom-left of the left panel */
  footerLinks?: { label: string; href: string }[];
}

// ─── Main component ───────────────────────────────────────────────────────────

function AnimatedLoginPage({
  onSubmit,
  errorMessage,
  isLoading = false,
  brandName = "Administrator",
  brandSubtitle = "Sistem Informasi Manajemen Sekolah",
  footerLinks = [
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat Layanan", href: "#" },
    { label: "Kontak", href: "#" },
  ],
}: AnimatedLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left panel ── */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground overflow-hidden">
        {/* Brand header */}
        <div className="relative z-20">
          <div className="flex items-center gap-3">
            <img
              src="/logo-sekolah.png"
              alt="Logo Sekolah"
              className="w-12 h-12 object-contain drop-shadow-lg"
            />
            <div>
              <p className="font-bold text-lg leading-tight">{brandName}</p>
              <p className="text-primary-foreground/70 text-xs">{brandSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Characters scene */}
        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <AnimatedCharacters
            isTyping={isTyping}
            password={password}
            showPassword={showPassword}
          />
        </div>

        {/* Footer links */}
        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Decorative blobs */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* ── Right panel ── */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <img
              src="/logo-sekolah.png"
              alt="Logo Sekolah"
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-lg">{brandName}</span>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Selamat datang!
            </h1>
            <p className="text-muted-foreground text-sm">
              Gunakan kredensial yang telah didaftarkan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Admin
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@sekolah.sch.id"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                disabled={isLoading}
                required
                className="h-12 bg-background border-border/60 focus:border-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Kata Sandi
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="h-12 pr-10 bg-background border-border/60 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Ingat saya selama 30 hari
              </Label>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
            </Button>
          </form>

          {/* Back link */}
          <div className="text-center text-sm text-muted-foreground mt-8">
            Kembali ke{" "}
            <a href="/" className="text-foreground font-medium hover:underline">
              Situs Publik
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedLoginPage };

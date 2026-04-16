import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <section className="relative text-primary-foreground overflow-hidden" style={{ minHeight: "260px" }}>

      {/* ── Layer 0: Base deep-forest gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, hsl(152 80% 12%) 0%, hsl(152 72% 18%) 40%, hsl(145 65% 22%) 70%, hsl(140 60% 14%) 100%)",
        }}
      />

      {/* ── Layer 1: Low-poly geometric SVG mesh ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 320"
        aria-hidden="true"
      >
        {/* Dark polygons — forest green */}
        <polygon points="0,0 280,0 120,180" fill="hsl(152 80% 10% / 0.60)" />
        <polygon points="280,0 520,0 400,200 200,140" fill="hsl(152 72% 16% / 0.50)" />
        <polygon points="520,0 800,0 680,220 380,180" fill="hsl(145 68% 20% / 0.45)" />
        <polygon points="800,0 1060,0 920,200 660,210" fill="hsl(152 65% 14% / 0.55)" />
        <polygon points="1060,0 1280,0 1180,180 900,190" fill="hsl(148 72% 18% / 0.48)" />
        <polygon points="1280,0 1440,0 1440,200 1160,170" fill="hsl(152 80% 12% / 0.60)" />
        {/* Lighter emerald accent polygons */}
        <polygon points="0,180 120,180 80,320 0,320" fill="hsl(150 60% 24% / 0.40)" />
        <polygon points="120,180 400,200 340,320 60,320" fill="hsl(145 55% 26% / 0.35)" />
        <polygon points="400,200 680,220 640,320 320,320" fill="hsl(148 62% 22% / 0.42)" />
        <polygon points="680,220 920,200 900,320 640,320" fill="hsl(152 58% 28% / 0.38)" />
        <polygon points="920,200 1180,180 1160,320 880,320" fill="hsl(145 60% 24% / 0.40)" />
        <polygon points="1180,180 1440,200 1440,320 1140,320" fill="hsl(152 72% 16% / 0.50)" />
        {/* Highlight shimmer slashes */}
        <polygon points="200,0 320,0 260,320 140,320" fill="hsl(145 50% 35% / 0.08)" />
        <polygon points="740,0 820,0 800,320 720,320" fill="hsl(150 45% 40% / 0.07)" />
        <polygon points="1200,0 1280,0 1260,320 1180,320" fill="hsl(145 50% 35% / 0.08)" />
      </svg>

      {/* ── Layer 2: Gold radial glow spots ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 80% at 15% 50%, hsl(43 96% 56% / 0.07) 0%, transparent 70%), radial-gradient(ellipse 45% 70% at 85% 50%, hsl(43 90% 50% / 0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Watermark logo ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/logo-sekolah.png"
          alt=""
          className="w-80 h-80 md:w-96 md:h-96 object-contain select-none"
          style={{
            opacity: 0.07,
            filter: "grayscale(100%) brightness(3) contrast(1.2)",
            mixBlendMode: "luminosity",
          }}
        />
      </div>

      {/* ── Layer 4: Batik micro-pattern (SVG pattern) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="batik" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            {/* Kawung-inspired motif */}
            <circle cx="20" cy="20" r="7" fill="none" stroke="hsl(43 96% 70%)" strokeWidth="0.5" opacity="0.35" />
            <circle cx="20" cy="20" r="3.5" fill="none" stroke="hsl(43 96% 70%)" strokeWidth="0.4" opacity="0.25" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="hsl(43 96% 70%)" strokeWidth="0.3" opacity="0.15" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="hsl(43 96% 70%)" strokeWidth="0.3" opacity="0.15" />
            <circle cx="0"  cy="0"  r="3" fill="none" stroke="hsl(43 96% 70%)" strokeWidth="0.4" opacity="0.20" />
            <circle cx="40" cy="0"  r="3" fill="none" stroke="hsl(43 96% 70%)" strokeWidth="0.4" opacity="0.20" />
            <circle cx="0"  cy="40" r="3" fill="none" stroke="hsl(43 96% 70%)" strokeWidth="0.4" opacity="0.20" />
            <circle cx="40" cy="40" r="3" fill="none" stroke="hsl(43 96% 70%)" strokeWidth="0.4" opacity="0.20" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik)" />
      </svg>

      {/* ── Layer 5: Subtle vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, hsl(152 80% 8% / 0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Central content ── */}
      <div className="container relative text-center py-20 md:py-28 space-y-4 z-10">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight"
          style={{
            textShadow: "0 2px 20px hsl(152 80% 8% / 0.6), 0 1px 4px hsl(152 80% 8% / 0.8)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-base md:text-lg max-w-2xl mx-auto font-body font-light"
            style={{
              opacity: 0.85,
              textShadow: "0 1px 8px hsl(152 80% 8% / 0.7)",
              letterSpacing: "0.02em",
            }}
          >
            {subtitle}
          </p>
        )}
        {/* Gold accent bar */}
        <div
          className="mx-auto rounded-full"
          style={{
            width: "80px",
            height: "3px",
            background: "linear-gradient(90deg, hsl(43 96% 45%), hsl(43 96% 65%), hsl(43 96% 45%))",
            boxShadow: "0 0 12px hsl(43 96% 56% / 0.6)",
          }}
        />
      </div>

      {/* ── Layer 6: Rolling wave bottom edge ── */}
      <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none z-10" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "54px" }}
        >
          {/* Off-white/light-gold inner wave */}
          <path
            d="M0,32 C180,54 360,10 540,32 C720,54 900,10 1080,32 C1260,54 1380,18 1440,28 L1440,54 L0,54 Z"
            fill="hsl(43 40% 96%)"
            opacity="0.18"
          />
          {/* Crisp wave */}
          <path
            d="M0,38 C200,58 400,16 600,38 C800,58 1000,16 1200,38 C1320,50 1400,30 1440,36 L1440,54 L0,54 Z"
            fill="hsl(120 20% 98%)"
          />
        </svg>
      </div>
    </section>
  );
};

import { Megaphone } from "lucide-react";

export const RunningText = () => {
  return (
    <div className="bg-primary text-white py-3 border-y-4 border-accent relative overflow-hidden flex items-center">
      <div className="container absolute left-0 z-10 w-auto bg-primary py-3 hidden md:flex items-center gap-2 border-r-[20px] border-transparent" style={{ borderRightColor: "hsl(var(--primary))" }}>
      </div>

      <div className="flex w-full whitespace-nowrap animate-marquee hover:[animation-play-state:paused] md:pl-48">
        {/* We duplicate the text multiple times to ensure seamless infinite scroll */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-8 px-4">
            <span className="text-sm md:text-base font-medium">
              Selamat Datang Di <span className="text-accent font-bold tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>SMA PGRI 4 PALEMBANG</span> Sekolah Model
            </span>
            <span className="w-2 h-2 rounded-full bg-accent/50 hidden md:block"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

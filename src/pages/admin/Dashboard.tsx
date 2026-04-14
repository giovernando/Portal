import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Newspaper, Award, Images } from "lucide-react";

interface Stats {
  teachersCount: number;
  newsCount: number;
  achievementsCount: number;
  galleryCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    teachersCount: 0,
    newsCount: 0,
    achievementsCount: 0,
    galleryCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // NOTE: For a real production app with massive tables, use count options.
      const [tRes, nRes, aRes, gRes] = await Promise.all([
        supabase.from("teachers").select("*", { count: "exact", head: true }),
        supabase.from("news").select("*", { count: "exact", head: true }),
        supabase.from("achievements").select("*", { count: "exact", head: true }),
        supabase.from("gallery").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        teachersCount: tRes.count || 0,
        newsCount: nRes.count || 0,
        achievementsCount: aRes.count || 0,
        galleryCount: gRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Guru & Staff", value: stats.teachersCount, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Berita", value: stats.newsCount, icon: Newspaper, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Total Prestasi", value: stats.achievementsCount, icon: Award, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Album Galeri", value: stats.galleryCount, icon: Images, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  if (loading) {
    return <div className="animate-pulse flex items-center justify-center p-20 text-slate-400">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-800">Overview Dashboard</h1>
        <p className="text-slate-500 mt-1">Selamat datang kembali! Berikut ringkasan data di sistem Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
              <c.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{c.title}</p>
              <h3 className="text-3xl font-display font-bold text-slate-800">{c.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
        <h2 className="text-xl font-display font-bold text-slate-800 mb-4">Aktivitas Terbaru</h2>
        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
          <ActivityIcon className="w-16 h-16 text-slate-200 mb-4" />
          <p>Belum ada aktivitas terekam hari ini.</p>
        </div>
      </div>
    </div>
  );
}

function ActivityIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

import guruMale1 from "@/assets/portraits/guru-male-1.jpg";
import guruMale2 from "@/assets/portraits/guru-male-2.jpg";
import guruMale3 from "@/assets/portraits/guru-male-3.jpg";
import guruMale4 from "@/assets/portraits/guru-male-4.jpg";
import guruFemale1 from "@/assets/portraits/guru-female-1.jpg";
import guruFemale2 from "@/assets/portraits/guru-female-2.jpg";
import guruFemale3 from "@/assets/portraits/guru-female-3.jpg";
import staffFemale1 from "@/assets/portraits/staff-female-1.jpg";
import staffMale1 from "@/assets/portraits/staff-male-1.jpg";
import staffFemale2 from "@/assets/portraits/staff-female-2.jpg";
import staffMale2 from "@/assets/portraits/staff-male-2.jpg";
import staffMale3 from "@/assets/portraits/staff-male-3.jpg";

export interface Person {
  id: string;
  name: string;
  role: string;
  type: "guru" | "staff";
  pendidikan?: string;
  photo: string;
  nip?: string;
  email?: string;
  bio?: string;
  mataPelajaran?: string;
  pengalaman?: string[];
}

export const guruData: Person[] = [
  {
    id: "reza-kendrawan",
    name: "Reza Kendrawan, S.Pd",
    role: "Kepala Sekolah",
    type: "guru",
    pendidikan: "S2 Manajemen Pendidikan",
    photo: guruMale1,
    nip: "198501152010011001",
    email: "reza.kendrawan@sekolahnusantara.sch.id",
    bio: "Berpengalaman lebih dari 15 tahun di dunia pendidikan. Memiliki visi untuk menjadikan Sekolah Nusantara sebagai lembaga pendidikan unggulan yang menghasilkan generasi berkarakter dan berdaya saing global.",
    pengalaman: [
      "Kepala Sekolah Nusantara (2020 - Sekarang)",
      "Wakil Kepala Sekolah Bidang Kurikulum (2015 - 2020)",
      "Guru Matematika SMP Negeri 5 Jakarta (2010 - 2015)",
    ],
  },
  {
    id: "linggadi-shudqiyanto",
    name: "Linggadi Shudqiyanto, S.Pd",
    role: "Wakil Kepala Sekolah",
    type: "guru",
    pendidikan: "S1 Pendidikan Fisika",
    photo: guruMale2,
    nip: "198703202011011002",
    email: "linggadi@sekolahnusantara.sch.id",
    bio: "Dedikasi tinggi dalam pengembangan kurikulum dan pembinaan siswa. Aktif dalam berbagai pelatihan pendidikan tingkat nasional.",
    mataPelajaran: "Fisika",
    pengalaman: [
      "Wakil Kepala Sekolah (2021 - Sekarang)",
      "Koordinator Bidang Akademik (2016 - 2021)",
      "Guru Fisika SMA Nusantara (2011 - 2016)",
    ],
  },
  {
    id: "ayuk-rosayanti",
    name: "Ayuk Rosayanti, S.Pd",
    role: "Guru Matematika",
    type: "guru",
    pendidikan: "S1 Pendidikan Matematika",
    photo: guruFemale1,
    nip: "199005102013022003",
    email: "ayuk.rosa@sekolahnusantara.sch.id",
    bio: "Guru matematika yang kreatif dan inovatif dalam metode pengajaran. Berhasil membimbing siswa meraih juara olimpiade matematika tingkat kota.",
    mataPelajaran: "Matematika",
    pengalaman: [
      "Guru Matematika Sekolah Nusantara (2013 - Sekarang)",
      "Pembina Olimpiade Matematika (2015 - Sekarang)",
    ],
  },
  {
    id: "niken-ernawati",
    name: "Niken Ernawati, S.Pd",
    role: "Guru Bahasa Inggris",
    type: "guru",
    pendidikan: "S1 Pendidikan Bahasa Inggris",
    photo: guruFemale2,
    nip: "198812252012022004",
    email: "niken.erna@sekolahnusantara.sch.id",
    bio: "Menguasai berbagai metode pengajaran bahasa Inggris modern. Aktif mengembangkan program English Club dan debat bahasa Inggris.",
    mataPelajaran: "Bahasa Inggris",
    pengalaman: [
      "Guru Bahasa Inggris Sekolah Nusantara (2012 - Sekarang)",
      "Koordinator English Club (2014 - Sekarang)",
    ],
  },
  {
    id: "bima-sofyanto",
    name: "Bima Sofyanto, S.Pd",
    role: "Guru Penjaskes",
    type: "guru",
    pendidikan: "S1 Pendidikan Olahraga",
    photo: guruMale3,
    nip: "199108152014011005",
    email: "bima.sofyan@sekolahnusantara.sch.id",
    bio: "Mantan atlet nasional yang kini mendedikasikan diri di dunia pendidikan. Membimbing siswa dalam berbagai cabang olahraga.",
    mataPelajaran: "Pendidikan Jasmani & Kesehatan",
    pengalaman: [
      "Guru Penjaskes Sekolah Nusantara (2014 - Sekarang)",
      "Pelatih Tim Futsal Sekolah (2015 - Sekarang)",
      "Atlet Nasional Cabang Atletik (2009 - 2013)",
    ],
  },
  {
    id: "fajar-agustian",
    name: "Fajar Agustian, S.Pd",
    role: "Guru Bahasa Mandarin",
    type: "guru",
    pendidikan: "S1 Sastra Mandarin",
    photo: guruMale4,
    nip: "199204182015011006",
    email: "fajar.agus@sekolahnusantara.sch.id",
    bio: "Lulusan program pertukaran pelajar di Beijing. Berpengalaman mengajar bahasa Mandarin dengan pendekatan budaya interaktif.",
    mataPelajaran: "Bahasa Mandarin",
    pengalaman: [
      "Guru Bahasa Mandarin Sekolah Nusantara (2015 - Sekarang)",
      "Program Pertukaran di Beijing Normal University (2013 - 2014)",
    ],
  },
  {
    id: "dewi-lestari",
    name: "Dewi Lestari, S.Pd",
    role: "Guru IPA",
    type: "guru",
    pendidikan: "S1 Pendidikan Biologi",
    photo: guruFemale3,
    nip: "198906302013022007",
    email: "dewi.lestari@sekolahnusantara.sch.id",
    bio: "Guru IPA yang passionate dalam penelitian sains. Membimbing siswa dalam berbagai proyek sains dan kompetisi tingkat nasional.",
    mataPelajaran: "Ilmu Pengetahuan Alam",
    pengalaman: [
      "Guru IPA Sekolah Nusantara (2013 - Sekarang)",
      "Pembina KIR (Karya Ilmiah Remaja) (2016 - Sekarang)",
    ],
  },
  {
    id: "andi-pratama",
    name: "Andi Pratama, S.Pd",
    role: "Guru IPS",
    type: "guru",
    pendidikan: "S1 Pendidikan Sejarah",
    photo: guruMale2,
    nip: "199007152014011008",
    email: "andi.pratama@sekolahnusantara.sch.id",
    bio: "Mengajarkan IPS dengan pendekatan kontekstual yang menghubungkan materi dengan kehidupan sehari-hari siswa.",
    mataPelajaran: "Ilmu Pengetahuan Sosial",
    pengalaman: [
      "Guru IPS Sekolah Nusantara (2014 - Sekarang)",
      "Koordinator Study Tour (2017 - Sekarang)",
    ],
  },
  {
    id: "ratna-sari",
    name: "Ratna Sari, S.Pd",
    role: "Guru Bahasa Indonesia",
    type: "guru",
    pendidikan: "S1 Pendidikan Bahasa",
    photo: guruFemale1,
    nip: "198811202012022009",
    email: "ratna.sari@sekolahnusantara.sch.id",
    bio: "Guru bahasa Indonesia yang aktif membina kegiatan literasi sekolah dan lomba debat. Penulis buku panduan kebahasaan untuk siswa SMP.",
    mataPelajaran: "Bahasa Indonesia",
    pengalaman: [
      "Guru Bahasa Indonesia Sekolah Nusantara (2012 - Sekarang)",
      "Pembina Majalah Sekolah (2014 - Sekarang)",
    ],
  },
  {
    id: "hendra-wijaya",
    name: "Hendra Wijaya, S.Kom",
    role: "Guru TIK",
    type: "guru",
    pendidikan: "S1 Teknik Informatika",
    photo: guruMale4,
    nip: "199203252015011010",
    email: "hendra.wijaya@sekolahnusantara.sch.id",
    bio: "Ahli di bidang teknologi informasi dan pemrograman. Mengembangkan kurikulum digital literasi dan membimbing siswa dalam kompetisi IT.",
    mataPelajaran: "Teknologi Informasi & Komunikasi",
    pengalaman: [
      "Guru TIK Sekolah Nusantara (2015 - Sekarang)",
      "Koordinator Lab Komputer (2016 - Sekarang)",
      "Software Developer di PT Teknologi (2012 - 2015)",
    ],
  },
];

export const staffData: Person[] = [
  {
    id: "siti-nurhaliza",
    name: "Siti Nurhaliza, S.E",
    role: "Kepala Tata Usaha",
    type: "staff",
    pendidikan: "S1 Manajemen",
    photo: staffFemale1,
    nip: "198707102010012001",
    email: "siti.nurhaliza@sekolahnusantara.sch.id",
    bio: "Mengelola administrasi sekolah dengan profesional dan efisien. Bertanggung jawab atas seluruh operasional tata usaha sekolah.",
    pengalaman: [
      "Kepala Tata Usaha Sekolah Nusantara (2018 - Sekarang)",
      "Staff Administrasi Sekolah Nusantara (2010 - 2018)",
    ],
  },
  {
    id: "rahmat-hidayat",
    name: "Rahmat Hidayat",
    role: "Staff Administrasi",
    type: "staff",
    photo: staffMale1,
    bio: "Mendukung kelancaran proses administrasi siswa dan surat-menyurat sekolah dengan teliti dan tepat waktu.",
    pengalaman: [
      "Staff Administrasi Sekolah Nusantara (2015 - Sekarang)",
    ],
  },
  {
    id: "ani-suryani",
    name: "Ani Suryani",
    role: "Staff Keuangan",
    type: "staff",
    photo: staffFemale2,
    bio: "Mengelola keuangan sekolah secara transparan dan akuntabel. Memastikan pengelolaan dana BOS dan SPP berjalan dengan baik.",
    pengalaman: [
      "Staff Keuangan Sekolah Nusantara (2016 - Sekarang)",
    ],
  },
  {
    id: "bambang-setiawan",
    name: "Bambang Setiawan",
    role: "Petugas Perpustakaan",
    type: "staff",
    photo: staffMale2,
    bio: "Mengelola perpustakaan sekolah dan mendorong budaya literasi di kalangan siswa melalui berbagai program membaca.",
    pengalaman: [
      "Petugas Perpustakaan Sekolah Nusantara (2014 - Sekarang)",
    ],
  },
  {
    id: "supardi",
    name: "Supardi",
    role: "Petugas Keamanan",
    type: "staff",
    photo: staffMale3,
    bio: "Menjaga keamanan dan ketertiban lingkungan sekolah. Memastikan seluruh area sekolah aman dan kondusif untuk belajar.",
    pengalaman: [
      "Petugas Keamanan Sekolah Nusantara (2012 - Sekarang)",
    ],
  },
];

export const allPeople = [...guruData, ...staffData];

export const getPersonById = (id: string): Person | undefined =>
  allPeople.find((p) => p.id === id);

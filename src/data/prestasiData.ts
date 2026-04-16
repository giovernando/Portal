import mathImg from "@/assets/classroom.jpg";
import roboImg from "@/assets/ekskul-robotik.jpg";
import badmintonImg from "@/assets/ekskul-badminton.jpg";
import englishImg from "@/assets/library.jpg";
import tariImg from "@/assets/ekskul-tari.jpg";
import writeImg from "@/assets/students.jpg";
import silatImg from "@/assets/sports.jpg";
import adiwiyataImg from "@/assets/hero-school.jpg";
import choirImg from "@/assets/ekskul-musik.jpg";
import scienceImg from "@/assets/lab.jpg";

export interface PrestasiItem {
  id: string;
  judul: string;
  tahun: string;
  tingkat: string;
  siswa: string;
  kategori: "akademik" | "olahraga" | "seni" | "lainnya";
  imgSrc: string;
  deskripsi: string[];
}

export const prestasiData: PrestasiItem[] = [
  {
    id: "juara-1-olimpiade-matematika",
    judul: "Juara 1 Olimpiade Matematika",
    tahun: "2024",
    tingkat: "Nasional",
    siswa: "Ahmad Fauzan",
    kategori: "akademik",
    imgSrc: mathImg,
    deskripsi: [
      "Ahmad Fauzan kembali mengharumkan nama SMA PGRI 4 Palembang dengan meraih medali emas pada Olimpiade Matematika tingkat Nasional tahun 2024. Kompetisi yang diikuti oleh ribuan siswa dari seluruh penjuru Indonesia ini sangat ketat dengan bobot soal bertaraf internasional.",
      "Kemenangan ini bukanlah yang pertama, sebelumnya Fauzan juga telah menjuarai tingkat provinsi selama 2 tahun berturut-turut. Dengan pendampingan dari tim pengajar matematika sekolah, ia berhasil memecahkan soal High Order Thinking Skills (HOTS) dengan kecepatan dan akurasi tinggi.",
      "Ahmad Fauzan saat ini sedang mempersiapkan dirinya menuju kompetisi sains internasional. Pihak sekolah berkomitmen penuh untuk mendukung seluruh langkah persiapannya."
    ]
  },
  {
    id: "juara-2-lomba-robotik",
    judul: "Juara 2 Lomba Robotik",
    tahun: "2024",
    tingkat: "Provinsi",
    siswa: "Tim Robotik",
    kategori: "akademik",
    imgSrc: roboImg,
    deskripsi: [
      "Tim ekstrakurikuler Robotik SMA PGRI 4 Palembang menyandang gelar Juara 2 di kompetisi inovasi robot tingkat provinsi Jawa Tengah. Mereka berhasil membuat prototipe robot pengantar obat otonom yang dapat menavigasi lorong-lorong sempit menggunakan sensor ultrasonik.",
      "Lomba ini menuntut kreativitas dalam pembuatan rancang bangun fisik mekanik serta penulisan program otomatisasi dari nol menggunakan Arduino. Juri memberikan nilai tinggi pada presentasi produk yang dinilai inovatif dan aplikatif untuk dunia medis.",
      "Sekolah akan segera membantu paten rancangan mereka dan mengirimkan temuan ini untuk kompetisi di jenjang Nasional akhir tahun nanti."
    ]
  },
  {
    id: "juara-1-badminton-tunggal-putra",
    judul: "Juara 1 Badminton Tunggal Putra",
    tahun: "2024",
    tingkat: "Kabupaten",
    siswa: "Dimas Arya",
    kategori: "olahraga",
    imgSrc: badmintonImg,
    deskripsi: [
      "Pada ajang Pekan Olahraga Pelajar Daerah (POPDA) tingkat Kabupaten yang diadakan Maret lalu, Dimas Arya tampil gemilang. Ia sukses menjuarai nomor Tunggal Putra cabang olahraga Bulutangkis secara meyakinkan dengan tidak kehilangan 1 set pun sepanjang turnamen.",
      "Di pertandingan final, Dimas sukses menekuk perwakilan dari sekolah juara bertahan berkat stamina dan pukulan smash kerasnya. Dimas rutin berlatih 4 kali seminggu semenjak bergabung bersama unit kegiatan olahraga SMA PGRI 4 Palembang.",
      "Kemenangan ini secara otomatis menempatkan Dimas dalam skuad inti Kabupaten untuk berkompetisi kembali di POPDA tingkat Provinsi mendatang."
    ]
  },
  {
    id: "juara-3-debat-bahasa-inggris",
    judul: "Juara 3 Debat Bahasa Inggris",
    tahun: "2023",
    tingkat: "Provinsi",
    siswa: "Putri Amelia",
    kategori: "akademik",
    imgSrc: englishImg,
    deskripsi: [
      "Putri Amelia membuktikan bahwa kefasihan lisan dapat sejalan dengan kemampuan berpikir logis. Membawa bendera SMA PGRI 4 Palembang, Putri dinobatkan sebagai Juara 3 lomba Debat Bahasa Inggris se-Provinsi yang diikuti oleh lebih dari 50 tim.",
      "Meskipun berstatus sebagai murid tahun kedua (kelas 8), ia mampu mempresentasikan argumentasi hukum dan fenomena ekonomi dalam bahasa inggris yang sangat rapi mengungguli siswa kelas di atasnya. Kompetisi debat ini diselenggarakan oleh Universitas ternama dan dinilai oleh dosen ahli liguistik.",
      "Prestasi Putri sekaligus memberikan inspirasi kepada teman-temannya di dalam wadah English Club di sekolah agar terus berlatih berbicara dan bernalar."
    ]
  },
  {
    id: "juara-1-tari-tradisional",
    judul: "Juara 1 Tari Tradisional",
    tahun: "2023",
    tingkat: "Kabupaten",
    siswa: "Tim Tari",
    kategori: "seni",
    imgSrc: tariImg,
    deskripsi: [
      "Festival Seni Budaya Pelajar menobatkan Tim Tari SMA PGRI 4 Palembang sebagai penampil terbaik dan meraih Juara 1 dalam kategori Tari Tradisional. Tim yang berisikan 12 seniman muda berbakat ini membawakan Tari Saman yang rampak dan penuh energi.",
      "Sorotan juri tertuju pada harmoni gerakan, transisi yang lembut antara cepat dan lambat, hingga vokal acapella dari para siswa. Mereka mengenakan kostum cerah hasil karya modifikasi desainer lokal yang menambah estetika visual dari penampilan.",
      "Tim dijadwalkan akan diundang kembali untuk mengisi acara pembukaan peringatan Hari Kemerdekaan di Balai Kota tahun depan."
    ]
  },
  {
    id: "juara-2-lomba-cerpen-nasional",
    judul: "Juara 2 Lomba Cerpen Nasional",
    tahun: "2023",
    tingkat: "Nasional",
    siswa: "Sinta Dewi",
    kategori: "akademik",
    imgSrc: writeImg,
    deskripsi: [
      "Sinta Dewi berhasil mencetak sejarah emas bagi kemampuan literasi siswa SMA PGRI 4 Palembang setelah karyanya memenangkan juara kedua dalam Lomba Cerpen Remaja Nasional (LCRN) 2023.",
      "Cerpen bertajuk 'Lampion Merah di Sudut Kota' tersebut menceritakan sisi humanis dari para pendidik honorer yang terus mengajar di daerah terpelosok meskipun dengan segala keterbatasan. Bahasa dan diksi Sinta disebut juri sebagai sastra yang menyentuh jiwa.",
      "Sebagai imbas kemenangan tersebut, karya Sinta kini dipublikasikan dalam antologi sastra nasional, dan sekolah mengadakan penganugerahan khusus di lapangan saat upacara bendera untuk mengapresiasi hobinya tersebut."
    ]
  },
  {
    id: "juara-1-pencak-silat",
    judul: "Juara 1 Pencak Silat",
    tahun: "2023",
    tingkat: "Provinsi",
    siswa: "M. Ridwan",
    kategori: "olahraga",
    imgSrc: silatImg,
    deskripsi: [
      "M. Ridwan menduduki mimbar teratas kejuaraan Pencak Silat Remaja Piala Gubernur Jateng dalam kategori tanding kelas C (remaja). Setelah 4 hari berlaga, fisiknya terbukti paling tangguh daripada pesaing.",
      "Pelatih memberikan program latihan beban intensif sejak 6 bulan sebelum dihelatnya pertandingan. Konsistensi Ridwan menjaga kecepatan bantingan dan tendangannya membuahkan hasil kemenangan TKO pada babak final.",
      "Semenjak kemenangan ini, ekstrakurikuler beladiri di SMA PGRI 4 Palembang bertambah pesat peminat dari kelas baru."
    ]
  },
  {
    id: "penghargaan-sekolah-adiwiyata",
    judul: "Penghargaan Sekolah Adiwiyata",
    tahun: "2022",
    tingkat: "Provinsi",
    siswa: "SMA PGRI 4 Palembang",
    kategori: "lainnya",
    imgSrc: adiwiyataImg,
    deskripsi: [
      "SMA PGRI 4 Palembang memperoleh plakat Penghargaan Sekolah Adiwiyata Tingkat Provinsi dari Kementerian Lingkungan Hidup dan Kehutanan, sebagai pengakuan atas komitmen tinggi pada lingkungan.",
      "Semua ini terjadi atas peran serta seluruh civitas academica—mulai dari program bebas plastik, pengolahan pupuk hijau mandiri (kompos), hingga budidaya apotek hidup yang dirawat oleh guru dan siswa bersama-sama.",
      "Penghargaan berpamor tersebut hanyalah titik awal. Sebagai Sekolah Adiwiyata, kami senantiasa merepresentasikan green concept pada setiap bangunan asri yang ada serta menginisiasi reboisasi taman di sekitar sekolah."
    ]
  },
  {
    id: "juara-1-paduan-suara",
    judul: "Juara 1 Paduan Suara",
    tahun: "2022",
    tingkat: "Kabupaten",
    siswa: "Tim Paduan Suara",
    kategori: "seni",
    imgSrc: choirImg,
    deskripsi: [
      "Dalam Festival Kesenian Pelajar, paduan suara sekolah kita yang bernama 'Voce Nusantara' berhasil memikat hati par juri dan dewan dekan kesenian dengan melodi mereka.",
      "Membawakan medley lagu daerah dengan aransemen orkestra minimalis yang sangat anggun dan perpaduan 4 jenis tingkat suara memuncak pada standing applaus selama 1 menit pasca bernyanyi.",
      "Banyak yang kagum dan hal tersebut membuat minat para siswa baru sangat kuat untuk lolos seleksi tim paduan suara unggulan SMA PGRI 4 Palembang berikutnya."
    ]
  },
  {
    id: "juara-2-olimpiade-sains",
    judul: "Juara 2 Olimpiade Sains",
    tahun: "2022",
    tingkat: "Provinsi",
    siswa: "Rizky Pratama",
    kategori: "akademik",
    imgSrc: scienceImg,
    deskripsi: [
      "Rizky Pratama kembali hadir memukau di OSN Provinsi 2022 pada bidang lomba Biologi Terapan meraih mahkota runner up.",
      "Pertanyaan tak terduga berkaitan dengan ekologi genetik berhasil ia pecahkan jauh sebelum habis waktu dengan metode ilmiah.",
      "Lulus dari ujian teori panjang dan praktikum uji laboratorium membuat Rizky tak gentar. Sebagai runner-up ia sudah mencantumkan prestasinya untuk tiket kelak saat merambah perguruan tinggi ternama."
    ]
  }
];

export const getPrestasiById = (id: string): PrestasiItem | undefined => 
  prestasiData.find(item => item.id === id);

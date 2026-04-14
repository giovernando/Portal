import studentsImg from "@/assets/students.jpg";
import classroomImg from "@/assets/classroom.jpg";
import libraryImg from "@/assets/library.jpg";
import labImg from "@/assets/lab.jpg";
import sportsImg from "@/assets/sports.jpg";

export interface BeritaItem {
  id: string;
  title: string;
  date: string;
  img: string;
  excerpt: string;
  content: string[];
}

export const beritaData: BeritaItem[] = [
  {
    id: "penerimaan-peserta-didik-baru-2025-2026",
    title: "Penerimaan Peserta Didik Baru 2025/2026",
    date: "15 Maret 2025",
    img: studentsImg,
    excerpt: "Pendaftaran PPDB tahun ajaran baru telah resmi dibuka. Segera daftarkan putra-putri Anda untuk bergabung dengan Sekolah Nusantara.",
    content: [
      "Sekolah Nusantara dengan bangga mengumumkan bahwa proses Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2025/2026 telah resmi dibuka. Pendaftaran ini ditujukan bagi calon siswa yang ingin menempuh pendidikan di salah satu instansi terbaik dengan fasilitas modern.",
      "Proses pendaftaran tahun ini dilakukan secara terpadu melalui sistem online untuk mempermudah orang tua. Berbagai program unggulan telah dipersiapkan, mulai dari kelas reguler hingga kelas akselerasi dengan kurikulum berstandar internasional.",
      "Orang tua murid diharapkan segera melengkapi berkas persyaratan sebelum kuota terpenuhi. Mari bersama-sama mencetak generasi penerus bangsa yang unggul, berprestasi, dan berakhlak mulia di Sekolah Nusantara."
    ]
  },
  {
    id: "juara-olimpiade-sains-nasional",
    title: "Juara Olimpiade Sains Nasional",
    date: "20 Februari 2025",
    img: labImg,
    excerpt: "Siswa kami berhasil meraih medali emas dalam Olimpiade Sains Nasional tingkat provinsi Jawa Tengah.",
    content: [
      "Prestasi membanggakan kembali ditorehkan oleh siswa Sekolah Nusantara. Pada ajang Olimpiade Sains Nasional (OSN) tingkat provinsi, delegasi sekolah berhasil menyabet medali emas di bidang Fisika terapan.",
      "Keberhasilan ini tidak lepas dari pembinaan intensif yang dilakukan oleh guru-guru pendamping dan fasilitas laboratorium lengkap yang mendukung siswa bereksperimen. Kepala sekolah menyatakan apresiasi setinggi-tingginya kepada tim OSN yang telah mengharumkan nama sekolah.",
      "Siswa peraih medali emas tersebut selanjutnya akan mewakili provinsi untuk melaju di tingkat nasional. Mohon doa dan dukungannya agar dapat memperoleh hasil maksimal."
    ]
  },
  {
    id: "renovasi-laboratorium-komputer",
    title: "Renovasi Laboratorium Komputer",
    date: "10 Januari 2025",
    img: classroomImg,
    excerpt: "Laboratorium komputer telah direnovasi dengan 40 unit komputer terbaru untuk mendukung pembelajaran digital.",
    content: [
      "Sejalan dengan misi menjadi sekolah unggulan berbasis teknologi, Sekolah Nusantara telah menyelesaikan renovasi total ruang laboratorium komputer. Kini, lab tersebut dilengkapi dengan 40 unit komputer teranyar bertenaga tinggi.",
      "Renovasi ini juga mencakup pembaruan jaringan internet (fiber optic) yang lebih stabil, sehingga siswa dapat melakukan praktikum terkait pemrograman, desain grafis, maupun penelitian digital dengan lebih mulus.",
      "Diharapkan fasilitas ini mampu meningkatkan literasi digital dan memberi kenyamanan ekstra bagi guru maupun siswa saat proses belajar mengajar mata pelajaran Teknologi Informasi dan Komunikasi."
    ]
  },
  {
    id: "workshop-kurikulum-merdeka",
    title: "Workshop Kurikulum Merdeka",
    date: "5 Desember 2024",
    img: libraryImg,
    excerpt: "Para guru mengikuti workshop implementasi Kurikulum Merdeka untuk meningkatkan kualitas pembelajaran.",
    content: [
      "Untuk memastikan keselarasan pengajaran dengan standar terbaru dari Kementerian Pendidikan, seluruh jajaran staf pengajar Sekolah Nusantara mengikuti workshop intensif bertajuk Implementasi Kurikulum Merdeka.",
      "Kegiatan yang berlangsung selama tiga hari di aula utama ini mengundang narasumber praktisi pendidikan dan pakar kurikulum. Materi yang diberikan difokuskan pada pembelajaran yang inklusif, berbasis proyek (project-based learning), serta mendorong nalar kritis anak didik.",
      "Kami optimis dengan selesainya pelatihan ini, seluruh guru semakin mantap dalam menyajikan materi dengan pendekatan yang lebih variatif, menyenangkan, dan berorientasi pada pengembangan karakter siswa."
    ]
  },
  {
    id: "turnamen-futsal-antar-sekolah",
    title: "Turnamen Futsal Antar Sekolah",
    date: "28 November 2024",
    img: sportsImg,
    excerpt: "Tim futsal sekolah berhasil meraih juara 2 dalam turnamen futsal antar sekolah se-kecamatan.",
    content: [
      "Setelah melalui pertandingan yang alot, tim futsal Sekola Nusantara akhirnya berhasil melaju hingga babak final dan mengamankan posisi juara 2 pada pergelaran Turnamen Futsal Kecamatan 2024.",
      "Perjuangan tim sekolah patut diacungi jempol karena sejak babak penyisihan mereka harus berhadapan dengan tim-tim kuat langganan juara. Sorak-sorai pendukung menambah panas atmofser di setiap pertandingan.",
      "Prestasi non-akademik ini merupakan wujud nyata keseimbangan pembinaan antara intelektual pelajar dan kebugaran fisiknya. Terima kasih kepada seluruh siswa, pihak guru pelatih, dan para donatur kegiatan yang telah mensupport para atlet."
    ]
  },
  {
    id: "perayaan-hari-guru-nasional",
    title: "Perayaan Hari Guru Nasional",
    date: "25 November 2024",
    img: studentsImg,
    excerpt: "Sekolah mengadakan acara peringatan Hari Guru Nasional dengan berbagai penampilan dari siswa.",
    content: [
      "Hari Guru Nasional diperingati dengan sukacita oleh seluruh elemen di Sekolah Nusantara. Para pengurus OSIS mengambil inisiatif menyusun upacara khusus serta rentetan acara hiburan untuk memberikan apresiasi bagi seluruh pahlawan tanpa tanda jasa di kampus kita.",
      "Acara dimeriahkan dengan pembacaan puisi, penampilan paduan suara, serta drama teatrikal singkat mengenai peran guru di tengah masyarakat. Kemeriahan ditutup dengan sesi pemotongan tumpeng dan penyerahan bucket bunga kepada dewan guru.",
      "Kami berharap momentum perayaan sekecil ini dapat semakin merekatkan hubungan baik yang telah terjalin antara guru sebagai pendidik, dan siswa. Guru yang hebat akan melahirkan murid yang luar biasa."
    ]
  }
];

export const getBeritaById = (id: string): BeritaItem | undefined => 
  beritaData.find(item => item.id === id);

# Sekolah Nusantara - Portal Resmi

Situs web resmi Sekolah Nusantara, portal informasi lengkap untuk calon siswa, orang tua, dan masyarakat umum tentang profil sekolah, program akademik, fasilitas, prestasi, dan pendaftaran PPDB.

[![Vite](https://img.shields.io/badge/Vite-5.4.8-brightgreen)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.16-blue)](https://tailwindcss.com/)

## Fitur Utama

- **Landing Page Hero Carousel** - Showcase dinamis fasilitas dan prestasi sekolah
- **Profil Lengkap** - Sejarah, visi misi, struktur organisasi, profil kepala sekolah, guru & staff
- **Program Akademik** - Kurikulum, jadwal pelajaran, kalender akademik
- **PPDB Online** - Pendaftaran siswa baru
- **Galeri & Berita** - Dokumentasi kegiatan sekolah
- **Responsive Design** - Optimal di desktop, tablet, dan mobile
- **Modern UI/UX** - Menggunakan shadcn/ui components dengan animasi Framer Motion
- **SEO Optimized** - Meta tags dan struktur semantik

## Tech Stack

```
Frontend: React 18 + TypeScript + Vite + Tailwind CSS
UI: shadcn/ui + Lucide React Icons + Framer Motion
Routing: React Router
State: TanStack Query
Testing: Vitest + Playwright
Deployment: Static hosting (Vercel/Netlify/Vite Preview)
```

## Quick Start (Development)

1. **Clone/Setup**
   ```bash
   cd c:/laragon/www/portal
   ```

2. **Install Dependencies** (npm recommended)
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Buka http://localhost:5173

4. **Build for Production**
   ```bash
   npm run build
   ```
   Output di `dist/`

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server w/ HMR |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── home/       # Home page sections (Hero, CTA, Features)
│   ├── ui/         # shadcn/ui components
│   └── layout/     # Navbar, Footer, Layout
├── pages/          # Page components & routes
├── hooks/          # Custom React hooks
├── lib/            # Utilities
└── assets/         # Images (hero, portraits, facilities)
```

## Recent Changes

- ✅ Fixed "Tentang Kami" CTA visibility in HeroCarousel (solid white button w/ shadow)
- Track progress: [TODO.md](./TODO.md)

## Deployment

### Vercel/Netlify
```
npm run build
# Deploy dist/ folder
```

### Laragon (Local)
```
npm run build
cp -r dist/* htdocs/portal/
```

## Kontribusi

1. Fork repository
2. `npm install`
3. Buat feature branch `feat/nama-feature`
4. Commit changes
5. Push & PR

## Kontak

- **Telp**: 085729319861
- **Email**: bantuanvelocity@gmail.com
- **PPDB**: [Daftar Sekarang](/ppdb)

---

*© 2025 Sekolah Nusantara. Dibuat dengan ❤️ untuk pendidikan Indonesia.*


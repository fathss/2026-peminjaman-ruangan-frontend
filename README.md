# Peminjaman Ruangan

Sistem manajemen peminjaman ruangan berbasis Web API yang memungkinkan pengguna untuk memesan ruangan secara efisien dengan sistem persetujuan admin.

## Description

Project ini dibuat untuk mempermudah proses reservasi ruangan di lingkungan kampus. Sistem ini menangani konflik jadwal secara otomatis dan memberikan riwayat status peminjaman yang transparan bagi pengguna maupun administrator.

## Features

- Autentikasi pengguna (login dan register).
- Dashboard user untuk melihat ringkasan booking.
- Melihat daftar ruangan dan detail terkait.
- Membuat booking ruangan.
- Melihat riwayat booking.
- Melihat detail booking dan mengedit booking.
- Dashboard admin untuk monitoring data.
- Admin dapat melihat seluruh booking.
- Admin dapat melihat detail booking.
- Admin dapat menambah dan mengedit data ruangan.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- ESLint

## Installation

1. Clone repository ini:

```bash
git clone https://github.com/fathss/2026-peminjaman-ruangan-frontend.git
```

2. Masuk ke folder project:

```bash
cd 2026-peminjaman-ruangan-frontend
```

3. Install dependency:

```bash
npm install
```

4. Buat file environment:

```bash
cp .env.example .env
```

Jika file `.env.example` belum ada, buat file `.env` secara manual dan isi variabel sesuai bagian Environment Variables.

## Usage

Jalankan aplikasi dalam mode development:

```bash
npm run dev
```

Build untuk production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

Linting:

```bash
npm run lint
```

## Environment Variables

Buat file `.env` di root project dan tambahkan:

```env
VITE_API_URL=http://localhost:8000/api
```

Keterangan:

- `VITE_API_URL`: Base URL backend API yang digunakan oleh Axios instance di `src/api/axios.ts`.

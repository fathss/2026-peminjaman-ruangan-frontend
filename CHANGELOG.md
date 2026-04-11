# Changelog

## [1.2.2] - 2026-04-11

### Fixed
- Memperbarui header proxy dan timeout pada konfigurasi Nginx untuk meningkatkan kestabilan koneksi API.

## [1.2.1] - 2026-04-06

### Changed
- Menyesuaikan konfigurasi Nginx dan base URL Axios untuk penanganan API yang lebih baik.
- Memperbarui konfigurasi Vite agar alur request API lebih konsisten saat build dan runtime.

## [1.2.0] - 2026-03-28

### Added
- Menambahkan sistem notifikasi global menggunakan `ToastContext` dan komponen `Toast` yang fleksibel.
- Menambahkan komponen `Modal` yang dapat digunakan ulang untuk interaksi pengguna yang lebih kaya.
- Menambahkan properti baru dan penanganan tipe TypeScript untuk komponen UI.

### Changed
- Merefaktor besar-besaran komponen UI (`RoomCard`, `StatusBadge`, `BackButton`, dll.) untuk meningkatkan estetika dan pengalaman pengguna.
- Memperbarui alur manajemen ruangan di admin (`AddRoomPage`, `EditRoomPage`) dengan validasi input yang lebih baik.
- Merefaktor halaman detail pemesanan admin dan pengguna untuk tampilan informasi yang lebih komprehensif.
- Mengintegrasikan penanganan error yang lebih informatif pada hook API (`useBookingActions`, `useCreateBooking`, `useEditBooking`).

### Fixed
- Memperbaiki penanganan state dan validasi pada formulir pemesanan dan manajemen ruangan.

## [1.1.0] - 2026-03-07

### Added
- Menambahkan setup deployment berbasis Docker dengan `.dockerignore`, `Dockerfile`, dan `nginx.conf`.

### Changed
- Memperbarui konfigurasi Docker dan Nginx untuk penanganan port dinamis.
- Merefaktor alur pengambilan data pada hook detail pemesanan admin dan pengguna.

### Fixed
- Memperbaiki peringatan lint dan build pada komponen routing dan input formulir.

### Documentation
- Memperbarui README untuk setup dan penggunaan proyek terbaru.

## [1.0.0] - 2026-02-15

### Added
- Menambahkan scaffold awal proyek dan setup dasar frontend.
- Menambahkan UI statis awal untuk autentikasi, daftar ruangan, alur pemesanan, dan halaman admin.
- Menambahkan komponen UI yang dapat digunakan ulang (card, field formulir, badge, filter, navbar, dan helper).
- Menambahkan lapisan integrasi API (`axios` client, service ruangan, dan service pemesanan).
- Menambahkan hook domain untuk pengelolaan data admin, pengguna, dan ruangan bersama.
- Menambahkan modul utilitas untuk helper pemesanan, format tanggal, parsing lokasi, dan helper status.
- Menambahkan Lisensi MIT.

### Changed
- Memperbarui routing aplikasi, termasuk perilaku default route.
- Memperbarui formulir autentikasi dan perilaku navbar agar bekerja dengan alur API.
- Menata ulang halaman bersama dengan memindahkan login/register ke shared routes dan mengganti halaman ruangan pengguna dengan halaman ruangan bersama.

### Removed
- Menghapus `src/pages/user/RoomPage.tsx` dan menggantinya dengan struktur halaman ruangan bersama.

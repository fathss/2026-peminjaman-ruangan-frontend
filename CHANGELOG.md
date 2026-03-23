# Changelog
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

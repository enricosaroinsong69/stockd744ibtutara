# Aplikasi .exe Stok Daihatsu D744

Berkas .exe ini **hanya jendelanya**. Isi aplikasinya tetap tinggal di Netlify.
Artinya: memperbarui aplikasi cukup dengan menyeret folder baru ke Netlify seperti
biasa — tidak perlu membangun .exe baru, dan tidak perlu memasang ulang di komputer
mana pun. Jendelanya baru perlu dibangun ulang kalau alamat situsnya berganti.

Setelah sekali dibuka, aplikasi tetap bisa dipakai saat internet mati, karena
simpanannya sudah ada di komputer.

---

## Langkah 1 — Isikan alamat situsnya

Buka `main.js`, cari baris ini di bagian atas:

    const ALAMAT = process.env.STOK_URL || 'https://GANTI-NAMA-SITUS.netlify.app/';

Ganti `GANTI-NAMA-SITUS` dengan nama situs Netlify aplikasi D744. **Ini wajib** —
kalau dilewati, aplikasinya akan membuka halaman "tidak tersambung" terus.

## Langkah 2 — Unggah ke GitHub

1. Buat repositori baru, misalnya `stok-d744-exe`
2. **Add file → Upload files**, seret seluruh isi folder ini:
   `package.json`, `main.js`, `preload.js`, `offline.html`, `icon.ico`
3. Folder `.github` tidak bisa diseret lewat pengunggah GitHub karena namanya
   diawali titik. Buat berkasnya langsung:
   **Add file → Create new file** → ketik nama berkas persis:

       .github/workflows/build-exe.yml

   lalu tempel seluruh isi `build-exe.yml` dari folder ini → **Commit changes**

## Langkah 3 — Bangun .exe-nya

1. Buka tab **Actions** di repositori itu
2. Pilih **Build EXE** di daftar kiri
3. Klik **Run workflow** → **Run workflow**
4. Tunggu 5–10 menit sampai tandanya hijau
5. Klik nama jalannya, gulir ke bawah ke bagian **Artifacts**
6. Unduh **StokDaihatsuD744-exe** (berbentuk .zip)

Di dalamnya ada dua berkas:

| Berkas | Keterangan |
|---|---|
| `Stok Daihatsu D744 Setup 1.0.0.exe` | pemasang biasa — membuat pintasan di desktop & menu Start |
| `StokDaihatsuD744-portable-1.0.0.exe` | langsung jalan tanpa dipasang, bisa ditaruh di flashdisk |

Saat pertama dijalankan, Windows SmartScreen biasanya menahan dengan pesan
"Windows protected your PC" — itu wajar untuk aplikasi yang belum didaftarkan
ke Microsoft. Klik **More info** → **Run anyway**.

---

## Memperbarui aplikasinya

**Isi aplikasi berubah** (tab baru, perbaikan, sumber data berganti):
unggah berkas baru ke Netlify seperti biasa. Di aplikasi .exe tekan **F5**,
atau tutup lalu buka lagi. Tidak ada yang perlu dipasang ulang.

**Alamat situsnya berganti:** ubah `ALAMAT` di `main.js`, commit, lalu jalankan
Actions lagi dan bagikan .exe yang baru.

**Menaikkan nomor versi:** ubah `"version"` di `package.json` sebelum menjalankan
Actions — nomor itu yang muncul di nama berkas dan di menu Bantuan → Tentang.

---

## Menu di dalam aplikasi

| Menu | Gunanya |
|---|---|
| Aplikasi → Muat ulang (F5) | menarik versi terbaru dari Netlify |
| Aplikasi → Muat ulang paksa (Ctrl+F5) | sama, tapi mengabaikan simpanan — pakai kalau pembaruan belum muncul |
| Aplikasi → Perbesar / Perkecil | mengatur ukuran huruf |
| Aplikasi → Alat pengembang (F12) | untuk menelusuri masalah |
| Bantuan → Tentang | versi jendela dan alamat yang sedang dimuat |

---

## Kenapa tab "Ganti Data" hanya ada di sini

Tab itu **mengganti seluruh isi** lembar Stok/RRN di spreadsheet — ribuan baris
sekaligus, dan yang lama hilang. Jadi tab-nya hanya muncul kalau aplikasi dibuka
dari .exe ini; di HP salesman tidak pernah tampil, walaupun alamat Netlify-nya sama.

Penandanya dipasang oleh `preload.js`. Lapis pengaman keduanya: alamat Web App dan
token penulisnya hanya tersimpan di komputer ini, tidak ikut ke berkas yang diunggah
ke Netlify.

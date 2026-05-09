# Aplikasi Manajemen Bisnis Mikro - Backend REST API

Project ini adalah backend REST API untuk sistem aplikasi manajemen bisnis mikro seperti toko kecil atau UMKM. Dilengkapi dengan pengelolaan `Produk`, `Pelanggan`, `Pembayaran`, dan `Laporan`. 

## Fitur dan Modul Utama
- **Produk**: Dikelola dengan endpoint CRUD. Menyimpan nama, kategori, harga, stok, dsb.
- **Pelanggan**: Mengelola pelanggan (nama, email, no_hp, alamat).
- **Pembayaran**: Transaksi pembayaran yang dilakukan oleh pelanggan.
- **Laporan**: Record rekapitulasi data pendapatan dan jumlah transaksi.

## Prerequisites
- Node.js terinstall.
- Akun / Database Supabase PostgreSQL.

## Folder Structure
- `/config`: Menyimpan konfigurasi database (Supabase).
- `/controllers`: Logika endpoint untuk menghandel HTTP Request dan Response.
- `/models`: Penulisan raw queries SQL untuk integrasi dengan Postgres.
- `/routes`: Kumpulan route list HTTP Method yang dihubungkan ke controller.
- `/middleware`: Berisi script untuk validasi request body (`validation.js`) dan formatter response JSON (`responseFormatter.js`).

## Cara Menghubungkan Project ke Supabase
1. Buat project baru pada [Supabase](https://supabase.com).
2. Pergi ke **Project Settings** > **Database**, scroll ke bagian **Connection String** > **URI**.
3. Copy link connection format `postgresql://postgres.[username]:[password]@[endpoint]:5432/postgres`.
4. Buat file `.env` di root folder aplikasi ini (berdasarkan `.env.example`).
5. Ganti value `DATABASE_URL` dengan link connection hasil copy di tahap ke-3. Jangan lupa ubah password-nya.

## Cara Menjalankan Project

1. Install seluruh environment/dependencies yang dibutuhkan:
```bash
npm install
```

2. Jalankan query SQL di dalam `database.sql` pada menu "SQL Editor" di dashboard Supabase Anda. Anda bisa paste dan jalankan sekaligus. Ini akan membuat tabel-tabel dan mengisi 10+ data dummy per tabel.

3. Jalankan aplikasi menggunakan command `node`:
```bash
node app.js
```
*Server akan berjalan di `http://localhost:3000`*.

## Contoh Request dan Response API

Semua resource API (Contoh: `/api/produk`) memiliki Response format standarisasi:

**GET /api/produk (Mengambil seluruh data Produk):**
*Request:*
```http
GET http://localhost:3000/api/produk
```

*Response:*
```json
{
    "success": true,
    "message": "Berhasil mengambil semua data produk",
    "data": [
        {
            "id_produk": 1,
            "nama_produk": "Beras Setra Ramos 5kg",
            "kategori": "Sembako",
            "harga": "65000.00",
            "stok": 50,
            "deskripsi": "Beras putih kualitas super."
        },
        ...
    ]
}
```

**POST /api/pembayaran (Tambahkan pembayaran baru):**
*Request:*
```json
{
    "id_pelanggan": 1,
    "total_bayar": 100000,
    "metode_pembayaran": "Transfer Bank"
}
```
*Response Validasi jika salah input* (Contoh `total_bayar` dibiarkan kosong):
```json
{
    "success": false,
    "message": "semua field (id_pelanggan, total_bayar, metode_pembayaran, dll) wajib diisi",
    "data": null
}
```

*Response Berhasil*:
```json
{
    "success": true,
    "message": "Berhasil menambahkan pembayaran baru",
    "data": {
        "id_pembayaran": 11,
        "id_pelanggan": 1,
        "total_bayar": "100000.00",
        "metode_pembayaran": "Transfer Bank",
        "tanggal_pembayaran": "2023-11-20T00:00:00.000Z",
        "status_pembayaran": "belum_lunas"
    }
}
```

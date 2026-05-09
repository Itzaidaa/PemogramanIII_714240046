-- database.sql
-- Create Enum for status_pembayaran
CREATE TYPE status_bayar AS ENUM ('lunas', 'belum_lunas', 'cicilan');

-- Create Tables
CREATE TABLE produk (
    id_produk SERIAL PRIMARY KEY,
    nama_produk VARCHAR(255) NOT NULL,
    kategori VARCHAR(100),
    harga NUMERIC(15, 2) NOT NULL CHECK (harga >= 0),
    stok INT NOT NULL CHECK (stok >= 0),
    deskripsi TEXT
);

CREATE TABLE pelanggan (
    id_pelanggan SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL CHECK (length(nama) >= 3),
    email VARCHAR(255) UNIQUE NOT NULL,
    nomor_hp VARCHAR(20),
    alamat TEXT
);

CREATE TABLE pembayaran (
    id_pembayaran SERIAL PRIMARY KEY,
    id_pelanggan INT NOT NULL REFERENCES pelanggan(id_pelanggan) ON DELETE CASCADE,
    total_bayar NUMERIC(15, 2) NOT NULL CHECK (total_bayar >= 0),
    metode_pembayaran VARCHAR(100),
    tanggal_pembayaran DATE DEFAULT CURRENT_DATE,
    status_pembayaran status_bayar DEFAULT 'belum_lunas'
);

CREATE TABLE laporan (
    id_laporan SERIAL PRIMARY KEY,
    jumlah_transaksi INT NOT NULL DEFAULT 0,
    total_pendapatan NUMERIC(15, 2) NOT NULL DEFAULT 0,
    tanggal_laporan DATE DEFAULT CURRENT_DATE
);

-- Insert Dummy Data for Produk
INSERT INTO produk (nama_produk, kategori, harga, stok, deskripsi) VALUES
('Beras Setra Ramos 5kg', 'Sembako', 65000, 50, 'Beras putih kualitas super.'),
('Minyak Goreng Bimoli 2L', 'Sembako', 35000, 100, 'Minyak goreng kelapa sawit.'),
('Gula Pasir Gulaku 1kg', 'Sembako', 15000, 80, 'Gula pasir kristal murni.'),
('Telur Ayam Negeri 1kg', 'Sembako', 28000, 30, 'Telur ayam segar.'),
('Indomie Goreng (Kardus)', 'Makanan Instan', 110000, 20, 'Mie instan goreng isi 40 bungkus.'),
('Kopi Kapal Api 380g', 'Minuman', 25000, 60, 'Kopi bubuk kemasan ekonomis.'),
('Teh Botol Sosro 1L', 'Minuman', 10000, 150, 'Minuman teh dalam kotak ritel.'),
('Sabun Lifebuoy Total 10', 'Kebersihan', 4500, 200, 'Sabun mandi keluarga antibakteri.'),
('Rinso Anti Noda 800g', 'Kebersihan', 21000, 40, 'Deterjen bubuk hilangkan noda.'),
('Pepsodent 190g', 'Kesehatan', 12000, 100, 'Pasta gigi perlindungan maksimal.');

-- Insert Dummy Data for Pelanggan
INSERT INTO pelanggan (nama, email, nomor_hp, alamat) VALUES
('Budi Santoso', 'budi@test.com', '081234567890', 'Jl. Merdeka No. 1, Jakarta'),
('Siti Aminah', 'siti@test.com', '081298765432', 'Jl. Sudirman No. 10, Bandung'),
('Ahmad Dahlan', 'ahmad@test.com', '081312345678', 'Jl. Diponegoro No. 5, Surabaya'),
('Dewi Lestari', 'dewi@test.com', '085612349876', 'Jl. Gajah Mada No. 12, Semarang'),
('Rina Gunawan', 'rina@test.com', '089912341234', 'Jl. Teuku Umar No. 8, Medan'),
('Andi Matalata', 'andi@test.com', '082112341234', 'Jl. Ahmad Yani No. 15, Makassar'),
('Tono Hartono', 'tono@test.com', '081512341234', 'Jl. Pahlawan No. 7, Yogyakarta'),
('Maya Sari', 'maya@test.com', '087812341234', 'Jl. Pemuda No. 22, Solo'),
('Joko Widodo', 'joko@test.com', '081912341234', 'Jl. Gatot Subroto No. 3, Malang'),
('Endang Susanti', 'endang@test.com', '081112341234', 'Jl. Veteran No. 9, Bali');

-- Insert Dummy Data for Pembayaran
INSERT INTO pembayaran (id_pelanggan, total_bayar, metode_pembayaran, tanggal_pembayaran, status_pembayaran) VALUES
(1, 100000, 'Transfer Bank', '2023-10-01', 'lunas'),
(2, 50000, 'Tunai', '2023-10-02', 'lunas'),
(3, 75000, 'E-Wallet', '2023-10-03', 'lunas'),
(4, 120000, 'Transfer Bank', '2023-10-04', 'belum_lunas'),
(5, 200000, 'Kartu Kredit', '2023-10-05', 'lunas'),
(6, 45000, 'Tunai', '2023-10-06', 'belum_lunas'),
(7, 30000, 'E-Wallet', '2023-10-07', 'lunas'),
(8, 150000, 'Transfer Bank', '2023-10-08', 'lunas'),
(9, 80000, 'Tunai', '2023-10-09', 'belum_lunas'),
(10, 60000, 'E-Wallet', '2023-10-10', 'lunas');

-- Insert Dummy Data for Laporan
INSERT INTO laporan (jumlah_transaksi, total_pendapatan, tanggal_laporan) VALUES
(15, 750000, '2023-10-01'),
(12, 600000, '2023-10-02'),
(20, 1000000, '2023-10-03'),
(18, 900000, '2023-10-04'),
(25, 1250000, '2023-10-05'),
(10, 500000, '2023-10-06'),
(14, 700000, '2023-10-07'),
(22, 1100000, '2023-10-08'),
(19, 950000, '2023-10-09'),
(24, 1200000, '2023-10-10');

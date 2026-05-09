// Basic common validation rules

// Helper for sending validation error
const validationError = (res, message) => {
    return res.sendError(message, 400);
};

// Validate Produk Input
const validateProduk = (req, res, next) => {
    const { nama_produk, kategori, harga, stok } = req.body;

    if (!nama_produk || !kategori || harga === undefined || stok === undefined) {
        return validationError(res, 'semua field (nama_produk, kategori, harga, stok) wajib diisi');
    }
    if (typeof nama_produk !== 'string' || nama_produk.length < 3) {
        return validationError(res, 'nama minimal tiga karakter');
    }
    if (Number(harga) < 0) {
        return validationError(res, 'harga tidak boleh negatif');
    }
    if (Number(stok) < 0) {
        return validationError(res, 'stok tidak boleh kurang dari nol');
    }

    next();
};

// Validate Pelanggan Input
const validatePelanggan = (req, res, next) => {
    const { nama, email, nomor_hp, alamat } = req.body;

    if (!nama || !email || !nomor_hp || !alamat) {
        return validationError(res, 'semua field (nama, email, nomor_hp, alamat) wajib diisi');
    }
    if (typeof nama !== 'string' || nama.length < 3) {
        return validationError(res, 'nama minimal tiga karakter');
    }
    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return validationError(res, 'email harus memiliki format valid');
    }

    next();
};

// Validate Pembayaran Input
const validatePembayaran = (req, res, next) => {
    const { id_pelanggan, total_bayar, metode_pembayaran } = req.body;

    if (!id_pelanggan || total_bayar === undefined || !metode_pembayaran) {
        return validationError(res, 'semua field (id_pelanggan, total_bayar, metode_pembayaran, dll) wajib diisi');
    }
    if (Number(total_bayar) < 0) {
        return validationError(res, 'total pembayaran tidak boleh negatif');
    }

    next();
};

// Validate Laporan Input
const validateLaporan = (req, res, next) => {
    const { jumlah_transaksi, total_pendapatan } = req.body;

    if (jumlah_transaksi === undefined || total_pendapatan === undefined) {
        return validationError(res, 'semua field (jumlah_transaksi, total_pendapatan) wajib diisi');
    }

    next();
};

module.exports = {
    validateProduk,
    validatePelanggan,
    validatePembayaran,
    validateLaporan
};

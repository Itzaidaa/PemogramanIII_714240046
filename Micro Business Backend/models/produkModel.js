const pool = require('../config/db');

const Produk = {
    async findAll() {
        const result = await pool.query('SELECT * FROM produk ORDER BY id_produk ASC');
        return result.rows;
    },
    async findById(id) {
        const result = await pool.query('SELECT * FROM produk WHERE id_produk = $1', [id]);
        return result.rows[0];
    },
    async create(data) {
        const { nama_produk, kategori, harga, stok, deskripsi } = data;
        const result = await pool.query(
            'INSERT INTO produk (nama_produk, kategori, harga, stok, deskripsi) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nama_produk, kategori, harga, stok, deskripsi || null]
        );
        return result.rows[0];
    },
    async update(id, data) {
        const { nama_produk, kategori, harga, stok, deskripsi } = data;
        const result = await pool.query(
            'UPDATE produk SET nama_produk = $1, kategori = $2, harga = $3, stok = $4, deskripsi = $5 WHERE id_produk = $6 RETURNING *',
            [nama_produk, kategori, harga, stok, deskripsi || null, id]
        );
        return result.rows[0];
    },
    async delete(id) {
        const result = await pool.query('DELETE FROM produk WHERE id_produk = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Produk;

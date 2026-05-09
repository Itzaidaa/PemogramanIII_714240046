const pool = require('../config/db');

const Pembayaran = {
    async findAll() {
        const result = await pool.query('SELECT * FROM pembayaran ORDER BY id_pembayaran ASC');
        return result.rows;
    },
    async findById(id) {
        const result = await pool.query('SELECT * FROM pembayaran WHERE id_pembayaran = $1', [id]);
        return result.rows[0];
    },
    async create(data) {
        const { id_pelanggan, total_bayar, metode_pembayaran, tanggal_pembayaran, status_pembayaran } = data;
        const result = await pool.query(
            `INSERT INTO pembayaran (id_pelanggan, total_bayar, metode_pembayaran, tanggal_pembayaran, status_pembayaran) 
             VALUES ($1, $2, $3, COALESCE($4, CURRENT_DATE), COALESCE($5, 'belum_lunas')) RETURNING *`,
            [id_pelanggan, total_bayar, metode_pembayaran, tanggal_pembayaran || null, status_pembayaran || null]
        );
        return result.rows[0];
    },
    async update(id, data) {
        const { id_pelanggan, total_bayar, metode_pembayaran, tanggal_pembayaran, status_pembayaran } = data;
        const result = await pool.query(
            `UPDATE pembayaran 
             SET id_pelanggan = $1, total_bayar = $2, metode_pembayaran = $3, 
                 tanggal_pembayaran = COALESCE($4, tanggal_pembayaran), 
                 status_pembayaran = COALESCE($5, status_pembayaran) 
             WHERE id_pembayaran = $6 RETURNING *`,
            [id_pelanggan, total_bayar, metode_pembayaran, tanggal_pembayaran || null, status_pembayaran || null, id]
        );
        return result.rows[0];
    },
    async delete(id) {
        const result = await pool.query('DELETE FROM pembayaran WHERE id_pembayaran = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Pembayaran;

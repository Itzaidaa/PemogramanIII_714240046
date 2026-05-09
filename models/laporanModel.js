const pool = require('../config/db');

const Laporan = {
    async findAll() {
        const result = await pool.query('SELECT * FROM laporan ORDER BY id_laporan ASC');
        return result.rows;
    },
    
    async findById(id) {
        const result = await pool.query('SELECT * FROM laporan WHERE id_laporan = $1', [id]);
        return result.rows[0];
    },
    
    async create(data) {
        const { jumlah_transaksi, total_pendapatan, tanggal_laporan } = data;
        const result = await pool.query(
            `INSERT INTO laporan (jumlah_transaksi, total_pendapatan, tanggal_laporan) 
             VALUES ($1, $2, COALESCE($3, CURRENT_DATE)) RETURNING *`,
            [jumlah_transaksi, total_pendapatan, tanggal_laporan || null]
        );
        return result.rows[0];
    },
    
    async update(id, data) {
        const { jumlah_transaksi, total_pendapatan, tanggal_laporan } = data;
        const result = await pool.query(
            `UPDATE laporan 
             SET jumlah_transaksi = $1, total_pendapatan = $2, 
                 tanggal_laporan = COALESCE($3, tanggal_laporan) 
             WHERE id_laporan = $4 RETURNING *`,
            [jumlah_transaksi, total_pendapatan, tanggal_laporan || null, id]
        );
        return result.rows[0];
    },
    
    async delete(id) {
        const result = await pool.query('DELETE FROM laporan WHERE id_laporan = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Laporan;

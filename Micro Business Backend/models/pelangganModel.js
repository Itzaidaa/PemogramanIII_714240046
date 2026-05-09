const pool = require('../config/db');

const Pelanggan = {
    async findAll() {
        const result = await pool.query('SELECT * FROM pelanggan ORDER BY id_pelanggan ASC');
        return result.rows;
    },
    async findById(id) {
        const result = await pool.query('SELECT * FROM pelanggan WHERE id_pelanggan = $1', [id]);
        return result.rows[0];
    },
    async create(data) {
        const { nama, email, nomor_hp, alamat } = data;
        const result = await pool.query(
            'INSERT INTO pelanggan (nama, email, nomor_hp, alamat) VALUES ($1, $2, $3, $4) RETURNING *',
            [nama, email, nomor_hp, alamat]
        );
        return result.rows[0];
    },
    async update(id, data) {
        const { nama, email, nomor_hp, alamat } = data;
        const result = await pool.query(
            'UPDATE pelanggan SET nama = $1, email = $2, nomor_hp = $3, alamat = $4 WHERE id_pelanggan = $5 RETURNING *',
            [nama, email, nomor_hp, alamat, id]
        );
        return result.rows[0];
    },
    async delete(id) {
        const result = await pool.query('DELETE FROM pelanggan WHERE id_pelanggan = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Pelanggan;

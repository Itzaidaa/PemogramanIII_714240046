const Pembayaran = require('../models/pembayaranModel');

exports.getAll = async (req, res) => {
    try {
        const data = await Pembayaran.findAll();
        return res.sendSuccess(data, 'Berhasil mengambil semua data pembayaran');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Pembayaran.findById(req.params.id);
        if (!data) return res.sendError('Data pembayaran tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengambil data pembayaran');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.create = async (req, res) => {
    try {
        const data = await Pembayaran.create(req.body);
        return res.sendSuccess(data, 'Berhasil menambahkan pembayaran baru', 201);
    } catch (err) {
        if (err.code === '23503') return res.sendError('ID Pelanggan tidak ada/valid', 400); // fk constraint check
        return res.sendError(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Pembayaran.update(req.params.id, req.body);
        if (!data) return res.sendError('Data pembayaran tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengubah data pembayaran');
    } catch (err) {
        if (err.code === '23503') return res.sendError('ID Pelanggan tidak ada/valid', 400);
        return res.sendError(err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Pembayaran.delete(req.params.id);
        if (!data) return res.sendError('Data pembayaran tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil menghapus data pembayaran');
    } catch (err) {
        return res.sendError(err.message);
    }
};

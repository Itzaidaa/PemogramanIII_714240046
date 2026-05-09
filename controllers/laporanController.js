const Laporan = require('../models/laporanModel');

exports.getAll = async (req, res) => {
    try {
        const data = await Laporan.findAll();
        return res.sendSuccess(data, 'Berhasil mengambil semua data laporan');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Laporan.findById(req.params.id);
        if (!data) return res.sendError('Data laporan tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengambil data laporan');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.create = async (req, res) => {
    try {
        const data = await Laporan.create(req.body);
        return res.sendSuccess(data, 'Berhasil menambahkan laporan baru', 201);
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Laporan.update(req.params.id, req.body);
        if (!data) return res.sendError('Data laporan tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengubah data laporan');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Laporan.delete(req.params.id);
        if (!data) return res.sendError('Data laporan tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil menghapus data laporan');
    } catch (err) {
        return res.sendError(err.message);
    }
};

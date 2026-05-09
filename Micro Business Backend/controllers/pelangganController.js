const Pelanggan = require('../models/pelangganModel');

exports.getAll = async (req, res) => {
    try {
        const data = await Pelanggan.findAll();
        return res.sendSuccess(data, 'Berhasil mengambil semua data pelanggan');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Pelanggan.findById(req.params.id);
        if (!data) return res.sendError('Pelanggan tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengambil data pelanggan');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.create = async (req, res) => {
    try {
        const data = await Pelanggan.create(req.body);
        return res.sendSuccess(data, 'Berhasil menambahkan pelanggan baru', 201);
    } catch (err) {
        if (err.code === '23505') return res.sendError('Email sudah terdaftar, tidak boleh duplikat', 400);
        return res.sendError(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Pelanggan.update(req.params.id, req.body);
        if (!data) return res.sendError('Pelanggan tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengubah data pelanggan');
    } catch (err) {
        if (err.code === '23505') return res.sendError('Email sudah terdaftar, tidak boleh duplikat', 400);
        return res.sendError(err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Pelanggan.delete(req.params.id);
        if (!data) return res.sendError('Pelanggan tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil menghapus data pelanggan');
    } catch (err) {
        return res.sendError(err.message);
    }
};

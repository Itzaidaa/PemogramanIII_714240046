const Produk = require('../models/produkModel');

exports.getAll = async (req, res) => {
    try {
        const data = await Produk.findAll();
        return res.sendSuccess(data, 'Berhasil mengambil semua data produk');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Produk.findById(req.params.id);
        if (!data) return res.sendError('Produk tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengambil data produk');
    } catch (err) {
        return res.sendError(err.message);
    }
};

exports.create = async (req, res) => {
    try {
        const data = await Produk.create(req.body);
        return res.sendSuccess(data, 'Berhasil menambahkan produk baru', 201);
    } catch (err) {
        if (err.code === '23505') return res.sendError('Data duplikat', 400);
        return res.sendError(err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Produk.update(req.params.id, req.body);
        if (!data) return res.sendError('Produk tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil mengubah data produk');
    } catch (err) {
        if (err.code === '23505') return res.sendError('Data duplikat', 400);
        return res.sendError(err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Produk.delete(req.params.id);
        if (!data) return res.sendError('Produk tidak ditemukan', 404);
        return res.sendSuccess(data, 'Berhasil menghapus data produk');
    } catch (err) {
        return res.sendError(err.message);
    }
};

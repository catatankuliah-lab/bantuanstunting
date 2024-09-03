const Alokasi = require('../models/alokasiModel');

const addAlokasi = async (req, res) => {
    const {
        bulan_alokasi,
        tahun_alokasi
    } = req.body;

    try {
        const newAlokasi = await Alokasi.create({
            bulan_alokasi,
            tahun_alokasi
        });
        res.status(200).send(newAlokasi);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllAlokasi = async (req, res) => {
    try {
        const alokasi = await Alokasi.findAll();
        res.status(200).json(alokasi);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addAlokasi,
    getAllAlokasi
};

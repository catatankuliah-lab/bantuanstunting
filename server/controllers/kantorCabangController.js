const KantorCabang = require('../models/KantorCabangModel');

const addKantorCabang = async (req, res) => {
    const {
        nama_kantor_cabang,
    } = req.body;

    try {
        const newKantorCabang = await KantorCabang.create({
            nama_kantor_cabang
        });
        res.status(200).send(newKantorCabang);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllKantorCabang = async (req, res) => {
    try {
        const newKantorCabang = await KantorCabang.findAll();
        res.status(200).send(newKantorCabang);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addKantorCabang,
    getAllKantorCabang
};

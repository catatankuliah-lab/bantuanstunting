const Lo = require('../models/loModel');
const ItemWo = require('../models/itemWoModel');
const Checker = require('../models/checkerGudangModel');
const Gudang = require('../models/gudangModel');
const Wo = require('../models/woModel');

const addLo = async (req, res) => {
    const {
        id_item_wo,
        id_checker_gudang,
        nomor_lo,
        tanggal_lo,
        tonase_lo,
        status_lo,
        jam_pemberangkatan,
        qr_lo
    } = req.body;

    try {
        const newLo = await Lo.create({
            id_item_wo,
            id_checker_gudang,
            nomor_lo,
            tanggal_lo,
            tonase_lo,
            status_lo,
            jam_pemberangkatan,
            qr_lo
        });
        res.status(200).send(newLo);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllLo = async (req, res) => {
    try {
        const lo = await Lo.findAll({
            include: [
                {
                    model: ItemWo,
                    as: 'item_wo',
                    include: {
                        model: Wo,
                        as: 'wo',
                    },
                },
                {
                    model: Checker,
                    as: 'checker_gudang',
                    include: {
                        model: Gudang,
                        as: 'gudang',
                    },
                }]
        });
        res.status(200).send(lo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addLo,
    getAllLo,
};

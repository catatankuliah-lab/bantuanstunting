const Do = require('../models/doModel');
const Lo = require('../models/loModel');
const ItemWo = require('../models/itemWoModel');
const Wo = require('../models/woModel');

const addDo = async (req, res) => {
    const {
        id_lo,
        nomor_do,
        tanggal_do,
        qr_do
    } = req.body;

    try {
        const newDo = await Do.create({
            id_lo,
            nomor_do,
            tanggal_do,
            qr_do
        });
        res.status(200).send(newDo);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllDo = async (req, res) => {
    try {
        const datado = await Do.findAll({
            include: [
                {
                    model: Lo,
                    as: 'lo',
                    include: {
                        model: ItemWo,
                        as: 'item_wo',
                        include: {
                            model: Wo,
                            as: 'wo',
                        },
                    },
                }]
        });
        res.status(200).send(datado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addDo,
    getAllDo,
};

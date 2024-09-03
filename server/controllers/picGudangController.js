const PicGudang = require('../models/picGudangModel');
const User = require('../models/userModel');
const KantorCabang = require('../models/kantorCabangModel');
const Gudang = require('../models/gudangModel');
const HakAkses = require('../models/hakAksesModel');

const addPicGudang = async (req, res) => {
    const {
        id_user,
        id_gudang
    } = req.body;

    try {
        const newPicGudang = await PicGudang.create({
            id_user,
            id_gudang
        });
        res.status(200).send(newPicGudang);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllPicGudang = async (req, res) => {
    try {
        const pic_gudang = await PicGudang.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    include: {
                        model: HakAkses,
                        as: "hak_akses",
                    },
                },
                {
                    model: Gudang,
                    as: 'gudang',
                    include: {
                        model: KantorCabang,
                        as: "kantor_cabang",
                    },
                }]
        });
        res.status(200).send(pic_gudang);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addPicGudang,
    getAllPicGudang
};

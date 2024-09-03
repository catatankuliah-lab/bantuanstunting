const CheckerGUdang = require('../models/checkerGudangModel');
const User = require('../models/userModel');
const KantorCabang = require('../models/kantorCabangModel');
const Gudang = require('../models/gudangModel');
const HakAkses = require('../models/hakAksesModel');

const addCheckerGudang = async (req, res) => {
    const {
        id_user,
        id_gudang
    } = req.body;

    try {
        const neCheckerGudang = await CheckerGUdang.create({
            id_user,
            id_gudang
        });
        res.status(200).send(neCheckerGudang);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllCheckerGudang = async (req, res) => {
    try {
        const checker_gudang = await CheckerGUdang.findAll({
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
        res.status(200).send(checker_gudang);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addCheckerGudang,
    getAllCheckerGudang
};

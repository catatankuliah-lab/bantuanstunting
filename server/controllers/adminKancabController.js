const AdminKancab = require('../models/adminKancabModel');
const User = require('../models/userModel');
const KantorCabang = require('../models/kantorCabangModel');
const HakAkses = require('../models/hakAksesModel');

const addAdminKancab = async (req, res) => {
    const {
        id_user,
        id_kantor_cabang
    } = req.body;

    try {
        const newAdminKancab = await AdminKancab.create({
            id_user,
            id_kantor_cabang
        });
        res.status(200).send(newAdminKancab);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllAdminKancab = async (req, res) => {
    try {
        const admin_kancab = await AdminKancab.findAll({
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
                    model: KantorCabang,
                    as: 'kantor_cabang',
                }
            ]
        });
        res.status(200).send(admin_kancab);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addAdminKancab,
    getAllAdminKancab
};

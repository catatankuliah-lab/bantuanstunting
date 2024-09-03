const PetugasPenyalur = require('../models/petugasPenyalurModel');
const User = require('../models/userModel');
const KantorCabang = require('../models/kantorCabangModel');
const HakAkses = require('../models/hakAksesModel');

const addPetugasPenyalur = async (req, res) => {
    const {
        id_user,
        id_kantor_cabang
    } = req.body;

    try {
        const newPetugasPenyalur = await PetugasPenyalur.create({
            id_user,
            id_kantor_cabang
        });
        res.status(200).send(newPetugasPenyalur);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllPetugasPenyalur = async (req, res) => {
    try {
        const petugas_penyalur = await PetugasPenyalur.findAll({
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
        res.status(200).send(petugas_penyalur);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addPetugasPenyalur,
    getAllPetugasPenyalur
};

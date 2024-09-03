const Gudang = require('../models/gudangModel');
const AdminKancab = require('../models/adminKancabModel');
const Wo = require('../models/woModel');
const KantorCabang = require('../models/kantorCabangModel');
const User = require('../models/userModel');
const HakAkses = require('../models/hakAksesModel');
const Alokasi = require('../models/alokasiModel');
const ItemWo = require('../models/itemWoModel');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');
const Desa = require('../models/desaModel');
const Provinsi = require('../models/provinsiModel');

const addWo = async (req, res) => {
    const {
        id_gudang,
        id_admin_kancab,
        id_alokasi,
        nomor_lo,
        tanggal_lo,
        total_tonase,
        status_wo,
        qr_wo
    } = req.body;

    try {
        const newWo = await Wo.create({
            id_gudang,
            id_admin_kancab,
            id_alokasi,
            nomor_lo,
            tanggal_lo,
            total_tonase,
            status_wo,
            qr_wo
        });
        res.status(200).send(newWo);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllWo = async (req, res) => {
    try {
        const wo = await Wo.findAll({
            include: [
                {
                    model: Gudang,
                    as: 'gudang',
                    include: {
                        model: KantorCabang,
                        as: "kantor_cabang",
                    },
                },
                {
                    model: AdminKancab,
                    as: 'admin_kancab',
                    include: {
                        model: User,
                        as: 'user',
                        include: {
                            model: HakAkses,
                            as: "hak_akses",
                        },
                    },
                },
                {
                    model: Alokasi,
                    as: 'alokasi',
                }]
        });
        res.status(200).send(wo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getDetailWO = async (req, res) => {
    const { id } = req.params;
    try {
        const wo = await Wo.findByPk(id, {
            include: [
                {
                    model: Gudang,
                    as: 'gudang',
                    include: {
                        model: KantorCabang,
                        as: "kantor_cabang",
                    },
                },
                {
                    model: AdminKancab,
                    as: 'admin_kancab',
                    include: {
                        model: User,
                        as: 'user',
                        include: {
                            model: HakAkses,
                            as: "hak_akses",
                        },
                    },
                },
                {
                    model: Alokasi,
                    as: 'alokasi',
                }]
        });

        if (!wo) {
            return res.status(404).json({ message: 'WO not found' });
        }

        res.status(200).json(wo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getDetailsWO = async (req, res) => {
    const { id } = req.params;
    try {
        const wo = await Wo.findByPk(id, {
            include: [
                {
                    model: Alokasi,
                    as: 'alokasi',
                },
                {
                    model: ItemWo,
                    as: 'item_wo',
                    include: [
                        {
                            model: Desa,
                            as: "desa_kelurahan",
                            include: {
                                model: Kecamatan,
                                as: "kecamatan",
                                include: {
                                    model: Kabupaten,
                                    as: "kabupaten_kota",
                                    include: {
                                        model: Provinsi,
                                        as: "provinsi",
                                    }
                                }
                            }
                        }
                    ]
                },
            ]
        });

        if (!wo) {
            return res.status(404).json({ message: 'WO not found' });
        }

        res.status(200).json(wo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addWo,
    getAllWo,
    getDetailWO,
    getDetailsWO
};

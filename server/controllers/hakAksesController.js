const HakAkses = require('../models/hakAksesModel');
const User = require('../models/userModel');

const addHakAkses = async (req, res) => {
    const {
        deskripsi_hak_akses,
    } = req.body;

    try {
        const newHakAkses = await HakAkses.create({
            deskripsi_hak_akses,
        });
        res.status(200).send(newHakAkses);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllHakAkses = async (req, res) => {
    try {
        const hak_akses = await HakAkses.findAll();
        res.status(200).json(hak_akses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getDetailHakAkses = async (req, res) => {
    const { id } = req.params;
    try {
        const hak_akses = await HakAkses.findByPk(id, {
        });

        if (!hak_akses) {
            return res.status(404).json({ message: 'Hak akses not found' });
        }

        res.status(200).json(hak_akses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getDetailsHakAkses = async (req, res) => {
    const { id } = req.params;
    try {
        const hak_akses = await HakAkses.findByPk(id, {
            include: [
                {
                    model: User,
                    as: "user_by_hak_akses",
                }
            ]
        });

        if (!hak_akses) {
            return res.status(404).json({ message: 'Master Data KPM not found' });
        }

        res.status(200).json(hak_akses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addHakAkses,
    getAllHakAkses,
    getDetailHakAkses,
    getDetailsHakAkses
};

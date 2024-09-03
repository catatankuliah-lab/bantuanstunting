const Kabupaten = require("../models/kabupatenModel");
const Provinsi = require("../models/provinsiModel");
const Kecamatan = require('../models/kecamatanModel');

const getAllKabupaten = async (req, res) => {
  try {
    const kabupatens = await Kabupaten.findAll({
      include: {
        model: Provinsi,
        as: "provinsi"
      },
    });
    res.status(200).send(kabupatens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getDetailKabupaten = async (req, res) => {
  const { id } = req.params;
  try {
    const kabupaten = await Kabupaten.findByPk(id, {
      include: [
        {
          model: Provinsi,
          as: 'provinsi',
        }
      ]
    });

    if (!kabupaten) {
      return res.status(404).json({ message: 'Kabupaten not found' });
    }

    res.status(200).json(kabupaten);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getDetailsKabupaten = async (req, res) => {
  const { id } = req.params;
  try {
    const kabupaten = await Kabupaten.findByPk(id, {
      include: [
        {
          model: Kecamatan,
          as: "kecamatan_by_kabupaten"
        }
      ]
    });

    if (!kabupaten) {
      return res.status(404).json({ message: 'Kecamatan not found' });
    }

    res.status(200).json(kabupaten);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllKabupaten,
  getDetailKabupaten,
  getDetailsKabupaten
};

const Kecamatan = require("../models/kecamatanModel");
const Kabupaten = require("../models/kabupatenModel");
const Provinsi = require("../models/provinsiModel");
const Desa = require("../models/desaModel");

const getAllKecamatan = async (req, res) => {
  try {
    const kecamatans = await Kecamatan.findAll({
      include: [
        {
          model: Kabupaten,
          as: "kabupaten_kota",
          include: {
            model: Provinsi,
            as: "provinsi",
          },
        },
      ],
    });
    res.status(200).json(kecamatans);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getDetailKecamatan = async (req, res) => {
  const { id } = req.params;
  try {
    const kecamatan = await Kecamatan.findByPk(id, {
      include: [
        {
          model: Kabupaten,
          as: 'kabupaten_kota',
          include: [
            {
              model: Provinsi,
              as: 'provinsi'
            }
          ]
        }
      ]
    });

    if (!kecamatan) {
      return res.status(404).json({ message: 'Kecamatan not found' });
    }

    res.status(200).json(kecamatan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getDetailsKecamatan = async (req, res) => {
  const { id } = req.params;
  try {
    const kecamatan = await Kecamatan.findByPk(id, {
      include: [
        {
          model: Desa,
          as: "desa_kelurahan_by_kecamatan"
        }
      ]
    });

    if (!kecamatan) {
      return res.status(404).json({ message: 'Desa not found' });
    }

    res.status(200).json(kecamatan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllKecamatan,
  getDetailKecamatan,
  getDetailsKecamatan
};

// controllers/mobilController.js
const Desa = require("../models/desaModel");
const Kecamatan = require("../models/kecamatanModel");
const Kabupaten = require("../models/kabupatenModel");
const Provinsi = require("../models/provinsiModel");
const MasterDataKPM = require("../models/masterDataKpmModel");

const getAllDesa = async (req, res) => {
  try {
    const desa = await Desa.findAll({
      include: [
        {
          model: Kecamatan,
          as: "kecamatan",
          include: {
            model: Kabupaten,
            as: "kabupaten_kota",
            include: {
              model: Provinsi,
              as: "provinsi",
            },
          },
        },
      ],
    });
    res.status(200).json(desa);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getDetailDesa = async (req, res) => {
  const { id } = req.params;
  try {
    const desa = await Desa.findByPk(id, {
      include: [
        {
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
      ]
    });

    if (!desa) {
      return res.status(404).json({ message: 'Desa not found' });
    }

    res.status(200).json(desa);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getDetailsDesa = async (req, res) => {
  const { id } = req.params;
  try {
    const desa = await Desa.findByPk(id, {
      include: [
        {
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
        },
        {
          model: MasterDataKPM,
          as: 'master_data_kpm_by_desa_kelurahan',
        }
      ]
    });

    if (!desa) {
      return res.status(404).json({ message: 'Master Data KPM not found' });
    }

    res.status(200).json(desa);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllDesa,
  getDetailDesa,
  getDetailsDesa
};

const Provinsi = require("../models/provinsiModel");
const Kabupaten = require("../models/kabupatenModel");

const getAllProvinsi = async (req, res) => {
  try {
    const provinsi = await Provinsi.findAll();
    res.status(200).json(provinsi);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getDetailProvinsi = async (req, res) => {
  const { id } = req.params;
  try {
    const provinsi = await Provinsi.findByPk(id, {});

    if (!provinsi) {
      return res.status(404).json({ message: 'Kabupaten not found' });
    }

    res.status(200).json(provinsi);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getDetailsProvinsi = async (req, res) => {
  const { id } = req.params;
  try {
    const provinsi = await Provinsi.findByPk(id, {
      include: [
        {
          model: Kabupaten,
          as: "kabupaten_by_provinsi"
        }
      ]
    });
    if (!provinsi) {
      return res.status(404).json({ message: 'Kecamatan not found' });
    }

    res.status(200).json(provinsi);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllProvinsi,
  getDetailProvinsi,
  getDetailsProvinsi
};

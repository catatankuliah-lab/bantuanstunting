const KantorCabang = require("../models/kantorCabangModel");
const Gudang = require("../models/gudangModel");

const addGudang = async (req, res) => {
  const {
    id_kantor_cabang,
    nama_gudang
  } = req.body;
  try {
    const newGudang = await Gudang.create({
      id_kantor_cabang,
      nama_gudang
    });
    res.status(200).send(newGudang);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getAllGudang = async (req, res) => {
  try {
    const gudangs = await Gudang.findAll({
      include: {
        model: KantorCabang,
        as: "kantor_cabang"
      },
    });
    res.status(200).send(gudangs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addGudang,
  getAllGudang,
};

import asyncHandler from "express-async-handler";
import JenisLayanan from "../../models/layanan/jenisLayanan";
import layananModels from "../../models/layanan/layanan";

const newJenisLayanan = asyncHandler(async (req, res) => {
  const { nama, foto } = req.body;
  try {
    const isExist = await JenisLayanan.findOne({ nama });
    if (isExist) {
      throw new Error("Jenis Layanan Sudah Ada");
    }
    const jenisLayanan = await JenisLayanan.create({ nama, foto });
    res.send(jenisLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getJenisLayanan = asyncHandler(async (req, res) => {
  try {
    const jenisLayanan = await JenisLayanan.find();
    res.send(jenisLayanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const newLayanan = asyncHandler(async (req, res) => {
  const { jenisLayanan, nama, harga, foto, deskripsi, cardDeskripsi } =
    req.body;
  try {
    const isExist = await layananModels.findOne({ nama });
    if (isExist) {
      throw new Error("Layanan Sudah Ada");
    }
    const layanan = await layananModels.create({
      nama,
      durasi,
      harga,
      deskripsi,
      foto,
      cardDeskripsi,
      idJenis: jenisLayanan,
    });
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getLayanan = asyncHandler(async (req, res) => {
  try {
    const layanan = await layananModels.find();
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getLayananById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const layanan = await layananModels.findById(id);
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    jenisLayanan: req.body.jenisLayanan,
    nama: req.body.nama,
    harga: req.body.harga,
    foto: req.body.foto,
    deskripsi: req.body.deskripsi,
    durasi: req.body.durasi,
    cardDeskripsi: req.body.cardDeskripsi,
  };
  try {
    const layanan = await layananModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteLayanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const layanan = await layananModels.findByIdAndDelete(id);
    res.send(layanan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  newJenisLayanan,
  getJenisLayanan,
  newLayanan,
  getLayanan,
  getLayananById,
  updateLayanan,
  deleteLayanan,
};

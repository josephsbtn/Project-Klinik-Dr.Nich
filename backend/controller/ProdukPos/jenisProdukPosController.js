import asyncHandler from "express-async-handler";
import jenisProdukPosModels from "../../models/ProdukPos/jenisProdukPos.js";

const newjenisProdukPos = asyncHandler(async (req, res) => {
  const newjenisProdukPos = {
    jenis: req.body.jenis
  };
  try {
    const isExist = await jenisProdukPosModels.findOne({ jenis: newjenisProdukPos.jenis });
    if (isExist) {
      throw new Error("jenisProdukPos Sudah Ada");
    }
    const jenisProdukPos = await jenisProdukPosModels.create(newjenisProdukPos);
    res.send(jenisProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getjenisProdukPos = asyncHandler(async (req, res) => {
  try {
    const jenisProdukPos = await jenisProdukPosModels.find();
    res.send(jenisProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatejenisProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
    manfaat: req.body.manfaat,
    cara_pakai: req.body.cara_pakai,
    harga: req.body.harga,
    kategori: req.body.kategori,
    tipejenisProdukPos: req.body.tipejenisProdukPos,
  };
  try {
    const jenisProdukPos = await jenisProdukPosModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(jenisProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletejenisProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const jenisProdukPos = await jenisProdukPosModels.findByIdAndDelete(id);
    res.send(jenisProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getjenisProdukPosbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const jenisProdukPos = await jenisProdukPosModels
      .findById(id)
      .populate("kategori", "name")
      .populate("tipejenisProdukPos", "name");

    if (!jenisProdukPos) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(jenisProdukPos);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newjenisProdukPos, getjenisProdukPos, updatejenisProdukPos, deletejenisProdukPos, getjenisProdukPosbyID };

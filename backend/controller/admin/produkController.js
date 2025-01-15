import asyncHandler from "express-async-handler";
import produkModels from "../../models/produk/produk.js";

const newproduk = asyncHandler(async (req, res) => {
  const newproduk = {
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
    manfaat: req.body.manfaat,
    cara_pakai: req.body.cara_pakai,
    harga: req.body.harga,
    kategori: req.body.kategori,
    tipeProduk: req.body.tipeProduk,
  };
  try {
    const isExist = await produkModels.findOne({ nama: newproduk.nama });
    if (isExist) {
      throw new Error("produk Sudah Ada");
    }
    const produk = await produkModels.create(newproduk);
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getproduk = asyncHandler(async (req, res) => {
  try {
    const produk = await produkModels
      .find()
      .populate("kategori") // Populating 'kategori' from the schema
      .populate("tipeProduk"); // Populating 'tipeProduk' from the schema

    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateproduk = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
    manfaat: req.body.manfaat,
    cara_pakai: req.body.cara_pakai,
    harga: req.body.harga,
    kategori: req.body.kategori,
    tipeProduk: req.body.tipeProduk,
  };
  try {
    const produk = await produkModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteproduk = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const produk = await produkModels.findByIdAndDelete(id);
    res.send(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getprodukbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const produk = await produkModels
      .findById(id)
      .populate("kategori", "name")
      .populate("tipeProduk", "name");

    if (!produk) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(produk);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newproduk, getproduk, updateproduk, deleteproduk, getprodukbyID };

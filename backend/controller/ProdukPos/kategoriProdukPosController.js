import asyncHandler from "express-async-handler";
import kategoriProdukPosModels from "../../models/ProdukPos/kategoriProdukPos.js";
import mongoose from 'mongoose';    

const newkategoriProdukPos = asyncHandler(async (req, res) => {
  const newkategoriProdukPos = {
    jenis: req.body.jenis,
    kategori: req.body.kategori
  };
  try {
    const isExist = await kategoriProdukPosModels.findOne({ kategori: newkategoriProdukPos.kategori });
    if (isExist) {
      throw new Error("kategoriProdukPos Sudah Ada");
    }
    const kategoriProdukPos = await kategoriProdukPosModels.create(newkategoriProdukPos);
    res.send(kategoriProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getkategoriProdukPos = asyncHandler(async (req, res) => {
  try {
    const kategoriProdukPos = await kategoriProdukPosModels.find();
    res.send(kategoriProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatekategoriProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto,
    manfaat: req.body.manfaat,
    cara_pakai: req.body.cara_pakai,
    harga: req.body.harga,
    kategori: req.body.kategori,
    tipekategoriProdukPos: req.body.tipekategoriProdukPos,
  };
  try {
    const kategoriProdukPos = await kategoriProdukPosModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(kategoriProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletekategoriProdukPos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const kategoriProdukPos = await kategoriProdukPosModels.findByIdAndDelete(id);
    res.send(kategoriProdukPos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getkategoriProdukPosbyID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const kategoriProdukPos = await kategoriProdukPosModels
      .findById(id)
      .populate("kategori", "name")
      .populate("tipekategoriProdukPos", "name");

    if (!kategoriProdukPos) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(kategoriProdukPos);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

export { newkategoriProdukPos, getkategoriProdukPos, updatekategoriProdukPos, deletekategoriProdukPos, getkategoriProdukPosbyID };

import asyncHandler from "express-async-handler";
import tipeKulitModels from "../../models/produk/tipeKulit.js";

const newtipeKulit = asyncHandler(async (req, res) => {
  const newtipeKulit = {
    name: req.body.name,
  };
  try {
    const isExist = await tipeKulitModels.findOne({ name: newtipeKulit.name });
    if (isExist) {
      throw new Error("tipeKulit Sudah Ada");
    }
    const tipeKulit = await tipeKulitModels.create(newtipeKulit);
    res.send(tipeKulit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const gettipeKulit = asyncHandler(async (req, res) => {
  try {
    const tipeKulit = await tipeKulitModels
      .find()
      .populate("kategori") // Populating 'kategori' from the schema
      .populate("tipetipeKulit"); // Populating 'tipetipeKulit' from the schema
    res.send(tipeKulit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatetipeKulit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newData = {
    name: req.body.name,
  };
  try {
    const tipeKulit = await tipeKulitModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(tipeKulit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletetipeKulit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const tipeKulit = await tipeKulitModels.findByIdAndDelete(id);
    res.send(tipeKulit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { newtipeKulit, gettipeKulit, updatetipeKulit, deletetipeKulit };

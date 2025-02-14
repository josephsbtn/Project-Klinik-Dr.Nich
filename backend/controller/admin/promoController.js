import asyncHandler from "express-async-handler";
import promoModels from "../../models/promo/promo.js";

const BASE_URL = "https://api.drnich.co.id/uploads/";

const newPromo = asyncHandler(async (req, res) => {
  console.log("Request Files:", req.files); // Debug uploaded files

  const fotoDesktop = req.files.fotoDesktop ? req.files.fotoDesktop[0] : null;
  const fotoMobile = req.files.fotoMobile ? req.files.fotoMobile[0] : null;

  const fotoDesktopUrl = fotoDesktop ? `${BASE_URL}${fotoDesktop.filename}` : null;
  const fotoMobileUrl = fotoMobile ? `${BASE_URL}` : null;

  console.log("Foto Desktop URL:", fotoDesktopUrl); // Debugging URL
  console.log("Foto Mobile URL:", fotoMobileUrl);

  const newPromoData = {
    nama: req.body.nama,
    detail: req.body.detail,
    syarat: req.body.syarat,
    fotoDesktop: fotoDesktopUrl,
    fotoMobile: fotoMobileUrl,
  };

  try {
    const isExist = await promoModels.findOne({ nama: newPromoData.nama });
    if (isExist) {
      throw new Error("Promo Sudah Ada");
    }

    const promo = await promoModels.create(newPromoData);
    console.log("Saved Promo Data:", promo); // Ensure data is stored correctly
    res.send(promo);
  } catch (error) {
    console.error("Error saving promo:", error);
    res.status(400).json({ message: error.message });
  }
});


const getPromo = asyncHandler(async (req, res) => {
  try {
    const promo = await promoModels.find();
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getPromoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await promoModels.findById(id);
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updatePromo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fotoDesktop = req.files.fotoDesktop ? req.files.fotoDesktop[0] : null;
  const fotoMobile = req.files.fotoMobile ? req.files.fotoMobile[0] : null;
 const newData = {
   nama: req.body.nama,
   detail: req.body.detail,
   syarat: req.body.syarat,
   fotoDesktop: fotoDesktop.filename,
   fotoMobile: fotoMobile.filename,
 };
  try {
    const promo = await promoModels.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletePromo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await promoModels.findByIdAndDelete(id);
    res.send(promo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { newPromo, getPromo, updatePromo, deletePromo, getPromoById };

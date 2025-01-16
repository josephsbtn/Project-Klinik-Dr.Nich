import express from "express";
import {
  newjenisProdukPos,
  getjenisProdukPos,
  updatejenisProdukPos,
  deletejenisProdukPos,
} from "../../controller/ProdukPos/jenisProdukPosController.js";
import {
  newkategoriProdukPos,
  getkategoriProdukPos,
  updatekategoriProdukPos,
  deletekategoriProdukPos,
} from "../../controller/ProdukPos/kategoriProdukPosController.js";

const router = express.Router();

router.get("/jenisProduk", getjenisProdukPos);
router.post("/jenisProduk", newjenisProdukPos);
router.put("/updatejenisProdukPos/:id", updatejenisProdukPos);
router.delete("/deletejenisProdukPos/:id", deletejenisProdukPos);

router.get("/kategoriProduk", getkategoriProdukPos);
router.post("/kategoriProduk", newkategoriProdukPos);
router.put("/updatekategoriProdukPos/:id", updatekategoriProdukPos);
router.delete("/deletekategoriProdukPos/:id", deletekategoriProdukPos);

export default router;

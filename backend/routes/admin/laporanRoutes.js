import express from "express";
import {
  laporanPenjualan,
  laporanBelanja,
  laporanPenjualanProduk,
  laporanPersediaan,
  laporanLimit,
  laporanTerlaris
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

router.post("/laporanpenjualan", laporanPenjualan)
router.post("/laporanPenjualanProduk", laporanPenjualanProduk)
router.post("/laporanBelanja", laporanBelanja)
router.get("/laporanPersediaan/:id", laporanPersediaan)
router.get("/laporanLimit/", laporanLimit)
router.get("/laporanTerlaris/", laporanTerlaris)

export default router;

import express from "express";
import {
  laporanPenjualan,
  laporanBelanja,
  laporanPenjualanProduk,
  laporanPersediaan,
  laporanLimit,
  laporanTerlaris,
  laporanGrafik,
  laporanGrafikProduk,
  laporanLogProduk,
  laporanGrafikMetode
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

router.post("/laporanpenjualan", laporanPenjualan)
router.post("/laporanPenjualanProduk", laporanPenjualanProduk)
router.post("/laporanBelanja", laporanBelanja)
router.post("/laporanGrafik", laporanGrafik)
router.post("/laporanGrafikProduk", laporanGrafikProduk)
router.post("/laporanGrafikMetode", laporanGrafikMetode)
router.get("/laporanPersediaan/:id", laporanPersediaan)
router.get("/laporanLimit/", laporanLimit)
router.get("/laporanTerlaris", laporanTerlaris)
router.post("/laporanLogProduk", laporanLogProduk)

export default router;

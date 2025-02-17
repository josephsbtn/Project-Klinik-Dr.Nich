import express from "express";
import {
  laporanPenjualan,
  laporanBelanja,
  laporanPenjualanProduk
} from "../../controller/laporanPos/laporanPenjualan.js";

const router = express.Router();

router.post("/laporanpenjualan", laporanPenjualan)
router.post("/laporanPenjualanProduk", laporanPenjualanProduk)
router.post("/laporanBelanja", laporanBelanja)

export default router;

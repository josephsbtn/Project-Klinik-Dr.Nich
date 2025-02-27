import express from "express";
import {
  newpelanggan,
  getpelanggan,
  getpelangganbyID,
  updatepelanggan,
  deletepelanggan,
  getLogPelanggan
} from "../../controller/userPos/pelangganPosController.js";
import {
  newmarketing,
  getmarketing,
  getmarketingbyID,
  updatemarketing,
  deletemarketing,
} from "../../controller/userPos/marketingPosController.js";
import {
  newsupplier,
  getsupplier,
  updatesupplier,
  deletesupplier,
  riwayattransaksi,
  getProdukSupplier
} from "../../controller/userPos/supplierPosController.js";
import {
  newterapis,
  getterapis,
  updateterapis,
  deleteterapis,
} from "../../controller/userPos/terapisPosController.js";
import { getsupplierbyID } from "../../controller/userPos/supplierPosController.js";
import { getterapisbyID } from "../../controller/userPos/terapisPosController.js";

import {upload} from "../../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/pelanggan", getpelanggan);
router.post("/pelanggan", newpelanggan);
router.post("/pelanggan/transaksi", getLogPelanggan);
router.get("/pelanggan/:id", getpelangganbyID);
router.put("/updatepelanggan/:id", updatepelanggan);
router.delete("/deletepelanggan/:id", deletepelanggan);

router.get("/supplier", getsupplier);
router.get("/supplier/produk/:id", getProdukSupplier);
router.get("/supplier/:id", getsupplierbyID);
router.post("/supplier", newsupplier);
router.post("/supplier/riwayattransaksi", riwayattransaksi);
router.put("/updatesupplier/:id", updatesupplier);
router.delete("/deletesupplier/:id", deletesupplier);

router.get("/terapis", getterapis);
router.get("/terapis/:id", getterapisbyID);
router.post("/terapis", upload.single("image"), newterapis);
router.put("/updateterapis/:id",  upload.single("image"), updateterapis);
router.delete("/deleteterapis/:id", deleteterapis);

router.get("/marketing", getmarketing);
router.get("/marketing/:id", getmarketingbyID);
router.post("/marketing", upload.single("image"), newmarketing);
router.put("/updatemarketing/:id",  upload.single("image"), updatemarketing);
router.delete("/deletemarketing/:id", deletemarketing);

export default router;

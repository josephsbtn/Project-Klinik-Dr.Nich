import express from "express";
import {
  newTransaksi,
  getTransaksi,
  getTransaksiDraft,
  updateTransaksi,
  deleteTransaksi,
  getTransaksiInvoice,
  kalkulasiHarga,
  getTransaksiByID,
  simpanStruk
} from "../../controller/kasirPos/transaksiController.js";
import {
  newDetailTransaksi,
  getDetailTransaksi,
  updateDetailTransaksi,
  deleteDetailTransaksi,
} from "../../controller/kasirPos/detailTransaksiController.js";
import { protect } from "../../middleware/authMiddleware.js";
import {upload} from "../../middleware/uploadMiddleware.js";
const router = express.Router();

router.get("/transaksi", getTransaksi); 
router.get("/transaksi/:id", getTransaksiByID); 
router.get("/draftTransaksi", getTransaksiDraft);
router.get("/transaksiinvoice", getTransaksiInvoice);
router.post("/transaksi", protect([1,3]), newTransaksi);
router.post("/struk", upload.single("image") , simpanStruk);
router.post("/kalkulasiharga", kalkulasiHarga);
router.put("/updatetransaksi/:id", protect([1,3]), updateTransaksi);
router.delete("/deletetransaksi/:id", deleteTransaksi);

router.get("/detailTransaksi", getDetailTransaksi);
router.post("/detailTransaksi", newDetailTransaksi);
router.put("/updatedetailTransaksi/:id", updateDetailTransaksi);
router.delete("/deletedetailTransaksi/:id", deleteDetailTransaksi);

export default router;

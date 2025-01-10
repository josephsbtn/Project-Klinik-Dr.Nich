import express from "express";
import {
  newproduk,
  getproduk,
  updateproduk,
  deleteproduk,
  getprodukbyID,
} from "../../controller/admin/produkController.js";

const router = express.Router();
router.post("/tambahproduk", newproduk);
router.get("/getAllproduk", getproduk);
router.put("/updateproduk/:id", updateproduk);
router.delete("/deleteproduk/:id", deleteproduk);
router.get("/getprodukbyId/:id", getprodukbyID);

export default router;

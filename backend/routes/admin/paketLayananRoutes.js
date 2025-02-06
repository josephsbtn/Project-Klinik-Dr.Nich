import express from "express";
import {
  newpaketLayanan,
  getpaketLayanan,
  updatepaketLayanan,
  deletepaketLayanan,
  getpaketLayananById,
} from "../../controller/admin/paketLayananController.js";

const router = express.Router();
router.post("/tambahpaketLayanan", newpaketLayanan);
router.get("/getAllpaketLayanan", getpaketLayanan);
router.get("/getpaketLayananById/:id", getpaketLayananById);
router.put("/updatepaketLayanan/:id", updatepaketLayanan);
router.delete("/deletepaketLayanan/:id", deletepaketLayanan);

export default router;

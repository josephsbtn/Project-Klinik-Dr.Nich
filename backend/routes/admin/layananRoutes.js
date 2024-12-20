import express from "express";
import {
  newJenisLayanan,
  getJenisLayanan,
  newLayanan,
  getLayanan,
  getLayananById,
  updateLayanan,
  deleteLayanan,
} from "../../controller/admin/layananController.js";

const router = express.Router();

router.post("/tambahJenisLayanan", newJenisLayanan);
router.get("/getAllJenisLayanan", getJenisLayanan);
router.post("/tambahLayanan", newLayanan);
router.get("/getAllLayanan", getLayanan);
router.get("/getLayananById/:id", getLayananById);
router.put("/updateLayanan/:id", updateLayanan);
router.delete("/deleteLayanan/:id", deleteLayanan);

export default router;

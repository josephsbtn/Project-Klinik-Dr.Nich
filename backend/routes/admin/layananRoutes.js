import express from "express";
import {
  newJenisLayanan,
  getJenisLayanan,
  newLayanan,
  getLayanan,
  getLayananById,
  getJenisLayananById,
  updateLayanan,
  updateJenisLayanan,
  deleteLayanan,
  deleteJenisLayanan,
} from "../../controller/admin/layananController.js";

const router = express.Router();

router.post("/tambahJenisLayanan", newJenisLayanan);
router.get("/getAllJenisLayanan", getJenisLayanan);
router.post("/tambahLayanan", newLayanan);
router.get("/getAllLayanan", getLayanan);
router.get("/getLayananById/:id", getLayananById);
router.get("/getJenisLayananById/:id", getJenisLayananById);
router.put("/updateLayanan/:id", updateLayanan);
router.put("/updateJenisLayanan/:id", updateJenisLayanan);
router.delete("/deleteLayanan/:id", deleteLayanan);
router.delete("/deleteJenisLayanan/:id", deleteJenisLayanan);

export default router;

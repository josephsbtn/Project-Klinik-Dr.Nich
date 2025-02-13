import express from "express";
import {
  newPromo,
  getPromo,
  updatePromo,
  deletePromo,
  getPromoById,
} from "../../controller/admin/promoController.js";
import { upload } from "../../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/tambahpromo", upload.single("image"), newPromo);
router.get("/getAllpromo", getPromo);
router.get("/getPromoById/:id", getPromoById);
router.put("/updatepromo/:id", upload.single("image"), updatePromo);
router.delete("/deletepromo/:id", deletePromo);

export default router;

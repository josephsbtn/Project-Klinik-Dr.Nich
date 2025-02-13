import express from "express";
import {
  newGaleri,
  getGaleri,
  editGaleri,
  deleteGaleri,
  getGaleriById,
} from "../../controller/admin/galeriController.js";
import { protect } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/createGaleri",
  upload.single("image"),
  protect([1, 4]),
  newGaleri
);
router.get("/getAllGaleri", getGaleri);
router.get("/getGaleriById/:id", getGaleriById);
router.put(
  "/editGaleri/:id",
  upload.single("image"),
  protect([1, 4]),
  editGaleri
);
router.delete("/deleteGaleri/:id", protect([1, 4]), deleteGaleri);

export default router;

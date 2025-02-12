import express from "express";
import {
  newGaleri,
  getGaleri,
  editGaleri,
  deleteGaleri,
  getGaleriById,
} from "../../controller/admin/galeriController.js";

const router = express.Router();

router.post("/createGaleri", newGaleri);
router.get("/getAllGaleri", getGaleri);
router.get("/getGaleriById/:id", getGaleriById);
router.put("/editGaleri/:id", editGaleri);
router.delete("/deleteGaleri/:id", deleteGaleri);

export default router;

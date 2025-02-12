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

router.post("/createGaleri",(protect([1]) || protect([4])), newGaleri);
router.get("/getAllGaleri",protect([1,4]), getGaleri);
router.get("/getGaleriById/:id",(protect([1]) || protect([4])), getGaleriById);
router.put("/editGaleri/:id",(protect([1]) || protect([4])), editGaleri);
router.delete("/deleteGaleri/:id",(protect([1]) || protect([4])), deleteGaleri);

export default router;

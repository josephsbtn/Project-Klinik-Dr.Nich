import express from "express";
import {
  registerAdmin,
  getAdmins,
  deleteAdmin,
  cekLogin,
} from "../../controller/admin/adminController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/registerAdmin", registerAdmin); 
router.get("/getAdmins", getAdmins); 
router.delete("/deleteAdmin/:id", protect([1]), deleteAdmin); 
router.post("/Login", cekLogin); 

export default router;

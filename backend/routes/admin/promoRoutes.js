import express from "express";
import {
  newpromo,
  getpromo,
  updatepromo,
  deletepromo,
} from "../../controller/admin/promoController.js";

const router = express.Router();
router.post("/tambahpromo", newpromo);
router.get("/getAllpromo", getpromo);
router.put("/updatepromo/:id", updatepromo);
router.delete("/deletepromo/:id", deletepromo);

export default router;

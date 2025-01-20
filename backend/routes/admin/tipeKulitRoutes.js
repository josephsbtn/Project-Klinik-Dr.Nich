import express from "express";
import {
    newtipeKulit,
    gettipeKulit,
    updatetipeKulit,
    deletetipeKulit,
} from "../../controller/admin/tipeKulitController.js";

const router = express.Router();

router.post("/createtipeKulit", newtipeKulit);
router.get("/getAlltipeKulit", gettipeKulit);
router.put("/edittipeKulit/:id", updatetipeKulit);
router.delete("/deletetipeKulit/:id", deletetipeKulit);

export default router;

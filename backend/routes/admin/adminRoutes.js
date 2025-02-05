import express from "express";
import {
    newadmin, getadmin, deleteadmin, cekLogin,
} from "../../controller/admin/adminController.js";

const router = express.Router();

router.post("/newadmin", newadmin);
router.get("/getAlladmin", getadmin);
router.delete("/deleteadmin/:id", deleteadmin);
router.post("/Login", cekLogin);

export default router;

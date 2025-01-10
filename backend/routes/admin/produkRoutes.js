import express from "express";
import {
  newproduk,
  getproduk,
  updateproduk,
  deleteproduk,
  getprodukbyID,
} from "../../controller/admin/produkController.js";
import {
  newCategoryProduct,
  getCategoryProduct,
  deleteCategoryProduct,
  editCategoryProduct,
  newProductType,
  getProductType,
  editProductType,
  deleteProductType,
} from "../../controller/admin/jenisKategoriProdukController.js";

const router = express.Router();

//PRODUCT
router.post("/tambahproduk", newproduk);
router.get("/getAllproduk", getproduk);
router.put("/updateproduk/:id", updateproduk);
router.delete("/deleteproduk/:id", deleteproduk);
router.get("/getprodukbyId/:id", getprodukbyID);

//PRODUCT CATEGORY
router.post("/tambahkategoriProduk", newCategoryProduct);
router.get("/getAllkategoriProduk", getCategoryProduct);
router.delete("/deletekategoriProduk/:id", deleteCategoryProduct);
router.put("/editkategoriProduk/:id", editCategoryProduct);

//PRODUCT TYPE
router.post("/tambahproductType", newProductType);
router.get("/getAllproductType", getProductType);
router.put("/editproductType/:id", editProductType);
router.delete("/deleteproductType/:id", deleteProductType);

export default router;

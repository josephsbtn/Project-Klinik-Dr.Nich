import express from "express";
import {
  newproduk,
  getproduk,
  updateproduk,
  deleteproduk,
  getprodukbyID,
  newImage,
  getImage,
  updateImage,
  deleteImage,
  getprodukbycategory,
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
  getCategoryById,
} from "../../controller/admin/jenisKategoriProdukController.js";

import {
  newtipeKulit,
  gettipeKulit,
  updatetipeKulit,
  deletetipeKulit,
} from "../../controller/admin/tipeKulitController.js";
import {protect} from "../../middleware/auth.js";
const router = express.Router();

//CAROUSEL PRODUCT
router.post("/newImage",protect([1,4]), newImage);
router.get("/getImage",protect([1,4]), getImage);
router.put("/updateImage/:id",protect([1,4]), updateImage);
router.delete("/deleteImage/:id",protect([1,4]), deleteImage);

//PRODUCT
router.post("/tambahproduk",protect([1,4]), newproduk);
router.get("/getAllProduk",protect([1,4]), getproduk);
router.put("/updateproduk/:id",protect([1,4]), updateproduk);
router.delete("/deleteproduk/:id",protect([1,4]), deleteproduk);
router.get("/getprodukbyId/:id",protect([1,4]), getprodukbyID);
router.get("/getProductByCategory/:id",protect([1,4]), getprodukbycategory);

//PRODUCT CATEGORY
router.post("/tambahkategoriProduk",protect([1,4]), newCategoryProduct);
router.get("/getAllkategoriProduk",protect([1,4]), getCategoryProduct);
router.delete("/deletekategoriProduk/:id",protect([1,4]), deleteCategoryProduct);
router.put("/editkategoriProduk/:id",protect([1,4]), editCategoryProduct);
router.get("/getCategoryById/:id",protect([1,4]), getCategoryById);

//PRODUCT TYPE
router.post("/tambahproductType",protect([1,4]), newProductType);
router.get("/getAllproductType",protect([1,4]), getProductType);
router.put("/editproductType/:id",protect([1,4]), editProductType);
router.delete("/deleteproductType/:id",protect([1,4]), deleteProductType);

//TIPE KULIT
router.post("/createtipeKulit",protect([1,4]), newtipeKulit);
router.get("/getAlltipeKulit",protect([1,4]), gettipeKulit);
router.put("/edittipeKulit/:id",protect([1,4]), updatetipeKulit);
router.delete("/deletetipeKulit/:id",protect([1,4]), deletetipeKulit);

export default router;

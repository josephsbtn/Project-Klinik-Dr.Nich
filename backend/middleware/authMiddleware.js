import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { admin } from "../models/admin/adminModels.js";

const protect = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    
    // Ambil token dari cookies atau Authorization header
    let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      // Verifikasi token menggunakan secret yang ada di environment
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cari admin berdasarkan ID yang didapat dari token
      const foundAdmin = await admin.findById(decoded.id).select("-password");

      if (!foundAdmin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      // Simpan data admin di request untuk digunakan di route berikutnya
      req.admin = foundAdmin;

      // Cek apakah role yang diminta cocok dengan role admin yang ditemukan
      if (roles.length && !roles.includes(foundAdmin.level)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next(); // Lanjutkan ke route berikutnya
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  });
};

export { protect };

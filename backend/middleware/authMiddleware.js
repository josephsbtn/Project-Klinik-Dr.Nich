import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { admin } from "../models/admin/adminModels.js";

const protect = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    // Ambil token dari cookies atau headers
    let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    // Jika tidak ada token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      // Verifikasi token dengan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cari admin berdasarkan ID yang ada di dalam token
      const foundAdmin = await admin.findById(decoded.id).select("-password");

      // Jika admin tidak ditemukan
      if (!foundAdmin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      // Simpan admin yang ditemukan ke dalam req untuk digunakan di route berikutnya
      req.admin = foundAdmin;

      // Cek apakah level admin sesuai dengan yang diizinkan
      if (roles.length && !roles.includes(foundAdmin.level)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Jika semuanya baik-baik saja, lanjutkan ke route berikutnya
      next();
    } catch (error) {
      // Log error untuk debugging
      console.error("Token verification failed:", error);
      // Menangani kesalahan token (misalnya token yang tidak valid atau expired)
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  });
};

export { protect };
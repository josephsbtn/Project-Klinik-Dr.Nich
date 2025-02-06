import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { admin } from "../models/admin/adminModels.js";

const protect = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cari admin berdasarkan ID dari token
      const foundAdmin = await admin.findById(decoded.id).select("-password");

      if (!foundAdmin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      // Simpan admin ke dalam req
      req.admin = foundAdmin;

      // Cek apakah role admin sesuai dengan yang diizinkan
      if (roles.length && !roles.includes(foundAdmin.level)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  });
};

export { protect };

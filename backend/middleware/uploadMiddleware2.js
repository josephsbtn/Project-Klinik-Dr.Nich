import multer from "multer";
import path from "path";

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
 
    cb(null, true);
  
};

// Multer upload instance
const upload = multer({ storage, fileFilter });
export { upload };

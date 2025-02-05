import asyncHandler from "express-async-handler";
import adminModels from "../../models/admin/adminModels.js";

const newadmin = asyncHandler(async (req, res) => {
  const newadmin = {
    name: req.body.name,
    password: req.body.password,
    level: req.body.level,
  };
  try {
    const isExist = await adminModels.findOne({ name: newadmin.name });
    if (isExist) {
      throw new Error("admin Sudah Ada");
    }
    const admin = await adminModels.create(newadmin);
    res.send(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getadmin = asyncHandler(async (req, res) => {
  try {
    const admin = await adminModels.find();
    res.send(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteadmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await adminModels.findByIdAndDelete(id);
    res.send(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { newadmin, getadmin, deleteadmin };

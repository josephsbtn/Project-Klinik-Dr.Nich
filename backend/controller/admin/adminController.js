import asyncHandler from "express-async-handler";
import adminModels from "../../models/admin/adminModels.js";

const newadmin = asyncHandler(async (req, res) => {
    const { name, password, level } = req.body;

    try {
        const isSame = await adminModels.findOne({ name: name });
        if (isSame) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const levelHash = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, levelHash);

        const newadmin = new admin({
            name,
            password: hashPass,
            level,
        });

        const admin = await newadmin.save();
        res.send(admin);
    } catch (error) {
        return res.status(400).json({ error: error.message });
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

const cekLogin = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    try {
        const admin = await admin.findOne({ name });
        if (!admin) {
            return res.status(400).json({ message: "admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        return res.status(200).json(admin);
    } catch (error) {
        console.error("Error during login:", error);
        return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
    }

});
export { newadmin, getadmin, deleteadmin, cekLogin };

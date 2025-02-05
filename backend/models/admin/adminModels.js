import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    level: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);


const admin = mongoose.model("admin", adminSchema);
export default admin;

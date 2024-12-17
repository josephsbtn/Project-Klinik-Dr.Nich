import mongoose from "mongoose";

const reserveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: "Non-User",
    },
    layanan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Layanan",
    },
  },
  {
    timestaps: true,
  }
);

const reserveModel = mongoose.model("Reserve", reserveSchema);
export default reserveModel;

import mongoose from "mongoose";

const promoSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    detail: {
        type: String,
        required: true,
      },
    foto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("promo", promoSchema);
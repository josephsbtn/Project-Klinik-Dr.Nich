import mongoose from "mongoose";

const produkSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
    },
    foto: {
      type: String,
      required: true,
    },
    manfaat: {
      type: String,
    },
    cara_pakai: {
      type: String,
    },
    harga: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("produk", produkSchema);

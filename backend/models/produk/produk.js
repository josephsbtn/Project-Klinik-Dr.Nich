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
    kategori: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryProduct",
    },
    tipeProduk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productType",
    },
    buyCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("produk", produkSchema);

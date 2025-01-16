import mongoose from "mongoose";

const pelangganPosSchema = mongoose.Schema(
  {
    namapelanggan: {
      type: String,
      required: true,
    },
    nomorTelepon:{
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    alamat:{
      type: String,
	required: true,
    },
    poin: {
      type: Number,
	default: 0,
    },
    kategori: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kategoriProdukPos",
    },
    minStok: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("pelangganPos", pelangganPosSchema);

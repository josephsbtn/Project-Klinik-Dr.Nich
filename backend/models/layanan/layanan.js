import mongoose from "mongoose";

const namaLayananSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    durasi: {
      type: String,
    },
    harga: {
      type: Number,
    },
    deskripsi: {
      type: String,
    },
    image: {
      type: String,
    },
    cardDeskripsi: {
      type: String,
      required: true,
    },
    idJenis: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "layanan",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("NamaLayanan", namaLayananSchema);

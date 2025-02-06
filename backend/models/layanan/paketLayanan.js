import mongoose from "mongoose";

const paketLayananSchema = mongoose.Schema(
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
    listTreatment: {
      type: String,
    },
    image: {
      type: String,
    },
    manfaat: {
      type: String,
    },
  },
  {
    timestaps: true,
  }
);

export default mongoose.model("paketLayanan", paketLayananSchema);

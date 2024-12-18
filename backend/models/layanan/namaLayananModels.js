import mongoose from "mongoose";

const namaLayananSchema = mongoose.Schema({
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
  idJenis: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "layanan",
  },
});

export default mongoose.model("NamaLayanan", namaLayananSchema);

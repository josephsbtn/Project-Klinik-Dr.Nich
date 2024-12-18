import mongoose from "mongoose";

const layananSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
});

export default mongoose.model("layanan", layananSchema);

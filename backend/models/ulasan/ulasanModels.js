import mongoose from "mongoose";

const ulasanSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    ulasan: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ulasan = mongoose.model("ulasan", ulasanSchema);

export default ulasan;

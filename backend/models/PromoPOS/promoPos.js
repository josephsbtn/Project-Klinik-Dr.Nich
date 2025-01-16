import mongoose from "mongoose";

const promoPosSchema = mongoose.Schema(
  {
    namaPromo: {
      type: String,
      required: true,
    },
    potongan: {
        type: Number,
    }
},
  {
    timestamps: true,
  }
);

export default mongoose.model("promoPos", promoPosSchema);

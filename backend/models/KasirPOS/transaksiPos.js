import mongoose from "mongoose";

const pelangganPosSchema = mongoose.Schema(
  {
    promo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "promoPos",
    },
    total: {
      type: Number,
      required: true,
    },
    poin:{
      type: Number,
    required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("pelangganPos", pelangganPosSchema);

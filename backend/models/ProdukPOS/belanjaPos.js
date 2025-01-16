import mongoose from "mongoose";

const BelanjaPosSchema = mongoose.Schema(
  {
    poin:{
      type: Number,
    required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BelanjaPos", BelanjaPosSchema);

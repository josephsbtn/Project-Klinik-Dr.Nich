import mongoose from "mongoose";

const terapisPosSchema = mongoose.Schema(
  {
    namaTerapis: {
      type: String,
      required: true,
    },
    nomorTelepon:{
      type: String,
    },
    alamat:{
      type: String,
	required: true,
    },
    keterangan: {
      type: String,
	required: true
    },
    namaRekening: {
      type: String,
	required: true
    },
    bank: {
      type: String,
	required: true
    },
    nomorRekening: {
      type: Number,
	default: 0,
    },
    keterangan: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("terapisPos", terapisPosSchema);

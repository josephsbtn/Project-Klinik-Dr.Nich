import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import { navContext } from "../../../App2";
import { useLocation } from "react-router-dom";

import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";
import axios from "axios";
import { toast } from "react-toastify";
// import { BiLockAlt } from "react-icons/bi"

export const RatingDetail = () => {
  const lokasi = useLocation();
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const [gambar, setGambar] = useState("");
  const datadummy = lokasi.state;
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await axios.get(
        // `http://localhost:8000/api/ulasan/getUlasanById/${id}`
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/ulasan/getUlasanById/${id}`
      );
      setdatax(response.data);
      setGambar(response.data.foto);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    setLink(-1);
    setNav('Detail Rating')
  }, []);

  const handleHapus = () => {
    try{
    axios.delete(`${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/ulasan/deleteulasan/${id}`).then(
      response =>{
        response.status==200 && toast.success("Berhasil Menghapus Review")
        setTimeout(()=>{
          toast.success('Kembali ke halaman rating')
          navigate(-1)
        },1000)
      }
    )
  }
    catch{
      toast.error("Gagal menghapus rating")
    }
  }

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        <div className="flex flex-col gap-2 text-[12px] w-full border rounded-lg p-3 border-[#C2A353]">
          <div className="w-[115px] h-[115px] border rounded-lg ">
            <img src={gambar} alt="" className="" />
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Nama Pelanggan</p>
            <p className="text-[#454545]">{datax.nama}</p>
          </div>
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Rating</p>
            <p className="text-[#454545]">{datax.rating}</p>
          </div>
          <div className=" text-start ">
            <p className="text-[#BDBDBD]">Deskripsi</p>
            <p className="text-[#454545]">{datax.ulasan}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleHapus}
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus
          </button>
          <Link
            to={{ pathname: `/pos/UpdateRating/${id}` }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RatingDetail;

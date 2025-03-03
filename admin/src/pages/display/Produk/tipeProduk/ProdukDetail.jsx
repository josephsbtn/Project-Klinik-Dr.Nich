import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { data, Link, useParams } from "react-router-dom";
import { navContext } from "../../../../App2";

import { useLocation } from "react-router-dom";
import axios from "axios";

export const ProdukDetail = () => {
  const lokasi = useLocation();
  const dammyData = lokasi.state;
  const { id } = useParams();
  const { setNav, setLink } = useContext(navContext);
  const [datax, setdatax] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/api/produk/getProdukTipeById/${id}`
  //     );
  //     console.log(response.data);
  //     setdatax(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // fetchData();
    const fetchData = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/produk/getProdukTipeById/${id}`
      );
      setdatax(response.data);
    };
    fetchData();
    setNav('Detail Tipe Produk')
    setLink('/pos/produktipe')
  }, []);

  const navigate = useNavigate()
const handleHapus = () => {
    try{
    axios.delete(`${
          import.meta.env.VITE_BASE_URL_BACKEND
        }/api/foto/deleteMesin/${id}`).then(
      response =>{
        response.status==200 && toast.success("Berhasil Menghapus Sertifikat")
        setTimeout(()=>{
          toast.success('Kembali ke halaman Sertifikat')
          navigate('/pos/sertifikat')
        },1000)
      }
    )
  }
    catch{
      toast.error("Gagal menghapus Sertifikat")
    }
  }

  document.title = "Detail";
  return (
    <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
      <div className="flex flex-col justify-between w-full h-full py-3 px-3">
        <div className="flex flex-col text-[12px] w-full border rounded-lg p-3 border-[#C2A353]">
          <div className="text-start  mt-1">
            <p className="text-[#BDBDBD]">Nama Tipe produk</p>
            <p className="text-[#454545]">{datax.name}</p>
          </div>
        </div>
        <div className="flex gap-1">
        <button
            onClick={handleHapus}
            className="flex justify-center items-center gap-2 h-[44px] w-full max-w-[115px]  border border-[#C2A353] font-medium rounded-lg text-[14px] bg-gradient-to-r from-[#C2A353] to-[#EAC564] text-transparent bg-clip-text"
          >
            Hapus{" "}
          </button>
          <Link
            to={{ pathname: `/pos/UpdateTipeProduk/${id}` }}
            className="flex justify-center items-center gap-2 h-[44px] w-full min-m-[160px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg text-[14px] "
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProdukDetail;

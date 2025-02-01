import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../App2";
import axios from "axios";

export const JenisProduct = () => {
  const { setNav } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const [cari, setCari] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/jenisproduk", {withCredentials: true})
        .then((response) => {
          setdatax(response.data);
        });
    };
    fetchData();
    setNav("Jenis Product");
  }, []);

  // console.log(datax);

  const filterData = datax.filter((data) =>
    data.jenis?.toLowerCase().includes(cari.toLowerCase())
  );

  document.title = "Jenis Product";
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] h-screen  overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="mt-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={(e) => setCari(e.target.value)}
          type="text"
          className="text-sm w-full focus:outline-none"
          placeholder="Cari..."
        />
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {filterData.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-black/40">
            Tidak Ada Data
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full h-full items-center justify-start">
            {filterData.map((data, i) => (
              <Link
                to={{
                  pathname: `/jenisprodukdetail/${data._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className=" flex flex-col place-items-start font-semibold">
                  <li className="text-[#454545]/80">{data.jenis}</li>
                </ul>
                <AiOutlineRightCircle size={20} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3">
        <a
          href="addjenisproduk"
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
        >
          <AiFillPlusCircle size={20} /> Tambah Jenis
        </a>
      </div>
    </div>
  );
};

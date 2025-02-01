import { useContext, useEffect, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { navContext } from "../../App2";
import axios from "axios";

export const Pelanggan = () => {
  const { setNav } = useContext(navContext);
  const [datax, setdatax] = useState([]);
  const [cari, setCari] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/user/pelanggan")
        .then((response) => setdatax(response.data));
    };
    fetchData();
    setNav("Pelanggan");
  }, []);

  console.log(datax);
  const filterdata = datax.filter(
    (data) =>
      data.namaPelanggan?.toLowerCase().includes(cari.toLowerCase()) ||
      data.nomorTelepon?.toLowerCase().includes(cari.toLowerCase())
  );
  // console.log(filterdata);

  document.title = "Pelanggan";
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-fit overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="mt-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          onChange={(e) => setCari(e.target.value)}
          value={cari}
          type="text"
          className="w-full focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px]">
        {filterdata.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
            Tidak Ada Data
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {filterdata.map((data, i) => (
              <Link
                to={{
                  pathname: `/pelanggandetail/${data._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={i}
              >
                <ul className=" flex flex-col place-items-start font-semibold">
                  <li>{data.namaPelanggan}</li>
                  <li className="text-[#BDBDBD]">
                    {data.nomorTelepon}
                  </li>
                </ul>
                <AiOutlineRightCircle size={20} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-auto p-3">
        <a
          href="addpelanggan"
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
        >
          <AiFillPlusCircle size={20} /> Tambah Pelanggan
        </a>
      </div>
    </div>
  );
};

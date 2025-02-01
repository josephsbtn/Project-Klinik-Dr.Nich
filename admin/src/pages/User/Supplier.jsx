import { useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import { Link } from "react-router-dom";
import axios from "axios";

export const Supplier = () => {
  const { setNav } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [datasupplier, setdatasupplier] = useState([]);
  const [cari, setCari] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/user/supplier")
        .then((response) => setDatax(response.data));
    };
    fetchData();
    setNav("Supplier");
  }, []);

  const filterData = datax.filter(
    (data) =>
      data.namaPerusahaan?.toLowerCase().includes(cari.toLowerCase()) ||
      data.nomorTelepon?.toLowerCase().includes(cari.toLowerCase())
  );
  // console.log(filterData);

  document.title = "Supplier";
  return (
    <div className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] h-screen  overflow-auto overflow-y-scroll scrollbar-hide px-7">
      <form className="mt-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
        <AiOutlineSearch size={20} />
        <input
          type="text"
          className="w-full focus:outline-none"
          placeholder="Cari..."
        ></input>
      </form>
      <div className="flex flex-col justify-between w-full h-full py-3 px-3 text-[12px] overflow-auto">
        {datax.length === 0 ? (
          <div className="flex flex-col w-full h-full items-center justify-center text-[#454545]">
            Belum Ada Data Supplier!
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full h-full items-center justify-start">
            {datax.map((supp) => (
              <Link
                to={{
                  pathname: `/supplierdet/${supp._id}`,
                }}
                className="w-full border flex justify-between items-center rounded-xl border-[#BDBDBD] px-3 py-3"
                key={supp._id}
              >
                <ul className=" flex flex-col place-items-start font-semibold">
                  {/* <li>{supp.id}</li> */}
                  <li>{supp.namaPerusahaan}</li>
                  <li className="text-[#BDBDBD]">
                    {supp.nomorTelepon}
                  </li>
                </ul>
                <AiOutlineRightCircle size={20} />
              </Link>
            ))}
          </div>
        )}
      </div>
        <div className="mt-3">
          <a
            href="addsupplier"
            className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-bold rounded-xl p-3 text-[14px] mt-3"
          >
            <AiFillPlusCircle size={16} /> Tambah Supplier
          </a>
        </div>
    </div>
  );
};

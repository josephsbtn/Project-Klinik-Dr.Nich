import { useContext, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { navContext } from "../../App2";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import iNext from "../../assets/iNext.svg";

export const DetailProduk = () => {
  const [product, setproduct] = useState([]);
  const { setNav, setSort, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const [fetched, setFetched] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/produk/" + id)
        .then((response) => {
          setproduct(response.data);
          console.log(response);
        });
    };
    fetchData();
    setNav("Daftar Produk");
    setLink('/pos/daftarproduk')
    setSort(false)
  }, []);

  useEffect(() => {
    product.kategori && setFetched(true);
  }, [product]);

  const deleteData = async () => {
    await axios
      .delete("https://api.drnich.co.id/api/pos/produk/deleteproduk/" + id)
      .then(
        (response) => response.status == 200 && navigate("../daftarproduk")
      );
  };
  return (
    <div className="flex flex-col py-5 gap-[10px] bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-9">
      {fetched == false ? (
        <></>
      ) : (
        <>
          <a href="#" className="w-full mb-2 px-1 flex h-[80px]">
            <span className="w-full h-full border rounded-xl px-0 py-[20px] border-[#C2A353] flex items-center font-semibold text-[14px]">
              <p className="ms-[15px]">{product.jenis.jenis}</p>
              <div className="flex ms-auto me-[15px] w-[18px] h-[18px]">
                <img src={iNext} alt="" />
              </div>
            </span>
          </a>
          <div className="flex flex-col p-[20px] rounded-xl border border-[#C2A353] mx-1">
            <label className="text-start font-light">
              Kategori Produk
            </label>
            <p className="text-start font-semibold h-[20px]">
              {product.kategori.kategori}
            </p>
            <label className="text-start font-light mt-[10px]">Nama Produk</label>
            <p className="text-start font-semibold h-[20px]">
              {product.namaProduk}
            </p>
            <label className="text-start font-light mt-[10px]">SKU</label>
            <p className="text-start font-semibold h-[20px]"></p>
            <label className="text-start font-light mt-[10px]">Harga Beli</label>
            <p className="text-start font-semibold h-[20px]">
              {product.hargaBeli}
            </p>
            <label className="text-start font-light mt-[10px]">Harga Jual</label>
            <p className="text-start font-semibold h-[20px]">
              {product.hargaJual}
            </p>
            <label className="text-start font-light mt-[10px]">
              Persentase Keuntungan
            </label>
            <p className="text-start font-semibold h-[20px]">
              {((product.hargaJual - product.hargaBeli) / product.hargaBeli) *
                100}
              %
            </p>
            <label className="text-start font-light mt-[10px]">
              Nominal Keuntungan
            </label>
            <p className="text-start font-semibold h-[20px]">
              {product.hargaJual - product.hargaBeli}
            </p>
            <label className="text-start font-light mt-[10px]">
              Stok Minimum
            </label>
            <p className="text-start font-semibold h-[20px]">
              {product.minStok}
            </p>
          </div>
        </>
      )}

      <div className="mx-1 flex flex-col gap-3">
        <a href="#" className=" w-full h-[50px] mt-2">
          <span className="hover:scale-110 w-full  h-full border rounded-xl text-yellow-700/70 border-yellow-700 flex items-center font-bold px-5">
            Lihat Daftar Produk
              <div className="flex ms-auto w-[18px] h-[18px]">
                <img src={iNext} alt="" />
              </div>
          </span>
        </a>
        <a href="../riwayatsupplier" className=" w-full h-[50px]">
          <span className="hover:scale-110 w-full  h-full border rounded-xl text-yellow-700/70 border-yellow-700 flex items-center font-bold px-5">
            Lihat Riwayat Terakhir
              <div className="flex ms-auto w-[18px] h-[18px]">
                <img src={iNext} alt="" />
              </div>
          </span>
        </a>
        <div className="flex gap-5 w-full justify-between text-[14px]">
          <button className="flex justify-center items-center border-[#C2A353] border rounded-lg w-[30%] p-3 text-[14px] bg-white text-[#C2A353] hover:scale-105">
            Hapus
          </button>
          <Link
            to={{ pathname: `/pos/DaftarProdukUpdate/${id}` }}
            className="flex justify-center items-center bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white rounded-lg w-[70%] p-3 text-[14px] hover:scale-105"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

import { createContext, useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineRightCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import iCen from "../../assets/iconproduk/iCen.svg";
import iMin from "../../assets/iconproduk/iMin.svg";
import iPlus from "../../assets/iconproduk/iPlus.svg";
import iTambahP from "../../assets/iconproduk/iTambahP.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PembelianStok } from "./PembelianStok";
import { toast, ToastContainer } from "react-toastify";

export const modalContext = createContext();
export const DaftarBelanja = () => {
  const { setNav, setSort, setLink } = useContext(navContext);
  const [angka, setAngka] = useState(0);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [bin, setBin] = useState([]);
  const [produk, setProduk] = useState([]);
  const [items, setItems] = useState([]);
  const [invoice,setInvoice] = useState('')
  const [modals, setModals] = useState(false);
  const [produkKategori, setProdukKategori] = useState([]);
  const [pilihKategori, setPilihKategori] = useState([]);
  const [tombol, setTombol] = useState(true);
  const navigate = useNavigate();
  const min = (isi) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === isi
          ? { ...item, jumlah: Math.max(0, item.jumlah - 1) } // Ensure jumlah doesn't go below 0
          : item
      )
    );
  };

  const plus = (isi) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === isi
          ? { ...item, jumlah: Math.abs(Number(item.jumlah) + 1) } // Ensure jumlah doesn't go below 0 : { ...item, jumlah: item.jumlah + 1 } // Ensure jumlah doesn't go below 0
          : item
      )
    );
  };

  const updateJml = (id, value) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, jumlah: parseInt(value) || 0 } : item
      )
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTombol(false)

    const data = {
      total: total,
      invoice: invoice,
      supplier: cart[0].supplier._id,
      belanjaDetail: cart,
    };
    try {
      const response = await axios.post(
        "https://api.drnich.co.id/api/pos/produk/belanjapos",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
    
      if (response.status === 201) {
        toast.success("Transaksi berhasil!");
        setTimeout(() => {
          toast.success("Redirecting...");
          window.location.href = `/pos/PilihPembayaranProduk/${response.data.belanja._id}`;
          // console.log(response.data)
        }, 1500);
      } else {
        toast.error("Terjadi kesalahan dalam transaksi");
      }
    } catch (error) {
      console.error("Error dalam transaksi:", error);
      toast.error("Terjadi kesalahan saat memproses transaksi");
    }
    
  };
  const tambahKeranjang = (isi) => {
    console.log(isi)
    if (cart.some((item) => item._id == isi._id)) {
      toast.error('Produk sudah ada di keranjang')}
    else if(cart.length>0 && cart.some((item)=> item.supplier._id != isi.supplier._id)){
      toast.error('Produk memiliki supplier yang berbeda')
    }
    else {
      const newisi = { ...isi, jumlah: 0 };
      setCart((prev) => [...prev, newisi]);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/produk")
        .then((response) => {
          if (response.status == 200) {
            const filterProduk = response.data.filter(
              (item) => item.jenis.jenis == "produk"
            );
            console.log(filterProduk);
            setProduk(filterProduk);
            setProdukKategori(filterProduk);
            const filterlimit = response.data.filter((item) => (
              item.stok < item.minStok &&
              item.jenis.jenis == "produk"
            ));
            console.log({limit: filterlimit});
            setItems(filterlimit);
          }
        });
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/kategoriproduk")
        .then((response) => {
          const filterPilihKategori = response.data.filter(
            (item) => item.jenis.jenis == "produk"
          );
          setPilihKategori(filterPilihKategori);
        });

      await axios
      .get("https://api.drnich.co.id/api/pos/produk/getInvoiceBelanja")
      .then(response => setInvoice(response.data))
    };
    fetch();
    setNav("Daftar Belanja");
    setLink('/pos/produks')
    setSort(false);
    document.title = "Daftar Belanja";
  }, []);

  useEffect(() => {
    setTotal(0);
    cart.map((item) => setTotal((prev) => prev + item.jumlah * item.hargaBeli));
  }, [cart]);

  return (
    <modalContext.Provider
      value={{
        modals,
        setModals,
        produk,
        produkKategori,
        setProdukKategori,
        pilihKategori,
        cart,
        setCart,
      }}
    >
      <form className="flex flex-col px-7 py-3 gap-1 bg-white w-full h-full text-[12px] text-[#454545] overflow-auto overflow-y-scroll scrollbar-hide">
        <div className="w-full h-full overflow-y-auto flex flex-col">
        <form className="my-5 flex gap-2 mx-3 border border-[#BDBDBD] rounded-xl items-center p-3">
          <AiOutlineSearch size={20} />
          <input
            type="text"
            className="text-sm w-full h-[30px] focus:outline-none"
            placeholder="Cari..."
          ></input>
        </form>
        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 mt-4 rounded-lg">
          <p className="">Daftar Stok Limit</p>
        </div>
        <div className="flex flex-col gap-3 w-full h-full justify-start">
          {items.map((item, i) => (
            <div className="flex flex-col items-start w-full">
              <Link className="text-start w-full" key={i}>
                <div className="ms-14 mt-2 text-[#EB5757] text-[12px]">
                  <p>Stok Melewati Minimum ({item.stok})</p>
                </div>
                <div className="flex items-center justify-start w-full gap-10 text-[#454545] border-b-2 pb-4 text-[12px] mt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      tambahKeranjang(item);
                    }}
                    className=""
                  >
                    <img src={iPlus} alt="kocen" />
                  </button>
                  <div className="text-start">
                    <p>{item.namaProduk}</p>
                    <p>Rp. {item.hargaBeli.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-[12px] bg-[#F6F6F6] text-[#BDBDBD] text-start pl-4 mt-4 rounded-lg">
          <p className="">Daftar Keranjang</p>
        </div>
        <div className="flex flex-col gap-3 w-full h-full justify-start">
          {cart.map((item, i) => (
            <div className="flex flex-col items-start w-full">
              <Link className="text-start w-full" key={i}>
                <div className="ms-14 mt-2 text-[#EB5757] text-[12px]">
                  <p>({item.stok})</p>
                </div>
                <div className="flex items-center justify-start w-full gap-10 text-[#454545] border-b-2 pb-4 text-[12px] mt-2">
                  <div className="font-bold">
                    -
                  </div>
                  <div className="text-start">
                    <p>{item.namaProduk}</p>
                    <p>Rp. {item.hargaBeli.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="flex gap-4 ms-auto justify-end">
                    <button onClick={() => min(item._id)}>
                      <img src={iMin} alt="minus" />
                    </button>
                    <input className="w-12 text-center appearance-none outline-none " value={item.jumlah} onChange={(e)=>updateJml(item._id, e.target.value)} type="text" />
                    <button onClick={() => plus(item._id)}>
                      <img src={iPlus} alt="plus" />
                    </button>
                    <button onClick={
                                (e) => {
                                    e.preventDefault()
                                    setCart((prev) => prev.filter(itemx => itemx._id !== item._id))
                                }
                            } className='text-red-600 font-bold'>X</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        </div>
        <div className="flex w-full justify-end px-3 mt-auto">
          <div className="flex flex-col justify-end w-full md:w-[50%]">
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center border border-[#C2A353] bg-white text-[#C2A353] font-semibold rounded-l-xl px-3 h-[50px] w-full"
            >
              <div className="grid">
                <p>Beli Sekarang</p>
                <p>Rp.{total.toLocaleString('id-ID')}</p>
              </div>
            </button>
          </div>
          <div className="flex flex-col justify-end items-center text-center w-full md:w-[50%] text-[14px]">
            <button
              onClick={(e) => {
                e.preventDefault();
                setModals(true);
              }}
              className="flex justify-center items-center text-center gap-2 border border-[#C2A353] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-semibold rounded-r-xl px-3 h-[50px] w-full text-[14px]"
            >
              <img src={iTambahP} alt="" className="" /> Tambah Daftar Belanja
            </button>
          </div>
        </div>
      </form>
      <PembelianStok source={"DaftarBelanja"} />
      <ToastContainer/>
    </modalContext.Provider>
  );
};

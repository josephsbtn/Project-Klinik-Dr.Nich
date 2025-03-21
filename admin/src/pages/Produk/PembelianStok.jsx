import React, { createContext, useRef, useState } from "react";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import { BsCart4 } from "react-icons/bs";
import iTambah from "../../assets/iconproduk/Itambah.svg";
import { modalContext } from "./DaftarBelanja";
import { modalsContext } from "./DaftarBelanjaModals";
import { toast } from "react-toastify";
import Select from "react-select"

export const PembelianStok = (props) => {
  const { setNav, setSort, setLink } = useContext(navContext);
  const {
    modals,
    setModals,
    produkKategori,
    setProdukKategori,
    pilihKategori,
    cart,
    setCart,
  } =
    props.source == "DaftarBelanja"
      ? useContext(modalContext)
      : useContext(modalsContext);
  const [kategoriTerpilih, setKategoriTerpilih] = useState("");
  const kategoriRef = useRef(null);
  const produkpilihanRef = useRef(null);
  const jumlahPembelianRef = useRef(null);
  const [supplier, setSupplier] = useState({})
  const [jumlahPembelian, setJumlahPembelian] = useState([]);
  const [produkTerpilih, setProdukTerpilih] = useState([]);
  const [produkKategoriTampil, setProdukKategoriTampil] = useState([])
  const [options, setoptions] = useState([])

  const handleTambah = (e) => {
    e.preventDefault();
    if (cart.some((item) => item._id == produkTerpilih[0]._id)) {
      toast.error('Produk sudah ada di keranjang')
    } 
    else if(cart.length>0 && cart.some((item)=> item.supplier._id != produkTerpilih[0].supplier._id)){
          toast.error('Produk memiliki supplier yang berbeda')
        }
    else {
      const newisi = { ...produkTerpilih[0], jumlah: jumlahPembelian };
      setCart((prev) => [...prev, newisi]);
    }
    setModals(false);
    console.log(produkTerpilih);
  };
  const pilihproduk = (selected) => {
    const filterr = produkKategori.filter(
      (item) => item.namaProduk == selected.value
    );
    console.log(selected.value)
    setProdukTerpilih(filterr);
  };

  useEffect(() => {
    produkTerpilih.length > 0 && produkTerpilih.map((item) => setSupplier(item?.supplier))
  }, [produkTerpilih])

  const Pembelian = () => {
    setJumlahPembelian(jumlahPembelianRef.current.value);
    console.log(jumlahPembelianRef.current.value);
  };

  const pilih = (data) => {
    setProdukKategoriTampil(data);
  };
  const gantiKategori = () => {
    setKategoriTerpilih(kategoriRef.current.value);
    console.log(kategoriRef.current.value);
  };
  useEffect(() => {
    const filterr = produkKategori.filter(
      (item) => item.kategori._id == kategoriTerpilih
    );
    setProdukKategoriTampil(filterr);
    const produk = []
    filterr.map(item=>produk.push({value: item.namaProduk, label: item.namaProduk+ ' ( Supplier : '+item.supplier.namaPerusahaan+ ' )'}))
    setoptions(produk)
    console.log(produk)
  }, [kategoriTerpilih]);

  document.title = "Pembelian Stok";
  return (
    <div
      className={`flex z-50 flex-col fixed items-center top-0 start-0 px-5 py-3 gap-1 bg-black/20 w-full h-full overflow-scroll ${modals ? "" : "hidden"
        }`}
    >
      <div className="md:max-w-[700px] md:w-[80%] lg:w-[60%] lg:max-w-[900px] w-[100%] max-w-[500px] border-2 border-[#454545] rounded-xl bg-white min-h-full h-fit px-3 overflow-auto">
        <div className="flex flex-col mx-3">
          <p className="flex text-start mt-5 text-[14px] text-[#454545] font-medium mb-1">
            Kategori Produk
          </p>
          <select
            onChange={gantiKategori}
            ref={kategoriRef}
            name="options"
            id="kategoriproduk"
            className=" relative bg-white border text-sm border-[#BDBDBD] rounded-xl w-full py-2 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[#BDBDBD] focus:border-black appearance-none"
            aria-label="Kategori Produk"
          >
            <option value="" disabled selected className="text-gray-300">
              Pilih Kategori
            </option>
            {pilihKategori.map((item, i) => (
              <option key={i} value={item._id}>
                {item.kategori}
              </option>
            ))}
          </select>
          <div className="grid py-2">
            <label className="text-start text-[12px] text-[#454545] font-medium text-sm mb-1">
              Supplier
            </label>
            <input
              type="text"
              placeholder="Supplier"
              disabled
              value={supplier?.namaPerusahaan}
              className="text-[12px] py-2 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl "
            />
          </div>
          <div className="grid py-2">
            <label className="text-start text-[12px] text-[#454545] font-medium text-sm mb-1">
              Nama Produk
            </label>
            <Select
            onChange={pilihproduk}
            options ={options || []}
            issearchable
            placeholder='Pilih Produk'
            className='w-full'
            />
          </div>
        </div>
        {produkTerpilih.map((item, i) => (
          <>
            <div className="grid py-2">
              <label className="text-start text-[12px] text-[#454545] text-sm px-4 py-1">
                Jumlah Pembelian
              </label>
              <input
                onChange={Pembelian}
                ref={jumlahPembelianRef}
                type="number"
                placeholder="0"
                className="text-[12px] items-end mx-3 px-4 border text-sm text-black border-black/30 rounded-xl h-[40px] "
              />
            </div>
            <div className="grid py-2">
              <label className="text-start text-[12px] text-[#454545] text-sm px-4 py-1">
                SKU
              </label>
              <label className="text-[12px] mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[40px] ">
                {item?.sku }
              </label>
            </div>
            <div className="grid py-2">
              <label className="text-start text-[12px] text-[#454545] text-sm px-4 py-1">
                Stok Tersisa
              </label>
              <label className="flex text-[12px] mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[40px] items-center">
                {item?.stok}
              </label>
            </div>
            
            <div className="grid py-2">
              <label className="text-start text-[12px] text-[#454545] text-sm px-4 py-1">
                Harga Produk
              </label>
              <label className="flex text-[12px] mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[40px] items-center">
                Rp. {item?.hargaBeli.toLocaleString("id-ID")}
              </label>
            </div>
            <div className="grid py-2">
              <label className="text-start text-[12px] text-[#454545] text-sm px-4 py-1">
                Harga Jual
              </label>
              <label className="flex text-[12px] mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[40px] items-center">
                Rp. {item?.hargaJual.toLocaleString("id-ID")}
              </label>
            </div>
            <div className="grid py-2">
              <button className="text-start text-[12px] text-[#454545] text-sm  px-4 py-1">
                Harga Total Pembelian
              </button>
              <label className="flex text-[12px] mx-3 px-4 bg-gray-400/10 border text-sm text-black border-black/30 rounded-xl h-[40px] items-center">
                Rp. {(jumlahPembelian * item.hargaBeli).toLocaleString("id-ID")}
              </label>
            </div>
          </>
        ))}

        <div className="flex justify-between gap-2 w-full pt-4 py-3 px-2">
          <button
            onClick={handleTambah}
            className="flex w-[50%] justify-center items-center  gap-2 h-[40px] bg-white text-[#C2A353] border border-[#C2A353] font-bold rounded-xl"
          >
            <img src={iTambah} alt="" /> Tambah
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              setModals(false)
            }}
            className="flex w-[50%] justify-center items-center  gap-2 h-[40px] bg-[#BDBDBD] text-white font-bold rounded-xl"
          >
            Batal
          </button>
        </div>
      </div>
      <datalist id="pilihProduk" className="bg-[#BDBDBD]">
        {produkKategoriTampil.map((item, i) => (
          <option key={i} value={item.namaProduk} />
        ))}
      </datalist>
    </div>
  );
};
    
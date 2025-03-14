import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../App2";
import ktp from "../../assets/ktp.svg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const KategoriProdukUpdate = () => {
  const { setNav, setLink } = useContext(navContext);
  const [datax, setDatax] = useState([]);
  const [jenisx, setJenisx] = useState([]);
  const [select, setSelected] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetchJenis = async () => {
      await axios
        .get(`https://api.drnich.co.id/api/pos/produk/kategoriProduk/${id}`)
        .then((response) => {
          setDatax(response.data);
          setSelected(response.data.jenis);
          //   console.log(response.data.jenis);
        });
      await axios
        .get("https://api.drnich.co.id/api/pos/produk/jenisproduk")
        .then((response) => {
          setJenisx(response.data);
          console.log(response.data);
        });
    };
    fetchJenis();
    setNav("Ubah Kategori Produk");
    setLink('/pos/kategoriproduks')
  }, []);

  const navigate = useNavigate();
  const jenisRef = useRef(null);
  const kategoriRef = useRef(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      jenis: jenisRef.current.value,
      kategori: kategoriRef.current.value,
    };
    console.log(data);
    try {
      const response = await axios.put(
        `https://api.drnich.co.id/api/pos/produk/updatekategoriProdukPos/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
    
      if (response.status == 200) {
        toast.success("Kategori produk berhasil diperbarui!");
        setTimeout(() => {
          toast.success("Redirecting...");
          window.location.href = "/pos/kategoriproduks";
        }, 1500);
      } else {
        toast.error("Gagal memperbarui kategori produk");
      }
    } catch (error) {
      console.error("Error saat memperbarui kategori produk:", error);
      toast.error("Terjadi kesalahan saat memperbarui kategori produk");
    }
    
  };
  document.title = "Ubah Kategori Produk";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-3 gap-1 bg-white w-full text-[12px] text-[#454545] min-h-screen h-full overflow-auto overflow-y-scroll scrollbar-hide px-7"
    >
      <div className="flex flex-col gap-1  px-3">
        <label className="text-start font-semibold">
          Nama Jenis Produk
        </label>
        <select
          ref={jenisRef}
          name="options"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
          id="jenis"
          defaultValue={select._id}
        >
          <option selected disabled value={select._id} className="text-gray-300">
            {select.jenis}
          </option>
          {jenisx.map((selects, i) => (
            <option key={i} value={selects._id}>
              {selects.jenis}
            </option>
          ))}
        </select>

        <label className="text-start font-semibold">
          Nama Kategori Produk
        </label>
        <input
          Value={datax.kategori}
          ref={kategoriRef}
          type="text"
          placeholder="Contoh : Lotion / Sunscreen"
          className="border border-[#BDBDBD] rounded-xl py-2 px-3"
        />
      </div>
      <div className="flex justify-between items-end mt-4 w-full h-full px-3">
        <button
        type="submit"
        className="bg-[#BDBDBD] text-[14px] text-white w-full rounded-xl p-3"
        >
          Simpan
        </button>
      </div>
      <ToastContainer/>
    </form>
  );
};

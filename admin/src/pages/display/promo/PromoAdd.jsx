import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../App2";
import gkategori from "../../../assets/iconDisplay/Layanan/gkategori.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const PromoAdd = () => {
  const { setNav, setLink } = useContext(navContext);
  const navigate = useNavigate();
  const [promo, setPromo] = useState([]);
  const [name, setName] = useState("");
  const [syarat, setSyarat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageDesktop, setimageDesktop] = useState();
  const [imageMobile, setimageMobile] = useState();
  const [gambar1, setGambar1] = useState();
  const [gambar2, setGambar2] = useState();
  const [namaGambar1, setNamaGambar1] = useState("");
  const [namaGambar2, setNamaGambar2] = useState("");
  useEffect(() => {
    setNav("Tambah Reting");
  }, []);

  const handleGambar = (setFoto, setNamaGambar, image) => {
    const file = image.current.files[0];
    if (file) {
      const validImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImage.includes(file.type)) {
        alert("bukan gambar");
        setFoto(null);
        return;
      }
      setFoto(URL.createObjectURL(file));
      setNamaGambar(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !syarat ||
      !deskripsi ||
      !imageDesktop ||
      !imageMobile ||
      !gambar1 ||
      !gambar2 ||
      !namaGambar1 ||
      !namaGambar2
    ) {
      toast.error("Semua bidang harus diisi!");
      return;
    }

    const fdata = new FormData();
    fdata.append("nama", name);
    if (imageDesktop.current.files.length > 0) {
      fdata.append("fotoDesktop", imageDesktop.current.files[0]);
    }
    if (imageMobile.current.files.length > 0) {
      fdata.append("fotoMobile", imageMobile.current.files[0]);
    } else {
      toast.error("Harap pilih gambar sebelum mengunggah!");
      return;
    }
    // fdata.append("ulasan", ulasanRef.current.value);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/tambahulasan`,
        fdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Berhasil menambahkan Promo");
        setTimeout(() => {
          navigate("/pos/promo");
        }, 3000);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Gagal menambahkan Rating, coba lagi!"
      );
      toast.error(
        error.response?.data?.message || "Gagal menambahkan Rating, coba lagi!"
      );
    }
  };

  document.title = "Tambah Reting";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col px-0 p-3 gap-2 bg-white w-full min-h-screen justify-between"
      onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="flex flex-col gap-1 px-3 flex-grow">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <label className="text-start text-[#454545] text-[12px]">
              Upload Foto Desktop
            </label>
            <div className="flex gap-6">
              <img
                src={imageDesktop}
                alt=" "
                className="h-[115px] w-[115px] rounded shadow-lg border"
              />
              <div className="flex flex-col items-start text-[10px]">
                {!namaGambar1 ? (
                  <p className="text-[#454545] mb-3">Belum Ada Gambar</p>
                ) : (
                  <p className="text-[#454545] mb-3">{namaGambar1}</p>
                )}

                <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                  <input
                    accept="image/*"
                    onChange={handleGambar(
                      setimageDesktop,
                      setNamaGambar1,
                      imageDesktop
                    )}
                    ref={imageDesktop}
                    type="File"
                    className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                  />
                </div>
                <p className="text-start text-[10px] text-[#BDBDBD]">
                  *Upload foto dengan format .jpg .png maksimal ukuran 100mb
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-start text-[#454545] text-[12px]">
              Upload Foto Mobile
            </label>
            <div className="flex gap-6">
              <img
                src={imageMobile}
                alt=" "
                className="h-[115px] w-[115px] rounded shadow-lg border"
              />
              <div className="flex flex-col items-start text-[10px]">
                {!namaGambar2 ? (
                  <p className="text-[#454545] mb-3">Belum Ada Gambar</p>
                ) : (
                  <p className="text-[#454545] mb-3">{namaGambar2}</p>
                )}

                <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                  <input
                    accept="image/*"
                    onChange={handleGambar(
                      setimageMobile,
                      setNamaGambar2,
                      imageMobile
                    )}
                    ref={imageMobile}
                    type="File"
                    className="border border-[#C2A353] h-[25px] w-[78px] rounded shadow-sm text-[12px]"
                  />
                </div>
                <p className="text-start text-[10px] text-[#BDBDBD]">
                  *Upload foto dengan format .jpg .png maksimal ukuran 100mb
                </p>
              </div>
            </div>
          </div>
        </div>

        <label className="text-[#454545] text-start text-[12px]">
          Nama Ketegori
        </label>
        <input
          ref={namaRef}
          type="text"
          placeholder="Contoh: diana"
          className="px-2 border text-[12px] border-black/30 rounded-lg h-[48px]"
        />
        <label className="text-[#454545] text-start text-[12px]">Review</label>
        <textarea
          ref={ulasanRef}
          name=""
          id=""
          cols="auto"
          rows="5"
          className=" border rounded-lg text-[12px] p-2"
          placeholder="Review"></textarea>
      </div>
      <div className="mt-auto w-full ">
        <button
          type="submit"
          className="flex justify-center items-center w-full h-[44px] bg-gradient-to-r from-[#EAC564] to-[#C2A353] text-white font-medium rounded-lg">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default PromoAdd;

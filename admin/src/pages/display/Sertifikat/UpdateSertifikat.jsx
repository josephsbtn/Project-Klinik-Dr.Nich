import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { navContext } from "../../../App2";
import gserti from "../../../assets/iconDisplay/Sertifikat/gserti.svg?url";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UpdateSertifikat = () => {
  const { setNav } = useContext(navContext);
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [gambarname, setGambarName] = useState("");
  const [gambar, setgambar] = useState(null);

  useEffect(() => {
    setNav("Ubah sertifikat");
  }, []);

  const handleImg = (e) => {
    e.preventDefault();
    const fileImage = imageRef.current.files[0];
    console.log(fileImage);
    if (fileImage) {
      const validImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!validImage.includes(fileImage.type)) {
        alert("bukan gambar");
        setgambar(null);
        return;
      }
      setgambar(URL.createObjectURL(fileImage));
    }
    setGambarName(fileImage.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileImaga = imageRef.current.files[0];
    alert(fileImaga.name);
  };

  document.title = "Ubah sertifikat";
  const [supstat, setsupstat] = useState(false);
  return (
    <form
      className="flex flex-col px-0 p-3 gap-2 bg-white w-full min-h-screen justify-between"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1 px-3 flex-grow">
        <div className="flex flex-col gap-2">
          <label className="text-start text-[#454545] text-[12px]">
            Upload foto sertikat
          </label>
          <div className="flex gap-6">
            <img
              src={gambar}
              alt=" "
              className="h-[115px] w-[115px] rounded shadow-lg border"
            />
            <div className="flex flex-col items-start text-[10px]">
              {gambar ? (
                <p className="text-[#454545] mb-3">{gambarname}</p>
              ) : (
                <p className="text-[#454545] mb-3">Belum ada gambar</p>
              )}

              <div className="flex justify-star text-[#C2A353] pt-2 mb-2">
                <input
                  accept="image/*"
                  ref={imageRef}
                  onChange={handleImg}
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
      <div className="mt-auto w-full ">
        <button
          disabled={!gambar}
          type="submit"
          className={`flex justify-center items-center w-full h-[44px] text-white font-medium rounded-lg ${
            gambar
              ? "bg-gradient-to-r from-[#EAC564] to-[#C2A353]"
              : " bg-[#DCDCDC] border-2 "
          }`}
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default UpdateSertifikat;

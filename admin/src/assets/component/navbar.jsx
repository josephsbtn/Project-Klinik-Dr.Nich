import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../icon/logo.svg";

function Navbar() {
  const navigate = useNavigate(); // Hook for navigation
  const [selected, setSelected] = useState("/listLayanan"); // Default selected path

  return (
    <nav className="flex justify-between w-full p-4 items-center bg-white shadow-md">
      <img src={logo} alt="Logo" className="w-20 h-20 cursor-pointer" />

      <div className="flex justify-between gap-4">
        <button
          onClick={() => {
            setSelected("/listLayanan");
            navigate("/listLayanan");
          }}
          className={`text-gray-700 ${
            selected === "/listLayanan"
              ? "text-green-500"
              : "hover:text-green-500"
          } transition`}>
          Layanan
        </button>
        <button
          onClick={() => {
            setSelected("/promo");
            navigate("/promo");
          }}
          className={`text-gray-700 ${
            selected === "/promo" ? "text-green-500" : "hover:text-green-500"
          } transition`}>
          Promo
        </button>
        <button
          onClick={() => {
            setSelected("/galeri");
            navigate("/galeri");
          }}
          className={`text-gray-700 ${
            selected === "/galeri" ? "text-green-500" : "hover:text-green-500"
          } transition`}>
          Galeri
        </button>
        <button
          onClick={() => {
            setSelected("/sertifikat");
            navigate("/sertifikat");
          }}
          className={`text-gray-700 ${
            selected === "/sertifikat"
              ? "text-green-500"
              : "hover:text-green-500"
          } transition`}>
          Sertifikat
        </button>
        <button
          onClick={() => {
            setSelected("/mesin");
            navigate("/mesin");
          }}
          className={`text-gray-700 ${
            selected === "/mesin" ? "text-green-500" : "hover:text-green-500"
          } transition`}>
          Mesin
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

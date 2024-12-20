/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../icon/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("/listLayanan"); // Default selected path
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu toggle

  const handleNavigate = (path) => {
    setSelected(path);
    navigate(path);
    setMenuOpen(false); // Close menu on navigation
  };

  return (
    <nav className="flex fixed justify-between w-full p-4 items-center bg-white shadow-md">
      <img
        src={logo}
        alt="Logo"
        className="w-20 h-20 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Hamburger Menu Button for small screens */}
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none">
          <span className="block w-6 h-1 bg-gray-700 mb-1 transition-transform duration-300 ease-in-out transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}"></span>
          <span
            className={`block w-6 h-1 bg-gray-700 mb-1 transition-opacity duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : ""
            }`}></span>
          <span className="block w-6 h-1 bg-gray-700 transition-transform duration-300 ease-in-out transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
        </button>
      </div>

      {/* Menu */}
      <div
        className={`flex flex-col lg:flex-row gap-4 lg:gap-4 lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:items-center transition-all duration-500 ease-in-out bg-white shadow-md absolute top-20 left-0 w-full p-4 lg:p-0 items-start lg:items-center z-50 ${
          menuOpen ? "top-[85%]" : "top-[-100rem]"
        }`}>
        <button
          onClick={() => handleNavigate("/layanan")}
          className={`text-gray-700 text-lg transition-colors duration-300 ease-in-out ${
            selected === "/layanan" ? "text-green-500" : "hover:text-green-500"
          }`}>
          Layanan
        </button>
        <button
          onClick={() => handleNavigate("/promo")}
          className={`text-gray-700 text-lg transition-colors duration-300 ease-in-out ${
            selected === "/promo" ? "text-green-500" : "hover:text-green-500"
          }`}>
          Promo
        </button>
        <button
          onClick={() => handleNavigate("/galeri")}
          className={`text-gray-700 text-lg transition-colors duration-300 ease-in-out ${
            selected === "/galeri" ? "text-green-500" : "hover:text-green-500"
          }`}>
          Galeri
        </button>
        <button
          onClick={() => handleNavigate("/sertifikat")}
          className={`text-gray-700 text-lg transition-colors duration-300 ease-in-out ${
            selected === "/sertifikat"
              ? "text-green-500"
              : "hover:text-green-500"
          }`}>
          Sertifikat
        </button>
        <button
          onClick={() => handleNavigate("/mesin")}
          className={`text-gray-700 text-lg transition-colors duration-300 ease-in-out ${
            selected === "/mesin" ? "text-green-500" : "hover:text-green-500"
          }`}>
          Mesin
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

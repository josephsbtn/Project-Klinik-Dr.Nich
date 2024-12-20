import React from "react";

// Logo & images
import logo from "../../assets/logodrnich.svg";
import bag from "../../assets/bag-2.svg";
import search from "../../assets/search-normal.svg";
import hamburger from "../../assets/hamburger.svg";

export default function Navbar() {
  return (
    <div className="w-full h-[70px] shadow-sm bg-white flex items-center">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left Navigation */}
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Menu">
            <img src={hamburger} alt="Menu Icon" />
          </a>
        </div>

        {/* Logo (Center) */}
        <div className="flex-grow flex justify-center">
          <img src={logo} className="w-[100px] h-auto" alt="Logo" />
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Search">
            <img src={search} alt="Search Icon" />
          </a>
          <a href="#" aria-label="Bag">
            <img src={bag} alt="Bag Icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

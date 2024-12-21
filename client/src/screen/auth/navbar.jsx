import React, { useEffect, useState, useRef } from "react";

// Logo & images
import logo from "../../assets/logodrnich.svg";
import logo2 from "../../assets/logodrnich-white.svg";
import bag from "../../assets/bag-2.svg";
import search from "../../assets/search-normal.svg";
import hamburger from "../../assets/hamburger.svg";
import bgHamburger from "../../assets/bgHamburger.png";
import arrow from "../../assets/arrow-left.svg";

// Logo hamburger
import alamat from "../../assets/logo-footer/location.svg";
import kontak from "../../assets/logo-footer/call.svg";
import clock from "../../assets/logo-footer/clock.svg";
import email from "../../assets/logo-footer/email.svg";

// Logo sosmed
import yt from "../../assets/YouTube.png";
import linkedIn from "../../assets/LinkedIn.png";
import tt from "../../assets/TikTok.png";
import fb from "../../assets/Facebook.png";
import ig from "../../assets/Instagram.png";

// logo search
import searchWhite from "../../assets/search-normal-white.svg";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  // Close nav menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-[70px] shadow-sm bg-white flex items-center relative">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left Navigation */}
        <div className="flex items-center gap-4">
          <button
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
            className="focus:outline-none"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <img src={hamburger} alt="Menu Icon" />
          </button>
        </div>

        {/* Overlay */}
        {isNavOpen && (
          <div
            onClick={() => setIsNavOpen(false)}
            aria-hidden="true"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-10"
          />
        )}

        {/* Hamburger Menu */}
        {isNavOpen && (
          <div
            ref={navRef}
            className="bg-[#c2a353] w-[253px] h-full fixed top-0 left-0 z-50"
          >
            <img
              src={bgHamburger}
              className="absolute bottom-0 w-full h-auto object-cover"
              alt="Background"
            />
            <div className="flex flex-col relative top-0 items-start px-[25px] pt-[20px] justify-start h-full gap-4">
              <div>
                <img src={logo2} alt="Drnich Logo" />
              </div>

              {/* Menu Links */}
              <div className="flex flex-col w-full gap-[22px] pt-[42px] text-sm font-normal tracking-tight">
                {[
                  "Beranda",
                  "Profil",
                  "Konsultasi",
                  "Produk",
                  "Layanan",
                  "Reservasi",
                  "Promo",
                  "Galeri",
                ].map((text, index) => (
                  <div key={index} className="flex items-center justify-between w-full">
                    <a href="javascript:void(0)" className={index === 0 ? "text-[#00674f]" : "text-white"}>
                      {text}
                    </a>
                    <img src={arrow} className="w-[15px] h-[15px]" alt="Arrow Icon" />
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="flex flex-col pt-[40.41px]">
                <h1 className="text-white text-base font-medium tracking-tight">Kontak Kami</h1>
                <div className="flex flex-col w-[173px] space-y-4 pt-[26.59px]">
                  <div className="flex items-center space-x-2">
                  <img
                      src={alamat}
                      className="w-[15px] h-[15px] relative -top-4"
                      alt="Location"
                    />
                    <a
                      href="javascript:void(0)"
                      className="text-left text-[#e8ebe0] text-xs font-normal leading-tight"
                    >
                      Jl. Diponegoro No. 12, Salatiga, Jawa Tengah, 51552
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={kontak} className="w-[15px] h-[15px]" alt="Icon" />
                    <a
                      href="#"
                      className="text-left text-[#e8ebe0] text-xs font-normal leading-tight"
                    >
                      +6289632517280
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={email} className="w-[15px] h-[15px]" alt="Icon" />
                    <a
                      href="#"
                      className="text-left text-[#e8ebe0] text-xs font-normal leading-tight"
                    >
                      drnich@email.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={clock} className="w-[15px] h-[15px]" alt="Icon" />
                    <a
                      href="#"
                      className="text-left text-[#e8ebe0] text-xs font-normal leading-tight"
                    >
                      10.00 - 19.00
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col items-center w-full pt-[40px]">
                <div className="w-[126px] flex items-center space-x-4">
                  {[yt, linkedIn, tt, fb, ig].map((icon, index) => (
                    <img key={index} src={icon} className="w-[15px] h-[15px]" alt="Social Icon" />
                  ))}
                </div>
                <p className="text-white text-xs mt-[19px]">©2024 | Dr. Nich Beauty Aesthetic</p>
              </div>
            </div>
          </div>
        )}

        {/* Overlay for Search */}
        {isSearchOpen && (
          <div
            onClick={() => setIsSearchOpen(false)}
            aria-hidden="true"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-10"
          />
        )}

        {/* Search Menu */}
        {isSearchOpen && (
          <div
            ref={searchRef}
            className="bg-white w-full h-[90px] fixed top-0 left-0 z-50 flex items-center justify-center"
          >
            <div className="flex items-center border-b border-[#c2a353] w-[326px] h-[45px]">
              <img src={searchWhite} alt="Search Icon" className="px-[10px]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full px-[10px] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Logo (Center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={logo} className="w-[100px] h-auto" alt="Logo" />
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="focus:outline-none"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <img src={search} alt="Search Icon" />
          </button>
          <a href="javascript:void(0)" aria-label="Bag">
            <img src={bag} alt="Bag Icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

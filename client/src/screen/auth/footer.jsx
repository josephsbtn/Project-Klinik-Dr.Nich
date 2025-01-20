import React from "react";
import { useNavigate } from "react-router-dom";

// Import logo and images
import logoPutih from "../../assets/logodrnich-white.svg";

// Social media logos
import yt from "../../assets/logo-sosmed/YouTube.svg";
import linkedIn from "../../assets/logo-sosmed/LinkedIn.svg";
import tt from "../../assets/logo-sosmed/TikTok.svg";
import fb from "../../assets/logo-sosmed/Facebook.svg";
import ig from "../../assets/logo-sosmed/Instagram.svg";

// Footer logos
import alamat from "../../assets/logo-footer/location.svg";
import kontak from "../../assets/logo-footer/call.svg";
import clock from "../../assets/logo-footer/clock.svg";
import email from "../../assets/logo-footer/email.svg";

// WhatsApp function
import { sendWhatsAppReservasiMessage } from "../../../../backend/controller/whatsappController";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    sendWhatsAppReservasiMessage();
  };

  const footerLinks = [
    { judul: "Profil", onClick: handleNavigation("/profil") },
    { judul: "Layanan", onClick: handleNavigation("/layanan") },
    { judul: "Produk", onClick: handleNavigation("/produk") },
    { judul: "Promo", onClick: handleNavigation("/promo") },
    { judul: "Galeri", onClick: handleNavigation("/galeri") },
    { judul: "Konsultasi", onClick: handleNavigation("/konsultasi") },
    { judul: "Reservasi", onClick: handleWhatsApp },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#c2a353] to-[#00674f] text-white py-8 px-6 lg:px-24">
      {/* Main Container */}
      <div className="flex flex-col lg:justify-between lg:items-start gap-8">
        {/* Logo and Social Media */}
        <div className="flex flex-row gap-11 lg:space-y-6 lg:w-full lg:justify-between">
          <img
            src={logoPutih}
            alt="Logo Dr. Nich"
            className="w-[150px] h-auto"
          />
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <img
              src={yt}
              alt="YouTube"
              className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px]"
            />
            <img
              src={linkedIn}
              alt="LinkedIn"
              className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px]"
            />
            <img
              src={tt}
              alt="TikTok"
              className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px]"
            />
            <img
              src={fb}
              alt="Facebook"
              className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px]"
            />
            <img
              src={ig}
              alt="Instagram"
              className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px]"
            />
          </div>
        </div>

        {/* Contact Information and Navigation Links */}
        <div className="flex gap-11 lg:gap-0 lg:flex-row lg:justify-between lg:w-full">
          <div className="w-[147px] grid gap-4 lg:gap-6 lg:w-full">
            <div className="flex items-start space-x-3">
              <img src={alamat} alt="Alamat" className="w-5 h-5" />
              <p className="text-sm leading-tight text-[#e8ebe0] lg:max-w-[60%]">
                Jl. Pringgodani Jl. Saparua Gg. Buntu, Tegalrejo, Kec.
                Argomulyo, Kota Salatiga, Jawa Tengah 50733
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <img src={kontak} alt="Kontak" className="w-5 h-5" />
              <p className="text-sm text-[#e8ebe0]">+6289632517280</p>
            </div>
            <div className="flex items-center space-x-3">
              <img src={clock} alt="Jam Operasional" className="w-5 h-5" />
              <p className="text-sm text-[#e8ebe0]">10.00 - 19.00</p>
            </div>
            <div className="flex items-center space-x-3">
              <img src={email} alt="Email" className="w-5 h-5" />
              <p className="text-sm text-[#e8ebe0]">drnich@email.com</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-[126px] h-[101px] grid grid-cols-2 gap-[15px] lg:h-full lg:w-full">
            {footerLinks.map((item) => (
              <a
                key={item.judul}
                href="#"
                onClick={item.onClick}
                className="text-sm text-[#e8ebe0] hover:underline">
                {item.judul}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-right text-xs text-[#e8ebe0]">
        <p>©2024 | Dr. Nich Beauty Aesthetic</p>
      </div>
    </footer>
  );
}

import React from 'react';

// Import logo dan img
import logoPutih from '../../assets/logodrnich-white.svg';

// Logo sosmed
import yt from '../../assets/logo-sosmed/YouTube.svg';
import linkedIn from '../../assets/logo-sosmed/LinkedIn.svg';
import tt from '../../assets/logo-sosmed/TikTok.svg';
import fb from '../../assets/logo-sosmed/Facebook.svg';
import ig from '../../assets/logo-sosmed/Instagram.svg';

// Logo footer
import alamat from '../../assets/logo-footer/location.svg';
import kontak from '../../assets/logo-footer/call.svg';
import clock from '../../assets/logo-footer/clock.svg';

export default function Footer() {
  return (
    <footer className="w-full h-auto text-white text-center py-6 px-[27px] bg-gradient-to-br from-[#c2a353] to-[#00674f] overflow-hidden">
      <div className="flex flex-col justify-start items-center space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center w-full max-w-md">
          <img src={logoPutih} className="w-[120px] h-auto" alt="Logo" />
          <div className="w-[126px] flex items-center space-x-4">
            <img src={yt} className="w-[15px] h-[15px]" alt="YouTube" />
            <img src={linkedIn} className="w-[15px] h-[15px]" alt="LinkedIn" />
            <img src={tt} className="w-[15px] h-[15px]" alt="TikTok" />
            <img src={fb} className="w-[15px] h-[15px]" alt="Facebook" />
            <img src={ig} className="w-[15px] h-[15px]" alt="Instagram" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-between w-full max-w-lg">
          {/* Left Column */}
          <div className="flex flex-col space-y-4">
            {/* Alamat */}
            <div className="flex items-center space-x-2">
              <img src={alamat} className="w-4 h-4 relative -top-4" alt="Location" />
              <a href="#" className="w-[122px] text-left text-[#e8ebe0] text-xs font-normal leading-tight">
                Jl. Diponegoro No. 12, Salatiga, Jawa Tengah, 51552
              </a>
            </div>

            {/* Telepon */}
            <div className="flex items-center space-x-2">
              <img src={kontak} className="w-4 h-4" alt="Contact" />
              <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">
                +6289632517280
              </a>
            </div>

            {/* Jam Operasional */}
            <div className="flex items-center space-x-2">
              <img src={clock} className="w-4 h-4" alt="Clock" />
              <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">
                10.00 - 19.00
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 gap-[15px]">
            <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">Profil</a>
            <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">Produk</a>
            <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">Galeri</a>
            <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">Reservasi</a>
            <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">Promo</a>
            <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">Konsultasi</a>
            <a href="#" className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">Layanan</a>
          </div>
        </div>

        {/* Footer Section */}
        <div className='w-full max-w-md justify-end'>
          <p className='text-right text-[#e8ebe0] text-xs font-normal leading-tight'>©2024 | Dr. Nich Beauty Aesthetic</p>
        </div>
      </div>
    </footer>
  );
}

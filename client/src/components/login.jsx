import React from 'react';

// Logo & images
import logo from '../assets/logodrnich.svg';
import bag from '../assets/bag-2.svg';
import search from '../assets/search-normal.svg';
import hamburger from '../assets/hamburger.svg';

export default function Login() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Navbar */}
      <div className="w-full h-[159px] shadow-sm bg-white">
        <div className="container pt-[79px] pb-[20.29px] pl-8 flex items-center justify-between h-full">
          <img src={logo} className="w-20 h-[59.71px]" alt="Logo" />

          {/* Navigation */}
          <div className="w-[95px] h-[27px] flex items-center gap-3.5 mr-[33px]">
            <a href="#">
              <img src={bag} alt="Bag" />
            </a>
            <a href="#">
              <img src={search} alt="Search" />
            </a>
            <a href="#">
              <img src={hamburger} alt="Menu" />
            </a>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex-col items-center justify-between w-full h-[32px] pl-[32px] pr-[33px] pt-[16px]">
          <div className="flex justify-between items-center w-full text-xs text-[#bdbdbd] font-normal">
            <div className="flex">
              <p>Beranda</p>
              <div> / </div>
              <p>Masuk</p>
            </div>

            <div className="flex">
              <p>Belum punya Akun?</p>
              <a href="" className="font-medium text-[#2b463c]">Daftar</a>
            </div>
          </div>

          <div className="pt-[20px]">
            <h2 className="text-base font-medium">Masuk</h2>
            <p className="text-sm font-normal pt-[5px]">Masuk untuk melakukan reservasi!</p>

            <form action="" className='pt-[30px]'>
              {/* Form fields go here */}
              
              <div>
                <label className='text-sm font-medium'>Email</label>
                <input type='email' className='w-full h-[48px] border border-[#bdbdbd] rounded-full mt-[5px] text-left placeholder-center' placeholder='Masukan Email' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from 'react'
import { navContext } from "../../App2"
import iCari from "../../assets/iconLaporanPenjualan/iCari.svg";
import iTamPu from "../../assets/iconkasir/iTamPu.svg";
import axios from 'axios';

export const TambahDiskon4 = () => {
    const { setNav, setLink } = useContext(navContext)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => { await axios.get('https://api.drnich.co.id/api/pos/promo/promo').then(
            Response => {
                const filterr = Response.data.filter(item => item.jenis == "Diskon")
                setData(filterr)
                console.log(filterr)
                }
            
            )
        }
        
        setNav('Diskon')   
        document.title = 'Diskon'
        setLink('/pos/promo')
        fetchData();
    },[])
return (
    <div className="flex flex-col px-7 py-8 gap-1 bg-white w-full h-full pt-8 text-[#454545] text-[12px]">
        <div className='flex flex-col overflow-auto gap-[10px] mx-3 h-full'>
            <form className="mb-5 flex gap-2 border border-[#BDBDBD] rounded-xl items-center p-3">
                <img src={iCari} alt="Cari" />
                <input type="text" className="text-sm w-full h-[30px] focus:outline-none" placeholder="Cari..."></input>
            </form>
            {data.map((item, i) => (
                <div key={i} className='grid place-items-start w-full border border-[#BDBDBD] rounded-xl px-[20px] py-[15px]'>
                    <p className='font-semibold'>{item.namaPromo}</p>
                    <div className='flex justify-between items-start text-[#BDBDBD] w-full'>
                        <p>{item.potongan}</p>
                        <p className='text-[#EAC564]'>{item.keterangan}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <a href='TambahDiskon3' className='flex mt-auto mx-2'>
            <button className='flex justify-center gap-2 text-white text-[14px] bg-gradient-to-r rounded-xl from-[#EAC564] to-[#C2A353] w-full p-4'>
                <img src={iTamPu} alt="TambahPu" />
                <p>Tambah diskon</p>
            </button>
        </a>
    </div>
)
}

import React from 'react'

// import logo dan img
import logoPutih from '../../assets/logodrnich-white.svg'
import arrow from '../../assets/arrow-down.svg'

// logo sosmed

export default function footer() {
  return (
    <footer className="w-full h-[266px] text-white text-center py-[25px] px-[32px] bg-gradient-to-br from-[#c2a353] to-[#00674f] overflow-hidden">
      <div className='flex justify-between items-end'>
        <img src={logoPutih} className='w-[120px] h-auto' alt="" />
        <div className='w-[121px] h-9 flex items-center justify-center text-center rounded-full border border-[#e8ebe0] gap-[10px]'>
      
        
        </div>
      </div>
    </footer>
  )
}

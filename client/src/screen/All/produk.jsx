import React from 'react'

//navbar
import Navbar from "../auth/navbar";

function Produk() {
    return (
        <>
            <Navbar selected={"Produk"} />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#c2a353] to-[#00674f] text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Produk</h1>
                    <p className="text-lg">Informasi tentang produk kami akan segera hadir.</p>
                </div>
            </div>
        </>
    )
}

export default Produk
import asyncHandler from "express-async-handler";
import TransaksiModels from "../../models/KasirPOS/transaksiPos.js";
import belanjaModels from "../../models/ProdukPOS/belanjaPos.js";
import transaksiDetailModels from "../../models/KasirPOS/detailTransaksiPos.js";
import ProdukModels from "../../models/ProdukPOS/produkPos.js";
import promoModels from "../../models/PromoPOS/promoPos.js";
import pelangganModels from "../../models/User/pelangganPos.js";

const laporanPenjualan = asyncHandler(async(req,res)=>{
    try{
    const {dari, sampai} = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    const transaksi = await TransaksiModels.find({createdAt : {$gte : from, $lte : to}}).populate("promo")
    .populate("pelanggan")
    .populate({
      path : "transaksiDetail",
      populate : {
        path : 'produk',
        model : 'produkPos'
      }
    });

    let total = 0;
    for (const item of transaksi){
        total += item.totalAkhir
    }
    const totalTransaksi = transaksi.length;
    
    res.status(200).json({transaksi: transaksi, totalPendapatan : total, totalTransaksi: totalTransaksi})
}
catch(error){
    res.status(400).json({ message: error.message });
}

});

const laporanPenjualanProduk = asyncHandler(async(req,res)=>{
  try{
  const {dari, sampai} = req.body;
  const from = new Date(dari)
  const to = new Date(sampai)
  const penjualan = await TransaksiModels.find({createdAt : {$gte : from, $lte : to}})
  .populate({
    path : "transaksiDetail",
    populate : {
      path : 'produk',
      model : 'produkPos'
    }
  });
  let totalProduk = 0;
  for (const item of penjualan){
    for (const items of item.transaksiDetail){
      totalProduk += items.jumlah;
    }
  }
  
  res.status(200).json({totalProduk: totalProduk})
}
catch(error){
  res.status(400).json({ message: error.message });
}

});

const laporanBelanja = asyncHandler(async(req,res)=>{
  try{
  const {dari, sampai} = req.body;
  const from = new Date(dari)
  const to = new Date(sampai)
  const belanja = await belanjaModels.find({createdAt : {$gte : from, $lte : to}})
  .populate({
    path : "belanjaDetail",
    populate : {
      path : 'produk',
      model : 'produkPos'
    }
  });

  for (const item of belanja){
  }
  const totalBelanja = belanja.length;
  
  res.status(200).json({belanja: belanja, totalTransaksi: totalBelanja})
}
catch(error){
  res.status(400).json({ message: error.message });
}

});

const laporanPersediaan = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  try{
  const produks = await ProdukModels.find({kategori : id});
  let produkRes = [];
  for (const item of produks){
    const res = {
      namaProduk : item.namaProduk,
      stok : item.stok
    }
    produkRes.push(res)
  }
  res.status(200).json({produkRes})
}
catch(error){
  res.status(400).json({ message: error.message });
}

});

const laporanLimit = asyncHandler(async(req,res)=>{
  try{
  const produks = await ProdukModels.find();
  let produkRes = [];
  for (const item of produks){
    if(item.stok<item.minStok){
      const res = {
        namaProduk : item.namaProduk,
        stok : item.stok,
        minStok : item.minStok
      }
      produkRes.push(res)
    }
    
  }
  res.status(200).json(produkRes)
}
catch(error){
  res.status(400).json({ message: error.message });
}

});

const laporanTerlaris = asyncHandler(async(req,res)=>{
  try{
  const transaksi = await TransaksiModels.find()
  .populate({
    path : 'transaksiDetail', 
    populate : {
      path:'produk',
      model:'produkPos',
      populate: {
        path: 'kategori',
        model: 'kategoriProdukPos'
      }
    }
  });
  let produklist = [];
  let kategorilist = [];
  for (const item of transaksi){
    const det = item.transaksiDetail;
    for(const citem of det){
      
      if(produklist.some(item => item.namaProduk == citem.produk.namaProduk)){
       produklist = produklist.map(item=>item.namaProduk == citem.produk.namaProduk ? {...item, jumlah: item.jumlah+citem.jumlah}: item) 
      if(kategorilist.some(item => item.kategori == citem.produk.kategori.kategori)){
        kategorilist = kategorilist.map(item=>item.kategori == citem.produk.kategori.kategori ? {...item, jumlah: item.jumlah+citem.jumlah}: item) 
      }
      else{
        const isi = {
          kategori : citem.produk.kategori.kategori,
          jumlah : citem.jumlah
        }
        kategorilist.push(isi)
      }
      }
      else{
        const isi = {
          namaProduk : citem.produk.namaProduk,
          jumlah : citem.jumlah
        }
        produklist.push(isi)
        if(kategorilist.some(item => item.kategori == citem.produk.kategori.kategori)){
          kategorilist = kategorilist.map(item=>item.kategori == citem.produk.kategori.kategori ? {...item, jumlah: item.jumlah+citem.jumlah}: item) 
        }
        else{
          const isi = {
            kategori : citem.produk.kategori.kategori,
            jumlah : citem.jumlah
          }
          kategorilist.push(isi)
        }
      }
      
    }

    
  }
  res.status(200).json({produklist: produklist, kategorilist: kategorilist})
}
catch(error){
  res.status(400).json({ message: error.message });
}

});

export {
 laporanPenjualan,
 laporanPenjualanProduk,
 laporanBelanja,
 laporanPersediaan,
 laporanLimit,
 laporanTerlaris
};

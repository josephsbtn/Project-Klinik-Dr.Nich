import asyncHandler from "express-async-handler";
import TransaksiModels from "../../models/KasirPOS/transaksiPos.js";
import belanjaModels from "../../models/ProdukPOS/belanjaPos.js";
import transaksiDetailModels from "../../models/KasirPOS/detailTransaksiPos.js";
import ProdukModels from "../../models/ProdukPOS/produkPos.js";
import kurangStokModels from "../../models/ProdukPOS/kurangStok.js";
import promoModels from "../../models/PromoPOS/promoPos.js";
import pelangganModels from "../../models/User/pelangganPos.js";

const laporanPenjualan = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    let dataPelanggan = []
    const transaksi = await TransaksiModels.find({ createdAt: { $gte: from, $lte: to } }).populate("promo")
      .populate("pelanggan")
      .populate({
        path: "transaksiDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });

    let total = 0;
    for (const item of transaksi) {
      total += item.totalAkhir;

      if (item.pelanggan && item.pelanggan.namaPelanggan) {  // Check if pelanggan exists
        if (dataPelanggan.some(data => data.namaPelanggan == item.pelanggan.namaPelanggan)) {
          dataPelanggan = dataPelanggan.map(isi =>
            isi.namaPelanggan == item.pelanggan.namaPelanggan
              ? { ...isi, totalPembelian: isi.totalPembelian + item.totalAkhir }
              : isi
          );
        } else {
          const isiDataPelanggan = {
            namaPelanggan: item.pelanggan.namaPelanggan,
            totalPembelian: item.totalAkhir
          };
          dataPelanggan.push(isiDataPelanggan);
        }
      }
    }
    const totalTransaksi = transaksi.length;


    res.status(200).json({ transaksi: transaksi, totalPendapatan: total, totalTransaksi: totalTransaksi, pelanggan: dataPelanggan })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanPenjualanProduk = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    const penjualan = await TransaksiModels.find({ createdAt: { $gte: from, $lte: to } })
      .populate({
        path: "transaksiDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });
    let totalProduk = 0;
    let produklist = [];
    for (const item of penjualan) {
      for (const items of item.transaksiDetail) {
        totalProduk += items.jumlah;
        if (produklist.some(item => item.namaProduk == items.produk.namaProduk)) {
          produklist = produklist.map(item => item.namaProduk == items.produk.namaProduk ? { ...item, jumlah: item.jumlah + items.jumlah, pendapatan: item.pendapatan + (items.jumlah * items.produk.hargaJual) } : item)
        }
        else {
          const isi = {
            namaProduk: items.produk.namaProduk,
            jumlah: items.jumlah,
            pendapatan: (items.jumlah * items.produk.hargaJual)
          }
          produklist.push(isi)
        }
      }
    }

    res.status(200).json({ totalProduk: totalProduk, penjualanProduk: produklist })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanBelanja = asyncHandler(async (req, res) => {
  try {
    const { dari, sampai } = req.body;
    const from = new Date(dari)
    const to = new Date(sampai)
    const belanja = await belanjaModels.find({ createdAt: { $gte: from, $lte: to } })
      .populate({
        path: "belanjaDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });

    for (const item of belanja) {
    }
    const totalBelanja = belanja.length;

    res.status(200).json({ belanja: belanja, totalTransaksi: totalBelanja })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanPersediaan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const produks = await ProdukModels.find({ kategori: id });
    let produkRes = [];
    for (const item of produks) {
      const res = {
        namaProduk: item.namaProduk,
        stok: item.stok
      }
      produkRes.push(res)
    }
    res.status(200).json({ produkRes })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanLimit = asyncHandler(async (req, res) => {
  try {
    const produks = await ProdukModels.find();
    let produkRes = [];
    for (const item of produks) {
      if (item.stok < item.minStok) {
        const res = {
          id: item.id,
          namaProduk: item.namaProduk,
          stok: item.stok,
          minStok: item.minStok
        }
        produkRes.push(res)
      }

    }
    res.status(200).json(produkRes)
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanTerlaris = asyncHandler(async (req, res) => {
  try {
    const transaksi = await TransaksiModels.find()
      .populate({
        path: 'transaksiDetail',
        populate: {
          path: 'produk',
          model: 'produkPos',
          populate: [{
            path: 'kategori'
          },
          { path: 'jenis' }],
        }
      });
    let produklist = [];
    let kategorilist = [];
    for (const item of transaksi) {
      const det = item.transaksiDetail;
      for (const citem of det) {

        if (produklist.some(item => item.namaProduk == citem.produk.namaProduk)) {
          produklist = produklist.map(item => item.namaProduk == citem.produk.namaProduk ? { ...item, jumlah: item.jumlah + citem.jumlah, pendapatan: item.pendapatan + (citem.jumlah * citem.produk.hargaJual) } : item)
          if (kategorilist.some(item => item.kategori == citem.produk.kategori.kategori)) {
            kategorilist = kategorilist.map(item => item.kategori == citem.produk.kategori.kategori ? { ...item, jumlah: item.jumlah + citem.jumlah, pendapatan: item.pendapatan + (citem.jumlah * citem.produk.hargaJual) } : item)
          }
          else {
            const isi = {
              kategori: citem.produk.kategori.kategori,
              jumlah: citem.jumlah,
              pendapatan: (citem.jumlah * citem.produk.hargaJual),
              jenis: citem.produk.jenis.jenis
            }
            kategorilist.push(isi)
          }
        }
        else {
          const isi = {
            namaProduk: citem.produk.namaProduk,
            jumlah: citem.jumlah,
            pendapatan: (citem.jumlah * citem.produk.hargaJual),
            jenis: citem.produk.jenis.jenis
          }
          produklist.push(isi)
          if (kategorilist.some(item => item.kategori == citem.produk.kategori.kategori)) {
            kategorilist = kategorilist.map(item => item.kategori == citem.produk.kategori.kategori ? { ...item, jumlah: item.jumlah + citem.jumlah, pendapatan: item.pendapatan + (citem.jumlah * citem.produk.hargaJual) } : item)
          }
          else {
            const isi = {
              kategori: citem.produk.kategori.kategori,
              jumlah: citem.jumlah,
              pendapatan: (citem.jumlah * citem.produk.hargaJual),
              jenis: citem.produk.jenis.jenis
            }
            kategorilist.push(isi)
          }
        }

      }


    }
    res.status(200).json({ produklist: produklist, kategorilist: kategorilist })
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});

const laporanGrafik = async (req, res) => {
  try {
    const { endOfWeek } = req.body; // Only provide endOfWeek

    if (!endOfWeek) {
      return res.status(400).json({ success: false, message: "endOfWeek is required" });
    }

    const weekDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    // Convert endOfWeek to Date object
    const endDate = new Date(endOfWeek);
    endDate.setHours(23, 59, 59, 999); // Ensure it's the end of the day

    // Compute startOfWeek by subtracting 6 days
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0); // Ensure it's the start of the day

    // Detect the start day from startDate
    const detectedDayIndex = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const detectedStartDay = detectedDayIndex === 0 ? "Minggu" : weekDays[detectedDayIndex - 1];

    // Generate the ordered days of the week based on the detected start day
    const startIndex = weekDays.indexOf(detectedStartDay);
    const orderedWeekDays = [...weekDays.slice(startIndex), ...weekDays.slice(0, startIndex)];

    // Fetch transactions within the given range
    const transactions = await TransaksiModels.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    // Initialize the week structure as an ARRAY
    const transactionsByDay = orderedWeekDays.map(day => ({ name: day, penjualan: 0 }));

    // Group transactions by day
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      const transactionDayIndex = transactionDate.getDay();

      // Adjust day name to match the custom order
      const adjustedDayName = transactionDayIndex === 0 ? "Minggu" : weekDays[transactionDayIndex - 1];

      // Find the correct day in the array and update "penjualan"
      const dayData = transactionsByDay.find(day => day.name === adjustedDayName);
      if (dayData) {
        dayData.penjualan += transaction.totalAkhir;
      }
    });

    res.json({ success: true, transactions: transactionsByDay });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const laporanGrafikProduk = async (req, res) => {
  try {
    const { endOfWeek } = req.body;

    if (!endOfWeek) {
      return res.status(400).json({ success: false, message: "endOfWeek is required" });
    }

    const weekDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    // Konversi endOfWeek ke Date object
    const endDate = new Date(endOfWeek);
    endDate.setHours(23, 59, 59, 999);

    // Hitung startOfWeek (6 hari sebelumnya)
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    // Tentukan indeks hari mulai
    const detectedDayIndex = startDate.getDay();
    const detectedStartDay = detectedDayIndex === 0 ? "Minggu" : weekDays[detectedDayIndex - 1];

    // Susun ulang hari dalam urutan yang sesuai
    const startIndex = weekDays.indexOf(detectedStartDay);
    const orderedWeekDays = [...weekDays.slice(startIndex), ...weekDays.slice(0, startIndex)];

    // Ambil transaksi dalam rentang tanggal yang diberikan
    const transactions = await TransaksiModels.find({
      createdAt: { $gte: startDate, $lte: endDate }
    }).populate({
      path: 'transaksiDetail',
      populate: {
        path: 'produk',
        model: 'produkPos'
      }
    });

    // Struktur data menggunakan Map untuk akses cepat
    const transactionsByDay = new Map();
    orderedWeekDays.forEach(day => transactionsByDay.set(day, { name: day, penjualan: [] }));
    let produklist = []
    // Kelompokkan transaksi berdasarkan hari
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      const transactionDayIndex = transactionDate.getDay();
      const adjustedDayName = transactionDayIndex === 0 ? "Minggu" : weekDays[transactionDayIndex - 1];

      // Ambil referensi objek hari
      const dayData = transactionsByDay.get(adjustedDayName);
      if (!dayData) return;

      const det = transaction.transaksiDetail;
      for (const citem of det) {
        const existingProduct = dayData.penjualan.find(item => item.namaProduk === citem.produk.namaProduk);

        if (existingProduct) {
          existingProduct.jumlah += citem.jumlah;
          existingProduct.pendapatan += citem.jumlah * citem.produk.hargaJual;
          const existproduklist = produklist.find(item => item.namaProduk == citem.produk.namaProduk);
          if (!existproduklist) {
            produklist.push({
              namaProduk: citem.produk.namaProduk
            })
          }

        } else {
          dayData.penjualan.push({
            namaProduk: citem.produk.namaProduk,
            jumlah: citem.jumlah,
            pendapatan: citem.jumlah * citem.produk.hargaJual
          });
          const existproduklist = produklist.find(item => item.namaProduk == citem.produk.namaProduk);
          if (!existproduklist) {
            produklist.push({
              namaProduk: citem.produk.namaProduk
            })
          }
        }
      }
    });

    // Konversi Map kembali ke array
    res.json({ success: true, penjualan: Array.from(transactionsByDay.values()), produklist: produklist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const laporanLogProduk = async (req, res) => {
  try {
    const { id } = req.params;
    let logProduk = []
    const transactions = await TransaksiModels.find().populate({
      path: 'transaksiDetail',
      populate: {
        path: 'produk',
        model: 'produkPos'
      }
    });
    
    // Kelompokkan transaksi berdasarkan hari
    transactions.forEach(transaction => {

      const det = transaction.transaksiDetail;
      for (const citem of det) {

        if (citem.produk._id == id) {

          logProduk.push({
            namaProduk: citem.produk.namaProduk,
            status: 'minus',
            jumlah: citem.jumlah,
            waktu: transaction.updateAt,
            jenis : 'transaksi',
            id : transaksi._id
          })

        } else {
        }

      }
    });

    const belanja = await belanjaModels.find()
      .populate({
        path: "belanjaDetail",
        populate: {
          path: 'produk',
          model: 'produkPos'
        }
      });

      belanja.forEach(beli => {

      const det = beli.belanjaDetail;
      for (const citem of det) {
        if (citem.produk._id == id) {

          logProduk.push({
            namaProduk: citem.produk.namaProduk,
            status: 'plus',
            jumlah: citem.jumlah,
            waktu: beli.updateAt,
            jenis : 'belanja',
            id : belanja._id
          })

        } else {
        }

      }
    });

    const kurangStok = kurangStokModels.find()

    kurangStok.length>0 && kurangStok.forEach(beli => {

      
      if (beli.produk._id == id) {

          logProduk.push({
            namaProduk: beli.produk.namaProduk,
            status: 'plus',
            jumlah: beli.jumlah,
            waktu: kurangStok.updateAt,
            jenis : 'minStok',
            id : beli._id
          })

        } else {
        }

      
    });

    // Konversi Map kembali ke array
    res.json({ success: true, logProduk: logProduk });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export {
  laporanPenjualan,
  laporanPenjualanProduk,
  laporanBelanja,
  laporanPersediaan,
  laporanLimit,
  laporanTerlaris,
  laporanGrafik,
  laporanGrafikProduk,
  laporanLogProduk
};

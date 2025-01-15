const phone = "6285867413910";

const templateMessageReservasi = `
Halo, Dr. Nich. Saya ingin melakukan reservasi. 
Mohon bantuannya untuk informasi jadwal yang tersedia dan prosedur lebih lanjut. 

Berikut adalah detail saya:
- Nama: [Nama Lengkap Anda]
- Tanggal & Waktu Pilihan: [Tanggal dan waktu yang diinginkan]

Terima kasih atas perhatian dan bantuannya. Saya menunggu informasi dari Anda. 😊
`;

const templateMessageProduk = `
Halo, Dr. Nich. Saya ingin melakukan pemesanan untuk produk. 
Mohon bantuannya untuk informasi ketersediaan dan prosedur pembelian lebih lanjut.

Berikut adalah detail saya:
- Nama: [Nama Lengkap Anda]
- Produk yang Dipesan: [Nama produk atau jenis produk]
- Jumlah: [Jumlah yang diinginkan]
- Tanggal & Waktu Pilihan: [Tanggal dan waktu untuk pengambilan atau pengiriman]

Terima kasih atas perhatian dan bantuannya. Saya menunggu informasi dari Anda. 😊
`;



function sendWhatsAppReservasiMessage() {
  // Buat URL untuk membuka WhatsApp dengan pesan template
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(
    templateMessageReservasi
  )}`;

  // Buka URL di aplikasi WhatsApp (jika di ponsel) atau di tab baru (jika di desktop)
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Jika perangkat adalah ponsel, buka URL langsung
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
}

function sendWhatsAppProdukMessage() {
  // Buat URL untuk membuka WhatsApp dengan pesan template
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(
    templateMessageProduk
  )}`;

  // Buka URL di aplikasi WhatsApp (jika di ponsel) atau di tab baru (jika di desktop)
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Jika perangkat adalah ponsel, buka URL langsung
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
}


export { sendWhatsAppReservasiMessage, sendWhatsAppProdukMessage};

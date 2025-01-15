const phone = "6285867413910";

const templateMessage = "Halo, Dr. Nich. Apa kabar?";

function sendWhatsAppMessage() {
  // Buat URL untuk membuka WhatsApp dengan pesan template
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(
    templateMessage
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

export { sendWhatsAppMessage };

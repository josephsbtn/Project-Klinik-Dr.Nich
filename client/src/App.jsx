import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login
import Login from "./screen/auth/login";
// Beranda
import Beranda from "./screen/All/beranda.jsx";
//layanan
import ListLayanan from "./screen/Layanan/listLayanan.jsx";
import DetailJenisLayanan from "./screen/Layanan/detailJenisLayanan.jsx";
import DetailTreatment from "./screen/Layanan/DetailTreatment.jsx";
// profil
import Profil from "./screen/All/profile.jsx";
// galeri
import Galeri from "./screen/All/galeri.jsx";
//=====produk=====
import Produk from "./screen/All/produk.jsx";
// detailKategori
import DetailKategori from "./screen/All/detailKategori.jsx";
//================

//promo
import Promo from "./screen/All/promo.jsx";
//pencarian
import Pencarian from "./screen/All/pencarian.jsx";
import  Debug  from "./screen/All/debug.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Beranda />} />
        <Route path="/" element={<carouselAbout />} />
        <Route path="/layanan" element={<ListLayanan />} />
        <Route
          path="/layanan/detail/:idJenis"
          element={<DetailJenisLayanan />}
        />
        <Route
          path="/layanan/detail/:idJenis/:idTreatment"
          element={<DetailTreatment />}
        />
        <Route
          path="/layanan/detailTreatment/:idTreatment"
          element={<DetailTreatment />}
        />
        <Route path="/profil" element={<Profil />} />
        <Route path="/galeri" element={<Galeri />} />
        {/* ==============PRODUK================= */}
        <Route path="/produk" element={<Produk />} />
        {/* Detail Skincare */}
        <Route path="/produk/detailKategori/:id" element={<DetailKategori />} />
        {/* ===================================== */}

        {/* PROMO */}
        <Route path="/promo" element={<Promo />} />
        <Route path="/pencarian" element={<Pencarian/>} />

        {/* Debug*/}
        <Route path="/debug" element={<Debug/>} />
      </Routes>
    </Router>
  );
}

export default App;

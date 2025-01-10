import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dasboard from "./screen/dashboard.jsx";
import ListLayanan from "./screen/layanan/listLayanan.jsx";
import LayananUD from "./screen/layanan/layananUD.jsx";
import CreateLayanan from "./screen/layanan/createLayanan.jsx";
import ListPromo from "./screen/promo/listPromo.jsx";
import EditJenisLayanan from "./screen/layanan/editJenisLayanan.jsx";
import ListGallery from "./screen/galery/listGallery.jsx";
import Sertif from "./screen/foto-sertif-mesin/sertif.jsx";
import Mesin from "./screen/foto-sertif-mesin/mesin.jsx";
import Produk from "./screen/produk/produk.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dasboard />} />
          <Route path="/layanan" element={<ListLayanan />} />
          <Route path="/layanan/updateLayanan/:id" element={<LayananUD />} />
          <Route
            path="/layanan/editJenisLayanan/:id"
            element={<EditJenisLayanan />}
          />
          <Route path="/layanan/tambahLayanan" element={<CreateLayanan />} />
          <Route path="/listpromo" element={<ListPromo />} />
          <Route path="/galeri" element={<ListGallery />} />
          <Route path="/sertifikat" element={<Sertif />} />
          <Route path="/mesin" element={<Mesin />} />
          <Route path="/produk" element={<Produk />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

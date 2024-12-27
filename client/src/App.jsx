import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login
import Login from "./screen/auth/login";
// Beranda
import Beranda from "./screen/All/beranda.jsx";
//layanan
import ListLayanan from "./screen/Layanan/listLayanan.jsx";
// profil
import Profil from "./screen/All/profile.jsx"
// galeri
import Galeri from "./screen/All/galeri.jsx"

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Beranda />} />
        <Route path="/" element={<carouselAbout />} />
        <Route path="/layanan" element={<ListLayanan />} />
        <Route path="profil" element={<Profil />} />
        <Route path="galeri" element={<Galeri />} />
      </Routes>
    </Router>
  );
}

export default App;

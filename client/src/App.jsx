import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login
import Login from "./screen/auth/login";
// Beranda
import Beranda from "./screen/All/beranda.jsx";
import ListLayanan from "./screen/Layanan/listLayanan.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Beranda />} />
        <Route path="/" element={<carouselAbout />} />
        <Route path="/layanan" element={<ListLayanan />} />
      </Routes>
    </Router>
  );
}

export default App;

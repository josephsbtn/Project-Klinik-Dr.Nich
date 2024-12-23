import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dasboard from "./screen/dashboard.jsx";
import ListLayanan from "./screen/layanan/listLayanan.jsx";
import LayananUD from "./screen/layanan/layananUD.jsx";
import CreateLayanan from "./screen/layanan/createLayanan.jsx";
import ListPromo from "./screen/promo/listPromo.jsx";
import EditJenisLayanan from "./screen/layanan/editJenisLayanan.jsx";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;

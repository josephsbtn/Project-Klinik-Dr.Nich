import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dasboard from "./screen/dashboard.jsx";
import ListLayanan from "./screen/layanan/listLayanan.jsx";
import LayananUD from "./screen/layanan/layananUD.jsx";
import CreateLayanan from "./screen/layanan/createLayanan.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dasboard />} />
          <Route path="/layanan" element={<ListLayanan />} />
          <Route path="/layanan/updateLayanan/:id" element={<LayananUD />} />
          <Route path="/layanan/tambahLayanan" element={<CreateLayanan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

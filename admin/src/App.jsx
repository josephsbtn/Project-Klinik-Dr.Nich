import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dasboard from "./screen/dashboard.jsx";
import ListLayanan from "./screen/layanan/listLayanan.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dasboard />} />
          <Route path="/listLayanan" element={<ListLayanan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

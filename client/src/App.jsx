import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login
import Login from "./screen/auth/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// login
import Login from "./components/login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

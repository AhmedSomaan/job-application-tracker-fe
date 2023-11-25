import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Postings from "./pages/Postings";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/postings" element={<Postings />} />
          <Route path="/postings/:postId" element={<Postings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

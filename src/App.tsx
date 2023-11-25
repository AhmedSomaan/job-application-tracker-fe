import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Bookmarks from "./pages/Bookmarks";
import "./App.css";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posting/:jobId" element={<JobDetails />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

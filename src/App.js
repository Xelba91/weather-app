import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import FiveDay from "./components/FiveDay";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App app-container">
      <BrowserRouter>
        <NavBar className="mb-5" />
        <Welcome />
        <Routes>
          <Route path="/" element={<Home className="mt-5" fontSize="fs-1" textSize="fs-5" />} />
          <Route path="/five-day" element={<FiveDay />} />
        </Routes>
      </BrowserRouter>
      <Footer className="mt-5" />
    </div>
  );
}
export default App;

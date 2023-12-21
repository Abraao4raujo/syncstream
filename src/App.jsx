import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
// import Movies from "../public/caminhos/Movies";
// import Series from "../public/caminhos/Series";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

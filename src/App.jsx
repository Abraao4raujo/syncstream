import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound.jsx";
import { Header } from "./components/header/header.jsx";
import { useState } from "react";

const App = () => {
  const [salaCriada, setSalaCriada] = useState(false);
  const [nomeSala, setNomeSala] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
      </Routes>
      <Header
        setShowModal={setShowModal}
        showModal={showModal}
        salaCriada={salaCriada}
        nomeSala={nomeSala}
      />
      
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              showModal={showModal}
              setShowModal={setShowModal}
              setNomeSala={setNomeSala}
              setSalaCriada={setSalaCriada}
            />
          }
        />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

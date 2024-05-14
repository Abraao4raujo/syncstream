import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Authentication/Login/Index.jsx";
import Cadastro from "./pages/Authentication/Cadastro/Index.jsx";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound.jsx";
import { Header } from "./components/Header/Index.jsx";
import { Footer } from "./components/Footer/Index.jsx";
import { useState } from "react";
import BgImageSrc from "../public/capaFilmes.png";
import Logo from "../public/logoSemFundo.png";

const App = () => {
  const [menu, setOpenMenu] = useState(false);
  return (
    <div className="App bg-[#333]">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthUser />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Cadastro />} />
          </Route>

          <Route
            element={<Layout optionMenu={menu} setOpenMenu={setOpenMenu} />}
          >
            <Route path="/home" element={<Home menu={menu} />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

function Layout({ optionMenu, setOpenMenu }) {
  return (
    <>
      <Header optionMenu={optionMenu} setOpenMenu={setOpenMenu} />
      <Outlet />
      <Footer />
    </>
  );
}

function AuthUser() {
  return (
    <div>
      <Outlet />
      <img
        className="w-[100px] mt-auto absolute end-0 right-0 z-0"
        src={Logo}
        alt="Logo"
      />
      <div className="-z-10">
        <img
          className="w-full h-screen mt-auto overflow-hidden bg-contain object-cover absolute end-0 right-0"
          src={BgImageSrc}
          alt="imagem de fundo"
        />
      </div>
    </div>
  );
}

export default App;

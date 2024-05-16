import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Authentication/Login/Index.jsx";
import Cadastro from "./pages/Authentication/Cadastro/Index.jsx";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound.jsx";
import { Header } from "./components/Header/Index.jsx";
import { Footer } from "./components/Footer/Index.jsx";
import BgImageSrc from "../public/capaFilmes.png";
import useFetch from "./adapters/useFetch.jsx";

const App = () => {
  const movies = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_APIKEYTMDB
    }&language=pt-BR&page=1`
  );
  const moviesTwo = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_APIKEYTMDB
    }&language=pt-BR&page=2`
  );
  const tvShows = useFetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${
      import.meta.env.VITE_APIKEYTMDB
    }&language=pt-BR&page=1`
  );

  return (
    <div className="App bg-[#333]">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthUser />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Cadastro />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/home" element={<Home movies={movies} />} />
            <Route path="/movies" element={<Home movies={moviesTwo} />} />
            <Route path="/series" element={<Home movies={tvShows} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function AuthUser() {
  return (
    <div>
      <img
        className="w-full h-screen mt-auto overflow-hidden bg-contain object-cover absolute end-0 right-0 -z-10"
        src={BgImageSrc}
        alt="imagem de fundo"
      />
      <Outlet />
    </div>
  );
}

export default App;

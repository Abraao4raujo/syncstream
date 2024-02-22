import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound.jsx";
import AuthUser from "./pages/AuthUser";
import { Header } from "./pages/Layout/header/Header.jsx";
import { Footer } from "./pages/Layout/footer/Footer.jsx";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Auth />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Cadastro />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
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
function Auth() {
  return (
    <>
      <AuthUser>
        <Outlet />
      </AuthUser>
    </>
  );
}

export default App;

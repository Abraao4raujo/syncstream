import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound.jsx";
import { Header } from "./components/header/header.jsx";
import AuthUser from "./pages/AuthUser";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthUser headerTitle="Login">
                <Login />
              </AuthUser>
            }
          />
          <Route
            path="/register"
            element={
              <AuthUser headerTitle="Cadastro">
                <Cadastro />
              </AuthUser>
            }
          />

          <Route element={<Header />}>
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

export default App;

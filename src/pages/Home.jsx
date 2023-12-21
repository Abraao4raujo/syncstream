import { Header } from "../components/header/header";
import "../styles/main.css";
import Cards from "../components/cards/cards";

const Home = () => {
  return (
    <>
      <Header />
      <div className="main">
        <h1>Movies</h1>
        <Cards />
      </div>
    </>
  );
};

export default Home;

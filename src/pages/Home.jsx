import "../styles/main.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import SlidesCard from "../components/containerCards/SlidesCard.jsx";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = ({ movies, path }) => {
  return (
    <>
      {movies && (
        <Carousel
          className="w-full h-full m-auto"
          plugins={[
            Autoplay({
              delay: 4500,
            }),
          ]}
        >
          <CarouselContent className="w-full h-[99vh] m-auto">
            {movies.map((movie, key) => (
              <CarouselItem className="p-0 w-full h-full " key={key}>
                <Link to={`/${path}/${movie.id}`}>
                  <img
                    className="w-full h-[95vh] bg-cover"
                    src={
                      "https://image.tmdb.org/t/p/original/" +
                      movie.backdrop_path
                    }
                  />
                  <div className="relative bottom-[55vh] left-[150px] text-[3rem] text-white w-[40%]">
                    <FaPlayCircle className="text-[10rem] cursor-pointer opacity-80 hover:scale-110 hover:opacity-100 transition ease-in-out delay-150" />
                    <label>{movie.title || movie.name}</label>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <SlidesCard movies={movies} path={path}/>
    </>
  );
};

export default Home;

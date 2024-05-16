import "../styles/main.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import SlidesCard from "../components/containerCards/slidesCard.jsx";

const Home = ({ movies }) => {
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
          <CarouselContent className="w-full h-full m-auto">
            {movies.map((movie, key) => (
              <CarouselItem className="p-0 w-full h-full" key={key}>
                <img
                  className="w-full h-full bg-cover"
                  src={
                    "https://image.tmdb.org/t/p/original/" + movie.backdrop_path
                  }
                />
                <label className="relative bottom-[10vh] left-[150px] text-[3rem] text-white">
                  {movie.title || movie.name}
                </label>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <SlidesCard movies={movies} />
    </>
  );
};

export default Home;

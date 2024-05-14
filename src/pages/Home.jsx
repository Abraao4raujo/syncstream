import "../styles/main.css";
import useFetch from "../adapters/useFetch.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HorizontalCards from "../components/containerCards/HorizontalCards.jsx";

const Home = () => {
  const data = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_APIKEYTMDB
    }&language=pt-BR&page=1`
  );

  return (
    <>
      {data && (
        <Carousel
          className="w-[1340px] h-[70vh p-0] m-auto"
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
        >
          <CarouselContent className="w-full h-[70vh] m-auto">
            {data.map((filmes, index) => (
              <CarouselItem className="p-0 w-full h-full" key={index}>
                <img
                  className="w-full h-full bg-cover"
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    filmes.backdrop_path
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <HorizontalCards />
    </>
  );
};

export default Home;

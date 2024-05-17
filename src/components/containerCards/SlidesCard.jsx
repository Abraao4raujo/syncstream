import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const SlidesCard = ({ movies, path }) => {
  return (
    <div className="mx-10 flex">
      <Carousel className="w-full h-full m-auto">
        <CarouselContent className="w-full h-full m-auto">
          {movies.map((movie, key) => (
            <CarouselItem
              key={key}
              className="max-w-[300px] h-[150px] bg-cover mx-3"
            >
              <Link to={`/${path}/${movie.id}`}>
                <img
                  className="w-full h-full bg-cover mx-3"
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SlidesCard;

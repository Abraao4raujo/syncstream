import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SlidesCard = ({ movies }) => {
  return (
    <div className="mx-10 flex">
      <Carousel className="w-full h-full m-auto">
        <CarouselContent className="w-full h-full m-auto">
          {movies.map((movie, key) => (
            <CarouselItem
              key={key}
              className="max-w-[300px] h-[150px] bg-cover mx-3"
            >
              <AlertDialog>
                <AlertDialogTrigger>
                  <img
                    className="w-full h-full bg-cover  mx-3"
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{movie.title}</AlertDialogTitle>
                    <img
                      className="w-full h-[550px] bg-cover"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    />
                    <AlertDialogDescription>
                      {movie.overview}
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Fechar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SlidesCard;

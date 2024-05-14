import "../../styles/cards.css";
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
import useFetch from "../../adapters/useFetch.jsx";

const HorizontalCards = ({ format, page }) => {
  let formats = "movie";

  if (format) {
    formats = format;
  }

  const movies = useFetch(
    `https://api.themoviedb.org/3/${formats}/popular?api_key=${
      import.meta.env.VITE_APIKEYTMDB
    }&language=pt-BR&page=${page || 1}`
  );

  return (
    <div className="container-cards ">
      <div className="mt-[80px] grid grid-cols-5 gap-[15px]">
        {movies.map((item, index) => (
          <AlertDialog key={index}>
            <AlertDialogTrigger>
              <img
                className="min-w-[250px] max-w-[250px] h-[350px] bg-cover"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{item.title}</AlertDialogTitle>
                <img
                  className="w-full h-[550px] bg-cover"
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                />
                <AlertDialogDescription>{item.overview}</AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Fechar</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;

import { forEach, groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";
import { averageBy } from "../utils";
import { Movie } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
interface MoviesWithStars extends Movie {
  starRatings?: StarRating[];
}
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie
    .findMany({
      include: {
        starRatings: true,
      },
    })
    .then((movies) => {
      const arr: MoviesWithStars[] = [];
      for (const movie of movies) {
        const scores = [];
        for (const rating of movie.starRatings) {
          scores.push(rating.score);
        }
        const avg = averageBy(scores, (score) => score);
        if (avg >= n) {
          arr.push(movie);
        }
      }
      arr.forEach((movie: MoviesWithStars) => {
        delete movie.starRatings;
      });
      return arr;
    })
    .then((arr) => {
      return arr;
    })
    .catch((err) => console.log(err));
  return movies;
};

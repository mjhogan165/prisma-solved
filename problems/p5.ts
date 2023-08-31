import { forEach, groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";
import { averageBy } from "../utils";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie
    .findMany({
      include: {
        starRatings: true,
      },
    })
    .then((movies) => {
      const arr = [];

      // const findavg = (array) => {
      //   let sum = 0;
      //   for (let i = 0; i < array.length; i++) {
      //     sum += array[i];
      //   }
      //   return sum / array.length;
      // };
      for (const movie of movies) {
        const scores = [];
        for (const rating of movie.starRatings) {
          scores.push(rating.score);
        }
        const avg = averageBy(scores, (score) => score);
        // const avg = findavg(scores);
        console.log({ scores: scores, avg: avg });
        if (avg >= n) {
          arr.push(movie);
        }
      }
      arr.forEach((movie: any) => {
        delete movie.starRatings;
      });
      return arr;
    })
    .then((arr) => {
      console.log({ arr: arr });
      return arr;
    })
    .catch((err) => console.log(err));
  return movies;
};

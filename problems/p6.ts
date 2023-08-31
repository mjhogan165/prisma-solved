import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const movies = await prisma.starRating
    .findMany({
      where: {
        userId: userId,
      },
      select: {
        movie: true,
      },
    })
    .then((x) => {
      console.log(userId);
      console.log(x);
      const arr = x.map((i) => i.movie);
      return arr;
    })
    .then((array) => {
      console.log(array);
      return array;
    })
    .catch((e) => {
      e;
    });

  // .then((ratings) => {
  //   console.log(ratings);
  //   const movieIds = ratings.map((rating) => {
  //     return rating.movieId;
  //   });
  //     console.log(movieIds);
  //     return movieIds
  // }).then(async (movieIds) => {
  // const getMovies = await prisma.movie.findMany({
  //     where: {
  //         id:
  //     }
  // })
  // })
  return movies;
};

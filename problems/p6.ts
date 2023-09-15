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
    .then((movieArr) => {
      const arr = movieArr.map((i) => i.movie);
      return arr;
    })
    .catch((e) => {
      e;
    });

  return movies;
};

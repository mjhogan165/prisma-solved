import { prisma } from "./prisma";
import * as R from "remeda";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const lowest = prisma.starRating
    .groupBy({
      by: "userId",
      _avg: {
        score: true,
      },
    })
    .then((response) => {
      const lowest = R.minBy((x: any) => x._avg.score)(response);
      return lowest.userId;
    });

  return lowest;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const nicest = prisma.starRating
    .groupBy({
      by: "userId",
      _avg: {
        score: true,
      },
    })
    .then((avgs) => {
      const lowest = R.maxBy((x: any) => x._avg.score)(avgs);
      return lowest.userId;
    });
  return nicest;
};

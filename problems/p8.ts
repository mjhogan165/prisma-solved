import { prisma } from "./prisma";
import * as R from "remeda";
import { Prisma } from "@prisma/client";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const lowest = await prisma.starRating.groupBy({
    by: "userId",
    _avg: {
      score: true,
    },
  });
  const lowestGroup = R.minBy(lowest, (group) => group?._avg?.score || 10000);
  return lowestGroup?.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const highest = await prisma.starRating.groupBy({
    by: "userId",
    _avg: {
      score: true,
    },
  });
  const highestGroup = R.maxBy(highest, (group) => group?._avg?.score || 10000);
  return highestGroup?.userId;

  // const nicest = prisma.starRating
  //   .groupBy({
  //     by: "userId",
  //     _avg: {
  //       score: true,
  //     },
  //   })
  //   .then((avgs) => {
  //     console.log(typeof avgs);
  //     const lowest = R.maxBy((x: any) => x._avg.score)(avgs);
  //     return lowest.userId;
  //   });
  // return nicest;
};

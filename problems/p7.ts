import { prisma } from "./prisma";
import { averageBy } from "../utils";
// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const avg = await prisma.user
    .findUnique({
      where: { id: userId },
      include: {
        starRatings: true,
      },
    })
    .then((user) => {
      if (user) {
        const scores = user?.starRatings.map((x) => x.score);
        const sum = scores.reduce((acc: number, curr: number) => {
          return acc + curr;
        });
        const avg = sum / scores.length;
        if (avg) {
          return avg;
        } else return 0;
      } else return 0;

      // let sum = 0;
      // const avg = averageBy(user?.starRatings , (user)=> user)
      // if (x?.starRatings) {
      //   for (let index = 0; index < x?.starRatings.length; index++) {
      //     const element = x?.starRatings[index];
      //     sum += element.score;
      //   }
      // const avg = sum / x.starRatings.length;
      // return avg;
      // } else return 0;
    })
    .catch((err) => err);
  return avg;
};

import { prisma } from "./prisma";
import { averageBy } from "../utils";
// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const avg = await prisma.user
    .findUniqueOrThrow({
      where: { id: userId },
      include: {
        starRatings: true,
      },
    })
    .then((user) => averageBy(user.starRatings, (rating) => rating.score))
    .catch((err) => err);
  return avg;
};

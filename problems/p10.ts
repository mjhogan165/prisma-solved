import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const deleted = await prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });

  return deleted;
};

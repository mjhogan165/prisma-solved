import { prisma } from "./prisma";

// Hint: look up "orderBy"
// get an array of all users
export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: [{ username: "asc" }],
  });
  console.log("donesky");
  return users;
};

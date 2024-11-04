import { PrismaClient } from "@prisma/client";
import memberType from "./memberType.js";
import post from "./post.js";
import profile from "./profile.js";
import subscribedToUser from "./subscribedToUser.js";
import userSubscribedTo from "./userSubscribedTo.js";
import user from "./user.js";

const manager = (prisma: PrismaClient) => ({
  memberTypeLoader: memberType(prisma),
  postLoader: post(prisma),
  profileLoader: profile(prisma),
  subscribedToUserLoader: subscribedToUser(prisma),
  userSubscribedToLoader: userSubscribedTo(prisma),
  userLoader: user(prisma),
});

export default manager;

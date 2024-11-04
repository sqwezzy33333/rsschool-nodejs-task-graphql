import { GraphQLObjectType, GraphQLFloat, GraphQLList } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import Context from "../../types/context.js";
import { User } from "@prisma/client";
import {profileObjectType} from "../profile-query/profile-object-type.js";
import {postObjectTypeList} from "../post-query/post-object-type-list.js";

export interface UserSubscribed extends User {
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
}

export const userObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  fields: () => ({
    id: {
      type: UUIDType,
      description: 'The id',
    },
    name: {
      type: UUIDType,
      description: 'The name',
    },
    balance: {
      type: GraphQLFloat,
      description: 'The balance',
    },
    profile: {
      type: profileObjectType as GraphQLObjectType,
      description: 'The profile',
      resolve: async (source: User, _args, context: Context) => {
        return await context.loaders.profileLoader.load(source.id);
      },
    },
    posts: {
      type: postObjectTypeList,
      description: 'The posts',
      resolve: async (source: User, _args: User, context: Context) => {
        return await context.loaders.postLoader.load(source.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userObjectType),
      description: 'The userSubscribedTo',
      resolve: async (source: UserSubscribed, _args, context: Context) => {
        if (source.userSubscribedTo) {
          const authorsId = source.userSubscribedTo.map((user) => user.authorId);
          return await context.loaders.userLoader.loadMany(authorsId);
        }
        return await context.loaders.userSubscribedToLoader.load(source.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userObjectType),
      description: 'The subscribedToUser',
      resolve: async (source: UserSubscribed, _args, context: Context) => {
        if (source.subscribedToUser) {
          const subscribersId = source.subscribedToUser.map((user) => user.subscriberId);
          return await context.loaders.userLoader.loadMany(subscribersId);
        }
        return await context.loaders.subscribedToUserLoader.load(source.id);
      },
    },
  })
});

export const userObjectTypeList = new GraphQLList(userObjectType);



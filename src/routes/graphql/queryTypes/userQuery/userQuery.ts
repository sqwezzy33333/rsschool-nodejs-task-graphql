import { User } from "@prisma/client";
import { GraphQLObjectType, GraphQLResolveInfo } from "graphql";
import {userObjectType} from "./userObjectType.js";
import {userObjectTypeList} from "./userObjectTypeList.js";
import { nonNullUUIDType } from "../../types/nonNullTypes.js";
import { ResolveTree, parseResolveInfo, simplifyParsedResolveInfoFragmentWithType } from "graphql-parse-resolve-info";
import Context from "../../types/context.js";

export const userQuery = {
  user: {
    type: userObjectType as GraphQLObjectType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
    },
    resolve: async (_source, args: User, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  users: {
    type: userObjectTypeList,
    resolve: async (_source, _args, context: Context, resolveInfo: GraphQLResolveInfo) => {
      const parsedResolveInfoFragment = parseResolveInfo(resolveInfo);
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfoFragment as ResolveTree,
        userObjectTypeList,
      );
      const userSubscribedTo = 'userSubscribedTo' in fields;
      const subscribedToUser = 'subscribedToUser' in fields;

      const users = await context.prisma.user.findMany({
        include: {
          userSubscribedTo,
          subscribedToUser,
      },
      });
      
      users.forEach((user) => {
        context.loaders.userLoader.prime(user.id, user);
      });

      return users;
    },
  },
};


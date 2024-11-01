import { GraphQLObjectType } from 'graphql';
import Context from "../../types/context.js";
import { nonNullUUIDType } from "../../types/nonNullTypes.js";
import {userObjectType} from "../../queryTypes/user-query/user-object-type.js";

interface SubscribeTo {
  userId: string;
  authorId: string;
};

const subscribeTo = {
  subscribeTo: {
    type: userObjectType as GraphQLObjectType,
    args: {
      userId: {
        type: nonNullUUIDType,
      },
      authorId: {
        type: nonNullUUIDType,
      },
    },
    resolve: async (_source, args: SubscribeTo, context: Context) => {
      return context.prisma.user.update({
        where: {
          id: args.userId,
        },
        data: {
          userSubscribedTo: {
            create: {
              authorId: args.authorId,
            },
          },
        },
      });
    },
  },
};

export default subscribeTo;

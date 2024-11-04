import Context from "../../types/context.js";
import { UUIDType } from '../../types/uuid.js';
import {GraphQLNonNull, GraphQLString} from "graphql";

interface UnsubscribeFrom {
  authorId: string;
  userId: string;
};

export const unsubscribeFrom = {
  unsubscribeFrom: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args: UnsubscribeFrom, context: Context) => {
      await context.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        },
      });
      return 'Unsubscribed';
    },
  },
};

export default unsubscribeFrom;

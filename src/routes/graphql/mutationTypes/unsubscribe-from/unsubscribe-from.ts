import Context from "../../types/context.js";
import { nonNullUUIDType } from "../../types/nonNullTypes.js";
import { UUIDType } from '../../types/uuid.js';

interface UnsubscribeFrom {
  authorId: string;
  userId: string;
};

export const unsubscribeFrom = {
  unsubscribeFrom: {
    type: UUIDType,
    args: {
      authorId: {
        type: nonNullUUIDType,
      },
      userId: {
        type: nonNullUUIDType,
      }
    },
    resolve: async (_source, args: UnsubscribeFrom, context: Context) => {
      await context.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            authorId: args.authorId,
            subscriberId: args.userId,
          },
        },
      });
      return args.userId;
    },
  },
};

export default unsubscribeFrom;

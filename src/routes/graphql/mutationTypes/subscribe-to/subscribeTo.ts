import {GraphQLNonNull, GraphQLString} from 'graphql';
import Context from "../../types/context.js";
import {UUIDType} from "../../types/uuid.js";

interface SubscribeTo {
    userId: string;
    authorId: string;
};

const subscribeTo = {
    subscribeTo: {
        type: new GraphQLNonNull(GraphQLString),
        args: {
            userId: {type: new GraphQLNonNull(UUIDType)},
            authorId: {type: new GraphQLNonNull(UUIDType)},
        },
        resolve: async (_, args: SubscribeTo, context: Context) => {
            await context.prisma.subscribersOnAuthors.create({
                data: {
                    subscriberId: args.userId,
                    authorId: args.authorId,
                },
            });
            return 'Subscribed';
        },
    }
}

export default subscribeTo;

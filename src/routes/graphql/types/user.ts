import {GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {UUIDType} from "./uuid.js";
import {ProfileType} from "./profile.js";
import {PostType} from "./posts.js";
import {Prisma, PrismaClient} from "@prisma/client";
import {DefaultArgs} from "prisma/prisma-client/runtime/library.js";

interface UserTarget {
    id: string
}

interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}

export const UserType: GraphQLObjectType  = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: UUIDType},
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat},
        profile: {
            type: ProfileType,
            resolve(target: UserTarget, _args, context: Context) {
                return context.prisma.profile.findUnique({where: {id: target.id}})
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(target: UserTarget, _args, context: Context) {
                return context.prisma.post.findMany({ where: { authorId: target.id } });
            }
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: (target: UserTarget, _args, { prisma }: Context) =>
                prisma.user.findMany({
                    where: { userSubscribedTo: { some: { authorId: target.id } } },
                }),
        },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: (target: UserTarget, _args, { prisma }: Context) =>
                prisma.user.findMany({
                    where: { subscribedToUser: { some: { subscriberId: target.id } } },
                }),
        },
    })

})

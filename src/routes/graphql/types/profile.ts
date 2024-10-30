import {GraphQLBoolean, GraphQLInt, GraphQLObjectType} from "graphql";
import {UUIDType} from "./uuid.js";
import {MemberType} from "./member-types.js";
import {PrismaClient, Prisma} from "@prisma/client";
import {DefaultArgs} from "prisma/prisma-client/runtime/library.js";
import {MemberTypeId} from "../../member-types/schemas.js";

interface ProfileTarget {
    memberTypeId: MemberTypeId;
}

interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}

export const ProfileType = new GraphQLObjectType(
    {
        name: "Profile",
        fields:
            {
                id: {type: UUIDType},
                isMale: {type: GraphQLBoolean},
                yearOfBirth: {type: GraphQLInt},
                memberType: {
                    type: MemberType,
                    resolve(source: ProfileTarget, _args, {prisma}: Context) {
                        return prisma.memberType.findUnique({where: {id: source.memberTypeId}})
                    }
                },
            }
    }
)

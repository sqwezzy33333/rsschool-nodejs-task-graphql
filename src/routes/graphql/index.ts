import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {createGqlResponseSchema, gqlResponseSchema} from './schemas.js';
import {graphql, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql';
import {MemberType, MemberTypeId} from "./types/member-types.js";
import {PostType} from "./types/posts.js";
import {UserType} from "./types/user.js";
import {ProfileType} from "./types/profile.js";
import {UUIDType} from "./types/uuid.js";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
    const {prisma} = fastify;

    const schema = new GraphQLSchema(
        {
            query: new GraphQLObjectType(
                {
                    name: 'RootQueryType',
                    fields: {
                        posts: {
                            type: new GraphQLList(PostType),
                            resolve: () => prisma.post.findMany()
                        },
                        memberTypes: {
                            type: new GraphQLList(MemberType),
                            resolve: () => prisma.memberType.findMany()
                        },
                        users: {
                            type: new GraphQLList(UserType),
                            resolve: () => prisma.user.findMany()
                        },
                        profiles: {
                            type: new GraphQLList(ProfileType),
                            resolve: () => prisma.profile.findMany()
                        },
                        memberType: {
                            type: MemberType,
                            args: {
                                id: {
                                    type: new GraphQLNonNull(MemberTypeId),
                                }
                            },
                            resolve: (_source, {id}: { id: string }) => prisma.memberType.findUnique({where: {id}})
                        },
                        post: {
                            type: PostType,
                            args: {
                                id: {
                                    type: new GraphQLNonNull(UUIDType),
                                }
                            },
                            resolve: (_source, {id}: { id: string }) => prisma.post.findUnique({where: {id}})
                        },
                        profile: {
                            type: ProfileType,
                            args: {
                                id: {
                                    type: new GraphQLNonNull(UUIDType)
                                }
                            },
                            resolve: (_source, {id}: { id: string }) => prisma.post.findUnique({where: {id}})
                        },
                        user: {
                            type: UserType,
                            args: {
                                id: {
                                    type: new GraphQLNonNull(UUIDType)
                                }
                            },
                            resolve: (_source, {id}: { id: string }, _context) => prisma.user.findUnique({
                                where: {id},
                            })
                        }
                    }
                }
            ),
        }
    )

    fastify.route({
        url: '/',
        method: 'POST',
        schema: {
            ...createGqlResponseSchema,
            response: {
                200: gqlResponseSchema,
            },
        },
        async handler(req) {
            const {query, variables} = req.body;
            return await graphql(
                {
                    schema,
                    source: query,
                    variableValues: variables,
                    contextValue: {
                        prisma,
                    }
                }
            );
        },
    });
};

export default plugin;

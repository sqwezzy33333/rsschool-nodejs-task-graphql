import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

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
      const { query, variables } = req.body;
      const documentNode = parse(query);
      const result = await graphql({
        schema,
        contextValue: {
          prisma,
          httpErrors,
          memberTypeLoader: createMemberTypeLoader(prisma),
          postLoader: createPostLoader(prisma),
          profileLoader: createProfileLoader(prisma),
          userLoader: createUserLoader(prisma),
        },
        source: query,
        variableValues: variables,
      });

      return []
      // return graphql();
    },
  });
};

export default plugin;

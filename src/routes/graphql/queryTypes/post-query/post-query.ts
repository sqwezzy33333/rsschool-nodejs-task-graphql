import { Post } from "@prisma/client";
import { GraphQLObjectType } from "graphql";
import { nonNullUUIDType } from "../../types/nonNullTypes.js";
import {postObjectType} from "./post-object-type.js";
import {postObjectTypeList} from "./post-object-type-list.js";
import Context from "../../types/context.js";

export const postQuery = {
  post: {
    type: postObjectType as GraphQLObjectType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
    },
    resolve: async (_source, args: Post, context: Context) => {
      return context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  posts: {
    type: postObjectTypeList,
    resolve: async (_source, _args, context: Context) => {
      return context.prisma.post.findMany();
    },
  },
};


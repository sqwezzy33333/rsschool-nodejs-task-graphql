import { GraphQLObjectType } from "graphql";
import Context from "../../types/context.js";
import { nonNullCreatePostObjectType } from "../../types/nonNullTypes.js";
import {postObjectType} from "../../queryTypes/post-query/post-object-type.js";

interface ICreatePost {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
};

const createPost = {
  createPost: {
    type: postObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: nonNullCreatePostObjectType,
      },
    },
    resolve: async (_source, args: ICreatePost, context: Context) => {
      return context.prisma.post.create({
        data: args.dto,
      });
    },
  },
};

export default createPost;

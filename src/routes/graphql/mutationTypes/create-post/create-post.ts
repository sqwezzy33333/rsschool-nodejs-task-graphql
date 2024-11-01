import { GraphQLObjectType } from "graphql";
import {postObjectType} from "../../queryTypes/postQuery/postObjectType.js";
import Context from "../../types/context.js";
import { nonNullCreatePostObjectType } from "../../types/nonNullTypes.js";

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

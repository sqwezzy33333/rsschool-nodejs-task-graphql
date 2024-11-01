import { GraphQLObjectType } from "graphql";
import {postObjectType} from "../../queryTypes/postQuery/postObjectType.js";
import Context from "../../types/context.js";
import { nonNullChangePostObjectType, nonNullUUIDType } from "../../types/nonNullTypes.js";

interface EditPost {
  id: string;
  dto: {
    title: string;
    content: string;
  };
};

const changePost = {
  changePost: {
    type: postObjectType as GraphQLObjectType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
      dto: {
        type: nonNullChangePostObjectType,
      },
    },
    resolve: async (_source, args: EditPost, context: Context) => {
      return context.prisma.post.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};

export default changePost;

import { nonNullUUIDType } from "../../types/nonNullTypes.js";
import { Post } from "@prisma/client";
import Context from "../../types/context.js";

const deletePost = {
  deletePost: {
    type: nonNullUUIDType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
    },
    resolve: async (_source, args: Post, context: Context) => {
      await context.prisma.post.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};

export default deletePost;

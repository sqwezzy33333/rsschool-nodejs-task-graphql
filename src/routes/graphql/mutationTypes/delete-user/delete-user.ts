import Context from "../../types/context.js";
import { nonNullUUIDType } from "../../types/nonNullTypes.js";
import { User } from "@prisma/client";

const deleteUser = {
  deleteUser: {
    type: nonNullUUIDType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
    },
    resolve: async (_source, args: User, context: Context) => {
      await context.prisma.user.delete({
        where: {
          id: args.id,
        },
      });
      return args.id;
    },
  },
};

export default deleteUser;

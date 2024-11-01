import { GraphQLObjectType } from "graphql";
import {userObjectType} from "../../queryTypes/userQuery/userObjectType.js";
import Context from "../../types/context.js";
import { nonNullChangeUserObjectType, nonNullUUIDType } from "../../types/nonNullTypes.js";

interface ChangeUser {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
};

const editUser = {
  changeUser: {
    type: userObjectType as GraphQLObjectType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
      dto: {
        type: nonNullChangeUserObjectType,
      },
    },
    resolve: async (_source, args: ChangeUser, context: Context) => {
      return context.prisma.user.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};

export default editUser;

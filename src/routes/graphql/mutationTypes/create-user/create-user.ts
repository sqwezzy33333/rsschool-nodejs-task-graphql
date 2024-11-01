import { GraphQLObjectType } from 'graphql';
import Context from "../../types/context.js";
import { nonNullCreateUserObjectType } from '../../types/nonNullTypes.js';
import {userObjectType} from "../../queryTypes/user-query/user-object-type.js";

interface ICreateUser {
  dto: {
    name: string;
    balance: number;
  };
};

const createUser = {
  createUser: {
    type: userObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: nonNullCreateUserObjectType,
      },
    },
    resolve: async (_source, args: ICreateUser, context: Context) => {
      return context.prisma.user.create({
        data: args.dto,
      });
    },
  },
};

export default createUser;

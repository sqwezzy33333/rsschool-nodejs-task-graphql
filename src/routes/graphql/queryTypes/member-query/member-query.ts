import { MemberType } from "@prisma/client";
import { GraphQLObjectType } from "graphql";
import { nonNullMemberEnumType } from "../../types/nonNullTypes.js";
import Context from "../../types/context.js";
import memberObjectTypeList from "./member-object-type-list.js";
import {memberObjectType} from "./member-object-type.js";

const memberQuery = {
  memberTypes: {
    type: memberObjectTypeList,
    resolve: async (_source, _args, context: Context) => {
      return context.prisma.memberType.findMany();
    },
  },
  memberType: {
    type: memberObjectType as GraphQLObjectType,
    args: {
      id: {
        type: nonNullMemberEnumType,
      },
    },
    resolve: async (_source, args: MemberType, context: Context) => {
      return context.prisma.memberType.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
};

export default memberQuery;

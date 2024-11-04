import { Profile } from "@prisma/client";
import Context from "../../types/context.js";
import { GraphQLObjectType } from "graphql";
import { nonNullUUIDType } from "../../types/nonNullTypes.js";
import {profileObjectType, profileObjectTypeList} from "./profile-object-type.js";

const profileQuery = {
  profile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
    },
    resolve: async (_source, args: Profile, context: Context) => {
      return context.prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  profiles: {
    type: profileObjectTypeList,
    resolve: async (_source, _args, context: Context) => {
      return context.prisma.profile.findMany();
    },
  },
};

export default profileQuery;

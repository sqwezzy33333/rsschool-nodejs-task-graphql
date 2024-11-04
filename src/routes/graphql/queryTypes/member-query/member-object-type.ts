import { GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLEnumType } from "graphql";
import { MemberTypeId } from "../../../member-types/schemas.js";

import { MemberType } from "@prisma/client";
import Context from "../../types/context.js";
import {profileObjectTypeList} from "../profile-query/profile-object-type.js";

export const memberEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  description: 'A MemberTypeId',
  values: {
    BASIC: {
      value: MemberTypeId.BASIC,
      description: 'BASIC',
    },
    BUSINESS: {
      value: MemberTypeId.BUSINESS,
      description: 'BUSINESS',
    }
  }
})

export const memberObjectType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'A MemberType',
  fields: () => ({
    id: {
      type: memberEnumType,
      description: 'The id',
    },
    discount: {
      type: GraphQLFloat,
      description: 'The discount',
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
      description: 'The post limit per month'
    },
    profiles: {
      type: profileObjectTypeList,
      description: 'The profiles',
      resolve: async (source: MemberType, _args, context: Context) => {
        return context.prisma.profile.findMany({
          where: {
            memberTypeId: source.id,
          }
        });
      },
    },
  }),
});

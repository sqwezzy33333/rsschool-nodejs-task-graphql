import { GraphQLObjectType, GraphQLInt, GraphQLBoolean } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import Context from "../../types/context.js";
import { Profile } from "@prisma/client";
import {memberEnumType, memberObjectType} from "../member-query/member-object-type.js";
import {GraphQLList} from "graphql/index.js";
import {userObjectType} from "../user-query/user-object-type.js";

export const profileObjectType = new GraphQLObjectType({
  name: 'Profile',
  description: 'A Profile',
  fields: () => ({
    id: {
      type: UUIDType,
      description: 'The id',
    },
    isMale: {
      type: GraphQLBoolean,
      description: 'Is user a male',
    },
    yearOfBirth: {
      type: GraphQLInt,
      description: 'The year of birth'
    },
    user: {
      type: userObjectType as GraphQLObjectType,
      description: 'The user',
      resolve: async (source: Profile, _args, context: Context) => {
        return context.prisma.user.findUnique({
          where: {
            id: source.userId,
          },
        });
      },
    },
    userId: {
      type: UUIDType,
      description: 'The userId',
    },
    memberType: {
      type: memberObjectType as GraphQLObjectType,
      description: 'The memberType',
      resolve: async (source: Profile, _args, context: Context) => {
        return await context.loaders.memberTypeLoader.load(source.memberTypeId);
      },
    },
    memberTypeId:  {
      type: memberEnumType,
      description: 'The memberTypeId',
    },
  })
});

export const profileObjectTypeList = new GraphQLList(profileObjectType);

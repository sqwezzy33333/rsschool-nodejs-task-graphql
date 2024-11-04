import { GraphQLObjectType } from 'graphql';
import Context from "../../types/context.js";
import { nonNullCreateProfileObjectType } from '../../types/nonNullTypes.js';
import {profileObjectType} from "../../queryTypes/profile-query/profile-object-type.js";

interface ICreateProfile {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
  };
};

const createProfile = {
  createProfile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: nonNullCreateProfileObjectType,
      },
    },
    resolve: async (_source, args: ICreateProfile, context: Context) => {
      return context.prisma.profile.create({
        data: args.dto,
      });
    },
  },
};

export default createProfile;

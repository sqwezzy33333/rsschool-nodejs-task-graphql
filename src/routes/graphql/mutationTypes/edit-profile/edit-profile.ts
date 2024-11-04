import { GraphQLObjectType } from "graphql";
import Context from "../../types/context.js";
import { nonNullChangeProfileObjectType, nonNullUUIDType } from "../../types/nonNullTypes.js";
import {profileObjectType} from "../../queryTypes/profile-query/profile-object-type.js";

interface IChangeProfile {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
  };
};

const editProfile = {
  changeProfile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      id: {
        type: nonNullUUIDType,
      },
      dto: {
        type: nonNullChangeProfileObjectType,
      },
    },
    resolve: async (_source, args: IChangeProfile, context: Context) => {
      return context.prisma.profile.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};

export default editProfile;

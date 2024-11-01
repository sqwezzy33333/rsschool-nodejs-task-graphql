import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from "graphql";
import { memberEnumType } from "../../queryTypes/memberQuery/memberObjectType.js";

const editProfileObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: memberEnumType,
    },
  }),
});

export default editProfileObjectType;

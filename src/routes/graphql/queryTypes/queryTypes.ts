import { GraphQLObjectType } from "graphql";
import profileQuery from "./profile-query/profile-query.js";
import {postQuery} from "./post-query/post-query.js";
import memberQuery from "./member-query/member-query.js";
import {userQuery} from "./user-query/user-query.js";

const queryTypes = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...profileQuery,
    ...userQuery,
    ...memberQuery,
    ...postQuery,
  }),
});

export default queryTypes;

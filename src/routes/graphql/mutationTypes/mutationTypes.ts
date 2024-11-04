import { GraphQLObjectType } from "graphql";
import deletePost from "./delete-post/delete-post.js";
import createPost from "./create-post/create-post.js";
import changePost from "./edit-post/edit-post.js";
import createUser from "./create-user/create-user.js";
import deleteUser from "./delete-user/delete-user.js";
import editUser from "./edit-user/edit-user.js";
import deleteProfile from "./delete-profile/delete-profile.js";
import editProfile from "./edit-profile/edit-profile.js";
import subscribeTo from "./subscribe-to/subscribeTo.js";
import unsubscribeFrom from "./unsubscribe-from/unsubscribe-from.js";
import createProfile from "./create-profile/create-profile.js";


export const mutationTypes = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...createProfile,
    ...deleteProfile,
    ...editProfile,
    ...subscribeTo,
    ...unsubscribeFrom,
    ...createPost,
    ...deletePost,
    ...changePost,
    ...createUser,
    ...deleteUser,
    ...editUser,
  }),
});

export default mutationTypes;

import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLNonNull } from "graphql";
import { UUIDType } from "./uuid.js";
import editPostObjectType from "../mutationTypes/edit-post/edit-post-object-type.js";
import editProfileObjectType from "../mutationTypes/edit-profile/edit-profile-object-type.js";
import editUserObjectType from "../mutationTypes/edit-user/edit-user-object-type.js";
import createPostObjectType from "../mutationTypes/create-post/create-post-object-type.js";
import createUserObjectType from "../mutationTypes/create-user/create-user-object-type.js";
import createProfileObjectType from "../mutationTypes/create-profile/create-profile-object-type.js";
import {memberEnumType} from "../queryTypes/member-query/member-object-type.js";


export const nonNullCreatePostObjectType = new GraphQLNonNull(createPostObjectType);
export const nonNullCreateUserObjectType = new GraphQLNonNull(createUserObjectType);
export const nonNullCreateProfileObjectType = new GraphQLNonNull(createProfileObjectType);

export const nonNullChangePostObjectType = new GraphQLNonNull(editPostObjectType);
export const nonNullChangeProfileObjectType = new GraphQLNonNull(editProfileObjectType);
export const nonNullChangeUserObjectType = new GraphQLNonNull(editUserObjectType);

export const nonNullUUIDType = new GraphQLNonNull(UUIDType);
export const nonNullMemberEnumType = new GraphQLNonNull(memberEnumType);

export const nonNullGraphQLFloat = new GraphQLNonNull(GraphQLFloat)
export const nonNullGraphQLBoolean = new GraphQLNonNull(GraphQLBoolean);
export const nonNullGraphQLInt = new GraphQLNonNull(GraphQLInt);



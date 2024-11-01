import { GraphQLList } from 'graphql';
import {postObjectType} from "./post-object-type.js";

export const postObjectTypeList = new GraphQLList(postObjectType);

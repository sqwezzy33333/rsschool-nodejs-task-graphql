import { GraphQLList } from 'graphql';
import {postObjectType} from './postObjectType.js';

export const postObjectTypeList = new GraphQLList(postObjectType);

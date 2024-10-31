import { GraphQLList } from 'graphql';
import {userObjectType} from './userObjectType.js';

export const userObjectTypeList = new GraphQLList(userObjectType);


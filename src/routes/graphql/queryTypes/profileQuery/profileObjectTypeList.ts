import { GraphQLList } from 'graphql';
import {profileObjectType} from './profileObjectType.js';

export const profileObjectTypeList = new GraphQLList(profileObjectType);


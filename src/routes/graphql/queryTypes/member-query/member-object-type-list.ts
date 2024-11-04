import { GraphQLList } from 'graphql';
import {memberObjectType} from "./member-object-type.js";

const memberObjectTypeList = new GraphQLList(memberObjectType);

export default memberObjectTypeList;

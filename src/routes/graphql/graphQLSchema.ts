import { GraphQLSchema } from "graphql";
import queryTypes from "./queryTypes/queryTypes.js";
import mutationTypes from "./mutationTypes/mutationTypes.js";

export const graphQLSchema = new GraphQLSchema({
  query: queryTypes,
  mutation: mutationTypes,
});

export default graphQLSchema;

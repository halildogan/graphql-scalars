import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

function processValue(value, where) {
  if (isNaN(value)) {
    throw new TypeError(`${where} error: Value is not a number`);
  }

  if (!(value > 0)) {
    throw new TypeError(`${where} error: Value is not a positive number`);
  }

  return parseInt(value, 10);
}

export default new GraphQLScalarType({
  name: 'PositiveInt',

  description: 'Integers that will have a value greater than 0.',

  serialize(value) {
    return processValue(value, 'Field');
  },

  parseValue(value) {
    return processValue(value, 'Field');
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`Query error: Can only validate integers as positive integers but got a: ${ast.kind}`);  // eslint-disable-line max-len
    }

    return processValue(ast.value, 'Query');
  },
});

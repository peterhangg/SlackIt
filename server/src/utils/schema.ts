import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../resolvers/hello';

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
  });

  return schema;
};

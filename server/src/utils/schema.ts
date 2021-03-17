import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../resolvers/hello';
import { UserResolver } from '../resolvers/user';

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
    validate: false,
  });

  return schema;
};

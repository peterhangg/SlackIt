import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../resolvers/hello';
import { UserResolver } from '../resolvers/user';
import { TeamResolver } from '../resolvers/team';
import { ChannelResolver } from '../resolvers/channel';
import { MessageResolver } from '../resolvers/message';

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver, TeamResolver, ChannelResolver, MessageResolver],
    validate: false,
  });

  return schema;
};

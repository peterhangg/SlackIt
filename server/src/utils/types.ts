import { ObjectType, Field } from "type-graphql";
import { Message } from "../entities/Message";
@ObjectType()
export class PaginatedMessages {
  @Field(() => [Message])
  messages: Message[];
  @Field()
  hasMore: boolean;
}
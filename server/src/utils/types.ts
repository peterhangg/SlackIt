import { User } from "../entities/User";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: String;
  @Field()
  message: String;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
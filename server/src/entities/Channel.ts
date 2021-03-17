import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from './Message';

@ObjectType()
@Entity()
export class Channel extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.channel, { nullable: true })
  @Field(() => [Message], { nullable: true })
  messages: Message[] | null;
}

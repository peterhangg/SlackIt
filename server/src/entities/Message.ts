import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id!: number;

  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.messages)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  @Field(() => Channel)
  channel: Channel;
}

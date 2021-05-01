import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  text: string;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: '' })
  image: string;

  @ManyToOne(() => User, (user) => user.messages, {
    cascade: true,
    eager: true,
  })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.messages, {
    cascade: true,
    eager: true,
  })
  @Field(() => Channel)
  channel: Channel;
}

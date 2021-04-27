import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { DirectMessage } from './DirectMessage';
import { Message } from './Message';
import { Team } from './Team';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @Column({ nullable: true, default: '' })
  avatar: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Team, (team) => team.users, { nullable: true })
  @Field(() => [Team], { nullable: true })
  teams: Team[] | null;

  @OneToMany(() => Team, (team) => team.owner, { nullable: true })
  @Field(() => [Team], { nullable: true })
  teamsOwned: Team[] | null;

  @OneToMany(() => DirectMessage, (directMessage) => directMessage.creator)
  @Field(() => [DirectMessage])
  directMessages: DirectMessage[];
}

import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@ObjectType()
@Entity()
export class Team extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.teams)
  @Field(() => [User])
  @JoinTable()
  users: User[];

  @ManyToOne(() => User, (user) => user.teamsOwned)
  @Field(() => User)
  owner: User;

  @OneToMany(() => Channel, (channel) => channel.team)
  channels: Channel[];
}
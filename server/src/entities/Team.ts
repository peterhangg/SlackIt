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
} from 'typeorm';
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

  @ManyToMany(() => User, (user) => user.teams)
  @Field(() => [User])
  @JoinTable()
  users: User[];

  @ManyToOne(() => User, (user) => user.teamsOwned)
  @Field(() => User)
  owner: User;
}

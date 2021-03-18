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
import { Message } from './Message';
import { Team } from './Team';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.user, {nullable: true })
  messages: Message[] | null;

  @ManyToMany(() => Team, (team) => team.users, { nullable: true })
  @Field(() => [Team], { nullable: true })
  teams: Team[] | null;

  @OneToMany(() => Team, (team) => team.owner, { nullable: true })
  @Field(() => [Team], { nullable: true })
  teamsOwned: Team[] | null;
}

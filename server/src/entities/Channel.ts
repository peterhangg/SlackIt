import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Message } from './Message';
import { Team } from './Team';

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

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.channel, { nullable: true })
  @Field(() => [Message], { nullable: true })
  messages: Message[] | null;

  @ManyToOne(() => Team, (team) => team.channels, {
    onDelete: 'CASCADE'
  })
  team: Team;
}

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
import { User } from './User';

@ObjectType()
@Entity()
export class DirectMessage extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  text: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: '' })
  image: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  teamId!: number;

  @Field()
  @Column()
  receiverId!: number;

  @Field()
  @Column()
  senderId!: number;

  @ManyToOne(() => User, (user) => user.directMessages)
  @Field(() => User)
  creator!: User;
}

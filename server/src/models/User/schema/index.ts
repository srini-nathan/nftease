import { Types } from "mongoose";
import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class UserSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, trim: true })
  public username!: string;

  @Field({ nullable: false })
  @prop({ required: true, trim: true })
  public walletAddress!: string;

  @Field({ nullable: true })
  @prop({ trim: true })
  public bio?: string;
}

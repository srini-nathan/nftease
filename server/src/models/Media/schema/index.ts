import { Types } from "mongoose";
import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { TokenMediaSchema, PreviewMediaSchema } from "./subDocuments";
import UserClass from "@models/User/class";

@ObjectType()
export default class MediaSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public title!: string;

  @Field()
  @prop({ trim: true })
  public description!: string;

  @Field(() => UserClass, { nullable: false })
  @prop({ required: true, ref: () => UserClass })
  public ownerId!: Ref<UserClass>;

  @Field(() => UserClass, { nullable: false })
  @prop({ required: true, ref: () => UserClass })
  public creatorId!: Ref<UserClass>;

  @Field(() => TokenMediaSchema)
  @prop({ type: () => TokenMediaSchema, required: true, default: {} })
  public token!: TokenMediaSchema;

  @Field(() => PreviewMediaSchema)
  @prop({ type: () => PreviewMediaSchema, required: false, default: {} })
  public preview!: PreviewMediaSchema;
}

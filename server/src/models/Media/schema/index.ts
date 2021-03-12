import { Types } from "mongoose";
import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { TokenMediaSchema, PreviewMediaSchema } from "./subDocuments";

@ObjectType()
export default class MediaSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public name!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public ownerAddress!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public creatorAddress!: string;

  @Field(() => TokenMediaSchema)
  @prop({ type: () => TokenMediaSchema, required: true })
  public token!: TokenMediaSchema;

  @Field(() => PreviewMediaSchema)
  @prop({ type: () => PreviewMediaSchema, required: false })
  public preview!: PreviewMediaSchema;
}

import { Types } from "mongoose";
import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { MimeTypeEnum } from "@typescript/schema";
import { BufferScalar } from "scalars";

@ObjectType()
export default class FileSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => BufferScalar, { nullable: false })
  @prop({ required: true, type: Buffer })
  public buffer!: Buffer;

  @Field({ nullable: false })
  @prop({ required: true })
  public filename!: string;

  @Field({ nullable: false })
  @prop({ required: true, enum: MimeTypeEnum })
  public mimetype!: MimeTypeEnum;
}

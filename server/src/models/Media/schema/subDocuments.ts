import { prop } from "@typegoose/typegoose";
import { MimeTypeEnum } from "@typescript/schema";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TokenMediaSchema {
  @Field({ nullable: true })
  @prop({ required: true })
  public ipfsCid!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public digitalOceanURL!: string;

  @Field({ nullable: false })
  @prop({ required: true, enum: MimeTypeEnum })
  public mimeType!: MimeTypeEnum;
}

@ObjectType()
export class PreviewMediaSchema {
  @Field({ nullable: false })
  @prop({ required: true })
  public digitalOceanURL!: string;

  @Field({ nullable: false })
  @prop({ required: true, enum: MimeTypeEnum })
  public mimeType!: MimeTypeEnum;
}

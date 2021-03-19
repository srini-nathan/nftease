import FileClass from "@models/File/class";
import { prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TokenMediaSchema {
  // @Field({ nullable: true })
  // @prop({ required: true })
  // public ipfsCid!: string;

  @Field(() => FileClass, { nullable: false })
  @prop({ required: true, ref: () => FileClass })
  public fileId!: Ref<FileClass>;
}

@ObjectType()
export class PreviewMediaSchema {
  @Field(() => FileClass, { nullable: false })
  @prop({ required: true, ref: () => FileClass })
  public fileId!: Ref<FileClass>;
}

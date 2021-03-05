import { Types } from "mongoose";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  @IsString()
  bio: string;
}

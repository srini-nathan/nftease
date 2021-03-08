import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly walletAddress: string;

  @IsOptional()
  @IsString()
  bio: string;
}

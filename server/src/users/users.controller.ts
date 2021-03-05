import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Types } from "mongoose";

import { CreateUserDto } from "./dto";
import { User } from "./users.interface";
import { UsersService } from "./users.service";

@Controller("users")
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    if (!userDto._id) {
      userDto._id = Types.ObjectId();
    }
    return this.usersService.createUser(userDto);
  }

  @Get(":id")
  async findOneUser(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }
}

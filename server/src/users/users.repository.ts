import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./users.interface";
import { CreateUserDto } from "./dto";
import { UserRoot } from "./users.model";

@Injectable()
export class UsersRepository {
  constructor(@InjectModel("User") private readonly model: Model<User>) {}

  async findAll() {
    const docs = await this.model.find().exec();
    const userRoot = new UserRoot(undefined);
    userRoot.setData(docs);
    userRoot.foundUser();
    return userRoot;
  }

  async findOne(id: Types.ObjectId) {
    const doc = await this.model.findById(id);
    const userRoot = new UserRoot(id.toHexString());
    if (doc === null) {
      throw new NotFoundException(`User with id ${id} does not exists`);
    }
    userRoot.setData(doc);
    userRoot.foundUser();
    return userRoot;
  }

  async createOne(dto: CreateUserDto) {
    const doc = await this.model.create(dto);
    const userRoot = new UserRoot(doc.id);
    userRoot.setData(doc);
    return userRoot;
  }

  async deleteOne(id: Types.ObjectId) {
    const doc = this.model.findByIdAndDelete(id).exec();
    const userRoot = new UserRoot(id.toHexString());

    if (doc === null) {
      throw new NotFoundException(`User with id ${id} does not exists`);
    }

    userRoot.setData(id.toHexString());
    return userRoot;
  }

  async deleteAll() {
    this.model.deleteMany({});
  }
}

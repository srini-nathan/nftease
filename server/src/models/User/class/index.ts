import { UserBuildData } from "@typescript/buildData/user";
import { GetDocumentOptions } from "@typescript/class";
import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { UserDocument, UserModel } from "..";
import UserSchema from "../schema";
import build from "./build";
import get from "./get";
import verify from "./verify";

@ObjectType()
export default class UserClass extends UserSchema {
  // CREATE //

  public static async build(this: UserModel, data: UserBuildData) {
    return build.build(this, data);
  }

  // GET //

  public static async getById(
    this: UserModel,
    id: Types.ObjectId | string,
    options?: GetDocumentOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getByUsername(
    this: UserModel,
    username: string,
    options?: GetDocumentOptions
  ) {
    return get.byUsername(this, username, options);
  }

  public static async getByWalletAddress(
    this: UserModel,
    walletAddress: string,
    options?: GetDocumentOptions
  ) {
    return get.byWalletAddress(this, walletAddress, options);
  }

  // VERIFY //

  public async verify(this: UserDocument) {
    return verify.verify(this);
  }
}

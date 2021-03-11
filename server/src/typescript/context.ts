import UserSchema from "@models/User/schema";

export default interface IContext {
  user: UserSchema;
}

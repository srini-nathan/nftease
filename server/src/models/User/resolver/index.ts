import {
  Arg,
  Args,
  ArgsType,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { UserDocument } from "..";
import UserClass from "../class";
import UserSchema from "../schema";
import mutations from "./mutations";
import queries from "./queries";

@ArgsType()
class GetUserArgs {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  walletAddress?: string;
}

@InputType({ description: "Login data" })
class LoginData {
  @Field()
  walletAddress!: string;

  @Field()
  signature!: string;
}

@InputType({ description: "New user data" })
class NewUserData implements Partial<UserSchema> {
  @Field()
  username!: string;

  @Field()
  walletAddress!: string;

  @Field({ nullable: true })
  bio?: string;
}

@Resolver(() => UserClass)
export default class UserResolver {
  /**
   * Queries
   */
  @Query(() => UserClass, { nullable: true })
  async user(
    @Args() { id, username, walletAddress }: GetUserArgs
  ): Promise<UserDocument | null> {
    return queries.user({ id, username, walletAddress });
  }

  /**
   * Mutations
   */

  @Mutation(() => UserClass)
  async newUser(@Arg("data") newUserData: NewUserData): Promise<UserDocument> {
    return mutations.newUser(newUserData);
  }

  @Mutation(() => String)
  async login(@Arg("data") loginData: LoginData): Promise<String> {
    return mutations.login(loginData);
  }
}

import { AuthChecker } from "type-graphql";
import decode from "jwt-decode";

import { IContext } from "@typescript/graphql";
import User from "@models/User";

export const authChecker: AuthChecker<IContext> = (
  { context }: { context: IContext },
  roles
) => {
  return new Promise<boolean>(async (resolve) => {
    const token = context.req.headers.authorization;

    // Decode token
    let decoded: any;
    try {
      decoded = decode(token!);
    } catch (e) {
      // Token is invalid
      resolve(false);
    }

    // Find user from token
    const user = await User.getById(decoded?.userId);

    // If `@Authorized()`, check only if user exists
    if (roles.length === 0) {
      resolve(user !== null);
    }

    // If no user, restrict access
    if (!user) resolve(false);

    // Grant access if roles overlap
    if (user?.roles.some((role) => roles.includes(role))) resolve(true);

    resolve(false);
  });
};

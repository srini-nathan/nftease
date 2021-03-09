import User, { UserDocument } from "..";

const verify = (user: UserDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Ensure username is unique
      const existingUsername = await User.getByUsername(user.username);
      if (
        existingUsername &&
        existingUsername._id.toString() !== user._id.toString()
      ) {
        throw new Error("User.verify: this username is already taken");
      }

      // Ensure wallet address is unique
      const existingWallet = await User.getByWalletAddress(user.walletAddress);
      if (
        existingWallet &&
        existingWallet._id.toString() !== user._id.toString()
      ) {
        throw new Error(
          "User.verify: an account already exists with this address"
        );
      }

      await user.validate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default { verify };

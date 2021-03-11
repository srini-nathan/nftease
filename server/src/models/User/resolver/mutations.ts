import User from "..";

const newUser = async ({
  username,
  walletAddress,
  bio,
}: {
  username: string;
  walletAddress: string;
  bio?: string;
}) => {
  const user = await User.build({ username, walletAddress, bio });
  await user.save();
  return user;
};

const login = async ({
  walletAddress,
  signature,
}: {
  walletAddress: string;
  signature: string;
}) => {
  const user = await User.getByWalletAddress(walletAddress);
  if (!user) {
    throw new Error("Unable to find a user with that address");
  }

  const msg = `typ gay ${user.nonce}`;

  return "";
};

export default { newUser, login };

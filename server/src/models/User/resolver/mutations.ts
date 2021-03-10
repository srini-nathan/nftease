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
  return await user.generateJWT(signature);
};

const bio = async ({ id, bio }: { id: string; bio: string }) => {
  const user = await User.getById(id);
  if (!user) throw new Error("Unable to find a user with that Id");

  await user.updateBio(bio);
  await user.save();

  return user;
};

export default { newUser, login, bio };

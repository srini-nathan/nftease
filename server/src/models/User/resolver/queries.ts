import User from "..";

const user = async ({
  id,
  username,
  walletAddress,
}: {
  id?: string;
  username?: string;
  walletAddress?: string;
}) => {
  if (id) {
    return User.getById(id);
  } else if (username) {
    return User.getByUsername(username);
  } else if (walletAddress) {
    return User.getByWalletAddress(walletAddress);
  } else {
    return null;
  }
};

export default { user };

import { recoverPersonalSignature } from 'eth-sig-util';  // hash
import { bufferToHex } from 'ethereumjs-util';  // hash

import jwt from 'jsonwebtoken'; // auth token

import { config } from '../../config'; // used for JWT secret
import { User } from '../../models/user.model';


// This gets called from hitting endpoint /auth after the "sign" function in frontend. 
// Carries payload of "signature" and "address (pub address)"

const authcontroller => 


	// STEP 0: get params and ensure not null
	const { signature, address } = req.body;
	if signature or address is null 
		return 404

	// STEP 1: 
	// First, findOne user by their public address (PASSED IN PARAMS)
	user = findone(address)
		if user is null 
			return 401 (no user found error)

	// STEP 2: Verify digital signature 
	// ensure the nonce and message are identical to front-end (nonce is passed, message is hard-coded).
	// This is used for the hashing function
	const msg = `NFTease uses cryptography to verify that you are the owner of this account.\lBy clicking sign, you are verifying your ownership of this account. It will not cost you any Eth, so dont worry!\n My special one-use code is: ${user.nonce}`;

	// will use a helper from eth-sig-util to extract the address from the signature
	// taken from : github
	const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
	const hashAddress = recoverPersonalSignature({
		data: msgBufferHex,
		sig: signature,
	});

	// The signature verification is successful if the address found with
	// sigUtil.recoverPersonalSignature matches the PASSED PARAM address
	// format both to prevent weird bug we saw in frontend
		// ETH "determined"			// passed from frontend
	if (hashAddress.toLowerCase() === address.toLowerCase()) {
		return user;
	} else {
		res.status(401).send({
			error: 'Signature verification failed',
		});

		return null;
	}
	})
	
	// STEP 3: CREATE NEW NONCE
	// Generate a new nonce for the user to re-verify after they logout/in
	// this ensures a new signature verification each time
	// set user nonce to new random number 
	user.nonce = Math.floor(Math.random() * 10000);
	return user.save();

	// once above steps have completed, handle authentication using JWT? 
	// Also can use other libs but luckily there is example code:

	.then((user: User) => {
		return new Promise<string>((resolve, reject) =>
			// https://github.com/auth0/node-jsonwebtoken
			jwt.sign(
				{
					payload: {
						id: user.id,
						address,
					},
				},
				config.secret,
				{
					algorithm: config.algorithms[0],
					// exists as .conf file containing:
					// export const config = {
					// 	algorithms: ['HS256' as const],
					// 	secret: 'supersecretrandomstring', // TODO Put in process.env
					// };
				},
				(err, token) => {
					if (err) {
						return reject(err);
					}
					if (!token) {
						return new Error('Empty token');
					}
					return resolve(token);
				}
			)
		);
	})
	.then((accessToken: string) => res.json({ accessToken }))
	.catch(next)
);
};

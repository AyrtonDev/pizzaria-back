import * as jose from 'jose';

const secretKey = Bun.env.JWT_SECRET_KEY!;

const genereteToken = async (payload: jose.JWTPayload, expiry?: string) => {
	const signJwt = new jose.SignJWT(payload).setProtectedHeader({
		alg: 'HS256',
	});

	if (expiry) {
		signJwt.setExpirationTime(expiry);
	}

	return signJwt.sign(new TextEncoder().encode(secretKey));
};

export default genereteToken;

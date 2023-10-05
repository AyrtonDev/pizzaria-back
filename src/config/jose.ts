import * as jose from 'jose'

const secretKey = Bun.env.JWT_SECRET_KEY as string

const genereteToken = async (payload: jose.JWTPayload, expiry?: string) => {
    const signJwt = new jose.SignJWT(payload).setProtectedHeader({
        alg: 'HS256'
    })

    expiry && signJwt.setExpirationTime(expiry)

    return await signJwt.sign(new TextEncoder().encode(secretKey))
}

export default genereteToken
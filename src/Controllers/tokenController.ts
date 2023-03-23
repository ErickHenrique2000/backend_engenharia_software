import * as jwt from 'jsonwebtoken'
import Environments from '../Environments'

const SECRET = String(Environments.TokenSecret)

export async function createAccessToken(userId: string): Promise<string> {
    const token = jwt.sign({userId}, SECRET, {expiresIn: '12h'})
    return token
}

export function verifyAccessToken(token: string): boolean{
    try{
        jwt.verify(token, SECRET)
        return true
    }catch(err){
        return false
    }
}

export function getID(token: string): string{
    const tokenInfos = jwt.verify(token, SECRET)
    return (tokenInfos as jwt.JwtPayload).userId
}
import { Tokens } from "../Interfaces";
import * as jwt from 'jsonwebtoken'
import { generateAssinatura, verificaAssinatura } from "../Utils";
import Environments from "../Environments";

const SECRET = String(Environments.TokenSecret);
const SECRET_REFRESH = 'ESR'
const FORGOT_PASSWORD_SECRET = 'ESE';

const invalid_tokens: Array<string> = []
const invalid_refreshTokens: Array<string> = []

export function addInvalidToken(token: string){
    invalid_tokens.push(token);
    setTimeout(() =>{
        invalid_tokens.shift()
    }, 1000 * 60 * 15)
}

export function addInvalidRefreshToken(token: string){
    invalid_refreshTokens.push(token);
    setTimeout(() =>{
        invalid_refreshTokens.shift()
    }, 1000 * 60 * 60 * 24)
}

function verifyInvalidTokens(token: string){
    const res = invalid_tokens.indexOf(token)
    return res != -1
}

function verifyInvalidRefreshTokens(token: string){
    const res = invalid_refreshTokens.indexOf(token)
    return res != -1
}

export async function generateTokens(name: string, client: string, id: number): Promise<Tokens>{
    const token = generateAccessToken(name, client);
    const refreshToken = await generateRefreshToken(id)

    return {token, refreshToken}
}

export async function verifyToken(token: string): Promise<{autorizado: boolean, client: string, name: string}>{
    try{
        if(verifyInvalidTokens(token)){
            return {autorizado: false, client: '', name: ''}
        }
        
        const res: any = jwt.verify(token, SECRET)
        return {autorizado: true, client: res.client, name: res.name};
    }catch(err){
        console.log(err)
        return {autorizado: false, client: '', name: ''};
    }
}

export function generateNewPasswordToken(name: string): string {
    const token = jwt.sign({name}, FORGOT_PASSWORD_SECRET , {expiresIn: '24H'})
    return token;
}

export function getUserName(token: string): string {
    const res: any = jwt.verify(token, FORGOT_PASSWORD_SECRET);

    return String(res.name);
}

export async function generateRefreshToken(id: number): Promise<string>{
    const assinatura = await generateAssinatura();
    const rt = jwt.sign({id, date: new Date(), assinatura}, SECRET_REFRESH, {expiresIn: '60d'});
    return rt;
}

export  function generateAccessToken(name: string, client: string): string{
    const token = jwt.sign({name, client}, SECRET, {expiresIn: '15m'})
    return token;
}

export async function verifyRefreshToken(refreshToken: string): Promise<boolean>{
    try{
        if(verifyInvalidRefreshTokens(refreshToken)){
            return false
        }
        const token : any = jwt.verify(refreshToken, SECRET_REFRESH)
        const compara = await verificaAssinatura(String(token.assinatura))
        if(!compara){return false}
        return true;
    }catch(e){
        return false;
    }
}

export function getIdRefreshToken(token: string): number{
    const res: any = jwt.decode(token);
    return res?.id;
}
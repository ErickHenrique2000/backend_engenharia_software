import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 12)

    return hash
}

export async function verifyHash(stringToVerify: string, hash: string): Promise<boolean> {
    const retorno = await bcrypt.compare(stringToVerify, hash)
    return retorno
}
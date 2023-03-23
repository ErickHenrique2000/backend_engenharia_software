import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 12)

    return hash
}

export async function verifyHash(stringToVerify: string, hash: string): Promise<boolean> {
    const retorno = await bcrypt.compare(stringToVerify, hash)
    return retorno
}

export async function generateAssinatura(){
    const res = await bcrypt.hash('ES', 11);
    return res;
}

export async function verificaAssinatura(assinatura: string){
    const comparacao = await bcrypt.compare('ES', assinatura)

    return comparacao;
}
import { Request, Response } from "express";
import { createUserDatabase, getPassword } from "../Database/userDatabase";
import { errorMessage } from "../Logger";
import { hashPassword, verifyHash } from "../Utils";
import { createAccessToken } from "./tokenController";

export async function createUser(req: Request, res: Response){
    try{
        const {username, name, password, cargo} = req.body;
        if(!username || !name || !password) return res.status(404).send();

        const hashedPassword = await hashPassword(password);

        const retorno = await createUserDatabase({name, username, password: hashedPassword, cargo});
    
        return res.status(202).send(retorno);

    }catch(err){
        errorMessage(err);
        res.status(500).send();
    }
}

export async function login(req: Request, res: Response){
    try{
        const {username, password} = req.body;
        if(!username || !password) return res.status(404).send();

        const retorno = await getPassword(username);

        if(!await verifyHash(password, retorno.password)){
            return res.status(401).send({Error: 'Invalid user or password'});
        }

        const token = await createAccessToken(retorno.id)
    
        return res.status(202).send({token});
    }catch(err){
        errorMessage(err);
        res.status(500).send();
    }
}

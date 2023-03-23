import { Request, Response } from "express";
import { SuperRequest } from "../Interfaces";
import { verifyToken } from "../Model/Token";

export default async function (req: Request, res: Response, next: Function){
    try{
        
        (req as SuperRequest).token = String(req.headers.authorization?.split(' ')[1])
        
        if((req as SuperRequest).token == null || (req as SuperRequest).token == undefined){
            
            res.status(401).send({message: 'Unauthorized'})
            return
        }
        
        const {autorizado, client} = await verifyToken(String((req as SuperRequest).token))
        
        if(!autorizado){
            
            res.status(401).send({message: 'Unauthorized'})
            return
        }
        
        (req as SuperRequest).client = client
    }catch(err){
        res.status(400).send()
        return
    }
    next()
}
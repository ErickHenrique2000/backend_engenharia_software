import { Request, Response } from "express";
import { createItemDatabase } from "../Database/itemDatabase";
import { SuperRequest } from "../Interfaces";
import { errorMessage } from "../Logger";

export async function createItem(req: SuperRequest, res: Response){
    try{
        const { nome, qtd, qtd_alert_stock, qtd_alert_stand} = req.body;
        if(!nome || !qtd || qtd < 0 || String(nome).trim() == ''){
            return res.status(400).send();
        }

        await createItemDatabase({nome, qtd, qtd_alert_stock, qtd_alert_stand});
        return res.status(201).send();
    }catch(err){
        errorMessage(err);
        return res.status(500).send();
    }
}
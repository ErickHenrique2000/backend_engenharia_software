import { Request, Response } from "express";
import { createItemDatabase, deletarItemDatabase, listItemsDatabase, modificarItemDatabase } from "../Database/itemDatabase";
import { SuperRequest } from "../Interfaces";
import { errorMessage } from "../Logger";

export async function createItem(req: SuperRequest, res: Response){
    try{
        const { nome, qtd, qtd_alert_stock, qtd_alert_stand, qtd_stand} = req.body;
        if(!nome || !qtd || qtd < 0 || String(nome).trim() == ''){
            return res.status(400).send();
        }

        await createItemDatabase({nome, qtd, qtd_alert_stock, qtd_alert_stand, qtd_stand});
        return res.status(201).send();
    }catch(err){
        errorMessage(err);
        return res.status(500).send();
    }
}

export async function listItens(req: SuperRequest, res: Response){
    try{
        const resp = await listItemsDatabase();

        return res.status(200).send(resp);
    }catch(err){
        errorMessage(err);
        return res.status(500).send();
    }
}

export async function modificarItem(req: SuperRequest, res: Response){
    try{
        const { nome, qtd, qtd_alert_stock, qtd_alert_stand, id, qtd_stand } = req.body;

        if(!nome || !qtd || qtd < 0 || String(nome).trim() == '' || !id || String(id).trim() == ''){
            return res.status(400).send();
        }

        await modificarItemDatabase({id, nome, qtd, qtd_alert_stock, qtd_alert_stand, qtd_stand});
        return res.status(201).send();
    }catch(err){
        errorMessage(err);
        return res.status(500).send();
    }
}

export async function deletarItem(req: SuperRequest, res: Response){
    try{
        const { id } = req.body;

        if(!id || String(id).trim() == ''){
            return res.status(400).send();
        }

        await deletarItemDatabase(id);
        return res.status(201).send();
    }catch(err){
        errorMessage(err);
        return res.status(500).send();
    }
}
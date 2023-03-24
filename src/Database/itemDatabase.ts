import { Item } from "../Interfaces";
import knex from "./index";

export async function createItemDatabase(item: Item){
    await knex('Item').insert(item);
}

export async function listItemsDatabase(){
    return await knex('Item');
}

export async function modificarItemDatabase(item: Item){
    await knex('Item').where({id: item.id}).update(item);
}

export async function deletarItemDatabase(id: string){
    await knex('Item').where({id: id}).delete();
}
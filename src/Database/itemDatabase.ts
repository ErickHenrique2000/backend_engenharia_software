import { Item } from "../Interfaces";
import knex from "./index";

export async function createItemDatabase(item: Item){
    await knex('Item').insert(item);
}
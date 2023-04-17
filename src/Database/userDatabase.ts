import knex from "./index";
import { User } from "../Interfaces";

export async function createUserDatabase(user: User) {
    return await knex('Users').insert(user);
}

export async function getPasswordAndRole(username: string): Promise<{id: string, password: string, cargo: string}> {
    return await knex('Users').select('password', 'id', 'cargo').where({username}).first();
}
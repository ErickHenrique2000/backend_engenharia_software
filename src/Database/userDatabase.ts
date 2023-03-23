import knex from "./index";
import { User } from "../Interfaces";

export async function createUserDatabase(user: User) {
    return await knex('Users').insert(user);
}

export async function getPassword(username: string): Promise<{id: string, password: string}> {
    return await knex('Users').select('password', 'id').where({username}).first();
}
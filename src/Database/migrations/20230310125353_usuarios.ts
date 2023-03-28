import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("Users", (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table.text('name').notNullable();
        table.text('password').notNullable();
        table.string('username').notNullable().unique();
        table.text('cargo').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Users');
}


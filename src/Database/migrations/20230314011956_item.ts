import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable("Item", (table) => {
        table.increments('id').unique().notNullable().primary();
        table.text('nome').notNullable();
        table.integer('qtd').notNullable();
        table.integer('qtd_alert_stock');
        table.integer('qtd_alert_stand');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Item');
}


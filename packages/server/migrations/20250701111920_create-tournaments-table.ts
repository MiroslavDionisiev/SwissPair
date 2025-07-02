import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tournaments', (table) => {
        table.uuid('id').primary();
        table.string('tournament_name').notNullable();
        table.enum('status', ['pending', 'active', 'completed']).defaultTo('pending');
        table.integer('rounds_to_play').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tournaments');
}


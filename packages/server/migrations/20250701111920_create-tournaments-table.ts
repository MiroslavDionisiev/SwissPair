import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    return knex.schema.createTable('tournaments', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('tournament_name').notNullable();
        table.string('status').notNullable();
        table.integer('rounds_to_play').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('tournaments');
}


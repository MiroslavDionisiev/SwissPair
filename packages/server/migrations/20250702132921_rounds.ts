import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('rounds', (table) => {
        table.increments('id').primary();
        table.uuid('tournament_id').notNullable().references('id').inTable('tournaments');
        table.integer('round_number').notNullable();
        table.integer('player_white_id');
        table.integer('player_black_id');
        table.enum('round_result', ['whiteWon', 'draw', 'blackWon']).nullable().defaultTo(null);
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    }
)}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('rounds');
}
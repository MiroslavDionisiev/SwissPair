import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("players", (table) => {
    table.increments("id").primary();
    table.integer("tournament_id").notNullable().references("tournaments");
    table.text("player_name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("players");
}

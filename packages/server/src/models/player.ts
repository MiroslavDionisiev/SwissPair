import { BaseModel } from "./base"
import { Tournament } from "./tournament"

export class Player extends BaseModel {
  id!: number;
  tournament_id!: string;
  name!: string;

  static get tableName() {
    return "players";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["tournament_id", "name"],
      properties: {
        id: { type: "integer" },
        tournament_id: { type: "string", format: "uuid" },
        name: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      tournament: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Tournament,
        join: {
          from: "players.tournament_id",
          to: "tournaments.id",
        },
      },
    };
  }
}

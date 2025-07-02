import { BaseModel } from "./base"
import { Tournament } from "./tournament"

export class Player extends BaseModel {
  id!: number;
  tournamentId!: string;
  name!: string;

  static get tableName() {
    return "players";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["tournamentId", "name"],
      properties: {
        id: { type: "integer" },
        tournamentId: { type: "string", format: "uuid" },
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
          from: "players.tournamentId",
          to: "tournaments.id",
        },
      },
    };
  }
}

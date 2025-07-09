import { BaseModel } from "./base"
import { TournamentModel } from "./tournament"

export class PlayerModel extends BaseModel {
  id!: number;
  tournamentId!: string;
  playerName!: string;

  static get tableName() {
    return "players";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["tournamentId", "playerName"],
      properties: {
        id: { type: "integer" },
        tournamentId: { type: "string", format: "uuid" },
        playerName: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      tournament: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TournamentModel,
        join: {
          from: "players.tournamentId",
          to: "tournaments.id",
        },
      },
    };
  }
}

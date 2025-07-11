import { BaseModel } from "./base";
import { randomUUID } from 'crypto';
import { RoundModel } from "./round";
import { PlayerModel } from "./player";

export enum TournamentStatus {
  pending = 'pending',
  active = 'active',
  completed = 'completed'
}

export class TournamentModel extends BaseModel {
  id!: string;
  tournamentName!: string;
  status!: TournamentStatus;
  roundsToPlay!: number | null;

  rounds?: RoundModel[]
  players?: PlayerModel[]

  static get tableName() {
    return 'tournaments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['tournamentName'],

      properties: {
        id: { type: 'string', format: 'uuid' },
        tournamentName: { type: 'string', minLength: 1 },
        status: { type: 'string', enum: Object.values(TournamentStatus), default: TournamentStatus.pending },
        roundsToPlay: { type: ['integer', 'null'] },
      },
    };
  }

  static get relationMappings() {
    return {
      rounds: {
        relation: BaseModel.HasManyRelation,
        modelClass: RoundModel,
        join: {
          from: "tournaments.id",
          to: "rounds.tournamentId",
        },
      },
      players: {
        relation: BaseModel.HasManyRelation,
        modelClass: PlayerModel,
        join: {
          from: "tournaments.id",
          to: "players.tournamentId",
        },
      }
    };
  }

  async $beforeInsert(context: any) {
    await super.$beforeInsert(context);
    if (!this.id) {
      this.id = randomUUID();
    }
  }

}

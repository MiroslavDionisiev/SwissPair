import { BaseModel } from "./base";
import { randomUUID } from 'crypto';

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

  async $beforeInsert(context: any) {
    await super.$beforeInsert(context);
    if (!this.id) {
      this.id = randomUUID();
    }
  }

}
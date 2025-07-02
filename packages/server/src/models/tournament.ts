import { BaseModel } from "./base";
import { randomUUID } from 'crypto';

export class TournamentModel extends BaseModel {
	id!: string;
	tournament_name!: string;
	status!: 'pending' | 'active' | 'completed';
	rounds_to_play!: number | null;

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['tournament_name'],

			properties: {
				id: { type: 'string', format: 'uuid' },
				tournamentName: { type: 'string', minLength: 1 },
				status: { type: 'string', enum: ['pending', 'active', 'completed'], default: 'pending' },
				roundsToPlay: { type: ['integer', 'null'] },
				createdAt: { type: 'string', format: 'date-time' },
				updatedAt: { type: 'string', format: 'date-time' },
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
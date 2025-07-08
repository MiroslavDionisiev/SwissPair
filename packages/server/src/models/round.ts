import { BaseModel } from "./base";
import { PlayerModel } from "./player";
import { TournamentModel } from "./tournament";

export enum RoundStatus {
    whiteWon = 'whiteWon',
    draw = 'draw',
    blackWon = 'blackWon'
}

export class RoundModel extends BaseModel {
    static tableName = 'rounds';

    id!: number;
    tournamentId!: number;
    roundNumber!: number;
    playerWhiteId!: number;
    playerBlackId!: number;
    roundResult!: RoundStatus | null;

    inTournament?: TournamentModel;
    withWhitePlayer?: PlayerModel;
    withBlackPlayer?: PlayerModel;

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'tournamentId', 'roundNumber', 'playerWhiteId', 'playerBlackId'],
            properties: {
                id: { type: 'integer' },
                tournamentId: { type: 'integer' },
                roundNumber: { type: 'integer' },
                playerWhiteId: { type: 'integer' },
                playerBlackId: { type: 'integer' },
                roundResult: { type: ['string', 'null'], enum: [...Object.values(RoundStatus), null], default: null }
            }
        };
    }

    static relationMappings = {
        inTournament: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: TournamentModel,
            join: {
                from: 'rounds.tournamentId',
                to: 'tournaments.id'
            }
        },
        withWhitePlayer: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: PlayerModel,
            join: {
                from: 'rounds.playerWhiteId',
                to: 'players.id'
            }
        },
        withBlackPlayer: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: PlayerModel,
            join: {
                from: 'rounds.playerBlackId',
                to: 'players.id'
            }
        }
    }
}

import { BaseModel } from "./base";
import { Player } from "./player";
import { TournamentModel } from "./tournament";

export enum RoundStatus{
    whiteWon = 'whiteWon', 
    draw = 'draw', 
    blackWon = 'blackWon'
}

export class RoundModel extends BaseModel{
    static tableName = 'rounds';

    id!: number;
    tournamentId!: number;
    roundNumber!: number;
    playerWhiteId!: number |null;
    playerBlackId!: number | null;
    roundResult!: RoundStatus | null;

    inTournament?: TournamentModel;
    withWhitePlayer?: Player;
    withBlackPlayer?: Player;

    static get jsonSchema(){
        return{
            type: 'object', 
            required: ['id', 'tournamentId', 'roundNumber'], 
            properties: {
                id: {type: 'integer'}, 
                tournamentId: {type: 'integer'}, 
                roundNumber: {type: 'integer'}, 
                playerWhiteId: {type: ['integer', 'null']}, 
                playerBlackId: {type: ['integer', 'null']}, 
                roundResult: {type: ['string', 'null'], enum: Object.values(RoundStatus), default: null}
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
            modelClass: Player, 
            join: {
                from: 'rounds.playerWhiteId', 
                to: 'players.id'
            }
        }, 
        withBlackPlayer: {
            relation: BaseModel.BelongsToOneRelation, 
            modelClass: Player, 
            join: {
                from: 'rounds.playerBlackId', 
                to: 'players.id'
            }
        }
    }
}
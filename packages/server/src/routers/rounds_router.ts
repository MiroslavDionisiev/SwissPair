import express from "express"
import { RoundModel, RoundStatus } from "../models/round"

export class SwissPlayer {
  id!: String | Number// unique identifier
  score!: Number// current score
  pairedUpDown?: Boolean// if the player has been paired up/down prior (optional)
  receivedBye?: Boolean// if the player has received a bye prior (optional)
  avoid?: Array<String | Number>// array of IDs the player can not be paired with (optional)

  constructor(id: number | string, score: number,
    pairedUpDown?: Boolean, receivedBye?: Boolean,
    avoid?: Array<String | Number>) {
    this.id = id
    this.score = score
    this.pairedUpDown = pairedUpDown
    this.receivedBye = receivedBye
    this.avoid = avoid
  }
}

export const RoundRouter = express.Router()

function getPlayerScores(rounds: RoundModel[]): SwissPlayer[] {
  const scores: Map<number | string, SwissPlayer> = new Map();

  for (const round of rounds) {
    const whiteId = round.playerWhiteId;
    const blackId = round.playerBlackId;
    const result = round.roundResult;

    if (!scores.has(whiteId)) {
      scores.set(whiteId, new SwissPlayer(whiteId, 0));
    }

    if (!scores.has(blackId)) {
      scores.set(blackId, new SwissPlayer(blackId, 0));
    }

    const whitePlayer = scores.get(whiteId)!;
    const blackPlayer = scores.get(blackId)!;

    if (result === RoundStatus.whiteWon) {
      whitePlayer.score = Number(whitePlayer.score) + 1;
    } else if (result === RoundStatus.blackWon) {
      blackPlayer.score = Number(blackPlayer.score) + 1;
    } else if (result === RoundStatus.draw) {
      whitePlayer.score = Number(whitePlayer.score) + 0.5;
      blackPlayer.score = Number(blackPlayer.score) + 0.5;
    }
  }

  return Array.from(scores.values());
}

async function getAllRounds(req: express.Request, res: express.Response) {

}

async function getRoundById(req: express.Request, res: express.Response) {

}

async function updateRound(req: express.Request, res: express.Response) {

}

//Returns array of objects of type Player
async function createRounds(req: express.Request, res: express.Response) {

}

RoundRouter.get("/:tournamentId/rounds", getAllRounds)
RoundRouter.get("/:tournamentId/rounds/:roundId", getRoundById)
RoundRouter.put("/:tournamentId/rounds/:round_id", updateRound)
RoundRouter.post("/:tournamentId/rounds", createRounds)

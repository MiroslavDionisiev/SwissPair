import express from "express"
import { RoundModel, RoundStatus } from "../models/round"
import { Swiss } from "tournament-pairings"
import { Player as PlayerInterface } from "tournament-pairings/dist/interfaces"

export class SwissPlayer implements PlayerInterface {
  id!: string | number
  score!: number
  pairedUpDown?: boolean;
  receivedBye?: boolean;
  avoid?: Array<string | number>;

  constructor(
    id: number | string,
    score: number,
    pairedUpDown?: boolean,
    receivedBye?: boolean,
    avoid?: Array<string | number>
  ) {
    this.id = id
    this.score = score
    this.pairedUpDown = pairedUpDown;
    this.receivedBye = receivedBye;
    this.avoid = avoid;
  }
}

export const RoundRouter = express.Router()

function getPlayerScores(rounds: RoundModel[]): SwissPlayer[] {
  const scores: Map<number | string, SwissPlayer> = new Map();

  for (const round of rounds) {
    const whiteId = round.playerWhiteId;
    const blackId = round.playerBlackId;
    const result = round.roundResult;
    if (result == null) {
      return []
    }

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
  const roundId = req.params.roundId;

  try{
    const round = await RoundModel.query().findById(roundId);
    res.status(200).json(round);
  }
  catch(error){
    res.status(404).json({message: 'ID not found!'});
  }

}

async function updateRound(req: express.Request, res: express.Response) {

}

async function createRounds(req: express.Request, res: express.Response) {
  const { tournamentId } = req.body.params

  let roundNumber: RoundModel | undefined
  let rounds: RoundModel[]

  try {
    roundNumber = await RoundModel
      .query()
      .select("round_number")
      .where('tournamentId', tournamentId)
      .orderBy("round_number", "desc")
      .first()

    rounds = await RoundModel.query()
      .where("tournamentId", tournamentId)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Error while trying to get the round number from the database" })
    return
  }

  const players = getPlayerScores(rounds)
  if (!players || players.length === 0) {
    res.send(400).json({ error: "Error unable to create new rounds while the old ones are still running" })
    return
  }

  if (roundNumber == undefined) {
    res.status(400).json({ error: "Error unable to get the round number" })
    return
  }

  const round = roundNumber.roundNumber

  const newRounds = Swiss(players, round + 1)

  let result: RoundModel[] | undefined

  result = await Promise.all(
    newRounds.map(match =>
      RoundModel.query().insert({
        tournamentId,
        roundNumber: match.round,
        playerWhiteId: match.player1,
        playerBlackId: match.player2,
      } as Partial<RoundModel>)
    )
  );

  res.send(200).json({ "success": result })
}

RoundRouter.get("/:tournamentId/rounds", getAllRounds)
RoundRouter.get("/:tournamentId/rounds/:roundId", getRoundById)
RoundRouter.put("/:tournamentId/rounds/:round_id", updateRound)
RoundRouter.post("/:tournamentId/rounds", createRounds)

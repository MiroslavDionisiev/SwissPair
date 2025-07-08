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

function getPlayerScores(rounds: RoundModel[], currentRoundNumber: number): SwissPlayer[] {
  const scores: Map<number | string, SwissPlayer> = new Map();
  const avoidMap: Map<string | number, Set<string | number>> = new Map();

  for (const round of rounds) {
    const whiteId = round.playerWhiteId;
    const blackId = round.playerBlackId;
    const result = round.roundResult;


    if (result == null) {
      return [];
    }

    let skip = false
    if (!scores.has(whiteId)) {
      if (whiteId == 0) {
        skip = true
      } else if (!skip) {
        scores.set(whiteId, null as unknown as SwissPlayer);
        avoidMap.set(whiteId, new Set());
      }
    }

    skip = false
    if (!scores.has(blackId)) {
      if (whiteId == 0) {
        skip = true
      } else if (!skip) {
        scores.set(blackId, null as unknown as SwissPlayer);
        avoidMap.set(blackId, new Set());
      }
    }

    const whitePlayer = scores.get(whiteId)!;
    const blackPlayer = scores.get(blackId)!;

    if (round.roundNumber == currentRoundNumber) {
      if (whitePlayer == null) {
        blackPlayer.receivedBye = true
      } else if (blackPlayer == null) {
        whitePlayer.receivedBye = true
      }

      if (whitePlayer.score != blackPlayer.score) {
        whitePlayer.pairedUpDown = true
        blackPlayer.pairedUpDown = true
      }
    }


    avoidMap.get(whiteId)?.add(blackId);
    avoidMap.get(blackId)?.add(whiteId);

    if (result === RoundStatus.whiteWon) {
      whitePlayer.score += 1;
    } else if (result === RoundStatus.blackWon) {
      blackPlayer.score += 1;
    } else if (result === RoundStatus.draw) {
      whitePlayer.score += 0.5;
      blackPlayer.score += 0.5;
    }
  }

  for (const player of scores.values()) {
    player.avoid = Array.from(avoidMap.get(player.id) || []);
  }

  return Array.from(scores.values());
}

async function getAllRounds(req: express.Request, res: express.Response) {
  const tournamentId = req.params.tournamentId;

  try {
    const allRounds = await RoundModel.query()
    .where('tournament_id', tournamentId);
    res.status(200).json({rounds: allRounds});
  }
  catch (error) {
    res.status(400).json({ message: "Couldn't get rounds!" });
  }
}

async function getRoundById(req: express.Request, res: express.Response) {
  const roundId = req.params.roundId;

  try {
    const round = await RoundModel.query()
    .findById(roundId);
    res.status(200).json({round: round});
  }
  catch (error) {
    res.status(404).json({ message: 'ID not found!' });
  }

}

async function updateRound(req: express.Request, res: express.Response) {
  const result = req.body.roundResult;
  const roundId = req.params.roundId;

  try{
    const round = await RoundModel.query()
    .patch({roundResult: result})
    .where('id', roundId);
    res.status(200).json({round: round});
  }
  catch (error) {
    res.status(500).json({ message: 'Unable to update record!' });
  }
}

async function createRounds(req: express.Request, res: express.Response) {
  const { tournamentId } = req.body.params

  try {
    const rounds = await RoundModel
      .query()
      .where("tournamentId", tournamentId);

    const currentRoundNumber = rounds.length > 0
      ? Math.max(...rounds.map(r => r.roundNumber))
      : 0;

    if (currentRoundNumber == 0) {
      res.status(400).json({ error: "Error unable to get the round number" })
      return
    }

    const nextRoundNumber = currentRoundNumber + 1

    const players = getPlayerScores(rounds, currentRoundNumber)
    if (!players || players.length === 0) {
      res.send(400).json({ error: "Error unable to create new rounds while the old ones are still running" })
      return
    }


    const newRounds = Swiss(players, nextRoundNumber)

    const result = await Promise.all(
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
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Error while trying to get the round number from the database" })
    return
  }

}

RoundRouter.get("/:tournamentId/rounds", getAllRounds)
RoundRouter.get("/:tournamentId/rounds/:roundId", getRoundById)
RoundRouter.put("/:tournamentId/rounds/:round_id", updateRound)
RoundRouter.post("/:tournamentId/rounds", createRounds)

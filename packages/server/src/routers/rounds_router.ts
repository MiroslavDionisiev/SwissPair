import express from "express"
import { RoundModel } from "../models/round"

export class Player {
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

async function getAllRounds(req: express.Request, res: express.Response) {

}

async function getRoundById(req: express.Request, res: express.Response) {

}

async function updateRound(req: express.Request, res: express.Response) {

}

async function createRounds(req: express.Request, res: express.Response) {
  const tournamentId = req.params.tournamentId;

  const roundNumber = req.body.roundNumber;
  if(!roundNumber){
    res.status(400).json({message: 'Round number required!'});
  }

  const playerWhiteId = req.body.playerWhiteId;
  if(!playerWhiteId){
    res.status(400).json({message: 'Id of player with white pieces required!'});
  }

  const playerBlackId = req.body.playerBlackId;
  if(!playerBlackId){
    res.status(400).json({message: 'Id of player with black pieces required!'});
  }

  try {
    await RoundModel.query().insert(
      {
        tournamentId: Number(tournamentId), 
        roundNumber: roundNumber, 
        playerWhiteId: playerWhiteId, 
        playerBlackId: playerBlackId
      }
    )
  }
  catch(error){
    res.status(500).json({message: 'Error creating player!'})
  }
}

RoundRouter.get("/:tournamentId/rounds", getAllRounds)
RoundRouter.get("/:tournamentId/rounds/:roundId", getRoundById)
RoundRouter.put("/:tournamentId/rounds/:round_id", updateRound)
RoundRouter.post("/:tournamentId/rounds", createRounds)

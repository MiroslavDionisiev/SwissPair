import express from "express"

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

}

RoundRouter.get("/:tournamentId/rounds", getAllRounds)
RoundRouter.get("/:tournamentId/rounds/:roundId", getRoundById)
RoundRouter.put("/:tournamentId/rounds/:round_id", updateRound)
RoundRouter.post("/:tournamentId/rounds", createRounds)

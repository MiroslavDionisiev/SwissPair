import express from "express"
import { Player } from "../models/player"

export const PlayerRouter = express.Router()

function getPlayers(req: express.Request, res: express.Response) {
  const { tournamentID } = req.params
  try {
    const players = Player.query()
      .select("name", "created_at", "updated_at")
      .where("tournamentId", tournamentID);

    res.status(200).json({ "players": players })
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Error unable to get the players from the database" })
  }
}

function createPlayer(req: express.Request, res: express.Response) {
  const { tournamentID } = req.params
  try {
    const players = Player.query()
      .insert({
        tournamentId: tournamentID,
        name: req.body.name,
      })

    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Error unable to save the player to the database" })
  }
}

function updatePlayer(req: express.Request, res: express.Response)

PlayerRouter.get("/:tournamentId/players", getPlayers)
PlayerRouter.post("/:tournamentId/player", createPlayer)

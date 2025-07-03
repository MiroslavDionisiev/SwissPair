import express, { RequestHandler } from "express"
import { Player } from "../models/player"
import { TournamentModel } from "../models/tournament";

export const PlayerRouter = express.Router()

async function getPlayers(req: express.Request, res: express.Response) {
  const { tournamentID } = req.params
  try {
    const players = await Player.query()
      .select("name", "created_at", "updated_at")
      .where("tournamentId", tournamentID);

    res.status(200).json({ "players": players })
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Error unable to get the players from the database" })
  }
}

async function createPlayer(req: express.Request, res: express.Response) {
  const { tournamentID } = req.params
  try {
    await Player.query()
      .insert({
        tournamentId: tournamentID,
        name: req.body.name,
      })

    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Error unable to save the player to the database" })
  }
}

async function updatePlayer(req: express.Request, res: express.Response) {
  const { tournamentID } = req.params

  try {
    const tournament = await TournamentModel.query()
      .select("status")
      .findById(tournamentID);

    if (tournament?.status !== "pending") {
      return res.status(400).json({ "error": "Error can't update players while the tournament is active" });
    }

    await Player.query()
      .patch({ name: req.body.name })
      .where("tournamentId", tournamentID);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update players" });
  }
}

async function deletePlayer(req: express.Request, res: express.Response) {
  const { tournamentID } = req.params

  try {
    const numDeleted = await Player.query()
      .delete()
      .where("tournamentId", tournamentID)
      .andWhere("id", req.body.playerId)

    if (numDeleted === 0) {
      return res.status(404).json({ "error": "Error there is no player with that id for this tournament" });
    }

    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete players" });
  }
}

PlayerRouter.get("/:tournamentId/players", getPlayers)
PlayerRouter.post("/:tournamentId/player", createPlayer)
PlayerRouter.patch("/:tournamentId/player", updatePlayer as RequestHandler)
PlayerRouter.delete("/:tournamentId/player", deletePlayer as RequestHandler)

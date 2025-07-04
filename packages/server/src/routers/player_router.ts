import express, { RequestHandler } from "express"
import { Player } from "../models/player"
import { TournamentModel } from "../models/tournament";

export const PlayerRouter = express.Router()

async function getPlayers(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params
  try {
    const players = await Player.query()
      .select("player_name", "created_at", "updated_at")
      .where("tournamentId", tournamentId);

    res.status(200).json({ "players": players })
  } catch (error) {
    console.error(error)
    res.status(500).json({ "error": "Error unable to get the players from the database" })
  }
}

async function createPlayer(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params

  if (!req.body.name || req.body.name.trim() === "" || req.body.name == undefined) {
    res.sendStatus(400).json({ "error": "Error there is no name provided" })
  }

  try {
    await Player.query()
      .insert({
        tournamentId: tournamentId,
        playerName: req.body.name,
      })

    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Error unable to save the player to the database" })
  }
}

async function updatePlayer(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params

  console.log(req.body)

  if (!req.body.id || req.body.id == 0) {
    res.status(400).json({ "error": "Error there is player id name provided" })
    return
  }

  if (!req.body.name || req.body.name.trim() === "") {
    res.sendStatus(400).json({ "error": "Error there is no name provided" })
  }

  try {
    const tournament = await TournamentModel.query()
      .select("status")
      .findById(tournamentId);

    if (tournament?.status !== "pending") {
      return res.status(400).json({ "error": "Error can't update players while the tournament is active or finished" });
    }

    await Player.query()
      .patch({ playerName: req.body.name })
      .where("tournamentId", tournamentId)
      .andWhere("id", req.body.id)

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update players" });
  }
}

async function deletePlayer(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params

  if (!req.body.id || req.body.id == 0) {
    res.status(400).json({ "error": "Error there is no id of the player provided" })
    return
  }

  try {
    const numDeleted = await Player.query()
      .deleteById(req.body.id)
      .where("tournamentId", tournamentId)

    if (numDeleted === 0) {
      return res.status(404).json({ "error": "Error there is no player with that id for this tournament" });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Failed to delete the player" });
  }
}

async function createPlayers(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params
  const names: string[] = req.body.names

  if (!Array.isArray(names) || names.length === 0) {
    return res.status(400).json({ "error": "Error incorrectly provided names of the players" });
  }

  let players: Player[] = []

  for (const name of names) {
    try {
      const player = await Player.query()
        .insert({
          tournamentId: tournamentId,
          playerName: name,
        })

      players.push(player)
    } catch (error) {
      console.log(error)
      res.status(500).json({ "error": "Error unable to save the player to the database" })
      return
    }
  }

  res.sendStatus(200).json({ "players": players })
}

PlayerRouter.get("/:tournamentId/players", getPlayers)
PlayerRouter.post("/:tournamentId/player", createPlayer)
PlayerRouter.post("/:tournamentId/players", createPlayers as RequestHandler)
PlayerRouter.put("/:tournamentId/player", updatePlayer as RequestHandler)
PlayerRouter.delete("/:tournamentId/player", deletePlayer as RequestHandler)

import express, { RequestHandler } from "express"
import { PlayerModel } from "../models/player"
import { TournamentModel } from "../models/tournament";
import z from 'zod';

const playerCreateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
});

const playersCreateSchema = z.object({
  names: z.array(z.string()).min(1, { message: "Name is required" }),
});

const playerUpdateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  id: z.number().min(1, { message: "Id is required" }),
});

const playerDeleteSchema = z.object({
  id: z.number().min(1, { message: "Name is required" }),
});

export const PlayerRouter = express.Router({ mergeParams: true })

async function getPlayers(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params
  try {
    const players = await PlayerModel.query()
      .where("tournamentId", tournamentId);

    res.status(200).json({ players: players })
  } catch (error) {
    console.error(error)
    res.status(500).json({ "error": "Error unable to get the players from the database" })
  }
}

async function createPlayer(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params

  const parseResult = playerCreateSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ message: 'Invalid request body', errors: parseResult.error.flatten() });
  }

  const name = parseResult.data.name;

  try {
    const player = await PlayerModel.query()
      .insert({
        tournamentId: tournamentId,
        playerName: name,
      })

    res.status(200).json({ player: player })
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Error unable to save the player to the database" })
  }
}

async function updatePlayer(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params

  const parseResult = playerUpdateSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ message: 'Invalid request body', errors: parseResult.error.flatten() });
  }

  const { name, id } = parseResult.data;

  try {
    const tournament = await TournamentModel.query()
      .select("status")
      .findById(tournamentId);

    if (tournament?.status !== "pending") {
      return res.status(400).json({ "error": "Error can't update players while the tournament is active or finished" });
    }

    const player = await PlayerModel.query()
      .patch({ playerName: name })
      .where("tournamentId", tournamentId)
      .andWhere("id", id)

    res.status(200).json({ player: player });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update players" });
  }
}

async function deletePlayer(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params

  const parseResult = playerDeleteSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ message: 'Invalid request body', errors: parseResult.error.flatten() });
  }

  const id = parseResult.data.id;

  try {
    const numDeleted = await PlayerModel.query()
      .deleteById(id)
      .where("tournamentId", tournamentId)

    if (numDeleted === 0) {
      return res.status(404).json({ "error": "Error there is no player with that id for this tournament" });
    }

    res.status(200).json({ "deleted": numDeleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Failed to delete the player" });
  }
}

async function createPlayers(req: express.Request, res: express.Response) {
  const { tournamentId } = req.params

  const parseResult = playersCreateSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ message: 'Invalid request body', errors: parseResult.error.flatten() });
  }

  const names = parseResult.data.names;

  try {
    const insertedPlayers = await PlayerModel.transaction(async (trx) =>
      Promise.all(
        names.map(name =>
          PlayerModel.query(trx).insert({
            tournamentId,
            playerName: name,
          })
        )
      )
    );

    res.status(200).json({ players: insertedPlayers })
  } catch (error) {
    console.log(error)
    res.status(500).json({ "error": "Error unable to save the player to the database" })
    return
  }

}

PlayerRouter.get("/", getPlayers)
PlayerRouter.post("/", createPlayer as RequestHandler)
PlayerRouter.post("/bulk", createPlayers as RequestHandler)
PlayerRouter.put("/", updatePlayer as RequestHandler)
PlayerRouter.delete("/", deletePlayer as RequestHandler)

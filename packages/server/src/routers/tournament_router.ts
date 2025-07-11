import express from 'express';
import { createTournament, getTournaments, getTournament, deleteTournament, updateTournament } from '../services/tournament_service';
import { TournamentModel, TournamentStatus } from '../models/tournament';
import z from 'zod';
import { PlayerRouter } from './player_router';
import { getPlayerScores, RoundRouter } from "./rounds_router"
import { RoundModel } from '../models/round';
import { PlayerModel } from '../models/player';

class Player {
  id: number | string
  score: number

  constructor(id: number | string, score: number) {
    this.id = id
    this.score = score
  }
}

const tournamentUpdateSchema = z.object({
  tournamentName: z.string(),
  status: z.nativeEnum(TournamentStatus),
  roundsToPlay: z.number(),
});

const tournamentPostSchema = z.object({
  tournamentName: z.string()
})

export const tournamentsRouter = express.Router();

tournamentsRouter.post('/', async (req, res) => {

  const parsed = tournamentPostSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid request body', errors: parsed.error.flatten() });
    return;
  }
  const { tournamentName } = parsed.data;

  try {
    const newTournament = await createTournament(tournamentName);
    res.status(201).json(newTournament);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

tournamentsRouter.get('/', async (req, res) => {
  const status = req.query.status as string;

  try {
    const tournaments = await getTournaments(status)
    res.status(200).json(tournaments);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

tournamentsRouter.get('/:id', async (req, res) => {
  const id: string = req.params.id;

  try {
    const tournament = await getTournament(id);
    res.status(200).json(tournament);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

tournamentsRouter.delete('/:id', async (req, res) => {
  const id: string = req.params.id;

  try {
    await deleteTournament(id);
    res.status(200).json({ message: "Tournament successfully deleted!" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

tournamentsRouter.put('/:id', async (req, res) => {
  const id: string = req.params.id;

  const parsed = tournamentUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid request body', errors: parsed.error.flatten() });
    return;
  }
  const { tournamentName, status, roundsToPlay } = parsed.data;

  const playerNumber = await PlayerModel.query().where("tournamentId", id).resultSize()

  if (playerNumber < roundsToPlay) {
    res.status(403).json({ error: "Error there aren't enough players for the given rounds to play in the tournament" })
    return
  }

  try {
    const newTournament = await updateTournament(id, { tournamentName, status, roundsToPlay });
    res.status(201).json(newTournament);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

async function getTournamentResult(req: express.Request, res: express.Response) {
  const { tournamentId } = req.body.params;

  if (!tournamentId || tournamentId.trim() === "") {
    res.status(400).json({ error: "Error: incorrectly provided ID of the tournament" });
    return;
  }

  try {
    const t = await TournamentModel.query().findById(tournamentId)
      .withGraphJoined('rounds')
      .withGraphJoined('players')

    if (!t) {
      res.status(403).json({ error: "Error: unable to get the tournament" });
      return;
    }

    const roundsToPlay = t.roundsToPlay;

    const currRound = (t.rounds?.length ?? 0) > 0
      ? Math.max(...t.rounds!.map(r => r.roundNumber))
      : 0;

    if (currRound !== roundsToPlay) {
      res.status(400).json({ error: "Error: you can't get the results of a tournament that hasn't already finished" });
      return;
    }

    const playerScores = getPlayerScores(t.rounds!, currRound);
    if (!playerScores || playerScores.length === 0) {
      res.status(400).json({ error: "Error: unable to compute results from the given rounds" });
      return;
    }

    const result = playerScores.map(ps => new Player(ps.id, ps.score));

    result.sort((a, b) => b.score - a.score);

    res.status(200).json({ result: result });

  } catch (error) {
    console.error("Error while computing tournament results:", error);
    res.status(500).json({ error: "Internal server error while computing tournament results" });
  }
}

tournamentsRouter.get("/result", getTournamentResult)
tournamentsRouter.use("/:tournamentId/players", PlayerRouter)
tournamentsRouter.use("/:tournamentId/rounds", RoundRouter)

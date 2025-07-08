import express from 'express';
import { createTournament, getTournaments, getTournament, deleteTournament, updateTournament } from '../services/tournament_service';
import { TournamentStatus } from '../models/tournament';
import z from 'zod';
import { PlayerRouter } from './player_router';

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

  try {
    const newTournament = await updateTournament(id, { tournamentName, status, roundsToPlay });
    res.status(201).json(newTournament);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

tournamentsRouter.use("/:tournamentId/players", PlayerRouter)

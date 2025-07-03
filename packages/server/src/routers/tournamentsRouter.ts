import express from 'express';
import { createTournament, getTournaments, getTournament, deleteTournament, updateTournament } from '../services/TournamentService';
import { TournamentStatus } from '../models/tournament';

export const tournamentsRouter = express.Router();

tournamentsRouter.post('/', async (req, res) => {

  const tournamentName = req.body.tournamentName;

  if (!tournamentName) {
    res.status(400).json({ message: "Missing tournamentName field!" });
    return;
  }

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

  if (!id) {
    res.status(400).json({ message: "Missing id!" });
    return;
  }

  try {
    const tournament = await getTournament(id);
    res.status(200).json(tournament);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

tournamentsRouter.delete('/:id', async (req, res) => {
  const id: string = req.params.id;

  if (!id) {
    res.status(400).json({ message: "Missing id!" });
    return;
  }

  try {
    await deleteTournament(id);
    res.status(200).json({ message: "Tournament successfully deleted!" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})

tournamentsRouter.put('/:id', async (req, res) => {
  const id: string = req.params.id;
  const { tournamentName, status, roundsToPlay } = req.body;
  if (
    typeof tournamentName !== 'string' ||
    (status !== TournamentStatus.pending && status !== TournamentStatus.active && status !== TournamentStatus.completed) ||
    typeof roundsToPlay !== 'number'
  ) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }

  try {
    const newTournament = await updateTournament(id, { tournamentName, status, roundsToPlay });
    res.status(201).json(newTournament);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
})
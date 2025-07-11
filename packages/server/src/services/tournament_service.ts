import { TournamentModel } from "../models/tournament";
import { TournamentStatus } from "../models/tournament";

export interface putInfo {
  tournamentName: string
  status: TournamentStatus
  roundsToPlay: number
}

export async function createTournament(tournamentName: string) {
  const newTournament = await TournamentModel.query().insert({
    tournamentName: tournamentName,
  })

  return newTournament
}

export async function getTournaments(tournamentsStatus: string | undefined) {
  if (tournamentsStatus != undefined) {
    const tournaments = await TournamentModel.query()
      .where("status", '=', tournamentsStatus)
      .withGraphJoined('players');

    return tournaments;
  } else {
    const tournaments = await TournamentModel.query()

    return tournaments;
  }

}

export async function getTournament(tournamentId: string) {
  const tournament = await TournamentModel.query().findById(tournamentId);

  return tournament;
}

export async function deleteTournament(tournamentId: string) {
  await TournamentModel.query().deleteById(tournamentId);
}

export async function updateTournament(tournamentId: string, newInfo: putInfo) {
  await TournamentModel.query().findById(tournamentId).patch(newInfo);

  return getTournament(tournamentId);
}
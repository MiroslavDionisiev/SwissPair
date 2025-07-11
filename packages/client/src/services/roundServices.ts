export async function createRound(tournamentId: string) {
  const port = process.env.REACT_APP_SERVER_URL;
  const url = `${port}/tournaments/${tournamentId}/rounds`;

  const response = await fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ params: { tournamentId } }),
  });
  return response.json();
}

export async function updateRound(tournamentId: string, roundId: number, roundResult: string) {
  const port = process.env.REACT_APP_SERVER_URL;
  const url = `${port}/tournaments/${tournamentId}/rounds/${roundId}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roundResult }),
  });
  return response.json();
}

export async function createPlayer(tournamentId: string, name: string) {
  const port = process.env.REACT_APP_SERVER_URL;
  const url = `${port}/tournaments/${tournamentId}/players`

  const response = await fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return response.json();
}

export async function editPlayer(tournamentId: string, id: number, name: string) {
  const port = process.env.REACT_APP_SERVER_URL;
  const url = `${port}/tournaments/${tournamentId}/players`

  const response = await fetch(url, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  });
  return response.json();
}

export async function deletePlayer(tournamentId: string, id: number) {
  const port = process.env.REACT_APP_SERVER_URL;
  const url = `${port}/tournaments/${tournamentId}/players`

  const response = await fetch(url, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  return response.json();
}   

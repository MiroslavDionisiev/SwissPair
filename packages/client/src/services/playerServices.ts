export async function createPlayer(tournamentId: string, name: string) {
  const response = await fetch(`/tournaments/${tournamentId}/players`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error('Failed to create player');
  }
  return response.json();
}

export async function editPlayer(tournamentId: string, id: number, name: string) {
  const response = await fetch(`/tournaments/${tournamentId}/players`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  });
  if (!response.ok) {
    throw new Error('Failed to edit player');
  }
  return response.json();
}

export async function deletePlayer(tournamentId: string, id: number) {
  const response = await fetch(`/tournaments/${tournamentId}/players`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete player');
  }
  return response.json();
}   
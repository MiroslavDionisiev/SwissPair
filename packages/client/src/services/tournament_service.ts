export async function getAllTournaments() {
	const port = process.env.REACT_APP_SERVER_URL;
	const url = `${port}/tournaments`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch tournaments: ${response.status}, ${response.statusText}`);
	}
	const data = await response.json();
	return data;
}

export async function createTournament(tournamentName: string) {
	const port = process.env.REACT_APP_SERVER_URL;
	console.log(port)
	const url = `${port}/tournaments`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ tournamentName }),
	});

	if (!response.ok) {
		throw new Error(`Failed to create tournament: ${response.status}, ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

export async function getTournamentById(id: number) {
	const port = process.env.REACT_APP_SERVER_URL;
	const url = `${port}/tournaments/${id}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch tournament: ${response.status}, ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

export async function deleteTournamentById(id: number) {
	const port = process.env.REACT_APP_SERVER_URL;
	const url = `${port}/tournaments/${id}`;

	const response = await fetch(url, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error(`Failed to delete tournament: ${response.status}, ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

export async function updateTournament(
	id: number,
	tournamentName: string,
	roundsToPlay: number,
	status: string
) {
	const port = process.env.REACT_APP_SERVER_URL;
	const url = `${port}/tournaments/${id}`;

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			tournamentName,
			roundsToPlay,
			status,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to update tournament: ${response.status}, ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

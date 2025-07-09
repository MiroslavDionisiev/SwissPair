import dotenv from "dotenv";
dotenv.config();

export async function getAllTournaments() {
	const port = process.env.PORT || "3000";
	const url = `http://localhost:${port}/tournaments`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch tournaments: ${response.status}, ${response.statusText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching tournaments:", error);
		return [];
	}
}

export async function createTournament(name: string) {
	const port = process.env.PORT || "3000";
	const url = `http://localhost:${port}/tournaments`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		});

		if (!response.ok) {
			throw new Error(`Failed to create tournament: ${response.status}, ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error creating tournament:", error);
		return null;
	}
}

export async function getTournamentById(id: number) {
	const port = process.env.PORT || "3000";
	const url = `http://localhost:${port}/tournaments/${id}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch tournament: ${response.status}, ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching tournament:", error);
		return null;
	}
}

export async function deleteTournamentById(id: number) {
	const port = process.env.PORT || "3000";
	const url = `http://localhost:${port}/tournaments/${id}`;

	try {
		const response = await fetch(url, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`Failed to delete tournament: ${response.status}, ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error deleting tournament:", error);
		return null;
	}
}

export async function updateTournament(
	id: number,
	tournamentName: string,
	roundsToPlay: number,
	status: string
) {
	const port = process.env.PORT || "3000";
	const url = `http://localhost:${port}/tournaments/${id}`;

	try {
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
	} catch (error) {
		console.error("Error updating tournament:", error);
		return null;
	}
}

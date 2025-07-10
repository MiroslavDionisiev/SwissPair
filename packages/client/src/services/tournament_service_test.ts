import { getAllTournaments, createTournament, updateTournament } from "./tournament_service"
import dotenv from "dotenv";
dotenv.config();

async function runTests() {
	console.log("▶ Fetching all tournaments...");
	const all = await getAllTournaments();
	console.log("✔ All Tournaments:", all);

	console.log("\n▶ Creating a tournament...");
	const created = await createTournament("Test Tournament");
	console.log("✔ Created:", created);

	console.log("\n▶ Updating the tournament...");
	if (created?.id) {
		const updated = await updateTournament(created.id, "Updated Tournament", 5, "active");
		console.log("✔ Updated:", updated);
	} else {
		console.log("⚠ Skipping update: No ID returned.");
	}
}

runTests().catch(console.error);

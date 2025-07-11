import { useEffect, useState } from "react";
import Button, { ButtonVariants } from "../components/Button";
import { TablesComponent } from "../components/TablesComponent";
import { getAllTournaments } from "../services/tournament_service";

export default function TournamentResults() {
  const [tableContent, setTableContent] = useState<any[]>([]);

  useEffect(() => {
    async function fetchResults() {
        const tournaments = await getAllTournaments();
        const formatted = tournaments.map((t: any) => ({
          name: t.tournamentName || t.name,
          players: t.players ? t.players.length : '-',
          rounds: t.roundsToPlay ? t.roundsToPlay : '-',
          time: t.time || '-',
        }));
        setTableContent(formatted);
    }
    void fetchResults();
  }, []);

  return (
    <div className="flex grow flex-col justify-between">
      <div className="p-10 flex grow flex-col justify-center">
        <TablesComponent content={tableContent} tableName="FINAL RESULT" />
      </div>
      <div className="bg-black flex justify-center p-7">
        <Button variant={ButtonVariants.yellow} content="CREATE NEW TOURNAMENT" onClick={() => console.log('CREATE NEW TOURNAMENT')}></Button>
      </div>
    </div>
  )
}
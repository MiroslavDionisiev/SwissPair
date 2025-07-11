import { useParams } from "react-router";
import Button, { ButtonVariants } from "../components/Button";
import { TablesComponent } from "../components/TablesComponent";
import { useAsync } from "../hooks/use-async";
import { getTournamentResult } from "../services/tournament_service";

const tableContent = [
  {
    name: "Spring Championship",
    players: 16,
    rounds: "Single Elimination",
    time: "2025-08-01T18:00:00Z"
  },
  {
    name: "Summer Invitational",
    players: 32,
    rounds: "Double Elimination",
    time: "2025-08-15T15:30:00Z"
  },
  {
    name: "Autumn Open",
    players: 24,
    rounds: "Swiss",
    time: "2025-09-05T13:00:00Z"
  },
  {
    name: "Winter Finals",
    players: 8,
    rounds: "Round Robin",
    time: "2025-12-20T19:00:00Z"
  }
];

export default function TournamentResults() {

  const params = useParams();

  const { data, loading, error } = useAsync(async () => {
    if (!params.tournamentId) {
      return;
    }
    return await getTournamentResult(params.tournamentId)
  }, [params.tournamentId]);

  return (
    <div className="flex grow flex-col justify-between">
      <div className="p-10 flex grow flex-col justify-center">
        {!loading && !error && <TablesComponent content={data} tableName="FINAL RESULT"></TablesComponent>}
        <TablesComponent content={tableContent} tableName="FINAL RESULT" />
      </div>
      <div className="bg-black flex justify-center p-7">
        <Button variant={ButtonVariants.yellow} content="CREATE NEW TOURNAMENT" onClick={() => console.log('CREATE NEW TOURNAMENT')}></Button>
      </div>
    </div>
  )
}
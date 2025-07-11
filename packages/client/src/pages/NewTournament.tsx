import { TextInput } from "../components/TextInput";
import NewPlayerCard from "../components/NewPlayerCard";
import Button, { ButtonVariants } from "../components/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createPlayer, deletePlayer, getAllPlayers } from "../services/playerServices";
import { useAsyncAction } from "../hooks/use-async-action";
import { useAsync } from "../hooks/use-async";
import { getTournamentById, updateTournament } from "../services/tournament_service";

type Player = {
  tournamentId: string,
  playerName: string,
  id: number
}

export default function NewTournament() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [roundsInputValue, setRoundsInputValue] = useState('0');

  const params = useParams();

  const { data, loading, error, reload } = useAsync(async () => {
    if (!params.tournamentId) {
      return;
    }
    return await getAllPlayers(params.tournamentId)
  }, [params.tournamentId]);

  const { data:tournamentData } = useAsync(async()=>{
    if (!params.tournamentId) {
      return;
    }
    return await getTournamentById(params.tournamentId)
  }, [params.tournamentId])

  const { trigger: onPlayerCreate } = useAsyncAction(async () => {
    if (!params.tournamentId) {
      return;
    }
    await createPlayer(params.tournamentId, inputValue);
    reload();
  });

  const { trigger: onPlayerDelete } = useAsyncAction(async (playerId:number) => {
    if (!params.tournamentId) {
      return;
    }
    await deletePlayer(params.tournamentId, playerId);
    reload();
  });

  const { trigger: onDone } = useAsyncAction(async ()=>{
    if (!params.tournamentId) {
      return;
    }
    await updateTournament(params.tournamentId, tournamentData.tournamentName, parseInt(roundsInputValue), 'active')
    await navigate('rounds')
  })

  return (
    <div className="flex grow flex-col justify-between">
      <div className="p-10 flex flex-col justify-center">
        <div className="flex items-end gap-2">
          <TextInput className="w-[50%]" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter or paste players" variant="light" label="Enter Players" />
          <Button className="h-[100%]" variant={ButtonVariants.black} content="+" onClick={onPlayerCreate} />
        </div>
        <TextInput className="pt-5 w-[10%]" value={roundsInputValue} onChange={(e) => setRoundsInputValue(e.target.value)} variant="light" label="Rounds" />
        <div className="flex flex-wrap justify-between my-5 gap-5">
          {!loading && !error && data.players.map((player: Player) => (
            <NewPlayerCard
              playerId = {player.id}
              onDelete={()=>{
                onPlayerDelete(player.id);
              }}
              playerName={player.playerName}
            />
          ))}
        </div>
      </div>
      <div className="bg-black flex justify-end p-7">
        <Button variant={ButtonVariants.yellow} content="DONE" onClick={onDone} />
      </div>
    </div>
  )
}
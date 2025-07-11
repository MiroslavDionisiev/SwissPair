import { TextInput } from "../components/TextInput";
import NewPlayerCard from "../components/NewPlayerCard";
import Button, { ButtonVariants } from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function NewTournament() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [roundsInputValue, setRoundsInputValue] = useState('0');

  function onDelete(){
    alert('delete');
  }

  function addPlayer(){
    setInputValue('')
    alert('add');
  }

  async function done(){
    alert('done');
    await navigate('rounds')
  }

  return (
    <div className="flex grow flex-col justify-between">
      <div className="p-10 flex flex-col justify-center">
        <div className="flex items-end gap-2">
          <TextInput className="w-[50%]" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter or paste players" variant="light" label="Enter Players"/>
          <Button className="h-[100%]" variant={ButtonVariants.black} content="+" onClick={addPlayer}/>
        </div>
        <TextInput className="pt-5 w-[10%]" value={roundsInputValue} onChange={(e) => setRoundsInputValue(e.target.value)} variant="light" label="Rounds"/>
        <div className="flex flex-wrap justify-between my-5 gap-5">
          <NewPlayerCard onDelete={onDelete} playerName="Player Name"/>
        </div>
      </div>
      <div className="bg-black flex justify-end p-7">
        <Button variant={ButtonVariants.yellow} content="DONE" onClick={done}/>
      </div>
    </div>
  )
}
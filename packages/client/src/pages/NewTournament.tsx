import { TextInput } from "../components/TextInput";
import NewPlayerCard from "../components/NewPlayerCard";
import Button, { ButtonVariants } from "../components/Button";
import { useState } from "react";

export default function NewTournament() {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="flex grow flex-col justify-between">
      <div className="p-10 flex flex-col justify-center">
        <div className="flex items-end gap-2">
          <TextInput className="w-[50%]" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter or paste players" variant="light" label="Enter Players"></TextInput>
          <Button className="h-[100%]" variant={ButtonVariants.black} content="+" onClick={() => console.log('+')}></Button>
        </div>
        <div className="flex flex-wrap justify-between my-5 gap-5">
          <NewPlayerCard onEdit={() => console.log('edit')} onDelete={() => console.log('delete')} playerName="Player Name"></NewPlayerCard>
        </div>
      </div>
      <div className="bg-black flex justify-end p-7">
        <Button variant={ButtonVariants.yellow} content="DONE" onClick={() => console.log('DONE')}></Button>
      </div>
    </div>
  )
}
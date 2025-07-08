import { useState } from "react";
import Button, { ButtonVariants } from "../components/Button/Button";
import { TextInput } from "../components/TextInput";
import NewPlayerCard from "../components/NewPlayerCard";

export default function TournamentPage() {
    const [inputValue, setInputValue] = useState('');


    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-yellow-dark flex justify-between py-4 px-5">
                <Button variant={ButtonVariants.black} content="B" onClick={() => console.log('back')}></Button>
                <Button variant={ButtonVariants.black} content="DARK MODE" onClick={() => console.log('dark mode')}></Button>
            </div>
            <div className="grow flex flex-col justify-between">
                <div className="bg-black flex items-center p-7 gap-9">
                    <h1 className="text-white text-3xl">Newest Tournament</h1>
                    <Button variant={ButtonVariants.yellow} content="L" onClick={() => console.log('Link')}></Button>
                </div>
                <div className="p-10 flex flex-col justify-center">
                    <div className="flex justify-between">
                        <TextInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter or paste players" variant="light" label="Enter Players"></TextInput>
                        <Button variant={ButtonVariants.yellow} content="DONE" onClick={() => console.log('dark mode')}></Button>
                    </div>
                    <div className="flex flex-wrap justify-between my-5 gap-5">
                        <NewPlayerCard onEdit={()=>console.log('edit')} onDelete={()=>console.log('delete')} playerName="Player Name"></NewPlayerCard>
                    </div>
                </div>
                <div className="bg-black flex justify-end p-7">
                    <Button variant={ButtonVariants.yellow} content="DONE" onClick={() => console.log('DONE')}></Button>
                </div>
            </div>
        </div>
    )
}
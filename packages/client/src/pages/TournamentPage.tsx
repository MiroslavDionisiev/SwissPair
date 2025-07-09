import { useState } from "react";
import Button, { ButtonVariants } from "../components/Button";
import { TextInput } from "../components/TextInput";
import NewPlayerCard from "../components/NewPlayerCard";
import Arrow from "../icons/arrow";
import Link from "../icons/link"

export default function TournamentPage() {
    const [inputValue, setInputValue] = useState('');


    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-yellow-dark flex justify-between py-4 px-5">
                <Button className="group" variant={ButtonVariants.black} content=<Arrow className="fill-yellow-dark group-hover:fill-black duration-500" /> onClick={() => console.log('back')}></Button>
                <Button variant={ButtonVariants.black} content="DARK MODE" onClick={() => console.log('dark mode')}></Button>
            </div>
            <div className="flex grow flex-col">
                <div className="bg-black flex items-center p-7 gap-9">
                    <h1 className="text-white text-3xl">Newest Tournament</h1>
                    <Button className="group" variant={ButtonVariants.yellow} content=<Link className="fill-black group-hover:fill-yellow-dark duration-500" /> onClick={() => console.log('Link')}></Button>
                </div>
                <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-end gap-2">
                        <TextInput className="w-[50%]" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter or paste players" variant="light" label="Enter Players"></TextInput>
                        <Button className="h-[100%]" variant={ButtonVariants.black} content="+" onClick={() => console.log('+')}></Button>
                    </div>
                    <div className="flex flex-wrap justify-between my-5 gap-5">
                        <NewPlayerCard onEdit={()=>console.log('edit')} onDelete={()=>console.log('delete')} playerName="Player Name"></NewPlayerCard>
                    </div>
                </div>
            </div>
            <div className="bg-black flex justify-end p-7">
                <Button variant={ButtonVariants.yellow} content="DONE" onClick={() => console.log('DONE')}></Button>
            </div>
        </div>
    )
}
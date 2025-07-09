import { useState } from "react";
import Button, { ButtonVariants } from "./Button";
import Pencil from "../icons/pencil";
import Trashcan from "../icons/trashcan";

export default function NewPlayerCard({ playerName, onDelete, onEdit }: { playerName: string, onDelete: () => void, onEdit: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(playerName);
    const [name, setName] = useState(playerName);

    function handleBlur() {
        if (inputValue.length == 0) setInputValue(name)
        else setName(inputValue);
        setIsEditing(false);
    }

    return (
        <div className="inline-flex justify-between min-w-[500px] items-center border-black border-[1px] py-4 px-4 gap-5">
            {isEditing ? (
                <input
                    autoFocus
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    className="text-xl outline-none border-black border-b px-2"
                />
            ) : (
                <h2 onClick={() => setIsEditing(true)} className="text-xl">{inputValue}</h2>
            )}
            <div className="flex gap-5">
                <Button className="group" variant={ButtonVariants.yellow} onClick={() => onEdit()} content={<Pencil className="stroke-black group-hover:stroke-yellow-dark duration-500"/>} />
                <Button className='group' variant={ButtonVariants.black} onClick={() => onDelete()} content={<Trashcan className="fill-yellow-dark group-hover:fill-black duration-500"/>}/>
            </div>
        </div>
    )
}
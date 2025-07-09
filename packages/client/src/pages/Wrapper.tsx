import { ReactNode } from "react";
import Button, { ButtonVariants } from "../components/Button";
import Arrow from "../icons/arrow";
import Link from "../icons/link"

export default function Wrapper({children}:{children?:ReactNode}) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-yellow-dark flex justify-between py-4 px-5">
                <Button className="group" variant={ButtonVariants.black} content=<Arrow className="fill-yellow-dark group-hover:fill-black duration-500" /> onClick={() => console.log('back')}></Button>
                <Button variant={ButtonVariants.black} content="DARK MODE" onClick={() => console.log('dark mode')}></Button>
            </div>
            <div className="bg-black flex items-center p-7 gap-9">
                <h1 className="text-white text-3xl">Newest Tournament</h1>
                <Button className="group" variant={ButtonVariants.yellow} content=<Link className="fill-black group-hover:fill-yellow-dark duration-500" /> onClick={() => console.log('Link')}></Button>
            </div>
            {children}


        </div>
    )
}
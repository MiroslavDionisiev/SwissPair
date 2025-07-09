import { useState } from 'react'
import Modal from 'react-modal'
import Button, { ButtonVariants } from './Button';
import { TextInput } from './TextInput';

export interface ModalProps {
    modalName?: string,
}

export default function ModalComponent({ modalName }: ModalProps) {

    const [isOpen, setIsOpen] = useState(true);
    const [tournamentName, setTournamentName] = useState("");
    return (
        <div>
            <Button variant={ButtonVariants.yellow} onClick={() => setIsOpen(true)} content={modalName ? modalName : ""}></Button>
            <Modal
                isOpen={isOpen}
                className='inline-flex flex-col min-w-[560px] items-center justify-self-center outline-none'>
                <div className='bg-black text-white flex justify-between text-xl px-4 w-[100%] items-center'>
                    <h2 className='font-bold uppercase'>{modalName}</h2>
                    <Button content='X' variant={ButtonVariants.black} onClick={() => { setIsOpen(false) }} />
                </div>
                <div className='w-[100%] py-5 px-10'>
                    <div className='w-[100%]'>
                        <TextInput variant='light' label='TOURNAMENT NAME' placeholder='Enter a tournament name' value={tournamentName} onChange={(e) => { setTournamentName(e.target.value) }}></TextInput>
                    </div>
                    <div className='flex gap-10 justify-around pt-5'>
                        <Button className='' content='CANCEL' variant={ButtonVariants.black} onClick={() => { setIsOpen(false) }} />
                        <Button className='' content='CREATE' variant={ButtonVariants.yellow} onClick={() => { setIsOpen(false) }} />
                    </div>
                </div>


            </Modal>
        </div>

    )
}
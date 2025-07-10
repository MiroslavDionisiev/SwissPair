import { useState } from 'react'
import Modal from 'react-modal'
import Button, { ButtonVariants } from './Button';
import { TextInput } from './TextInput';

export interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    onSubmit?: (tournamentName: string) => void;
}

export default function ModalComponent({ isOpen, onClose, onSubmit }: ModalProps) {

    const [tournamentName, setTournamentName] = useState("");

    function handleSubmit() {
        if (onSubmit) onSubmit(tournamentName);
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            className='inline-flex flex-col min-w-[560px] items-center justify-self-center outline-none'
            overlayClassName="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-60">
            <div className='bg-black text-white flex justify-between text-xl px-4 w-[100%] items-center'>
                <h2 className='font-bold uppercase'>Create Tournament</h2>
                <Button content='X' variant={ButtonVariants.black} onClick={() => { onClose() }} />
            </div>
            <div className='w-[100%] py-5 px-10'>
                <div className='w-[100%]'>
                    <TextInput variant='light' label='TOURNAMENT NAME' placeholder='Enter a tournament name' value={tournamentName} onChange={(e) => { setTournamentName(e.target.value) }} />
                </div>
                <div className='flex gap-10 justify-around pt-5'>
                    <Button content='CANCEL' variant={ButtonVariants.black} onClick={() => { onClose() }} />
                    <Button content='CREATE' variant={ButtonVariants.yellow} onClick={() => { handleSubmit() }} />
                </div>
            </div>


        </Modal>

    )
}

import Button from "../components/Button/Button";


export function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-4">
            <div className="text-s italic text-gray-400 mb-[150px]">
                From the minds of TUES at Astea summer 2025.
            </div>
            <div className="flex flex-col items-center space-y-5">
                <div className="text-8xl font-bold tracking-wide mb-2 text-center">
                    SWISS CHESS
                </div>
                <div className="text-xl text-center mb-4">
                    Your simple swiss bracket solution.
                </div>
                <Button onClick={() => { console.log('click') }} variant='buttonStyleYellow' content="Create a tournament" />
            </div>


            
            <div className="absolute top-5 right-5">
                <Button onClick={() => { console.log('click') }} variant='buttonStyleBlack' content="Dark Mode" />
            </div>

        </div>
    )
}
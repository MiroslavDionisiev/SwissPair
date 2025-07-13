import Button, { ButtonVariants } from "../components/Button"
import { ChessGame } from "../components/Round/ChessGame"

export function RoundsPage(){
    function done(): void {
        throw new Error("Function not implemented.")
    }

    return (
        <div>
            <div className="flex flex-col w-[1280px] h-[562px] pt-[8px] pb-[24px] gap-[32px] justify-self-center">
                <div className="w-[179px] h-[42px] font-bold text-[32px] leading-[32px] tracking-[1px] place-self-center">
                    ROUND 1/5
                </div>

                <div className="flex flex-col w-[1280px] h-[456px] gap-[24px] place-items-center overflow-auto">
                    <ChessGame whiteName="Player Name" blackName="Player Name" saveResult={()=>{console.log()}}/>
                    <ChessGame whiteName="Player Name" blackName="Player Name" saveResult={()=>{console.log()}}/>
                    <ChessGame whiteName="Player Name" blackName="Player Name" saveResult={()=>{console.log()}}/>
                    <ChessGame whiteName="Player Name" blackName="Player Name" saveResult={()=>{console.log()}}/>
                    <ChessGame whiteName="Player Name" blackName="NO PLAYER AVAILABLE" saveResult={()=>{console.log()}}/>
                </div>
            </div>

            <div className="w-screen h-[128px] pt-[32px] pr-[64px] pb-[32px] pl=[64px] bg-black flex justify-between p-7 gap-[24px] justify-self-center">
                <div className="flex w-[430px] h-[64px] gap-[24px]">
                    <Button className="w-[223px] h-[64px]" variant={ButtonVariants.disabled} content="PREVIOUS ROUND" onClick={done} />
                    <Button className="w-[183px] h-[64px]" variant={ButtonVariants.black} content="NEXT ROUND" onClick={done} />
                </div>
                <Button className="w-[130px] h-[64px]" variant={ButtonVariants.yellow} content="FINISH" onClick={done} />
            </div>
        </div>
    )
}
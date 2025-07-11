import { PlayerField } from "./PlayerField"
import { useCallback, useState } from "react"

enum GameResult{
    whiteWon = -1, 
    draw = 0, 
    blackWon = 1
}

export function ChessGame(props: {whiteName: string, blackName: string, saveResult: (result: string) => void}){
    const[whitePlayerBg, setWhitePlayerBg] = useState('bg-white');
    const[blackPlayerBg, setBlackPlayerBg] = useState('bg-white');
    const[pointsWhite, setPointsWhite] = useState<string | null>(null);
    const[pointsBlack, setPointsBlack] = useState<string | null>(null);
    const[result, setResult] = useState(-1);
    
    const calculateResult = useCallback(() => {
        if (result === GameResult.whiteWon) {
            setWhitePlayerBg("bg-green-custom");
            setPointsWhite("1");
            setBlackPlayerBg("bg-red-custom");
            setPointsBlack("0");
        } else if (result === GameResult.draw) {
            setWhitePlayerBg("bg-yellow-dark");
            setPointsWhite("1/2");
            setBlackPlayerBg("bg-yellow-dark");
            setPointsBlack("1/2");
        } else {
            setWhitePlayerBg("bg-red-custom");
            setPointsWhite("0");
            setBlackPlayerBg("bg-green-custom");
            setPointsBlack("1");
        }
        setResult(result === 1 ? -1 : result + 1);
        return result;
    }, [result, setWhitePlayerBg, setBlackPlayerBg, setPointsWhite, setPointsBlack, setResult]);

    return (
        <div className="flex items-center w-[744px] h-[72px] gap-[32px]">
            <PlayerField playerName={props.whiteName} white={true} bgColor={whitePlayerBg} gameResult={pointsWhite}/>

            <button 
                onClick={() => {props.saveResult(String(calculateResult()))}}
                className="w-[40px] h-[40px] top-[16px] left-[352px]"
                >
                    <img src="/playbutton.svg" alt="Play" />
            </button>

            <PlayerField playerName={props.blackName} white={false} bgColor={blackPlayerBg} gameResult={pointsBlack}/>
        </div>
    )
}
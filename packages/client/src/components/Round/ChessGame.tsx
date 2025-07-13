import { PlayerField } from "./PlayerField"
import { useCallback, useState } from "react"

enum GameResult{
    whiteWon = "whiteWon", 
    draw = "draw", 
    blackWon = "blackWon"
}

export function ChessGame(props: {whiteName: string, blackName: string, saveResult: (result: string) => void}){
    const [whitePlayerBg, setWhitePlayerBg] = useState(props.whiteName === "NO PLAYER AVAILABLE"? "bg-yellow-light": "bg-white");
    const [blackPlayerBg, setBlackPlayerBg] = useState(props.blackName === "NO PLAYER AVAILABLE"? "bg-yellow-light": "bg-white");
    const [pointsWhite, setPointsWhite] = useState<string | null>(null);
    const [pointsBlack, setPointsBlack] = useState<string | null>(null);
    const [result, setResult] = useState<string>("whiteWon");
    
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
        setResult(result === "blackWon" ? "whiteWon" : result === "draw"? "blackWon" : "draw"); 
    }, [result, setWhitePlayerBg, setBlackPlayerBg, setPointsWhite, setPointsBlack, setResult]);

    return (
        <div className="flex items-center w-[744px] h-[72px] gap-[32px]">
            <PlayerField playerName={props.whiteName} white={true} bgColor={whitePlayerBg} gameResult={pointsWhite}/>

            <button 
                onClick={() => {
                        if((props.whiteName != "NO PLAYER AVAILABLE") && (props.blackName != "NO PLAYER AVAILABLE")){
                            calculateResult();
                            props.saveResult(result);
                        }
                    }
                }
                className="w-[40px] h-[40px] top-[16px] left-[352px]"
                >
                    <img src="/playbutton.svg" alt="Play" />
            </button>

            <PlayerField playerName={props.blackName} white={false} bgColor={blackPlayerBg} gameResult={pointsBlack}/>
        </div>
    )
}
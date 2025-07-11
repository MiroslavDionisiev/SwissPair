export function PlayerField(props: {playerName: string, white: boolean, bgColor: string, gameResult: string|null}){
    const borderColor: string = props.playerName === "NO PLAYER AVAILABLE"?
        "border-gray-dark" : "border-black"

    const textColor: string = props.playerName === "NO PLAYER AVAILABLE"?
        "text-gray-dark" : "text-black"

    const imgSrc: string = props.playerName === "NO PLAYER AVAILABLE"?
        "/noplayercrown.svg" : props.white?
            "/whitecrown.svg" : "/blackcrown.svg"

    const imgAlt = props.playerName === "NO PLAYER AVAILABLE"?
        "NO PLAYER AVAILABLE" : props.white?
            "White Pieces" : "Black Pieces"

    return (
        <div 
            className={`border ${borderColor} ${props.bgColor} flex items-center w-[320px] h-[72px] pt-[24px] pr-[16px] pb-[24px] pl-[32px] gap-[16px]`}
            >
                <img src={imgSrc} alt={imgAlt} title={imgAlt} className="w-[18.29px] h-[16px] top-[28px] left-[32px]" />
                <div className={`w-[237.71px] h-[24px] ${textColor} font-normal text-base leading-[24px] tracking-[0.04em]`}>
                    {props.playerName}
                </div>
                <div className="font-normal text-black text-base leading-[24px] tracking-[0.04em]">
                    {props.gameResult}
                </div>
        </div>
    )
}

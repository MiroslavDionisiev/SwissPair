export function PlayerField(props: {playerName: string, white: boolean, bgColor: string, gameResult: string|null}){
    const imgSrc: string = props.white? "/whitecrown.svg" : "/blackcrown.svg"
    const imgAlt: string = props.white? "White Pieces" : "Black Pieces"
    return (
        <div 
            className={`border border-black ${props.bgColor} flex items-center w-[320px] h-[72px] pt-[24px] pr-[16px] pb-[24px] pl-[32px] gap-[16px]`}
            >
                <img src={imgSrc} alt={imgAlt} title={imgAlt} className="w-[18.29px] h-[16px] top-[28px] left-[32px]" />
                <div className="w-[237.71px] h-[24px] text-black font-normal text-base leading-[24px] tracking-[0.04em]">
                    {props.playerName}
                </div>
                <div className="text-black font-normal text-base leading-[24px] tracking-[0.04em]">
                    {props.gameResult}
                </div>
        </div>
    )
}

import "./Button.css"

export enum ButtonVariants{
  yellow = 'buttonStyleYellow',
  black = 'buttonStyleBlack',
  disabled = 'buttonStyleDisabled'
}

export interface ButtonProps{
  content: string,
  variant: 'buttonStyleYellow' | 'buttonStyleBlack' | 'buttonStyleDisabled',
  className?: string,
  onClick: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <button className={"buttonStlyeCommon " + props.variant} onClick={props.onClick}>{props.content}</button>
  )
}
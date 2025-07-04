import { CSSProperties } from "react"

export interface ButtonProps{
  content?: string,
  className?: string,
  style?: CSSProperties,
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <button style={props.style} onClick={props.onClick}>{props.content}</button>
  )
}
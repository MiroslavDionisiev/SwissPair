import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export enum ButtonVariants {
  yellow,
  black,
  disabled
}

export const buttonStyles = {
  common: "border-none outline-none font-[500] px-[2rem] py-[1rem] cursor-pointer duration-500 ",
  [ButtonVariants.black]: "bg-black text-yellow-dark hover:text-black hover:bg-yellow-dark ",
  [ButtonVariants.yellow]: "bg-yellow-dark text-black hover:text-yellow-dark hover:bg-black ",
  [ButtonVariants.disabled]: "bg-yellow-light text-gray-dark cursor-default "
}

const clip = {
  clipPath: 'polygon(16px 0, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'
}

export interface ButtonProps {
  content: string | ReactNode,
  variant: ButtonVariants,
  className?: string,
  onClick: () => void
}

export default function Button(props: ButtonProps) {
  const mergedClassName = twMerge(buttonStyles.common, buttonStyles[props.variant], props.className)

  return (
    <button
      style={clip}
      className={mergedClassName}
      onClick={props.onClick}>
      {props.content}
    </button>
  )

}
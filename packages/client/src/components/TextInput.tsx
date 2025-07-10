import React from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "dark" | "light" | "red" | "disabled";
  className?: string;
}

const inputStyles = {
  dark: "bg-black text-yellow-dark border-black placeholder-gray-dark border-2",
  light: "bg-transparent text-black border-black placeholder-gray-light border-2",
  red: "bg-transparent text-red-custom border-red-custom placeholder-red-custom border-2",
  disabled: "text-gray-dark border-red-custom placeholder-gray-dark border-2 cursor-not-allowed",
};

const labelStyles = {
  dark: "text-yellow-dark font-[600] uppercase text-l mb-2",
  light: "text-black font-[600] uppercase text-l mb-2",
  red: "text-red-custom font-[600] uppercase text-l mb-2",
  disabled: "text-red-custom font-[600] uppercase text-l mb-2",
};

const defaultStyles = "p-[1rem] outline-none transition-colors duration-200";

export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  variant = "dark",
  className,
}: TextInputProps) {
  const isDisabled = variant === "disabled";
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <label className={twMerge(labelStyles[variant])}>{label}</label>
      <input
        type="text"
        className={twMerge(inputStyles[variant], defaultStyles )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
}
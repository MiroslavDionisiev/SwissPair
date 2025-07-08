import React from "react";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({ label, placeholder, value, onChange }: TextInputProps) {
  return (
    <div className="w-[360px]">
      <label className="block text-yellow-dark font-bold uppercase text-base mb-2">{label}</label>
      <input
        type="text"
        className="w-full h-[64px] border border-yellow-dark bg-white text-black placeholder-gray-dark py-5 px-4 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
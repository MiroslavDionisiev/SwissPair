import React from "react";
import { twMerge } from "tailwind-merge";

interface Tournament {
  name: string;
  players: number;
  rounds: string;
  time: string;
}

interface TablesComponentProps {
  tournaments: Tournament[];
  tableName: string;
  variant?: "default" | "yellow";
  className?: string;
}

const wrapperStyle = {
  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px)',
  backgroundColor: 'black',
  display: 'inline-block',
  padding: '1px',
};

const labelStyle = {
  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px)'
};

const tableStyles = {
  default: {
    wrapper: '',
    label: 'bg-yellow-dark text-xl py-[0.5rem] px-[2rem] font-bold text-center',
    table: 'min-w-full w-full h-full border border-black',
    thead: 'bg-black',
    th: 'text-yellow-dark py-3 px-4 text-left font text-lg border-b border-black',
    tr: 'bg-white border-b border-black last:border-b-0',
    td: 'py-4 px-4 text-left font-medium border-r border-black',
    tdLast: 'py-4 px-4 text-center font-medium',
  },
  yellow: {
    wrapper: '',
    label: 'bg-black text-yellow-dark text-2xl py-[0.5rem] px-[2rem] font-bold text-left uppercase tracking-wide font-mono border-2 border-yellow-dark',
    table: 'min-w-full w-full h-full border-2 border-yellow-dark',
    thead: 'bg-yellow-dark',
    th: 'text-black py-3 px-4 text-left font text-lg border-b-2 border-yellow-dark',
    tr: 'bg-black border-b-2 border-yellow-dark last:border-b-0',
    td: 'py-4 px-4 text-yellow-dark text-left font-medium border-r-2 border-yellow-dark',
    tdLast: 'py-4 px-4 text-yellow-dark text-center font-medium',
  },
};

export function TablesComponent({ tournaments, tableName, variant = "default", className }: TablesComponentProps) {
  const styles = tableStyles[variant];
  return (
    <div className={twMerge("overflow-x-auto px-[10%] mx-auto", styles.wrapper, className)}>
      <div style={wrapperStyle}>
        <div
          className={twMerge(styles.label)}
          style={labelStyle}
        >{tableName}</div>
      </div>

      <table className={twMerge(styles.table)}>
        <thead className={twMerge(styles.thead)}>
          <tr>
            <th className={twMerge(styles.th)}>NAME</th>
            <th className={twMerge(styles.th, "text-center")}>PLAYERS</th>
            <th className={twMerge(styles.th, "text-center")}>ROUNDS</th>
            <th className={twMerge(styles.th, "text-center")}>TIME</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((t) => (
            <tr key={t.name} className={twMerge(styles.tr)}>
              <td className={twMerge(styles.td)}>{t.name}</td>
              <td className={twMerge(styles.td, "text-center")}>{t.players}</td>
              <td className={twMerge(styles.td, "text-center")}>{t.rounds}</td>
              <td className={twMerge(styles.tdLast)}>{t.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
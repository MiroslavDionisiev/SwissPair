import React from "react";

interface Tournament {
  name: string;
  players: number;
  rounds: string;
  time: string;
}

const wrapperStyle = {
  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px)',
  backgroundColor: 'black',
  display: 'inline-block',
  padding: '1px',
}

const labelStyle = {
  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px)'
}

export function TablesComponent({ tournaments, tableName }: { tournaments: Tournament[], tableName: string }) {
  return (
    <div className="overflow-x-auto px-[10%] mx-auto">
      <div style={wrapperStyle}>
        <div
          className="bg-yellow-dark text-xl py-[0.5rem] px-[2rem] font-bold text-center"
          style={labelStyle}
        >{tableName}</div>
      </div>

      <table className="min-w-full w-full h-full border border-black">
        <thead>
          <tr className="bg-black">
            <th className="text-yellow-dark py-3 px-4 text-left font text-lg border-b border-black">NAME</th>
            <th className="text-yellow-dark py-3 px-4 text-center font text-lg border-b border-black">PLAYERS</th>
            <th className="text-yellow-dark py-3 px-4 text-center font text-lg border-b border-black">ROUNDS</th>
            <th className="text-yellow-dark py-3 px-4 text-center font text-lg border-b border-black">TIME</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((t) => (
            <tr key={t.name} className="bg-white border-b border-black last:border-b-0">
              <td className="py-4 px-4 text-left font-medium border-r border-black">{t.name}</td>
              <td className="py-4 px-4 text-center font-medium border-r border-black">{t.players}</td>
              <td className="py-4 px-4 text-center font-medium border-r border-black">{t.rounds}</td>
              <td className="py-4 px-4 text-center font-medium">{t.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
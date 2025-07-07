import React from "react";

interface Tournament {
  name: string;
  players: number;
  rounds: string;
  time: string;
}

export function TablesComponent({ tournaments }: { tournaments: Tournament[] }) {
  return (
    <div className="overflow-x-auto w-[960px] h-[392px] mx-auto">
      <table className="min-w-full w-full h-full border border-black">
        <thead>
          <tr className="bg-black">
            <th className="text-yellow-dark py-3 px-4 text-left font-bold text-lg border-b border-black">NAME</th>
            <th className="text-yellow-dark py-3 px-4 text-center font-bold text-lg border-b border-black">PLAYERS</th>
            <th className="text-yellow-dark py-3 px-4 text-center font-bold text-lg border-b border-black">ROUNDS</th>
            <th className="text-yellow-dark py-3 px-4 text-center font-bold text-lg border-b border-black">TIME</th>
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
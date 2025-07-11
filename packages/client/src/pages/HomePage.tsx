import Button, { ButtonVariants } from "../components/Button";
import { TablesComponent } from "../components/TablesComponent";
import ModalComponent from "../components/ModalComponent";
import { useState, useEffect } from "react";
import { getAllTournaments } from "../services/tournament_service";

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentsData, setTournamentsData] = useState<any[]>([]);
  

  useEffect(() => {
    async function fetchTournaments() {
      const tournaments = await getAllTournaments();
      const mapped = tournaments.map((t: any) => ({
        name: t.tournamentName,
        players: t.players ? t.players.length : '-',
        rounds: t.roundsToPlay ? `0/${t.roundsToPlay}` : '-',
        time: '-', 
      }));
      setTournamentsData(mapped);
    }
    void fetchTournaments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white relative pb-20">
      <div className="w-full flex justify-center mt-8 mb-24">
        <div className="italic text-gray-400 text-md text-base">
          From the minds of TUES at Astea summer 2025.
        </div>
        <div className="absolute top-5 right-5 z-10">
        <Button onClick={() => { console.log('Dark mode toggled'); }} variant={ButtonVariants.black} content="Dark Mode" />
      </div>
      </div>
      

      <div className="flex flex-col items-center mt-16 mb-8">
        <div className="text-8xl font-bold tracking-wide mb-2 text-center" style={{letterSpacing: '0.05em'}}>
          SWISS CHESS
        </div>
        <div className="text-xl text-center mb-8 text-black/80">
          Your simple swiss bracket solution.
        </div>
        <Button variant={ButtonVariants.yellow} onClick={() => setIsModalOpen(true)} content="Create a Tournament" />
        <ModalComponent isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />
        </div>

      <div className="my-8 text-4xl ">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10V30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <path d="M10 22L20 32L30 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="w-full flex flex-col items-center mb-16">
          <TablesComponent
            content={tournamentsData}
            tableName="ACTIVE TOURNAMENTS"
            variant="default"
            className="mb-12"
          />
        
      </div>

      <div className="w-full flex flex-col items-center">
        <TablesComponent
          content={tournamentsData}
          tableName="PAST TOURNAMENTS"
          variant="default"
        />
      </div>
    </div>
  );
}
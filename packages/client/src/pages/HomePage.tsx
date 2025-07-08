import Button, { ButtonVariants } from "../components/Button/Button";
import { TablesComponent } from "../components/TablesComponent";
import ModalComponent from "../components/ModalComponent";

const tournamentsData = [
  { name: "Plovdiv Chess Open", players: 20, rounds: "1/5", time: "00:00:13" },
  { name: "The Checkemate Classic", players: 190, rounds: "2/8", time: "00:12:00" },
  { name: "Crown Open", players: 1024, rounds: "1/10", time: "00:23:05" },
  { name: "King's Arena", players: 9, rounds: "2/4", time: "01:23:40" },
  { name: "The Queen's Challenge", players: 124, rounds: "5/7", time: "02:33:34" },
  { name: "Sofia Open", players: 60, rounds: "2/6", time: "03:44:22" },
];

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white relative pb-20">
      <div className="w-full flex justify-center mt-8 mb-24">
        <div className="italic text-gray-400 text-md" style={{fontSize: '1.1rem'}}>
          From the minds of TUES at Astea summer 2025.
        </div>
      </div>
      <div className="absolute top-5 right-5 z-10">
        <Button onClick={() => { console.log('Dark mode toggled'); }} variant={ButtonVariants.black} content="Dark Mode" />
      </div>

      <div className="flex flex-col items-center mt-16 mb-8">
        <div className="text-8xl font-bold tracking-wide mb-2 text-center font-mono" style={{letterSpacing: '0.05em'}}>
          SWISS CHESS
        </div>
        <div className="text-xl text-center mb-8 text-black/80">
          Your simple swiss bracket solution.
        </div>
        {/* <Button onClick={() => { console.log('Create tournament clicked'); }} variant="buttonStyleYellow" content="Create a tournament" /> */}
        <ModalComponent modalName="Create a Tournament" />
        </div>

      <div className="my-8 text-4xl ">↓</div>

      <div className="w-full flex flex-col items-center mb-16">
        <TablesComponent
          tournaments={tournamentsData}
          tableName="ACTIVE TOURNAMENTS"
          variant="default"
          className="mb-12"
        />
      </div>

      <div className="w-full flex flex-col items-center">
        <TablesComponent
          tournaments={tournamentsData}
          tableName="PAST TOURNAMENTS"
          variant="default"
        />
      </div>
    </div>
  );
}
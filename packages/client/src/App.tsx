import './app.module.css';
import './index.css';
import { TablesComponent } from './components/TablesComponent';

const tournaments = [
  { name: "Plovdiv Chess Open", players: 20, rounds: "1/5", time: "00:00:13" },
  { name: "The Checkmate Classic", players: 190, rounds: "2/8", time: "00:12:00" },
  { name: "Crown Open", players: 1024, rounds: "1/10", time: "00:23:05" },
  { name: "King’s Arena", players: 9, rounds: "2/4", time: "01:23:40" },
  { name: "The Queen’s Challenge", players: 124, rounds: "5/7", time: "02:33:34" },
];

export function App() {
  return (
    <div>
      test
     <TablesComponent tournaments={tournaments} />
    </div>
  );
}
  
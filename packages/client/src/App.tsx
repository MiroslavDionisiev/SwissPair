import './app.module.css';
import './index.css';
import { createPlayer } from './services/playerServices';

export function App() {
  const testCreatePlayer = async () => {
    const tournamentId = '1';
    const playerName = 'Test Player';
    try {
      const result = await createPlayer(tournamentId, playerName);
      console.log('Player created:', result);
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  return (
    <div>
      <button onClick={testCreatePlayer}>Test Create Player</button>
    </div>
  );
}
  
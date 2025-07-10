import './app.module.css';
import './index.css';
import { createPlayer } from './services/playerServices';
import { createRound, updateRound } from './services/roundServices';

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

  const testCreateRound = async () => {
    const tournamentId = '1';
    try {
      const result = await createRound(tournamentId);
      console.log('Round created:', result);
    } catch (error) {
      console.error('Error creating round:', error);
    }
  };

  const testUpdateRound = async () => {
    const tournamentId = '1';
    const roundId = 1;
    const roundResult = 'whiteWon';
    try {
      const result = await updateRound(tournamentId, roundId, roundResult);
      console.log('Round updated:', result);
    } catch (error) {
      console.error('Error updating round:', error);
    }
  };

  return (
    <div>
      <button onClick={testCreatePlayer}>Test Create Player</button>
      <button onClick={testCreateRound}>Test Create Round</button>
      <button onClick={testUpdateRound}>Test Update Round</button>
    </div>
  );
}

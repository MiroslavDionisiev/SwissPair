import { BrowserRouter, Route, Routes } from 'react-router';
import './app.module.css';
import './index.css';
import TournamentPage from './pages/TournamentPage';
import NewTournament from './pages/NewTournament';
import TournamentResults from './pages/TournamentResults';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="tournament/:tournamentId" element={<TournamentPage />}>
          <Route index element={<NewTournament />} />
          <Route path="results" element={<TournamentResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

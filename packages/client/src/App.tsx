import './app.module.css';
import './index.css';
import { HomePage } from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}


import { useState } from 'react';
import './app.module.css';
import ModalComponent from './components/ModalComponent';
import './index.css';

export function App() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <ModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}


import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- This element will always be present
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

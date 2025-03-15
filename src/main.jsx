import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App/App';

import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { CardsProvider } from './contexts/CardsContext';
import { LoadingPovider } from './contexts/LoadingContext';
import { PopupProvider } from './contexts/PopupContext';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopupProvider>
      <LoadingPovider>
        <CurrentUserProvider>
          <CardsProvider>
            <App />
          </CardsProvider>
        </CurrentUserProvider>
      </LoadingPovider>
    </PopupProvider>
  </StrictMode>
);

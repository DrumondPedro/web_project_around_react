import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { CardsProvider } from './contexts/CardsContext';
import { LoadingPovider } from './contexts/LoadingContext';
import { PopupProvider } from './contexts/PopupContext';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PopupProvider>
        <LoadingPovider>
          <CurrentUserProvider>
            <CardsProvider>
              <App />
            </CardsProvider>
          </CurrentUserProvider>
        </LoadingPovider>
      </PopupProvider>
    </BrowserRouter>
  </StrictMode>
);

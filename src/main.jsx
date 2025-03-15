import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App/App';

import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { LoadingPovider } from './contexts/LoadingContext';
import { PopupProvider } from './contexts/PopupContext';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopupProvider>
      <LoadingPovider>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </LoadingPovider>
    </PopupProvider>
  </StrictMode>
);

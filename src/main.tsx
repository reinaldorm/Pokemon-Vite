import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from './context/provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

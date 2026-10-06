import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ItemsProvider } from './hooks/useItems';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

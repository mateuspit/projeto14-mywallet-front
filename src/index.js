import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Reset from './Style/Reset.js';
import GlobalStyle from './Style/GlobalStyle.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

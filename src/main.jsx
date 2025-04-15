import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import './assets/global.css'; 
import App from './App.jsx'
import { ThemeProvider } from './lib/theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
        <App />
    </ThemeProvider>  
  </StrictMode>,
)

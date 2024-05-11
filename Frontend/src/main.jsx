import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { MantineProvider } from '@mantine/core'; // Importar MantineProvider
import App from './App.jsx';
import './index.css';

const direction = 'rtl'; // 'rtl' o 'ltr'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <MantineProvider direction={direction}>
            <App />
          </MantineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

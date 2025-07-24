import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './theme.css';
import { ThemeProvider } from './ThemeContext'; // ✅ Import this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

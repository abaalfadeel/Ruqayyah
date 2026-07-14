import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { JourneyProvider } from './context/JourneyContext.jsx';
import { AudioProvider } from './context/AudioContext.jsx';
import './styles/index.css';

// نستخدم HashRouter عمدًا لضمان التوافق الكامل مع النشر على GitHub Pages
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AudioProvider>
        <JourneyProvider>
          <App />
        </JourneyProvider>
      </AudioProvider>
    </HashRouter>
  </React.StrictMode>
);

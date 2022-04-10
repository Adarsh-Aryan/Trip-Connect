import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TripState from './context/TripState';


ReactDOM.render(
  <React.StrictMode>
    <TripState>
      <App />
    </TripState>
  </React.StrictMode>,
  document.getElementById('root')
);


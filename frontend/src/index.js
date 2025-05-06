import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // This imports any global styles you may have
import App from './App';  // Assuming you have an App component


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();


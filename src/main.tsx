import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

try {
  const rootElement = document.getElementById('root2');
  if (!rootElement) throw new Error('root element not found!');

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  console.error(err);
}

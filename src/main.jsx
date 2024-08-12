import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux'; // Import the Provider component from react-redux
import store from './store.js'; // Import the Redux store from store.js

// Wrap the App component with Provider and pass the store as a prop
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the Redux store to the App */}
      <App />
    </Provider>
  </React.StrictMode>,
);

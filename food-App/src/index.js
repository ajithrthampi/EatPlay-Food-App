import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initialState } from './context/initialState';
import reducer from './context/reducer';
import { StateProvider } from './context/StateProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer} >
    <App />
    </StateProvider>
  </React.StrictMode>
);



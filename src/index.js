import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HSMeetingContextProvider } from './contexts/HSMeetingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <HSMeetingContextProvider>
        <App />
      </HSMeetingContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();

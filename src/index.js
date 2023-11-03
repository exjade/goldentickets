import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import './styles/App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
const rootElement = createRoot(root);
rootElement.render(
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById('root')
);

serviceWorkerRegistration.register({
    onUpdate: async (registration) => {
      if (registration && registration.waiting) {
        await registration.unregister();
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    },
  });

  // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
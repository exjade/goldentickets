import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import './styles/App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
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
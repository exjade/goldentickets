import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import './styles/App.css';
// import i18n (needs to be bundled ;)) 
import './i18n';
import 'flag-icons/css/flag-icons.min.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById('root')
);

serviceWorkerRegistration.register({
    onUpdate: async (registration) => {
      // Corremos este código si hay una nueva versión de nuestra app
      // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
      if (registration && registration.waiting) {
        await registration.unregister();
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
        window.location.reload();
      }
    },
  });
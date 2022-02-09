import React from 'react';
import { restoreCSRF, csrfFetch } from './store/csrf';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as sessionActions from './store/session';

import { ModalProvider } from './context/Modal'


import './index.css';

import configureStore from './store';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {

  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions
  window.store = store;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
// delays the rendering of your app's UI until your persisted state
// has been retrieved and saved to redux
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux';
// defaults to localStorage for web
import storage from 'redux-persist/lib/storage'
import './index.css';
import App from './App';
import rootReducer from './components/rootReducer';
import reportWebVitals from './reportWebVitals';

const persistConfig = {
  key: 'root',
  storage
}

// returns an enhanced reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// returns persistor object
const store = createStore(persistedReducer)
const persistor = persistStore(store)

// persist user login or signup keep the state, even though refresh page

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

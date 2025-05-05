import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserRequest from './store/UserRequest';
import UserStore from './store/UserStore'
// import { BrowserRouter } from 'react-router-dom';
export const Context = createContext(null)
const user = new UserStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        UserRequest: new UserRequest()
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
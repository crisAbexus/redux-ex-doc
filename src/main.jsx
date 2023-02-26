import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { apiSlice } from "./features/api/apiSlice";
import { fetchNotifications } from "./features/notifications/notificationsSlice";

import { worker } from './api/server'

// Wrap app rendering so we can wait for the mock API to initialize
async function main() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(apiSlice.endpoints.getUsers.initiate())

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
}

main()

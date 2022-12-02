import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './store'
import { initialize } from './store/actions'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const mainApp = (
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(mainApp, document.getElementById('root'), () => store.dispatch(initialize()))

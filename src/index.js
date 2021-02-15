import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import dataReducer from './reducers/dataReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import allReducers from './reducers'

const store = createStore(allReducers, composeWithDevTools(
    applyMiddleware(thunk)
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()

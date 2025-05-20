import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import AppRouter from './AppRouter.jsx'
import { BrowserRouter } from "react-router";
//import { configureStore } from "@reduxjs/toolkit";
//import toDoReducer from "./store_rtk/toDoSlice";
import { store } from "./store_rtk/store";
import { Provider } from "react-redux";

//store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)

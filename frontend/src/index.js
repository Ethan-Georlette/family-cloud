import React from "react";
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { RootCmp } from './root-cmp';
import './assets/styles/styles.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <AuthProvider>
    <BrowserRouter>
      <RootCmp />
    </BrowserRouter>
  </AuthProvider>
);
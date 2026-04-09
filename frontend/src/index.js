import React from "react";
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { RootCmp } from './root-cmp';
import './assets/styles/styles.scss'
import keycloak from "./config/keycloak";


keycloak.init({
  onLoad: "login-required",
  checkLoginIframe: false // forces login
}).then(authenticated => {
  ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <RootCmp keycloak={keycloak} />
    </BrowserRouter>
  </AuthProvider>
  );
});

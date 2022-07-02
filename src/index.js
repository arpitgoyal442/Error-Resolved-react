import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<GoogleOAuthProvider clientId="742891759403-b4os8ce5v61fquu720763ci8gru3oauj.apps.googleusercontent.com">
<App />
</GoogleOAuthProvider>
);

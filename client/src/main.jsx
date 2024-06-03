import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FoterreTokenProvider } from "./context/TokenContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FoterreTokenProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FoterreTokenProvider>
);

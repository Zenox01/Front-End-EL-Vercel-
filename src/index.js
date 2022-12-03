import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./context/themeContext";
import { BrowserRouter } from "react-router-dom";
import { CasesContextProvider } from "./context/cases.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <CasesContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </CasesContextProvider>
  </ThemeContextProvider>
);

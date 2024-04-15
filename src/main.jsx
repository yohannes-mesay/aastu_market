import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { SavedProvider } from "./Context/SavedContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SavedProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </SavedProvider>
    </AuthProvider>
  </React.StrictMode>
);

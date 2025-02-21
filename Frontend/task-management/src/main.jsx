import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router.jsx";
import AuthProviders from "./Providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <AuthProviders>
      <RouterProvider router={Router} />
    </AuthProviders>
  </StrictMode>
);

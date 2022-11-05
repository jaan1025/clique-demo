import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Mai from 'mai';

import { router } from './router';

import "./index.css";

Mai.init({
  appId: '1234',
  appName: 'clique',
});

Mai.start();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

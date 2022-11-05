import { createBrowserRouter, Navigate } from "react-router-dom";

import { PageA } from "../pages/a";
import { PageB } from "../pages/b";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/a" />
  },
  {
    path: "/a",
    element: <PageA />,
  },
  {
    path: "/b",
    element: <PageB />,
  },
]);

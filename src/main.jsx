import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },

{
    path: "/login",
    element: <Login />,
},

{
    path: "/register",
    element: <Register />,
},

{
  path: "*",
  element: <ErrorPage />,
}


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
        </AuthProvider>
   
  </React.StrictMode>
);

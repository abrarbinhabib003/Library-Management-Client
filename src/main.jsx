import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import AllBooks from "./pages/AllBooks";
import UpdateBook from "./pages/UpdateBook";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
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
,{
  path: "all-books",
  element: <AllBooks />,
},

{
  path: "update-book",
  element: <UpdateBook />,
},
{
  path: "update-book/:bookId",
  element: <UpdateBook />,
}, 
{
  path: "book-details/:bookId",
  element: <BookDetails />,
},

{
  path: "add-book",
  element: <AddBook />,
},



]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
        </AuthProvider>
   
  </React.StrictMode>
);

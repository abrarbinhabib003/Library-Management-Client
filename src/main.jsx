import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import AllBooks from "./pages/AllBooks";
import UpdateBook from "./pages/UpdateBook";
import BookDetails from "./components/BookDetails";
import AddBook from "./pages/AddBook";
import BorrowedBooks from "./pages/BorrowedBooks";
import Categories from "./components/Categories";
import BookCategories from "./components/BookCategories";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { 
        path: "/all-books", 
        element: <ProtectedRoute><AllBooks /></ProtectedRoute> 
      },
      { path: "update-book/:bookId", element: <UpdateBook /> },
      { path: "books/:bookId", element: <BookDetails /> },
      { 
        path: "add-book", 
        element: <ProtectedRoute><AddBook /></ProtectedRoute> 
      },
      { 
        path: "borrowed-books", 
        element: <ProtectedRoute><BorrowedBooks /></ProtectedRoute> 
      },
      { path: "categories", element: <Categories /> },
      { path: "categories/:category", element: <BookCategories /> },
      { path: "*", element: <ErrorPage /> }, 
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Context for managing user authentication

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Assuming AuthContext provides user details and a logout function

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Website Name/Logo */}
        <Link to="/" className="text-2xl font-bold">
          BookHaven
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrowed-books"
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }
          >
            Borrowed Books
          </NavLink>
        </div>

        {/* Conditional Buttons */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* User Profile */}
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="absolute left-0 mt-2 hidden bg-gray-700 text-white text-sm rounded px-4 py-2 group-hover:block">
                  {user.displayName}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

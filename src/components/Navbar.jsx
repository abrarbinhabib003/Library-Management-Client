import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load theme on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-base-100 text-base-content shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookHaven
        </Link>

        <button
          onClick={toggleMenu}
          className="lg:hidden text-current focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            All Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrowed-books"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            Borrowed Books
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {/* 🔘 Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline normal-case"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <span className="absolute bottom-0 left-0 right-0 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-base-200 py-4">
          <div className="flex flex-col items-start px-4 space-y-2">
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

            {/* 🔘 Dark Mode Toggle on Mobile */}
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline mt-4"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            <div className="mt-4">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 block text-center text-white mb-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 block text-center text-white"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-2">
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <span>{user.displayName}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 block text-center text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

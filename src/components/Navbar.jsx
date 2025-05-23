import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

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
    <nav className="bg-base-100 text-base-content shadow-md sticky top-0 z-50">
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

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
              }
            >
              Dashboard
            </NavLink>
          )}
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
                className="btn-outline px-4 py-2 rounded "
              >
                Log in
              </Link>
              <Link
                to="/register"
                className=" btn-outline"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Profile Picture and Username Link */}
              <div className="flex items-center space-x-2">
                <NavLink to="/dashboard" className="flex items-center space-x-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  <span className="text-sm font-semibold">
                    {user.displayName}
                  </span>
                </NavLink>
              </div>
              <button
                onClick={logout}
                className="btn-outline text-black"
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
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                }
              >
                Dashboard
              </NavLink>
            )}

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
                    className="btn-outline block text-center mb-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary btn-outline block text-center text-black"
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
                    className="btn-outline block text-center text-black"
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

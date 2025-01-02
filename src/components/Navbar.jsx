import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookHaven
        </Link>

   
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
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


        <div className="hidden lg:flex items-center space-x-4">
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
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <span className="absolute bottom-0 left-0 right-0 px-2 py-1 text-lg text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {user.displayName}
                </span>
              </div>
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


      {isMenuOpen && (
        <div className="lg:hidden bg-gray-700 py-4">
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

 
            <div className="mt-4">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 block text-center mb-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 block text-center"
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
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 block text-center"
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

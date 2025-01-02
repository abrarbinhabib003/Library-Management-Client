import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { Fade, Slide } from 'react-awesome-reveal';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-10 px-4 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <Fade bottom>
          <div>
            <h2 className="text-3xl font-extrabold mb-4 text-white">
             BookHaven
            </h2>
            <p className="text-sm leading-relaxed text-white">
              Welcome to our BookHaven. Manage and browse books, track borrowed items, and much more, all in one place!
            </p>
            <p className="text-xs mt-4 text-white">&copy; 2024 BookHaven. All rights reserved.</p>
          </div>
        </Fade>

        <Slide left>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/all-books"
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
                >
                  All Books
                </a>
              </li>
              <li>
                <a
                  href="/add-book"
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
                >
                  Add Book
                </a>
              </li>
              <li>
                <a
                  href="/borrowed-books"
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
                >
                  Borrowed Books
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </Slide>

        <Fade bottom>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <MdPhone className="mr-2 text-xl text-white" />
                <a
                  href="tel:+123456789"
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2 text-xl text-white" />
                <a
                  href="mailto:support@bookhaven.com"
                  className="text-white hover:text-gray-400 transition duration-300 ease-in-out"
                >
                  support@bookhaven.com
                </a>
              </li>
            </ul>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-xl text-white hover:text-gray-400 transition duration-300 ease-in-out"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-xl text-white hover:text-gray-400 transition duration-300 ease-in-out"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-xl text-white hover:text-gray-400 transition duration-300 ease-in-out"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-xl text-white hover:text-gray-400 transition duration-300 ease-in-out"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </Fade>
      </div>

      <div className="text-center text-sm mt-8 border-t border-gray-300 pt-4 text-gray-500">
        Designed with passion by the BookHaven Team
      </div>
    </footer>
  );
};

export default Footer;

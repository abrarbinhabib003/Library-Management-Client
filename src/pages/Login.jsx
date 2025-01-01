import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from '../firebase/firebase.config';
import { FaGoogle } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from "react-tooltip";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: error.message.includes('user-not-found')
          ? 'No user found with this email.'
          : error.message.includes('wrong-password')
          ? 'Incorrect password. Please try again.'
          : error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        icon: 'success',
        title: 'Google Login Successful!',
        text: 'Welcome back!',
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed!',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4 animate__animated animate__fadeIn">
      <div className="bg-white shadow-lg rounded-lg w-full sm:w-96 p-6 my-12">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Login to Your Account
        </h1>
        <p className="text-center text-red-600 mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Please enter your email and password to access your account.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-lime-400 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          data-tip="Login with Google"
          className="w-full bg-orange-600 text-black py-2 mt-4 rounded-md hover:bg-red-600 focus:outline-none"
        >
          <div className="flex items-center justify-center space-x-2">
            <FaGoogle className="text-lg" />
            <span className='font-semibold'>Login with Google</span>
          </div>
        </button>
        <ReactTooltip />

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 font-semibold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

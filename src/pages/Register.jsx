import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from '../firebase/firebase.config';
import { FaGoogle } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password!',
        text: 'Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome aboard!',
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        icon: 'success',
        title: 'Google Registration Successful!',
        text: 'Welcome aboard!',
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google Registration Failed!',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full sm:w-96 p-6 my-12">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Register Your Account
        </h1>
        <p className="text-center text-red-600 mb-6">
          Please enter your details to create an account.
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            className="w-full btn-outline border-2 py-2 rounded-md  focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full btn-outline text-black py-2 mt-4 rounded-md border-2 focus:outline-none"
        >
          <div className="flex items-center justify-center space-x-2">
            <FaGoogle className="text-lg" />
            <span className="font-semibold">Register with Google</span>
          </div>
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

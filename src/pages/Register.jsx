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
    setIsLoading(true); 
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        icon: 'success',
        title: 'Google Registration Successful!',
        text: 'Welcome to Library Management!',
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google Registration Failed!',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 my-12">
      {isLoading && (
        <div className="absolute z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-blue-500"></div>
            <p className="text-white mt-4">Registering your account... Please wait.</p>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          <Typewriter
            options={{
              strings: ['Welcome to Library Management!', 'Create Your Account'],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          A simple and secure way to access your account. Follow the steps below to register.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg w-full sm:w-96 p-6">
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="photoURL" className="text-sm font-medium text-gray-600">
              Profile Picture (Optional)
            </label>
            <input
              type="url"
              id="photoURL"
              placeholder="Enter a photo URL (Optional)"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-orange-500 animate-bounce">
              Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long.
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <button onClick={handleGoogleRegister} className="btn btn-error w-full mt-4">
          <FaGoogle className="mr-2" />
          Register with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

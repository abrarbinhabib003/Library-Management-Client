import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UpdateProfile from './UpdateProfile';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-base-200 p-5 hidden lg:block">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard/update-profile" className="hover:underline">
              Update Profile
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-5">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.displayName || 'User'}!</h1>
        <UpdateProfile />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;



import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("No user is logged in ❌");
      setLoading(false);
      return;
    }

    try {
      await updateProfile(currentUser, {
        displayName: name,
        photoURL: photoURL,
      });


      setUser({
        ...user,
        displayName: name,
        photoURL: photoURL,
      });

      
      toast.success(
        <div className="flex items-center gap-3">
          <img src={photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
          <span>Profile updated: <strong>{name}</strong> ✅</span>
        </div>
      );

    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-md bg-base-100 p-6 rounded-xl shadow mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Update Your Profile</h2>

      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Photo URL</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default UpdateProfile;

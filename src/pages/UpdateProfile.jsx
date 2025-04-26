
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UpdateProfile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleUpdate = (e) => {
    e.preventDefault();
   
    console.log('Update info:', { name, photoURL });
    alert('Profile update feature is under development 🚀');
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Photo URL</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default UpdateProfile;

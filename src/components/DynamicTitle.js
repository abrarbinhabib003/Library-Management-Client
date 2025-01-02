import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {

    const pageTitles = {
      '/': 'Home - My Library',
      '/login': 'Login - My Library',
      '/register': 'Register - My Library',
      '/all-books': 'All Books - My Library',
      '/update-book': 'Update Book - My Library',
      '/add-book': 'Add Book - My Library',
      '/borrowed-books': 'Borrowed Books - My Library',
      '/categories': 'Categories - My Library',
      '/categories/:category': 'Book Categories - My Library',
    };

 
    document.title = pageTitles[location.pathname] || 'My Library';
  }, [location]);

  return null;
};

export default DynamicTitle;


import { useState, useEffect } from 'react';
import axiosInstance from '../utils/api';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get('/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h1>All Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllBooks;

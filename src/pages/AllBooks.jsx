//faced problem in displaying the books in the all books page for .id instaed of using ._id
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/api';
import { Link } from 'react-router-dom';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get('/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="card bg-base-100 shadow-xl">
            <figure>
           
              <img
                src={book.coverImage || 'https://via.placeholder.com/150'}
                alt={book.title || 'No Title Available'}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title || 'No Title Available'}</h2>
              <p><strong>Author:</strong> {book.author || 'No Author Available'}</p>
              <p><strong>Category:</strong> {book.category || 'No Category Available'}</p>
              <p><strong>Rating:</strong> {book.rating || 'No Rating Available'}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/update-book/${book._id}`}
                  className="btn btn-primary"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

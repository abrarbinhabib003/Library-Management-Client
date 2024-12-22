
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/api';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    axiosInstance.get(`/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin text-blue-600"></div>
          <p className="mt-4 text-lg font-semibold">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
        <p className="text-lg text-gray-600 mb-2">
          <strong className="font-semibold">Author:</strong> {book.author}
        </p>
        <p className="text-lg text-gray-600 mb-4">
          <strong className="font-semibold">Published:</strong> {book.publishedDate || 'Not available'}
        </p>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Description</h2>
          <p className="text-lg text-gray-600">
            {book.description || 'No description available'}
          </p>
        </div>

      
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Additional Information</h2>
          <p className="text-lg text-gray-600">Rating: {book.rating || 'Not available'}</p>
      
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link
            to={`/update-book/${id}`}
            className="btn btn-primary"
          >
            Edit Book
          </Link>
          <Link
            to="/all-books"
            className="btn btn-outline"
          >
            Back to All Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

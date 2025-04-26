import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import Modal from 'react-modal';
import { useAuth } from '../context/AuthContext';

const BookCategories = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [currentDate, setCurrentDate] = useState(''); 
  const { user } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setLoading(true); 
      axios
        .get(`https://library-management-backend-beta.vercel.app/api/books?category=${category}`)
        .then((response) => {
          setBooks(response.data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
          setLoading(false); 
        });
    }
  }, [category]);

  const handleDetailsClick = (bookId) => {
    if (!user) {
      setCurrentDate(new Date().toLocaleDateString()); 
      setModalOpen(true); 
      return;
    }
    navigate(`/books/${bookId}`); 
  };

  const handleLoginRedirect = () => {

    setModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold text-center mb-6">
        Books in <span className="text-primary">{category}</span> Category
      </h2>
      {loading ? (
        <p className="text-center text-xl text-gray-600">Loading, please wait...</p>
      ) : books.length > 0 ? (
        <>
          <p className="text-center text-lg text-gray-700 mb-4">
            Found {books.length} {books.length > 1 ? 'books' : 'book'} in this category.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="book-card bg-base-100 shadow-xl rounded-lg p-4 flex flex-col justify-between"
              >
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Category:</strong> {book.category}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Quantity:</strong> {book.quantity}
                  </p>
                  <div className="flex items-center mb-4">
                    <strong className="mr-2">Rating:</strong>
                    <ReactStars
                      count={5}
                      value={book.rating}
                      edit={false}
                      size={20}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleDetailsClick(book._id)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-xl text-gray-600">
          No books available in the <span className="text-primary">{category}</span> category.
        </p>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <h2 className="text-2xl font-semibold mb-4">Please Log In</h2>
        <p className="text-lg mb-4">You must be logged in to view book details.</p>
        <p className="text-md text-gray-700 mb-4">
          <strong>Current Date:</strong> {currentDate}
        </p>
        <button
          onClick={handleLoginRedirect}
          className="btn btn-primary w-full"
        >
          Go to Login
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default BookCategories;

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import Modal from 'react-modal';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  
  // Get the logged-in user from AuthContext
  const { user } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookId) {
      console.error('Book ID is undefined');
      return;
    }
    console.log('Fetching book with ID:', bookId);

    axios
      .get(`http://localhost:5000/api/books/${bookId}`)
      .then((response) => {
        console.log('Book data received:', response.data);
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
      });
  }, [bookId]);

  const handleBorrow = () => {
    console.log('User:', user);
    if (!user) {
      alert('You must be logged in to borrow a book.');
      return;
    }
    setModalOpen(true);
  };

  const handleBorrowSubmit = (e) => {
    e.preventDefault();
    
    console.log('Submitting borrow request:', {
      email: user.email,
      bookId: bookId,
      returnDate: returnDate,
    });

    axios
      .post('http://localhost:5000/api/borrow', {
        email: user.email,
        bookId: bookId,
        returnDate: returnDate,
      })
      .then((response) => {
        console.log('Book borrowed successfully:', response.data);
        alert('Book borrowed successfully!');
        setModalOpen(false);
        navigate('/borrowed-books');
      })
      .catch((error) => {
        console.error('Error borrowing the book:', error.response?.data?.message || error.message);
        alert('Error borrowing the book: ' + (error.response?.data?.message || error.message));
      });
  };

  return (
    <div>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <img src={book.imageLink} alt={book.title} />
          <p>{book.description}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Category:</strong> {book.category}</p>
          <div>
            <strong>Rating:</strong>
            <ReactStars
              count={5}
              value={book.rating || 0}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
          </div>
          <p><strong>Quantity:</strong> {book.quantity}</p>

          <button onClick={handleBorrow} disabled={book.quantity === 0}>
            {book.quantity === 0 ? 'Out of Stock' : 'Borrow'}
          </button>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}

      {/* Modal for Borrow Form */}
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <h2>Borrow Book</h2>
        <form onSubmit={handleBorrowSubmit}>
          <div>
            <label htmlFor="returnDate">Return Date:</label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="userName">Name:</label>
            <input
              type="text"
              id="userName"
              value={user?.displayName || 'Guest'}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="userEmail">Email:</label>
            <input
              type="email"
              id="userEmail"
              value={user?.email || ''}
              readOnly
            />
          </div>
          <button type="submit">Submit Borrow Request</button>
        </form>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default BookDetails;

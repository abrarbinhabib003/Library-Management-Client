import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BorrowedBooks = () => {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (!user?.email) {
        toast.error('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/borrow', {
          params: { email: user.email },
        });

        if (!response.data?.length) {
          toast.info('No borrowed books found.');
          setBorrowedBooks([]);
          setLoading(false);
          return;
        }

        const booksWithDetails = await Promise.all(
          response.data.map(async (borrowedBook) => {
            try {
              const bookResponse = await axios.get(
                `http://localhost:5000/api/books/${borrowedBook.bookId}`
              );
              return { ...borrowedBook, book: bookResponse.data };
            } catch (error) {
              console.error('Error fetching book details:', error);
              return { ...borrowedBook, book: null };
            }
          })
        );

        setBorrowedBooks(booksWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
        toast.error('Failed to fetch borrowed books. Please try again.');
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [user]);

  const returnBook = async (id) => {
    if (!id) {
      toast.error('Invalid book ID. Unable to proceed.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/borrow/${id}`);
      setBorrowedBooks(borrowedBooks.filter((book) => book.bookId !== id));
      toast.success('Book returned successfully!');
    } catch (error) {
      console.error('Error returning the book:', error);
      toast.error('Failed to return the book. Please try again.');
    }
  };

  if (loading) return <div>Loading borrowed books...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Borrowed Books</h1>
      {borrowedBooks.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {borrowedBooks.map((borrowedBook, index) => (
            <div key={borrowedBook._id || index} className="card shadow-lg p-4">
              {borrowedBook.book ? (
                <>
                  <img
                    src={borrowedBook.book.imageLink || '/default-image.jpg'}
                    alt={borrowedBook.book.title || 'Untitled'}
                    className="card-img-top h-48 object-cover rounded-md"
                  />
                  <div className="card-body">
                    <h5 className="card-title font-bold text-lg">
                      {borrowedBook.book.title || 'Untitled'}
                    </h5>
                    <p className="card-text">
                      <strong>Author:</strong> {borrowedBook.book.author || 'Unknown'}
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong> {borrowedBook.book.category || 'Unknown'}
                    </p>
                    <p className="card-text">
                      <strong>Borrowed Date:</strong>{' '}
                      {new Date(borrowedBook.borrowedDate).toLocaleDateString() || 'N/A'}
                    </p>
                    <p className="card-text">
                      <strong>Return Date:</strong>{' '}
                      {new Date(borrowedBook.returnDate).toLocaleDateString() || 'N/A'}
                    </p>
                    <button
                      onClick={() => returnBook(borrowedBook.bookId)}
                      disabled={!borrowedBook.bookId}
                      className="btn btn-primary mt-2"
                    >
                      Return Book
                    </button>
                  </div>
                </>
              ) : (
                <div className="card-body">
                  <p>Book data not available</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No borrowed books found.</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BorrowedBooks;

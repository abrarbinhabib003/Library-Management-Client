import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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
        const response = await axios.get('https://library-management-backend-beta.vercel.app/api/borrow', {
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
                `https://library-management-backend-beta.vercel.app/api/books/${borrowedBook.bookId}`
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

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to return this book?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, return it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://library-management-backend-beta.vercel.app/api/borrow/${id}`);
          setBorrowedBooks(borrowedBooks.filter((book) => book.bookId !== id));
          Swal.fire('Returned!', 'The book has been returned.', 'success');
          toast.success('Book returned successfully!');
        } catch (error) {
          console.error('Error returning the book:', error);
          toast.error('Failed to return the book. Please try again.');
        }
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-2xl font-semibold mb-4">Borrowed Books ({borrowedBooks.length})</h1>
      {borrowedBooks.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {borrowedBooks.map((borrowedBook, index) => (
            <div key={borrowedBook._id || index} className="card shadow-xl p-4 hover:shadow-2xl transition-all">
              {borrowedBook.book ? (
                <>
                  <img
                    src={borrowedBook.book.imageLink || '/default-image.jpg'}
                    alt={borrowedBook.book.title || 'Untitled'}
                    className="card-img-top h-48 object-cover rounded-md"
                  />
                  <div className="card-body">
                    <h5 className="card-title font-bold text-lg text-blue-600">
                      {borrowedBook.book.title || 'Untitled'}
                    </h5>
                    <p className="card-text text-sm">
                      <strong>Author:</strong> {borrowedBook.book.author || 'Unknown'}
                    </p>
                    <p className="card-text text-sm">
                      <strong>Category:</strong> {borrowedBook.book.category || 'Unknown'}
                    </p>
                    <p className="card-text text-sm">
                      <strong>Borrowed Date:</strong>{' '}
                      {new Date(borrowedBook.borrowedDate).toLocaleDateString() || 'N/A'}
                    </p>
                    <p className="card-text text-sm">
                      <strong>Return Date:</strong>{' '}
                      {new Date(borrowedBook.returnDate).toLocaleDateString() || 'N/A'}
                    </p>
                    <button
                      onClick={() => returnBook(borrowedBook.bookId)}
                      disabled={!borrowedBook.bookId}
                      className="btn btn-primary mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                    >
                      Return Book
                    </button>
                  </div>
                </>
              ) : (
                <div className="card-body">
                  <p className="text-gray-500">Book data not available</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl">No borrowed books found.</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BorrowedBooks;

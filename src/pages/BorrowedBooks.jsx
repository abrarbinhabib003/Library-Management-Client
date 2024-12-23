import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/api'; 

const BorrowedBooks = () => {
  const { user } = useAuth(); 
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {

      axiosInstance
        .get('/borrow', { params: { email: user.email } })
        .then((response) => {
          setBorrowedBooks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching borrowed books:', error);
          setLoading(false);
        });
    }
  }, [user]);

  const returnBook = (borrowedBookId) => {
    axiosInstance
      .delete(`/borrow/${borrowedBookId}`)
      .then(() => {
        setBorrowedBooks(borrowedBooks.filter((book) => book._id !== borrowedBookId));
        console.log('Book returned successfully');
      })
      .catch((error) => console.error('Error returning the book:', error));
  };

  if (loading) {
    return <div>Loading borrowed books...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Borrowed Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((borrowedBook) => (
            <div key={borrowedBook._id} className="card shadow-lg">
              <img
                src={borrowedBook.book.coverImage} 
                alt={borrowedBook.book.title}
                className="card-img-top h-48 object-cover"
              />
              <div className="card-body">
                <h5 className="card-title">{borrowedBook.book.title}</h5>
                <p className="card-text">Category: {borrowedBook.book.category}</p>
                <p className="card-text">Borrowed Date: {new Date(borrowedBook.borrowDate).toLocaleDateString()}</p>
                <button
                  onClick={() => returnBook(borrowedBook._id)}
                  className="btn btn-primary mt-2"
                >
                  Return Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No borrowed books found.</p>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;

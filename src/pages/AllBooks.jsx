import { useState, useEffect } from 'react';
import axiosInstance from '../utils/api';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [view, setView] = useState('card');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/books')
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          toast.info('No books available at the moment.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching books:', error);
        toast.error('Error fetching books.');
      });
  }, []);

  const handleFilter = () => {
    if (!showAvailable) {
      const availableBooks = books.filter((book) => book.quantity > 0);
      setFilteredBooks(availableBooks);
      if (availableBooks.length === 0) {
        toast.info('No available books at the moment.');
      }
    } else {
      setFilteredBooks(books);
    }
    setShowAvailable(!showAvailable);
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold mb-4">All Books</h1>

      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={handleFilter}
          className="btn btn-secondary"
        >
          {showAvailable ? 'Show All Books' : 'Show Available Books'}
        </button>

        <select
          value={view}
          onChange={handleViewChange}
          className="select select-bordered"
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {showAvailable && filteredBooks.length === 0 && !loading && (
            <div className="mb-4 p-4 bg-yellow-300 text-black rounded-lg shadow-md animate__animated animate__fadeIn">
              <h2>No available books at the moment.</h2>
            </div>
          )}

          {!showAvailable && filteredBooks.length === 0 && !loading && (
            <div className="mb-4 p-4 bg-yellow-300 text-black rounded-lg shadow-md animate__animated animate__fadeIn">
              <h2>No books available at the moment.</h2>
            </div>
          )}

          {view === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id || book._id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src={book.imageLink || 'https://via.placeholder.com/150'}
                      alt={book.title || 'No Title Available'}
                      className="h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{book.title || 'No Title Available'}</h2>
                    <p><strong>Author:</strong> {book.author || 'No Author Available'}</p>
                    <p><strong>Category:</strong> {book.category || 'No Category Available'}</p>
                    <p><strong>Rating:</strong> {book.rating || 'No Rating Available'}</p>
                    <p><strong>Quantity:</strong> {book.quantity || 0}</p>
                    <div className="card-actions justify-end">
                      <Link
                        to={`/update-book/${book.id || book._id}`}
                        className="btn btn-primary"
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id || book._id}>
                      <td>{book.title || 'No Title Available'}</td>
                      <td>{book.author || 'No Author Available'}</td>
                      <td>{book.category || 'No Category Available'}</td>
                      <td>{book.rating || 'No Rating Available'}</td>
                      <td>{book.quantity || 0}</td>
                      <td>
                        <Link
                          to={`/update-book/${book.id || book._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default AllBooks;

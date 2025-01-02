import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [token, setToken] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    if (user) {
      const auth = getAuth();
      auth.currentUser
        ?.getIdToken()
        .then((idToken) => {
          setToken(idToken);
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
          alert("Error fetching token. Please log in again.");
        });
    }
  }, [user]);

  useEffect(() => {
    if (!bookId) {
      console.error("Book ID is undefined");
      return;
    }

    setLoading(true);
    axios
      .get(`https://library-management-backend-beta.vercel.app/api/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        alert("Error fetching book details.");
        setLoading(false);
      });

   
    if (user) {
      axios
        .get(`https://library-management-backend-beta.vercel.app/api/borrow`, {
          params: { email: user.email },
        })
        .then((response) => {
          setBorrowedBooks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching borrowed books:", error);
        });
    }
  }, [bookId, user]);

  const handleBorrow = () => {
    if (!user) {
      toast.error("You must be logged in to borrow a book.");
      return;
    }
    setModalOpen(true);
  };

  const handleBorrowSubmit = (e) => {
    e.preventDefault();

    if (!user || !token) {
      toast.error("You must be logged in to borrow a book.");
      return;
    }


    if (borrowedBooks.some((borrowedBook) => borrowedBook.bookId === bookId)) {
      Swal.fire({
        title: 'Error!',
        text: 'You have already borrowed this book.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    setLoading(true);
    axios
      .post(
        "https://library-management-backend-beta.vercel.app/api/borrow",
        {
          email: user.email,
          bookId,
          returnDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Book borrowed successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setModalOpen(false);
        navigate("/borrowed-books");
      })
      .catch((error) => {
        console.error("Error borrowing the book:", error);
        toast.error("Error borrowing the book.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div> 
        </div>
      ) : (
        <>
          {book ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md object-cover rounded-lg shadow-md"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-center md:text-left mb-4">
                  {book.title}
                </h2>
                <p className="text-lg mb-4">{book.description}</p>
                <p className="mb-2">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="mb-2">
                  <strong>Category:</strong> {book.category}
                </p>
                <div className="mb-4">
                  <strong>Rating:</strong>
                  <ReactStars
                    count={5}
                    value={book.rating || 0}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <p className="mb-4">
                  <strong>Quantity:</strong> {book.quantity}
                </p>

                <button
                  onClick={handleBorrow}
                  className={`btn btn-primary w-full ${book.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                  disabled={book.quantity === 0}
                >
                  {book.quantity === 0 ? "Out of Stock" : "Borrow"}
                </button>
              </div>
            </div>
          ) : (
            <p>Loading book details...</p>
          )}
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        appElement={document.getElementById("root")}
      >
        <h2 className="text-2xl font-semibold mb-4">Borrow Book</h2>
        <form onSubmit={handleBorrowSubmit} className="space-y-4">
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
              Return Date:
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="userName"
              value={user?.displayName || "Guest"}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="userEmail"
              value={user?.email || ""}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit Borrow Request
          </button>
        </form>
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

export default BookDetails;

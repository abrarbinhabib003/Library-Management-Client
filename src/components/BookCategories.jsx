import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';

const BookCategories = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:5000/api/books?category=${category}`)
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    }
  }, [category]);

  const handleDetailsClick = (bookId) => {
    navigate(`/books/${bookId}`);  // Redirect to the book details page
  };

  return (
    <div>
      <h2>Books in {category} category</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-card"> {/* Use _id instead of id for MongoDB */}
            <img src={book.imageLink} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Quantity:</strong> {book.quantity}</p>
            <div>
              <strong>Rating:</strong>
              <ReactStars 
                count={5}
                value={book.rating} 
                edit={false} 
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <button onClick={() => handleDetailsClick(book._id)}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;

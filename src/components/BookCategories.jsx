import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BookCategories = () => {
  const { category } = useParams(); 
  const [books, setBooks] = useState([]);
  
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

  return (
    <div>
      <h2>Books in {category} category</h2>
      {books.map((book) => (
        <><div key={book.id}>{book.title}</div><div key={book.id}>{book.author}</div><div key={book.id}>{book.description}</div></>
      ))}
    </div>
  );
};

export default BookCategories;


import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/api'; 
import { useParams } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const BookCategories = () => {
    const { categoryId } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/api/books?category=${categoryId}`)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => console.error('Error fetching books:', error));
    }, [categoryId]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
                <div key={book._id} className="p-4 border rounded shadow-lg">
                    <img src={book.imageLink} alt={book.title} className="w-full h-48 object-cover mb-4" />
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-600">Author: {book.author}</p>
                    <p className="text-gray-600">Category: {book.category}</p>
                    <p className="text-gray-600">Quantity: {book.quantity}</p>
                    <Rating
                        count={5}
                        value={book.rating}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                    />
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Details</button>
                </div>
            ))}
        </div>
    );
};

export default BookCategories;

import { useState } from 'react';
import axiosInstance from '../utils/api';
import Swal from 'sweetalert2';  

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imageLink, setImageLink] = useState('');
  const [category, setCategory] = useState('Novel');
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);  

  const handleAddBook = (e) => {
    e.preventDefault();

    if (!title || !author || !description || !imageLink || !category || !rating) {
      Swal.fire({
        title: 'Oops!',
        text: 'All fields are required.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      return;
    }

    const bookData = {
      title,
      author,
      description,
      quantity,
      imageLink,
      category,
      rating,
    };

    const token = localStorage.getItem('token');

    setLoading(true);  

    axiosInstance
      .post('/books/add', bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setQuantity(1);
        setImageLink('');
        setCategory('Novel');
        setRating(1);
        setLoading(false);  

        Swal.fire({
          title: 'Success!',
          text: 'Book added successfully!',
          icon: 'success',
          confirmButtonText: 'Great!'
        });
      })
      .catch((error) => {
        setLoading(false);  
        if (error.response) {
          Swal.fire({
            title: 'Error!',
            text: error.response.data.message || 'Failed to add book.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        } else if (error.request) {
          Swal.fire({
            title: 'Error!',
            text: 'No response from the server.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-base-100 text-base-content rounded-lg shadow-lg relative">
      
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add a New Book</h1>

      <form onSubmit={handleAddBook} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            id="description"
            placeholder="Enter a short description of the book"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full mt-2"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div>
          <label htmlFor="imageLink" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            id="imageLink"
            placeholder="Enter image URL"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-full mt-2"
          >
            <option value="Novel">Novel</option>
            <option value="Thriller">Thriller</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="input input-bordered w-full mt-2"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'loading' : ''}`}  
            disabled={loading}
          >
            {loading ? 'Adding Book...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;

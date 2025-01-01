import { useState } from 'react';
import axiosInstance from '../utils/api'; 

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imageLink, setImageLink] = useState('');
  const [category, setCategory] = useState('Novel');  
  const [rating, setRating] = useState(1);  

  
  const handleAddBook = (e) => {
    e.preventDefault();
  
    if (!title || !author || !description || !imageLink || !category || !rating) {
      alert('All fields are required');
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
  

    console.log('Sending book data:', bookData);
  

    const token = localStorage.getItem('token'); 
    console.log('Authorization token:', token);
  
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
        alert('Book added successfully!');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          });
          alert(`Error: ${error.response.data.message || 'Failed to add book.'}`);
        } else if (error.request) {
          console.error('Error request:', error.request);
          alert('Error: No response from the server.');
        } else {
          console.error('Error message:', error.message);
          alert('Error: Failed to send request.');
        }
      });
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
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


        <div className="mt-4 text-gray-600">
          <p>This is where you would display additional information about the book.</p>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="submit" className="btn btn-primary">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;

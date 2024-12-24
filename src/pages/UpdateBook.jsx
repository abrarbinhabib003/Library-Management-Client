import { useState, useEffect } from 'react';
import axiosInstance from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const [book, setBook] = useState(null);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    axiosInstance.get(`/books/${bookId}`)
      .then((response) => {
        const data = response.data;
        setBook(data);
        setImage(data.coverImage || '');
        setTitle(data.title || '');
        setAuthor(data.author || '');
        setCategory(data.category || 'Novel');
        setRating(data.rating || 1);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error.message);
        setError('Failed to fetch book details. Please try again.');
      });
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedBook = {
      coverImage: image,
      title,
      author,
      category,
      rating,
    };

    axiosInstance.put(`/books/update/${bookId}`, updatedBook)
      .then(() => {
        console.log('Book successfully updated:', updatedBook);
        navigate('/all-books');
      })
      .catch((error) => {
        console.error('Error updating book:', error.message);
        setError('Failed to update book. Please check your input and try again.');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Book</h1>
      {error && <p className="text-red-500">{error}</p>} 
      {book ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">Image</label>
            <input
              type="file"
              accept="image/*"
              className="input input-bordered"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <p className="text-sm text-gray-500">{image ? 'Image Selected' : 'No Image Selected'}</p>
          </div>
          <div className="form-control">
            <label className="label">Book Title</label>
            <input
              type="text"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={title || 'Enter Book Title'}
            />
            {!title && <p className="text-sm text-red-500">Please provide a book title.</p>}
          </div>
          <div className="form-control">
            <label className="label">Author Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={author || 'Enter Author Name'}
            />
            {!author && <p className="text-sm text-red-500">Please provide an author name.</p>}
          </div>
          <div className="form-control">
            <label className="label">Category</label>
            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              className="input input-bordered"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {!rating && <p className="text-sm text-red-500">Please select a rating between 1 and 5.</p>}
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <p className="text-red-500">Book details not found.</p>
      )}
    </div>
  );
};

export default UpdateBook;

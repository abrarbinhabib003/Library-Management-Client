import { useState, useEffect } from 'react';
import axiosInstance from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';  
import Swal from 'sweetalert2';  

const UpdateBook = () => {
  const [book, setBook] = useState(null);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Novel');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/books/${bookId}`);
        const data = response.data;
        setBook(data);
        setImage(data.imageLink || '');
        setTitle(data.title || '');
        setAuthor(data.author || '');
        setCategory(data.category || 'Novel');
        setRating(data.rating || 1);
      } catch (err) {
        console.error('Error fetching book details:', err.message);
        setError('Failed to fetch book details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const updatedBook = {
      imageLink: image,
      title,
      author,
      category,
      rating,
    };

    try {
      setIsLoading(true);
      const response = await axiosInstance.put(`/books/${bookId}`, updatedBook);

      Swal.fire({
        icon: 'success',
        title: 'Book Updated',
        text: 'The book details have been successfully updated.',
      }).then(() => {
        navigate('/all-books'); 
      });
    } catch (err) {
      console.error('Error updating book:', err.message);
      setError(err.response?.data?.message || 'Failed to update the book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 min-h-screen bg-base-100 text-base-content">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Update Book</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label htmlFor="image" className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="author" className="block text-sm font-medium mb-2">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="Novel">Novel</option>
            <option value="Thriller">Thriller</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="rating" className="block text-sm font-medium mb-2">Rating (1-5)</label>
          <ReactStars
            count={5}  
            value={rating}  
            onChange={(newRating) => setRating(newRating)}  
            size={24}  
            activeColor="#ffd700"  
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          {isLoading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;

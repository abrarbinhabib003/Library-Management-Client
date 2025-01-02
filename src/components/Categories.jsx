import { useNavigate } from 'react-router-dom';

const categories = ['Sci-Fi', 'Drama', 'History', 'Novel', 'Thriller'];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="category-card bg-base-100 shadow-xl rounded-lg p-4 flex flex-col items-center text-center"
          >
           
           
           
           
           
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/categories/${category}`)}
            >
              View Books
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

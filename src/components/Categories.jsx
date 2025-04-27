import { useNavigate } from 'react-router-dom';

const categories = ['Sci-Fi', 'Drama', 'History', 'Novel', 'Thriller'];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4  bg-base-100 text-base-content">
      <h1 className="text-center text-3xl font-bold mb-6 ">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="category-card border-2 shadow-xl border-4 rounded-lg p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <div className="mb-4">
       
              <svg className="w-16 h-16 text-gray-700 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <p className="text-gray-600 mb-4">Explore a wide variety of {category} books, handpicked just for you!</p>
            <button
              className="btn btn-primary transition-all duration-300 hover:bg-secondary focus:ring-2 focus:ring-primary"
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

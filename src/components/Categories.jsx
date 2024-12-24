const categories = ['Sci-Fi', 'Drama', 'History', 'Novel', 'Thriller'];

import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();
  return (
    <div className="categories">
      {categories.map((category) => (
        <div key={category} className="category-card">
          <img src={`${category}.jpg`} alt={category} />
          <h3>{category}</h3>
          <button onClick={() => navigate(`/categories/${category}`)}>
            View Books
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
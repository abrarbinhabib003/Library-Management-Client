
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/api'; 
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryClick = (categoryId) => {
      
        navigate(`/books/category/${categoryId}`);
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((category) => (
                <div
                    key={category._id}
                    className="p-4 border rounded shadow-lg cursor-pointer"
                    onClick={() => handleCategoryClick(category._id)}
                >
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Categories;

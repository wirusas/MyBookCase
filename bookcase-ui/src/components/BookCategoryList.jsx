import React, { useState, useEffect } from "react";
import axios from "axios";

// Main base URL
const BASE_URL = "http://localhost:8080";

export const BookCategoryList = ({ selectedCategory, onSelectCategory }) => {
  // State to store book categories
  const [bookCategories, setBookCategories] = useState([]);

  // State for error handling
  const [error, setError] = useState(null);

  // Fetch book categories from API
  useEffect(() => {
    const fetchBookCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookCategories(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookCategories();
  }, []);

  // Handle category selection
  
const handleCategorySelect = (event) => {
  const selectedCategoryId = event.target.value;
  const selectedCategory = bookCategories.find(category => category.id === selectedCategoryId);
  onSelectCategory(selectedCategory ? selectedCategory.bookCategory : ""); // Pass selected category name back to parent component
};


  // Render book category options
  const renderBookCategoryOptions = () => {
    return bookCategories.map(category => (
      <option key={category.id} value={category.id}>{category.bookCategory}</option>
    ));
  };

  // Return component
  return (
    <>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <select value={selectedCategory} onChange={handleCategorySelect}>
        <option value="">Select a category...</option>
        {renderBookCategoryOptions()}
      </select>
    </>
  );
};

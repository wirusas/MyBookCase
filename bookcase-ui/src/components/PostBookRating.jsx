import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const PostBookRating = ({ bookId, onRatingAdded }) => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(
        `${BASE_URL}/api/books/${bookId}/ratings?rating=${rating}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        onRatingAdded(response.data); // Assuming the response contains updated book data
        setRating(0); // Reset the rating after successful submission
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{paddingBottom:".8rem"}}>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          className="main-button"
        />
      </label>
      <button type="submit" className="main-button">Rate</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default PostBookRating;

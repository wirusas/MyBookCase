import React, { useState, useEffect } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';


import "../styles/BookRating.css"; 

const BASE_URL = "http://localhost:8080";

const GetBookRating = ({ bookId }) => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/books/${bookId}/averageRating`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRating(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, [bookId]);

  // Function to generate star icons based on rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = Math.ceil(rating) !== Math.floor(rating);
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fa fa-star-half"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty${i}`} className="fa fa-star-o"></i>);
    }

    return stars;
  };

  return (
    <div className="rating-container">
      {error && <p>Error: {error}</p>}
      <p>Rating: {renderStars()}</p>
    </div>
  );
};

export default GetBookRating;

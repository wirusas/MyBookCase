import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import GetBookRating from "./GetBookRating";
import { Header } from "./Header";
import { Footer } from "./Footer";
import '../styles/SingleBook.css'

const BASE_URL = "http://localhost:8080";

export const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles here
    const userRoles = JSON.parse(localStorage.getItem('userRoles'));
    if (userRoles) {
      setRoles(userRoles);
    }

    // Fetch book details
    axios
      .get(`${BASE_URL}/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, [id]);

  return (
    <>
      <Header/>
      <main className="single-book-card">
        <article className="single-book-container">
          <div>
            <h2>{book.bookName}</h2>
            <p>{book.description}</p>
          </div>
          
          <div>
            <img src={book.imageUrl} alt="image of the book" />
          </div>
          
          <div>
            <p>Category: {book.category}</p>
            <p>Number of Pages: {book.numberOfPages}</p>
            <p>ISBN: {book.ISBN}</p>
            <GetBookRating bookId={book.id}/>
            
            <h2 >Comments:</h2>
            <ul>
              {book.comment && Object.entries(book.comment).length > 0 ? (
                Object.entries(book.comment).map(([user, text], index) => (
                  <li key={index}>
                    <strong>{user}:</strong> {text}
                  </li>
                ))
              ) : (
                <li>No comments available</li>
              )}
            </ul>
            
           
          </div>
        </article>
        <div className="back-button main-button">
            {/* Conditional rendering based on roles */}
            {roles.includes('USER') && <Link to="/userdashboard" >Back to User Dashboard</Link>}
            {roles.includes('ADMIN') && <Link to="/admindashboard" className="back-to-previous-page-link">Back to Admin Dashboard</Link>}
            </div>
      </main>
      
      <Footer/>
    </>
  );
};

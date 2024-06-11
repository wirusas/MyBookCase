import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GetBookRating from "./GetBookRating";import { Header } from "./Header";
import { Footer } from "./Footer";
import '../styles/FavouriteBooks.css'

const BASE_URL = "http://localhost:8080";

export const FavouriteBooks = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/books/myFavouriteBooks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setFavouriteBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favourite books:", error);
      });

    // Check roles and setRoles
    const userRoles = JSON.parse(localStorage.getItem('userRoles'));
    if (userRoles) {
      setRoles(userRoles);
    }
  }, []);

  return (
    <>
    <section >
    <Header/>
    <div className="booklist-div">
      {favouriteBooks.map((book) => (
        <div key={book.id} className="single-book-card">
          <Link to={`/singlebook/${book.id}`}>
            <div>
              <h2>{book.bookName}</h2>
              <p>{book.description}</p>
            </div>
          </Link>
          <div>
            <img src={book.imageUrl} alt="image of the book" />
          </div>
          <div>
            <p>Category: {book.category}</p>
            <p>Number of Pages: {book.numberOfPages}</p>
            <p>ISBN: {book.ISBN}</p>
            <GetBookRating bookId={book.id}/>
            
            
          </div>
          <Link to="/userdashboard" className="main-button" style={{paddingLeft:"1rem", paddingRight:"1rem"}}>Back to User Dashboard</Link>
        </div>

      ))}
     
    </div>
    
     </section>
    
     <Footer/>
     </>
  );
};

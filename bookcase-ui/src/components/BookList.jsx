import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteBook } from "./DeleteBook";
import { EditBook } from "./EditBook";
import '../styles/BookList.css'
import GetBookRating from "./GetBookRating";
import PostBookRating from "./PostBookRating.jsx";
import PostComment from "./PostComment.jsx";
import { AddToFavorites } from "./AddToFavourite.jsx";
import { RemoveFromFavorites } from "./RemoveFromFavorites.jsx";
import BookCategoryService from "./BookCategoryService.jsx";
import { CreateBook } from "./CreateBook.jsx";
import Logout from "./Logout.jsx";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";


const BASE_URL = "http://localhost:8080";

export const BooksList = () => {
  const [bookList, setBookList] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/books/allBooks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBookList(response.data);
        setFilteredBooks(response.data);
        const uniqueCategories = [...new Set(response.data.map(book => book.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });

    // Check roles and setRoles
    const userRoles = JSON.parse(localStorage.getItem('userRoles'));
    if (userRoles) {
      setRoles(userRoles);
    }
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setFilteredBooks(bookList.filter(book => book.category === category));
    } else {
      setFilteredBooks(bookList);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredBooks(bookList);
    } else {
      setFilteredBooks(bookList.filter(book => book.bookName.toLowerCase().includes(e.target.value.toLowerCase())));
    }
  };

  return (
    <>
    <Header/>
<section className="booklist-section">
    <div className="side-bar">
      <div className="search-by-name-field">
        <input 
          type="text"
          placeholder="Enter book name"
          value={searchTerm}
          onChange={handleSearch}
          maxLength="20ch"
          className="main-button placeholder"
          style={{width:"130px", marginBottom:".8rem"}}
        />
        </div>

        <div className="search-by-select" >
        <select value={selectedCategory} onChange={handleCategoryChange} className="main-button" style={{width:"130px"}}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {roles.includes('ADMIN') && <div className="admin-category-createbook-div"> <BookCategoryService/>
          <CreateBook/></div>
                   
         }
         {roles.includes('USER') && <div className="main-button" style={{width:"130px",  margin:"0 auto", marginTop:".8rem"}}><Link to="/favouritebooks" style={{color:"white"}} >Go to my Favourites</Link></div>}
         <Logout/>
        </div>
         </div>
    <div className="booklist-div">
      
      
        
      
      {filteredBooks.map((book) => (
        <div key={book.id} className="single-book-card">
          <Link to={`/singlebook/${book.id}`}>
            <div>
              <h3>{book.bookName}</h3>
              </div>
          </Link>
          <p>{book.description}</p>
          <div>
            <img src={book.imageUrl} alt="image of the book" />
          </div>
          <div >
            <p>Category: {book.category}</p>
            <p>Number of Pages: {book.numberOfPages}</p>
            <p>ISBN: {book.ISBN}</p>
            <GetBookRating bookId={book.id}/>
            
            <div className="book-delete-edit">
              {roles.includes('ADMIN') && <DeleteBook bookId={book.id} />}
              {roles.includes('ADMIN') && <EditBook bookId={book.id} />}
              
              {roles.includes('USER') && <PostBookRating bookId={book.id}/>}
              {roles.includes('USER') && <PostComment bookId={book.id}/>}
              {roles.includes('USER') && <AddToFavorites bookId={book.id}/>}
              {roles.includes('USER') && <RemoveFromFavorites bookId={book.id}/>}
            </div>
          </div>
          
        </div>
        
      ))}
           
    </div>
    </section>
    <Footer/>
    </>
  );
};

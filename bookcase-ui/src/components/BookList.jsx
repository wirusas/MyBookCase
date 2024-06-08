import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

export const BooksList = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/books/allBooks`, {
        // Uncomment for authorization
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      })
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div>
      <h1>Booklist</h1>
      {bookList.map((book) => (
        <div key={book.id}>
          <Link to={`/singlebook/${book.id}`}>
            <div>
              <h2>{book.description}</h2>
              <p>{book.bookName}</p>
            </div>
          </Link>

          <div>
            <span>Created:</span> {book.createdAt}
          </div>

          <div>
            <p>Category: {book.category}</p>
            <p>Number of Pages: {book.numberOfPages}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

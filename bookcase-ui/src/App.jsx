import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./services/AuthService";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { BooksList } from "./components/BookList";


function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/books" element={<BooksList />} />
          
          {/* /http://localhost:3000 */}
          <Route current path="/" element={<LoginComponent />}></Route>
          {/* /http://localhost:3000/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>
          {/* /http://localhost:3000/login */}
          <Route path="/login" element={<LoginComponent />}></Route>


          {/* /http://localhost:3000/books */}

          <Route
            path="/books"
            element={
              <AuthenticatedRoute>
                <BooksList />
              </AuthenticatedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

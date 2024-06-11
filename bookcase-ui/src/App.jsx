import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./services/AuthService";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { UserDashboard } from "./components/UserDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { SingleBook } from "./components/SingleBook";
import { FavouriteBooks } from "./components/FavouriteBooks";


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
          
        
        <Route path="/favouritebooks" element={<FavouriteBooks />} />
          
          {/* /http://localhost:3000 */}
          <Route current path="/" element={<LoginComponent />}></Route>
          {/* /http://localhost:3000/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>
          {/* /http://localhost:3000/login */}
          <Route path="/login" element={<LoginComponent />}></Route>


          {/* /http://localhost:3000/books */}

          <Route
            path="/userdashboard"
            element={
              <AuthenticatedRoute>
                <UserDashboard/>
              </AuthenticatedRoute>
            }
          ></Route>

<Route
            path="/admindashboard"
            element={
              <AuthenticatedRoute>
                <AdminDashboard/>
              </AuthenticatedRoute>
            }
          ></Route>

<Route
            path="/singlebook/:id"
            element={
              <AuthenticatedRoute>
                <SingleBook/>
              </AuthenticatedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

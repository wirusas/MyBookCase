import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./services/AuthService";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import ProjectsComponent from "./components/ProjectsComponent";
import TaskComponent from "./components/TaskComponent";
import { CreateTask } from "./components/CreateTask";

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
          {/* /http://localhost:3000 */}
          <Route current path="/" element={<LoginComponent />}></Route>
          {/* /http://localhost:3000/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>
          {/* /http://localhost:3000/login */}
          <Route path="/login" element={<LoginComponent />}></Route>
          {/* /http://localhost:3000/projects */}

          {/* /http://localhost:3000/tasks */}
          <Route path="/tasks" element={<TaskComponent />}></Route>

          {/* /http://localhost:3000/tasks/modal */}
          <Route path="/tasks/modal" element={<CreateTask />}></Route>

          <Route
            path="/projects"
            element={
              <AuthenticatedRoute>
                <ProjectsComponent />
              </AuthenticatedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

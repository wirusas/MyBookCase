import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import "../styles/ProjectList.css";
import { SideBar } from "./SideBar";
import { CreateProject } from "./CreateProject";
import { EditProject } from "./EditProject";
import { DeleteProject } from "./DeleteProject";

const BASE_URL = "http://localhost:8080";

export const ProjectsList = () => {
  const [projectList, setProjectList] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/projects/allprojects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const formattedProjects = response.data.map((project) => ({
          ...project,
          createdAt: formatDate(project.createdAt),
        }));
        setProjectList(formattedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const getProgressValue = (state) => {
    switch (state) {
      case "TO DO":
        return 32;
      case "IN PROGRESS":
        return 65;
      case "DONE":
        return 100;
      default:
        return 0;
    }
  };

  const getVariant = (state) => {
    switch (state) {
      case "TO DO":
        return "danger";
      case "IN PROGRESS":
        return "warning";
      case "DONE":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <>
      <div className="create-project">
        <CreateProject />
      </div>
      <section className="sidebar-projects-container">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="project-list">
          <div className="project-cards-container">
            {projectList.map((project) => (
              <div className="project-card-div" key={project.id}>
                <div className="progress-bar-edit-project">
                  <ProgressBar
                    className="progress-bar"
                    now={getProgressValue(project.projectState)}
                    label={project.projectState}
                    variant={getVariant(project.projectState)}
                  />
                  <EditProject projectId={project.id} />
                  <DeleteProject projectId={project.id} />
                </div>

                <Link to={`/tasks/${project.id}`} className="project-link">
                  <div className="project-name-description-container">
                    <h2>{project.description}</h2>
                    <p>{project.projectName}</p>
                  </div>
                </Link>

                <div className="time-stamp">
                  <span>Task:</span> {project.createdAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

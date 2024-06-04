import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../styles/CreateProject.css";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const CreateProject = () => {
  // FORM DATA
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    projectStatus: "",
  });

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // Success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // HANDLE FORM CHANGE
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/projects`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toggleForm(); // Close the modal after successful submission
      setShowSuccessMessage(true); // Show success message
      // Clear form fields after successful submission
      setForm({
        projectName: "",
        description: "",
        projectStatus: "",
      });
      // Hide success message after a delay
      setTimeout(() => {
        window.location.reload(false);
        setShowSuccessMessage(false);
      }, 900);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // TOGGLE FORM VISIBILITY
  const toggleForm = () => {
    setShowModal(!showModal);
  };

  // BUTTON TEXT
  const buttonText = showSuccessMessage
    ? "Project created successfully"
    : "New Project   +";

  // RETURN
  return (
    <>
      {/* Button to toggle form */}
      <Button className="new-project-button" type="button" onClick={toggleForm}>
        {buttonText}
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={toggleForm}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="projectName">
              <Form.Label>* Project Name:</Form.Label>
              <Form.Control
                required
                type="text"
                name="projectName"
                value={form.projectName}
                onChange={handleFormChange}
                maxLength={20}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>* Project Description:</Form.Label>
              <Form.Control
                as="textarea"
                required
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={5}
                style={{ resize: "none" }}
                maxLength={200}
              />
            </Form.Group>
            <Form.Group controlId="projectStatus">
              <Form.Label>* Project Status:</Form.Label>
              <Form.Control
                as="select"
                required
                name="projectStatus"
                value={form.projectStatus}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="TO DO">TO DO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </Form.Control>
            </Form.Group>
            {/* Add space below select field */}
            <div style={{ height: "20px" }}></div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={toggleForm} className="mr-2">
                Cancel
              </Button>
              <Button className="submit-button" type="submit" style={{ marginLeft: "7px" }}>
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal */}
    </>
  );
};

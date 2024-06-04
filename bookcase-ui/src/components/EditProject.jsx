import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import editlogo from "../assets/editlogo.svg";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const EditProject = ({ projectId }) => {
  // FORM DATA
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    projectStatus: "",
  });

  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  // Function to submit form after confirmation
  const confirmFormSubmission = async () => {
    try {
      await axios.put(`${BASE_URL}/api/projects/${projectId}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      // Close the modal after successful submission
      toggleForm();
      // Clear form fields after successful submission
      setForm({
        projectName: "",
        description: "",
        projectStatus: "",
      });
      // Reload the page to reflect changes
      window.location.reload(false);
    } catch (error) {
      console.error("Error updating project:", error);
      // Handle error, show error message, etc.
    }
  };

  // TOGGLE FORM VISIBILITY
  const toggleForm = () => {
    setShowModal(!showModal);
  };

  // RETURN
  return (
    <>
      {/* Modal */}
      <Modal show={showModal} onHide={toggleForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label style={{ marginBottom: "7px" }}>* Project Name:</label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={form.projectName}
                onChange={handleFormChange}
                maxLength={20}
              />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "7px" }}>
                * Project Description
              </label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={5}
                style={{ resize: "none" }}
                maxLength={200}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label style={{ marginBottom: "7px" }}>* Project Status:</label>
              <select
                className="form-control"
                required
                name="projectStatus"
                value={form.projectStatus}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="TO DO">TO DO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={toggleForm} className="mr-2">
                Close
              </Button>
              <Button
                className="submit-button edit-project-button"
                type="submit"
                style={{ marginLeft: "7px" }}
              >
                Edit Project
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Button
        variant="link"
        onClick={toggleForm}
        style={{ marginTop: "-12px" }}
      >
        <img src={editlogo} alt="Edit Project" />
      </Button>

      {/* Confirmation modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit the changes?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="submit-button" onClick={confirmFormSubmission}>
            Yes
          </Button>
          <Button
            className="cancel-button"
            onClick={() => setShowConfirmModal(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

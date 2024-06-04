import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import deletelogo from "../assets/deletelogo.svg";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const DeleteProject = ({ projectId }) => {
  // manage modals
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  // show the confirmation modal
  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  // delete project
  const deleteProject = async () => {
    try {
      // Send DELETE request to the server to delete the project by ID
      await axios.delete(`${BASE_URL}/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Close the confirmation modal
      setShowConfirmModal(false);
      // Reload the page
      window.location.reload(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // unauthorized message modal
        setShowUnauthorizedModal(true);
      } else {
        console.error("Error deleting project:", error);
      }
    }
  };

  // RETURN
  return (
    <>
      <img src={deletelogo} alt="Delete Project" onClick={handleDeleteClick} />

      {/* Confirmation modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this project?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Unauthorized message modal */}
      <Modal show={showUnauthorizedModal} onHide={() => setShowUnauthorizedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are not authorized to delete this project. Please contact the system administrator.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUnauthorizedModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

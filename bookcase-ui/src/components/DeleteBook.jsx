import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../styles/Buttons.css'

const BASE_URL = "http://localhost:8080";

export const DeleteBook = ({ bookId }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const deleteBook = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowConfirmModal(false); // Close the confirmation modal
      window.location.reload(false); // Reload the page
    } catch (error) {
      setShowConfirmModal(false); // Close the confirmation modal even on error
      if (error.response && error.response.status === 403) {
        setShowUnauthorizedModal(true);
      } else {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <>
      <button className="main-button" onClick={handleDeleteClick} style={{marginRight:".5rem"}}>
        Delete
      </button>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this book?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteBook}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUnauthorizedModal} onHide={() => setShowUnauthorizedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are not authorized to delete this book. Please contact the system administrator.</p>
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

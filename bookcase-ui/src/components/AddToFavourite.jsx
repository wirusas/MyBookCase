import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const BASE_URL = "http://localhost:8080";

export const AddToFavorites = ({ bookId }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  const handleAddToFavoritesClick = () => {
    setShowConfirmModal(true);
  };

  const addToFavorites = async () => {
    try {
      await axios.post(`${BASE_URL}/api/books/${bookId}/favourite`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowConfirmModal(false); // Close the confirmation modal
      // Handle success, maybe show a success message
    } catch (error) {
      setShowConfirmModal(false); // Close the confirmation modal even on error
      if (error.response && error.response.status === 403) {
        setShowUnauthorizedModal(true);
      } else {
        console.error("Error adding book to favorites:", error);
      }
    }
  };

  return (
    <>
      <button onClick={handleAddToFavoritesClick} className="main-button">
        Add to Favorites
      </button>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Addition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to add this book to your favorites?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addToFavorites}>
            Add to Favorites
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUnauthorizedModal} onHide={() => setShowUnauthorizedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are not authorized to add this book to favorites. Please contact the system administrator.</p>
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

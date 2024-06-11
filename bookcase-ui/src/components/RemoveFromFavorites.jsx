import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const BASE_URL = "http://localhost:8080";

export const RemoveFromFavorites = ({ bookId }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  const handleRemoveFromFavoritesClick = () => {
    setShowConfirmModal(true);
  };

  const removeFromFavorites = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/books/${bookId}/favourite`, {
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
        console.error("Error removing book from favorites:", error);
      }
    }
  };

  return (
    <>
      <button onClick={handleRemoveFromFavoritesClick} className="main-button" style={{marginTop:".8rem"}}>
        Remove from Favorites
      </button>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this book from your favorites?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={removeFromFavorites}>
            Remove from Favorites
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUnauthorizedModal} onHide={() => setShowUnauthorizedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are not authorized to remove this book from favorites. Please contact the system administrator.</p>
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

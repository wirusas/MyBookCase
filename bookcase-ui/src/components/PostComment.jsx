import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const BASE_URL = "http://localhost:8080";

const PostComment = ({ bookId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/books/${bookId}/comments?comment=${comment}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onCommentAdded(response.data);
      setComment("");
      setShowModal(false); // Close the modal after successful submission
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button variant="primary" onClick={toggleModal} className="main-button" style={{marginRight:".5rem"}}>
        Comment
      </button>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="comment">
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={handleCommentChange}
                placeholder="Enter your comment"
              />
            </Form.Group >
            {error && <p className="text-danger">{error}</p>}
            <Button variant="secondary" onClick={toggleModal} className="mr-2" style={{marginTop:".8rem"}}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={toggleModal} style={{marginTop:".8rem", marginLeft:".8rem"}}>
              Post Comment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostComment;

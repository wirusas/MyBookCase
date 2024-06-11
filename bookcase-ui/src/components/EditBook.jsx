import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const BASE_URL = "http://localhost:8080";

export const EditBook = ({ bookId }) => {
  const [form, setForm] = useState({
    bookName: "",
    description: "",
    ISBN: "",
    imageUrl: "",
    numberOfPages: "",
    category: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [bookCategories, setBookCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (bookId) { // Ensure bookId is present before fetching details
          const response = await axios.get(`${BASE_URL}/api/books/${bookId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const bookData = response.data;
          setForm({
            bookName: bookData.bookName,
            description: bookData.description,
            ISBN: bookData.ISBN,
            imageUrl: bookData.imageUrl,
            numberOfPages: bookData.numberOfPages,
            category: bookData.category,
          });
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchBookCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookCategories(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookCategories();
    fetchBookDetails(); // Ensure this runs only if bookId is present
  }, [bookId]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/api/books/${bookId}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toggleForm();
      window.location.reload(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const toggleForm = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button className="main-button" onClick={toggleForm}>
        Edit Book
      </button>

      <Modal show={showModal} onHide={toggleForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="bookName">
              <Form.Label>Book Name:</Form.Label>
              <Form.Control
                type="text"
                name="bookName"
                value={form.bookName}
                onChange={handleFormChange}
                maxLength={30}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Book Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={6}
                maxLength={500}
              />
            </Form.Group>
            <Form.Group controlId="ISBN">
              <Form.Label>ISBN:</Form.Label>
              <Form.Control
                type="text"
                name="ISBN"
                value={form.ISBN}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="imageUrl">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="numberOfPages">
              <Form.Label>Number of Pages:</Form.Label>
              <Form.Control
                type="text"
                name="numberOfPages"
                value={form.numberOfPages}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={form.category}
                onChange={handleFormChange}
              >
                <option value="">Select a category...</option>
                {bookCategories.map((category) => (
                  <option key={category.id} value={category.bookCategory}>
                    {category.bookCategory}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={toggleForm} className="mr-2">
                Close
              </Button>
              <Button type="submit" className="submit-button">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

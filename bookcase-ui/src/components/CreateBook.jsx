import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const CreateBook = () => {
  // FORM DATA
  const [form, setForm] = useState({
    bookName: "",
    description: "",
    ISBN: "",
    imageUrl: "",
    numberOfPages: "",
    category: "", 
  });

  // State to store book categories
  const [bookCategories, setBookCategories] = useState([]);

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // Success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // State for error handling
  const [error, setError] = useState(null);

  // FETCH BOOK CATEGORIES
  useEffect(() => {
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
  }, []);

  // HANDLE FORM CHANGE
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // HANDLE CATEGORY SELECTION
  const handleCategorySelection = (categoryName) => {
    setForm((prevForm) => ({
      ...prevForm,
      category: categoryName,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/books`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toggleForm(); // Close the modal after successful submission
      setShowSuccessMessage(true); // Show success message
      // Clear form fields after successful submission
      setForm({
        bookName: "",
        description: "",
        ISBN: "",
        imageUrl: "",
        numberOfPages: "",
        category: "", // Clear category field too
      });
      // Hide success message after a delay
      setTimeout(() => {
        window.location.reload(false);
        setShowSuccessMessage(false);
      }, 900);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  // TOGGLE FORM VISIBILITY
  const toggleForm = () => {
    setShowModal(!showModal);
  };

  // BUTTON TEXT
  const buttonText = showSuccessMessage ? "Book created successfully" : "Create Book";

  // RETURN
  return (
    <>
      {/* Button to toggle form */}
      <button className="main-button" style={{width:"130px"}} type="button" onClick={toggleForm}>
        {buttonText}
      </button>

      {/* Modal */}
      <Modal show={showModal} onHide={toggleForm}>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="bookName">
              <Form.Label>Book Name:</Form.Label>
              <Form.Control
                placeholder="Book Name"
                required
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
                placeholder="Book Description"
                as="textarea"
                required
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={6}
                style={{ resize: "none" }}
                maxLength={500}
              />
            </Form.Group>
            <Form.Group controlId="ISBN">
              <Form.Label>ISBN:</Form.Label>
              <Form.Control
                placeholder="ISBN"
                required
                type="text"
                name="ISBN"
                value={form.ISBN}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="imageUrl">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control
                placeholder="Image URL"
                required
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="numberOfPages">
              <Form.Label>Number of Pages:</Form.Label>
              <Form.Control
                placeholder="Number of Pages"
                required
                type="text"
                name="numberOfPages"
                value={form.numberOfPages}
                onChange={handleFormChange}
              />
            </Form.Group>
            {/* Render book category options */}
            <Form.Group controlId="category">
              <Form.Label>Category:  </Form.Label>
              <select  className="main-button" style={{padding:".3rem", margin:".8rem"}}
                value={form.category}
                onChange={(e) => handleCategorySelection(e.target.value)}
              >
                <option value="" >Select a category...</option>
                {bookCategories.map(category => (
                  
                  <option key={category.id} value={category.bookCategory}>
  {category.bookCategory}
</option>
))}
              </select>
            </Form.Group>
            <div style={{ height: "20px" }}></div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={toggleForm} className="mr-2">
                Close
              </Button>
              <Button className="submit-button" type="submit" style={{ marginLeft: "5px" }}>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../styles/BookCategoryService.css";

// Main base URL
const BASE_URL = "http://localhost:8080";

const BookCategoryService = () => {
  // FORM DATA
  const [form, setForm] = useState({
    bookCategory: "",
    id: ""
  });

  // Existing categories
  const [categories, setCategories] = useState([]);

  // Selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // LIST AND MODAL VISIBILITY STATE
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch existing categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorMessage("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  // HANDLE CATEGORY SELECTION
  const handleCategorySelect = (action) => {
    setSelectedCategory(action);
    setForm({ bookCategory: "", id: "" }); // Reset form on new selection
    setShowModal(true); // Show modal when an action is selected
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let response;
      if (selectedCategory === "create") {
        response = await axios.post(`${BASE_URL}/api/categories`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if (selectedCategory === "edit") {
        response = await axios.put(
          `${BASE_URL}/api/categories/${form.id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else if (selectedCategory === "delete") {
        response = await axios.delete(
          `${BASE_URL}/api/categories/${form.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setShowSuccessMessage(true); // Show success message
      // Clear form fields after successful submission
      setForm({
        bookCategory: "",
        id: ""
      });
      // Hide success message after a delay
      setTimeout(() => {
        window.location.reload(false);
        setShowSuccessMessage(false);
      }, 900);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to perform operation");
    }
  };

  // TOGGLE LIST VISIBILITY
  const toggleList = () => {
    setShowList(!showList);
    setErrorMessage("");
  };

  // TOGGLE MODAL VISIBILITY
  const toggleModal = () => {
    setShowModal(!showModal);
    setErrorMessage("");
  };

  return (
    <>
      {/* Button to toggle list */}
      <button type="button" onClick={toggleList}className="main-button">
        Category service
      </button>

      {/* Unordered List for actions */}
      {showList && (
        <ul className="action-list" >
          <li onClick={() => handleCategorySelect("create")}>Create</li >
          <li onClick={() => handleCategorySelect("edit")}>Edit </li>
          <li onClick={() => handleCategorySelect("delete")}>Delete</li>
        </ul>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {(selectedCategory === "edit" || selectedCategory === "delete") && (
              <Form.Group controlId="category">
                <Form.Label>Category:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                  value={form.id}
                >
                  <option value="">Select a category...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.bookCategory}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            {selectedCategory !== "delete" && (
              <Form.Group controlId="bookCategory">
                <Form.Label>Book Category:</Form.Label>
                <Form.Control
                  placeholder="Book Category"
                  required
                  type="text"
                  name="bookCategory"
                  value={form.bookCategory}
                  onChange={(e) =>
                    setForm({ ...form, bookCategory: e.target.value })
                  }
                  maxLength={30}
                />
              </Form.Group>
            )}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {showSuccessMessage && (
              <p style={{ color: "green" }}>Operation successful</p>
            )}
            <div style={{ height: "20px" }}></div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={toggleModal} className="mr-2">
                Close
              </Button>
              <Button
                className="submit-button"
                type="submit"
                style={{ marginLeft: "7px" }}
              >
                {selectedCategory === "delete" ? "Delete" : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookCategoryService;

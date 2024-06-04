import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import personplus from "../assets/person-plus.svg";

export const CreateTask = () => {
  const [formTask, setForTask] = useState({
    id: 1,
    title: " ",
    subtitle: " ",
    status: " ",
    priority: "",
    link1: "Link 1",
    link2: "Link 2",
  });

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body
          className="rounded"
          style={{
            borderStyle: "solid",
            borderColor: "#5227cce0",
            borderWidth: "4px",
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(119, 73, 248, 0.19))  ",
          }}
        >
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                style={{
                  width: "300px",
                  height: "38px",
                  borderStyle: "solid",
                  borderColor: "#5227cce0",
                  borderWidth: "2px",
                }}
                type="text"
                placeholder="Task Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                style={{
                  width: "700px",
                  height: "114px",
                  borderStyle: "solid",
                  borderColor: "#5227cce0",
                  borderWidth: "2px",
                }}
                placeholder="Task Description"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                style={{
                  width: "300px",
                  height: "38px",
                  borderStyle: "solid",
                  borderColor: "#5227cce0",
                  borderWidth: "2px",
                }}
                type="text"
                placeholder="Priority"
                autoFocus
              />
            </Form.Group>
          </Form>

          <Modal.Footer>
            <Button
              style={{
                width: "90px",
                height: "38px",
                border: "none",
                backgroundColor: "#dc3535c2",
              }}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              style={{
                width: "90px",
                height: "38px",
                border: "none",
                backgroundColor: "#5227cce0",
              }}
              onClick={handleClose}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            style={{
              width: "90px",
              height: "38px",
              border: "none",
              backgroundColor: "#dc3535c2",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{
              width: "90px",
              height: "38px",
              border: "none",
              backgroundColor: "#5227cce0",
            }}
            onClick={handleClose}
          >
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import { Button } from "react-bootstrap";
import carddate from "../assets/card-date.svg";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    subtitle: "1 subtask",
    status: "todo",
    priority: 2,
    link1: "Link 1",
    link2: "Link 2",
  },
  {
    id: 2,
    title: "Task 2",
    subtitle: "2 subtask",
    status: "todo",
    priority: 1,
    link1: "Link 1",
    link2: "Link 2",
  },
  {
    id: 3,
    title: "Task 3",
    subtitle: "3 subtask",
    status: "in progress",
    priority: 2,
    link1: "Link 1",
    link2: "Link 2",
  },
  {
    id: 4,
    title: "Task 4",
    subtitle: "4 subtask",
    status: "done",
    priority: 3,
    link1: "Link 1",
    link2: "Link 2",
  },
  {
    id: 5,
    title: "Task 5",
    subtitle: "5 subtask",
    status: "done",
    priority: 2,
    link1: "Link 1",
    link2: "Link 2",
  },
  {
    id: 6,
    title: "Task 6",
    subtitle: "6 subtask",
    status: "done",
    priority: 5,
    link1: "Link 1",
    link2: "Link 2",
  },
];

export const TaskDesktop = () => {
  return (
    <div
      className="column-div"
      style={{
        // border: "2px solid red",
        width: "1100px",
        height: "735px",
        marginLeft: "auto",
        marginRight: "30px",
        marginTop: "15px",
        marginBottom: "15px",
      }}
    >
      <Container>
        <Row>
          <Col
            style={{
              width: "350px",
              height: "735px",
              // border: "2px solid red",
              backgroundColor: "#f473401a",
            }}
            className="rounded"
          >
            <h3 style={{ textAlign: "left" }}>To Do</h3>

            {initialTasks
              .filter((task) => task.status === "todo")
              .sort((a, b) => b.priority - a.priority)
              .map((task) => (
                <Card
                  key={task.id}
                  style={{
                    width: "330px",
                    height: "220px",
                    border: "4px solid #F47340",
                    backgroundColor: "white",
                    marginBottom: "15px",
                  }}
                  className="card-todo rounded"
                  bsPrefix
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "left",
                        textDecoration: "underline",
                        marginLeft: "20px",
                      }}
                    >
                      <Row>
                        <Col className="col-8">{task.title}</Col>
                        <Col className="col-4">
                          <img style={{ marginLeft: "50px" }} src={carddate} />
                        </Col>
                      </Row>
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                      <p>Task priority: {task.priority}</p>
                    </Card.Subtitle>
                    <Card.Text
                      style={{
                        borderTop: "2px solid #F47340",
                        borderBottom: "2px solid #F47340",
                        width: "325px",
                        height: "105px",
                      }}
                    >
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "10px ",
                        gap: "8px",
                      }}
                    >
                      <Button
                        style={{
                          width: "54px",
                          height: "25px",
                          fontSize: "10px",
                          lineHeight: "16px",
                          fontFamily: "Inter",
                          textAlign: "left",
                          color: "#6610F2",
                          backgroundColor: "#EBE5FC",
                          paddingBottom: "20px",
                          border: "none",
                        }}
                      >
                        Change
                      </Button>
                      <Button
                        style={{
                          width: "54px",
                          height: "25px",
                          fontSize: "10px",
                          lineHeight: "16px",
                          fontFamily: "Inter",
                          textAlign: "left",
                          color: "#842029",
                          backgroundColor: "#F8D7DA",
                          paddingBottom: "20px",
                          border: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Col>

          <Col
            style={{
              width: "350px",
              height: "735px",
              //   border: "2px solid red",
              backgroundColor: "#ffba091a",
              marginLeft: "20px",
            }}
            className="rounded"
          >
            <h3 style={{ textAlign: "left" }}>In Progress</h3>
            {initialTasks
              .filter((task) => task.status === "in progress")
              .sort((a, b) => b.priority - a.priority)
              .map((task) => (
                <Card
                  key={task.id}
                  style={{
                    width: "330px",
                    height: "220px",
                    border: "4px solid #FFC107",
                    backgroundColor: "white",
                    marginBottom: "15px",
                  }}
                  className="card-inprograss rounded"
                  bsPrefix
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "left",
                        textDecoration: "underline",
                        marginLeft: "20px",
                      }}
                    >
                      <Row>
                        <Col className="col-8">{task.title}</Col>
                        <Col className="col-4">
                          <img style={{ marginLeft: "50px" }} src={carddate} />
                        </Col>
                      </Row>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p>Task priority: {task.priority}</p>
                    </Card.Subtitle>
                    <Card.Text
                      style={{
                        borderTop: "2px solid #FFC107",
                        borderBottom: "2px solid #FFC107",
                        width: "325px",
                        height: "105px",
                      }}
                    >
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "10px ",
                        gap: "8px",
                      }}
                    >
                      <Button
                        style={{
                          width: "54px",
                          height: "25px",
                          fontSize: "10px",
                          lineHeight: "16px",
                          fontFamily: "Inter",
                          textAlign: "left",
                          color: "#6610F2",
                          backgroundColor: "#EBE5FC",
                          paddingBottom: "20px",
                          border: "none",
                        }}
                      >
                        Change
                      </Button>
                      <Button
                        style={{
                          width: "54px",
                          height: "25px",
                          fontSize: "10px",
                          lineHeight: "16px",
                          fontFamily: "Inter",
                          textAlign: "left",
                          color: "#842029",
                          backgroundColor: "#F8D7DA",
                          paddingBottom: "20px",
                          border: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Col>
          <Col
            style={{
              width: "350px",
              height: "735px",
              //   border: "2px solid red",
              backgroundColor: "#20c9971a",
              marginLeft: "20px",
            }}
            className="custom-col rounded"
          >
            <h3 style={{ textAlign: "left" }}>Done</h3>
            {initialTasks
              .filter((task) => task.status === "done")
              .sort((a, b) => b.priority - a.priority)
              .map((task) => (
                <Card
                  key={task.id}
                  style={{
                    width: "330px",
                    height: "220px",
                    border: "4px solid #20C997",
                    backgroundColor: "white",
                    marginBottom: "10px",
                  }}
                  className="card-done rounded"
                  bsPrefix
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "left",
                        textDecoration: "underline",
                        marginLeft: "20px",
                      }}
                    >
                      <Row>
                        <Col className="col-8">{task.title}</Col>
                        <Col className="col-4">
                          <img style={{ marginLeft: "50px" }} src={carddate} />
                        </Col>
                      </Row>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p>Task priority: {task.priority}</p>
                    </Card.Subtitle>
                    <Card.Text
                      style={{
                        borderTop: "2px solid #20C997",
                        borderBottom: "2px solid #20C997",
                        width: "325px",
                        height: "105px",
                      }}
                    >
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "10px ",
                        gap: "8px",
                      }}
                    >
                      <Button
                        style={{
                          width: "54px",
                          height: "25px",
                          fontSize: "10px",
                          lineHeight: "16px",
                          fontFamily: "Inter",
                          textAlign: "left",
                          color: "#6610F2",
                          backgroundColor: "#EBE5FC",
                          paddingBottom: "20px",
                          border: "none",
                        }}
                      >
                        Change
                      </Button>
                      <Button
                        style={{
                          width: "54px",
                          height: "25px",
                          fontSize: "10px",
                          lineHeight: "16px",
                          fontFamily: "Inter",
                          textAlign: "left",
                          color: "#842029",
                          backgroundColor: "#F8D7DA",
                          paddingBottom: "20px",
                          border: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

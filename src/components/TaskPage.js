import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/TaskPage.css";
import { useParams, useNavigate } from "react-router-dom";
import taskdetailimage from "../media/task_details.jpeg";
import projectdetailimage from "../media/project_details.jpg";
import clientdetailimage from "../media/client_details.jpg";

const TaskPage = () => {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [task, setTask] = useState({});
  const [project, setProject] = useState({});
  const [client, setClient] = useState({});
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!taskId || isNaN(taskId)) {
      console.error("Invalid task ID");
      return;
    }

    const fetchTaskDetails = async () => {
      try {
        const taskResponse = await fetch(
          `http://localhost:8080/api/tasks/${taskId}`
        );
        if (taskResponse.ok) {
          const taskData = await taskResponse.json();
          setTask(taskData);

          const projectResponse = await fetch(
            `http://localhost:8080/api/projects/${taskData.project.projectId}`
          );
          if (projectResponse.ok) {
            const projectData = await projectResponse.json();
            setProject(projectData);

            const clientResponse = await fetch(
              `http://localhost:8080/api/clients/${projectData.client.clientId}`
            );
            if (clientResponse.ok) {
              const clientData = await clientResponse.json();
              setClient(clientData);
            } else {
              console.error("Failed to fetch client data");
            }
          } else {
            console.error("Failed to fetch project data");
          }
        } else {
          console.error("Failed to fetch task data");
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  return (
    <div className="task-page">
      <Container className="task-container">
        <Row className="task-row">
          <Col lg={4} md={6} sm={12} className="task-col">
            <Card className="task-card">
              <Card.Img variant="top" src={taskdetailimage} />
              <Card.Body className="task-card-body">
                <Card.Title className="task-card-title">
                  Task Details
                </Card.Title>
                <Card.Text className="task-card-text">
                  Explore detailed task profiles, including essential
                  descriptions, status updates, and additional relevant
                  information, to stay informed and effectively manage your
                  tasks.
                </Card.Text>
                <Button
                  variant="primary"
                  className="task-btn-primary"
                  onClick={() => setShowTaskDetails(true)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12} className="task-col">
            <Card className="task-card">
              <Card.Img variant="top" src={projectdetailimage} />
              <Card.Body className="task-card-body">
                <Card.Title className="task-card-title">
                  Project Details
                </Card.Title>
                <Card.Text className="task-card-text">
                  Explore detailed project profiles, including essential
                  descriptions, important dates, and additional information.
                </Card.Text>
                <Button
                  variant="primary"
                  className="task-btn-primary"
                  onClick={() => setShowProjectDetails(true)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} sm={12} className="task-col">
            <Card className="task-card">
              <Card.Img variant="top" src={clientdetailimage} />
              <Card.Body className="task-card-body">
                <Card.Title className="task-card-title">
                  Client Details
                </Card.Title>
                <Card.Text className="task-card-text">
                  Explore detailed client profiles, including essential contact
                  information and more.
                </Card.Text>
                <Button
                  variant="primary"
                  className="task-btn-primary"
                  onClick={() => setShowClientDetails(true)}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TaskPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/RemoveTask.css";

const RemoveTask = () => {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      const fetchProjectName = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/projects/${projectId}`
          );
          setProjectName(response.data.projectName);
        } catch (error) {
          console.error("Error fetching project name:", error);
          setErrorMessage("Failed to fetch project name.");
        }
      };

      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/tasks/project/${projectId}`
          );
          setTasks(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setErrorMessage("Failed to fetch tasks.");
          setLoading(false);
        }
      };

      fetchProjectName();
      fetchTasks();
    }
  }, [projectId]);

  const handleRemoveTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.taskId !== taskId));
      alert(`Task with ID ${taskId} has been removed.`);
    } catch (error) {
      console.error("Error removing task:", error);
      setErrorMessage("Failed to remove task.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="remove-task-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h3 className="project-name">{projectName}</h3>

      <div className="task-cards">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.taskId} className="task-card">
              <div className="task-detail">
                <h4 className="task-label">Task ID:</h4>
                <p className="task-value">{task.taskId}</p>
              </div>
              <div className="task-detail">
                <h4 className="task-label">Task Name:</h4>
                <p className="task-value">{task.taskName}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveTask(task.taskId)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No tasks available for this project.</p>
        )}
      </div>
    </div>
  );
};

export default RemoveTask;
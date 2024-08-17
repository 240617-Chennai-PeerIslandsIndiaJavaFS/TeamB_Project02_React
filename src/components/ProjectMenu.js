import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "../css/ProjectMenu.css";

const ProjectMenu = () => {
  const { projectId } = useParams();

  return (
    <div className="project-page-container">
      <div className="project-page">
        <div className="project-sidebar">
          <h1>Project Actions</h1>
          <p style={{ color: "#f9f9f9" }}>Choose an action:</p>
          <Link to={`viewprojectclientdetails/${projectId}`}>
            View Project Client Details
          </Link>
          <Link to={`add-team-member-to-project/${projectId}`}>
            Add Team Member To Project
          </Link>
          <Link to={`remove-team-member-from-project/${projectId}`}>
            Remove Team Member From Project
          </Link>
          <Link to={`assign-task-to-team-member/${projectId}`}>
            Assign Task to Team Member
          </Link>
          <Link to={`update-task/${projectId}`}>Update Task</Link>
          <Link to={`delete-task/${projectId}`}>Delete Task</Link>
          <Link to={`view-task-details/${projectId}`}>View Task Details</Link>
          <Link className="btn-primary11" to="/project-manager-projects">
            Go Back
          </Link>
        </div>
        <div className="content" id="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProjectMenu;

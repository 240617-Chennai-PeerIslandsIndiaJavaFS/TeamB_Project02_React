import React from "react";
import "../css/ProjectManagerNavbar.css";
import { Link } from "react-router-dom";

const ProjectManagerNavbar = ({ setActiveSection }) => {
  return (
    <div className="project-manager-navbar-container">
      <nav className="project-manager-navbar">
        <button
          className="project-manager-nav-item"
          onClick={() => setActiveSection("projects")}
        >
          View Projects
        </button>
        <button
          className="project-manager-nav-item"
          onClick={() => setActiveSection("clients")}
        >
          View Clients
        </button>
        <button
          className="project-manager-nav-item"
          onClick={() => setActiveSection("users")}
        >
          View Users
        </button>
        <button
          className="project-manager-nav-item"
          onClick={() => setActiveSection("tasks")}
        >
          View Tasks
        </button>
        <Link className="project-manager-logout-button" to="/login">
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default ProjectManagerNavbar;

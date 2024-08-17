import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import PasswordReset from "./components/PasswordReset";
import AdminPage from "./components/AdminPage";
import Dashboard from "./components/Dashboard";
import ProjectPage from "./components/ProjectPage";
import ProjectMenu from "./components/ProjectMenu";
import ProjectClientDetails from "./components/ProjectClientDetails";
import AddTeamMember from "./components/AddTeamMember";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/admin" element={<AdminPage />}>
          
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/project-manager-projects" element={<ProjectPage />} />
        <Route
          path="/project-details-menu/:projectId"
          element={<ProjectMenu />}
        >
          <Route
            path="viewprojectclientdetails/:projectId"
            element={<ProjectClientDetails />}
          />
          <Route
            path="add-team-member-to-project/:projectId"
            element={<AddTeamMember />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

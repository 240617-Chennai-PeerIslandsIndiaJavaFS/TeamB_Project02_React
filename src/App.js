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
import RemoveTeamMember from "./components/RemoveTeamMember";
import CreateTask from "./components/CreateTask";
import UpdateTask from "./components/UpdateTask";
import ViewTaskDetails from "./components/ViewTaskDetails";
import TeamMemberPage from "./components/TeamMemberPage";
import TaskPage from "./components/TaskPage";
import CreateUser from "./components/CreateUser";
import RemoveTask from "./components/RemoveTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="registration" element={<CreateUser />} />
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
          <Route
            path="remove-team-member-from-project/:projectId"
            element={<RemoveTeamMember />}
          />
          <Route
            path="assign-task-to-team-member/:projectId"
            element={<CreateTask />}
          />
          <Route path="update-task/:projectId" element={<UpdateTask />} />
          <Route path="delete-task/:projectId" element={<RemoveTask />} />
          <Route
            path="view-task-details/:projectId"
            element={<ViewTaskDetails />}
          />
        </Route>
        <Route path="/team-member" element={<TeamMemberPage />} />
        <Route path="/team-member/task/:taskId" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import PasswordReset from "./components/PasswordReset";
import AdminPage from "./components/AdminPage";
import ProjectPage from "./components/ProjectPage";
import ProjectMenu from "./components/ProjectMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/project-manager-projects" element={<ProjectPage />} />
        <Route
          path="/project-details-menu/:projectId"
          element={<ProjectMenu />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

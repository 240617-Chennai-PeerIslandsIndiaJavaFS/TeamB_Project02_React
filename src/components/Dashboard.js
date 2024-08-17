import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    totalProjects: 0,
    totalTeam: 0,
    totalTasks: 0,
    totalUsers: 0,
    totalClients: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projectsRes, usersRes, tasksRes, clientsRes] = await Promise.all(
          [
            fetch("http://localhost:8080/api/projects"),
            fetch("http://localhost:8080/api/admin/users"),
            fetch("http://localhost:8080/api/tasks"),
            fetch("http://localhost:8080/api/clients"),
          ]
        );

        const projects = await projectsRes.json();
        const users = await usersRes.json();
        const tasks = await tasksRes.json();
        const clients = await clientsRes.json();

        const totalTeam = users.filter(
          (user) => user.role !== "ADMIN" && user.role !== "PROJECT_MANAGER"
        ).length;

        setData({
          totalProjects: projects.length,
          totalTeam: totalTeam,
          totalTasks: tasks.length,
          totalUsers: users.length,
          totalClients: clients.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboardcard" style={{ backgroundColor: "#6699cc" }}>
        <h3>Total Projects</h3>
        <p>{data.totalProjects}</p>
      </div>
      <div className="dashboardcard" style={{ backgroundColor: "#6699cc" }}>
        <h3>Total Team</h3>
        <p>{data.totalTeam}</p>
      </div>
      <div className="dashboardcard" style={{ backgroundColor: "#6699cc" }}>
        <h3>Total Tasks</h3>
        <p>{data.totalTasks}</p>
      </div>
      <div className="dashboardcard" style={{ backgroundColor: "#6699cc" }}>
        <h3>Total Users</h3>
        <p>{data.totalUsers}</p>
      </div>
      <div className="dashboardcard" style={{ backgroundColor: "#6699cc" }}>
        <h3>Total Clients</h3>
        <p>{data.totalClients}</p>
      </div>
    </div>
  );
};

export default Dashboard;

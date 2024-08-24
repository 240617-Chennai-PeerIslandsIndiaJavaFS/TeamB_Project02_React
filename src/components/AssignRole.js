import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AssignRole.css";

const AssignRole = () => {
  const [formData, setFormData] = useState({
    userid: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    // Fetch the list of users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/users");
        setUsers(response.data); // Assuming response.data is an array of users
      } catch (error) {
        console.error("There was an error fetching users!", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserChange = async (e) => {
    const selectedUserId = e.target.value;
    setFormData({
      ...formData,
      userid: selectedUserId,
    });

    if (selectedUserId) {
      try {
        // Fetch user details to get the current role
        const response = await axios.get(`http://localhost:8080/api/admin/user/${selectedUserId}`);
        console.log("Fetched user data:", response.data); // Debugging line
        setCurrentRole(response.data.role); // Assuming the response contains the role
      } catch (error) {
        console.error("There was an error fetching user details!", error);
        setCurrentRole(""); // Reset current role if there's an error
      }
    } else {
      setCurrentRole(""); // Reset current role if no user is selected
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userid, role } = formData;

    if (!userid || !role) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .put(`http://localhost:8080/api/admin/assignRole/${userid}`, {
        role,
      })
      .then((response) => {
        console.log("Role assigned:", response.data);
        alert("Role assigned successfully!");
        setFormData({
          userid: "",
          role: "",
        });
        setCurrentRole(""); // Reset current role after successful assignment
      })
      .catch((error) => {
        console.error("There was an error assigning the role!", error);
        alert("There was an error assigning the role!");
      });
  };

  return (
    <div id="createUserForm" className="assign-role-form-container">
      <h2 className="assign-role-title">Assign Role</h2>
      <form id="userForm" className="assign-role-form" onSubmit={handleSubmit}>
        <label htmlFor="userid" className="assign-role-label">User:</label>
        <select
          id="userid"
          name="userid"
          className="assign-role-select"
          value={formData.userid}
          onChange={handleUserChange}
          required
        >
          <option value="" className="assign-role-option">Select User</option>
          {users.map((user) => (
            <option key={user.userId} value={user.userId} className="assign-role-option">
              {user.userName} ({user.userId})
            </option>
          ))}
        </select>
        <br />

        {currentRole && (
          <div className="current-role-container">
            <label htmlFor="currentRole" className="assign-role-label">Current Role:</label>
            <input
              type="text"
              id="currentRole"
              name="currentRole"
              className="assign-role-input"
              value={currentRole}
              readOnly
            />
            <br />
          </div>
        )}

        <label htmlFor="role" className="assign-role-label">New Role:</label>
        <select
          id="role"
          name="role"
          className="assign-role-select"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="" className="assign-role-option">Select Role</option>
          <option value="ADMIN" className="assign-role-option">ADMIN</option>
          <option value="PROJECT_MANAGER" className="assign-role-option">PROJECT_MANAGER</option>
          <option value="TEAM_MEMBER" className="assign-role-option">TEAM_MEMBER</option>
        </select>
        <br />

        <button type="submit" className="assign-role-button common">
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default AssignRole;

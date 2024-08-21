import React, { useState } from "react";
import axios from "axios";
import "../css/UserDetails.css"; 

const UserDetails = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchUserDetails = (e) => {
    e.preventDefault();
    setError("");
    setUser(null); // This is for clearing any previously associated user details

    if (!userId) {
      setError("Please enter a User ID.");
      return;
    }

    if (isNaN(userId) || parseInt(userId, 10) <= 0) {
      setError("Invalid User ID. Please enter a positive number.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/admin/users/${userId}`)
      .then((response) => {
        if (response.data) {
          setUser(response.data); // Setting the details of the user that has been fetched
        } else {
          setError("User not found.");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the user details!", error);
        setError("There was an error fetching the user details.");
      });
  };

  return (
    <div className="user-details-container">
      <h2 className="user-details-title">Fetch User Details</h2>
      <form id="fetchForm" className="user-details-form">
        <label htmlFor="userId" className="user-details-label">
          User ID:
        </label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={userId}
          onChange={handleInputChange}
          required
          className="user-details-info"
        />
        <button
          type="button"
          className="user-details-button common"
          onClick={fetchUserDetails}
        >
          Fetch User 
        </button>
        {error && <p className="user-details-error">{error}</p>}
      </form>

      {/* Display user details if they are fetched */}
      {user && (
        <div className="user-details-display">
          <h3 className="user-details-title">User Details:</h3>
          <p className="user-details-info"><strong>User ID:</strong> {user.userId}</p>
          <p className="user-details-info"><strong>User Name:</strong> {user.userName}</p>
          <p className="user-details-info"><strong>Role:</strong> {user.userRole}</p>
          <p className="user-details-info"><strong>Manager ID:</strong> {user.managerId}</p>
          <p className="user-details-info"><strong>Status:</strong> {user.status}</p>
          <p className="user-details-info"><strong>Specialization:</strong> {user.specialization}</p>
          <p className="user-details-info"><strong>Phone No:</strong> {user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

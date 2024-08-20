import React, { useState } from "react";
import axios from "axios";
import "../css/DeactiveUser.css";

const DeactivateUser = () => {
  const initialFormData = {
    user_id: "",
    status: "INACTIVE",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { user_id, status } = formData;

    if (!user_id || !status) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios
      .put(`http://localhost:8080/api/admin/deactivateUser/${user_id}`, { status })
      .then((response) => {
        console.log("User deactivated:", response.data);
        alert("User deactivated successfully!");
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("There was an error deactivating the user!", error);
        alert("There was an error deactivating the user!");
      });
  };

  return (
    <div id="createUserForm" className="deactivate-form-container">
      <h2 className="deactivate-title">Deactivate User</h2>
      <form id="userForm" className="deactivate-form" onSubmit={handleSubmit}>
        <label htmlFor="user_id" className="deactivate-label">UserID:</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          className="deactivate-input"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="status" className="deactivate-label">Status:</label>
        <select
          id="status"
          name="status"
          className="deactivate-select"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="" className="deactivate-option">Select Status</option>
          <option value="INACTIVE" className="deactivate-option">INACTIVE</option>
        </select>
        <br />

        <button type="submit" className="deactivate-button common">
          Deactivate
        </button>
      </form>
    </div>
  );
};

export default DeactivateUser;

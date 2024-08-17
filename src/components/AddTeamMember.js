import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddTeamMember.css";

const AddTeamMember = () => {
  const [teamId, setTeamId] = useState("");
  const [userId, setUserId] = useState("");
  const [teamIds, setTeamIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/teams")
      .then((response) => {
        const teamIds = response.data.map((team) => team.teamId);
        setTeamIds(teamIds);
      })
      .catch((error) => {
        console.error("Error fetching team IDs:", error);
        setTeamIds([]);
      });

    axios
      .get("http://localhost:8080/api/admin/users")
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) =>
            user.managerId === 0 &&
            user.userRole === "TEAM_MEMBER" &&
            user.status === "ACTIVE"
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const params = new URLSearchParams({
      teamId: teamId,
      userId: userId,
    });

    axios
      .post(`http://localhost:8080/api/teamMember?${params.toString()}`)
      .then((response) => {
        console.log("Team member added successfully:", response.data);
        setTeamId("");
        setUserId("");
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error adding team member:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      });
  };

  return (
    <div className="add-team-member-container">
      <form className="add-team-member-panel" onSubmit={handleSubmit}>
        <div className="add-team-member-header">Add Team Member</div>

        <div className="add-team-member-row">
          <div className="add-team-member-section">
            <label className="add-team-member-title" htmlFor="teamId">
              Team ID
            </label>
            <select
              className="add-team-member-content"
              id="teamId"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            >
              <option value="">Select a team</option>
              {teamIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className="add-team-member-section">
            <label className="add-team-member-title" htmlFor="userId">
              User ID
            </label>
            <select
              className="add-team-member-content"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.userName} ({user.userId})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="add-team-member-alert"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Team Member"}
        </button>
      </form>
    </div>
  );
};

export default AddTeamMember;
